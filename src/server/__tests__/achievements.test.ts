import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockSelect, mockInsert } = vi.hoisted(() => ({
  mockSelect: vi.fn(),
  mockInsert: vi.fn(),
}));

vi.mock('@/db', () => ({
  db: {
    select: mockSelect,
    insert: mockInsert,
  },
}));

vi.mock('@/db/schema', () => ({
  achievements: {},
  progress: {},
  users: {},
}));

vi.mock('drizzle-orm', () => ({
  eq: vi.fn(() => 'eq'),
  and: vi.fn(() => 'and'),
  count: vi.fn(() => 'count'),
}));

vi.mock('@/content/index', () => ({
  getStepsForLevel: vi.fn(() => [{ slug: 'step-1' }, { slug: 'step-2' }]),
}));

import { checkAchievements } from '@/server/achievements';
import { getStepsForLevel } from '@/content/index';

function makeChain(value: unknown) {
  const t = { then: (r: (v: unknown) => void) => r(value) };
  return new Proxy(t, {
    get(target, prop) {
      if (prop === 'then') return target.then;
      return () => new Proxy(t, this);
    },
  });
}

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(getStepsForLevel).mockReturnValue([{ slug: 'step-1' } as never, { slug: 'step-2' } as never]);
  // Default insert: returns [] (conflict — achievement already exists)
  mockInsert.mockReturnValue(makeChain([]));
  // Default select: no completions
  mockSelect.mockReturnValue(makeChain([{ totalCompleted: 0 }]));
});

describe('checkAchievements', () => {
  it('grants first-step when totalCompleted is 1', async () => {
    let callCount = 0;
    mockSelect.mockImplementation(() => {
      callCount++;
      if (callCount === 1) return makeChain([{ totalCompleted: 1 }]);
      return makeChain([{ completedInLevel: 0 }]);
    });
    mockInsert.mockReturnValue(makeChain([{ id: '1', user_id: 'u', achievement_slug: 'first-step' }]));

    const result = await checkAchievements('user-1', 'kana', 'step-1', 0);
    expect(result.some(a => a.slug === 'first-step')).toBe(true);
  });

  it('does not grant first-step when totalCompleted > 1', async () => {
    let callCount = 0;
    mockSelect.mockImplementation(() => {
      callCount++;
      if (callCount === 1) return makeChain([{ totalCompleted: 5 }]);
      return makeChain([{ completedInLevel: 0 }]);
    });
    const result = await checkAchievements('user-1', 'n5', 'n5-step', 0);
    expect(result.some(a => a.slug === 'first-step')).toBe(false);
  });

  it('grants sound-learner for first kana step', async () => {
    vi.mocked(getStepsForLevel).mockReturnValue([{ slug: 'hiragana-01' } as never, { slug: 'step-2' } as never]);
    let callCount = 0;
    mockSelect.mockImplementation(() => {
      callCount++;
      if (callCount === 1) return makeChain([{ totalCompleted: 2 }]);
      return makeChain([{ completedInLevel: 0 }]);
    });
    mockInsert.mockReturnValue(makeChain([{ id: '2', user_id: 'u', achievement_slug: 'sound-learner' }]));

    const result = await checkAchievements('user-1', 'kana', 'hiragana-01', 0);
    expect(result.some(a => a.slug === 'sound-learner')).toBe(true);
  });

  it('grants level master when all steps in level are completed', async () => {
    vi.mocked(getStepsForLevel).mockReturnValue([{ slug: 's1' } as never, { slug: 's2' } as never]);
    let callCount = 0;
    mockSelect.mockImplementation(() => {
      callCount++;
      if (callCount === 1) return makeChain([{ totalCompleted: 5 }]);
      return makeChain([{ completedInLevel: 2 }]); // matches level step count
    });
    mockInsert.mockReturnValue(makeChain([{ id: '3', user_id: 'u', achievement_slug: 'kana-master' }]));

    const result = await checkAchievements('user-1', 'kana', 's2', 0);
    expect(result.some(a => a.slug === 'kana-master')).toBe(true);
  });

  it('grants streak-3 when streak >= 3', async () => {
    let callCount = 0;
    mockSelect.mockImplementation(() => {
      callCount++;
      if (callCount === 1) return makeChain([{ totalCompleted: 5 }]);
      return makeChain([{ completedInLevel: 0 }]);
    });
    mockInsert.mockReturnValue(makeChain([{ id: '1', user_id: 'u', achievement_slug: 'streak-3' }]));

    const result = await checkAchievements('user-1', 'n5', 'n5-step', 3);
    expect(result.some(a => a.slug === 'streak-3')).toBe(true);
  });

  it('grants streak-7 and streak-3 when streak >= 7', async () => {
    let callCount = 0;
    mockSelect.mockImplementation(() => {
      callCount++;
      if (callCount === 1) return makeChain([{ totalCompleted: 5 }]);
      return makeChain([{ completedInLevel: 0 }]);
    });
    let insertCount = 0;
    mockInsert.mockImplementation(() => {
      insertCount++;
      const slug = insertCount === 1 ? 'streak-3' : 'streak-7';
      return makeChain([{ id: String(insertCount), user_id: 'u', achievement_slug: slug }]);
    });

    const result = await checkAchievements('user-1', 'n5', 'n5-step', 7);
    const slugs = result.map(a => a.slug);
    expect(slugs).toContain('streak-7');
    expect(slugs).toContain('streak-3');
  });

  it('does not return already-existing achievements (insert returns [])', async () => {
    let callCount = 0;
    mockSelect.mockImplementation(() => {
      callCount++;
      if (callCount === 1) return makeChain([{ totalCompleted: 1 }]);
      return makeChain([{ completedInLevel: 0 }]);
    });
    mockInsert.mockReturnValue(makeChain([])); // conflict — nothing returned

    const result = await checkAchievements('user-1', 'kana', 'step-1', 0);
    expect(result).toHaveLength(0);
  });

  it('returns empty array on DB error (non-fatal)', async () => {
    mockSelect.mockImplementation(() => {
      throw new Error('DB connection failed');
    });
    const result = await checkAchievements('user-1', 'n5', 'n5-step', 0);
    expect(result).toEqual([]);
  });
});
