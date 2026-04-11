import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const { mockSelect, mockUpdate } = vi.hoisted(() => ({
  mockSelect: vi.fn(),
  mockUpdate: vi.fn(),
}));

vi.mock('@/db', () => ({
  db: {
    select: mockSelect,
    update: mockUpdate,
  },
}));

vi.mock('@/db/schema', () => ({
  users: { id: 'id', streak: 'streak', last_completion_date: 'last_completion_date', updated_at: 'updated_at' },
}));

vi.mock('drizzle-orm', () => ({
  eq: vi.fn(() => 'eq-condition'),
}));

import { updateStreak } from '@/lib/streak';

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
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-01-15T10:00:00Z'));
  mockSelect.mockReturnValue(makeChain([]));
  mockUpdate.mockReturnValue(makeChain([]));
});

afterEach(() => {
  vi.useRealTimers();
  vi.resetAllMocks();
});

describe('updateStreak', () => {
  it('returns 0 when user is not found', async () => {
    mockSelect.mockReturnValue(makeChain([]));
    const result = await updateStreak('unknown-user');
    expect(result).toBe(0);
  });

  it('sets streak to 1 when no last_completion_date', async () => {
    mockSelect.mockReturnValue(makeChain([{ streak: 0, last_completion_date: null }]));
    const result = await updateStreak('user-1');
    expect(result).toBe(1);
  });

  it('keeps streak unchanged when completed same day', async () => {
    const today = new Date('2026-01-15T08:00:00Z');
    mockSelect.mockReturnValue(makeChain([{ streak: 5, last_completion_date: today }]));
    const result = await updateStreak('user-1');
    expect(result).toBe(5);
  });

  it('increments streak by 1 when completed next day', async () => {
    const yesterday = new Date('2026-01-14T10:00:00Z');
    mockSelect.mockReturnValue(makeChain([{ streak: 3, last_completion_date: yesterday }]));
    const result = await updateStreak('user-1');
    expect(result).toBe(4);
  });

  it('resets streak to 1 when gap is more than 1 day', async () => {
    const twoDaysAgo = new Date('2026-01-13T10:00:00Z');
    mockSelect.mockReturnValue(makeChain([{ streak: 10, last_completion_date: twoDaysAgo }]));
    const result = await updateStreak('user-1');
    expect(result).toBe(1);
  });

  it('calls db.update with new streak', async () => {
    const yesterday = new Date('2026-01-14T10:00:00Z');
    mockSelect.mockReturnValue(makeChain([{ streak: 2, last_completion_date: yesterday }]));
    await updateStreak('user-1');
    expect(mockUpdate).toHaveBeenCalled();
  });
});
