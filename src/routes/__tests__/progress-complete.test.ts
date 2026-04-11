import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockDbSelect, mockDbTransaction, mockUpdateStreak, mockCheckAchievements } = vi.hoisted(() => ({
  mockDbSelect: vi.fn(),
  mockDbTransaction: vi.fn(),
  mockUpdateStreak: vi.fn(),
  mockCheckAchievements: vi.fn(),
}));

vi.mock('@/db', () => ({
  db: {
    select: mockDbSelect,
    insert: vi.fn(),
    update: vi.fn(),
    transaction: mockDbTransaction,
  },
}));
vi.mock('@/db/schema', () => ({ progress: {}, users: {} }));
vi.mock('drizzle-orm', () => ({
  eq: vi.fn(() => 'eq'),
  and: vi.fn(() => 'and'),
  sql: vi.fn(() => 'sql'),
}));
vi.mock('@/lib/auth', () => ({ auth: { handler: vi.fn() } }));
vi.mock('@/lib/streak', () => ({ updateStreak: mockUpdateStreak }));
vi.mock('@/server/achievements', () => ({ checkAchievements: mockCheckAchievements }));
vi.mock('@tanstack/react-router', () => ({
  createFileRoute: () => (opts: unknown) => ({ options: opts }),
}));
vi.mock('@/content/kana/index', () => ({ level: { steps: [{ slug: 'kana-1' }, { slug: 'kana-2' }] } }));
vi.mock('@/content/n5/index', () => ({ level: { steps: [{ slug: 'n5-1' }, { slug: 'n5-2' }] } }));
vi.mock('@/content/n4/index', () => ({ level: { steps: [] } }));
vi.mock('@/content/n3/index', () => ({ level: { steps: [] } }));
vi.mock('@/content/n2/index', () => ({ level: { steps: [] } }));
vi.mock('@/content/n1/index', () => ({ level: { steps: [] } }));

import { auth } from '@/lib/auth';
import type { Route as RouteType } from '@/routes/api/progress/complete';

const { Route } = await import('@/routes/api/progress/complete') as { Route: typeof RouteType };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (Route as any).options.server.handlers.POST as (ctx: { request: Request }) => Promise<Response>;

function makeChain(value: unknown) {
  const t = { then: (r: (v: unknown) => void) => r(value) };
  return new Proxy(t, {
    get(target, prop) {
      if (prop === 'then') return target.then;
      return () => new Proxy(t, this);
    },
  });
}

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/progress/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const validBody = { level: 'n5', step_slug: 'n5-1' };

function setupAuth(email = 'u@e.com') {
  vi.mocked(auth.handler).mockResolvedValue(
    new Response(JSON.stringify({ user: { email } }), { status: 200 })
  );
}

function setupTransaction({ alreadyCompleted = false, newXP = 110 } = {}) {
  mockDbTransaction.mockImplementation(async (cb: (tx: unknown) => Promise<unknown>) => {
    const existing = alreadyCompleted ? [{ completed: true }] : [];
    return cb({
      select: vi.fn().mockReturnValue(makeChain(existing)),
      insert: vi.fn().mockReturnValue(makeChain(undefined)),
      update: vi.fn().mockReturnValue(makeChain([{ xp: newXP }])),
    });
  });
}

beforeEach(() => {
  vi.resetAllMocks();
  mockUpdateStreak.mockResolvedValue(3);
  mockCheckAchievements.mockResolvedValue([]);
});

describe('POST /api/progress/complete', () => {
  it('returns 401 when auth returns non-ok', async () => {
    vi.mocked(auth.handler).mockResolvedValue(new Response(null, { status: 401 }));
    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(401);
  });

  it('returns 401 when session has no user email', async () => {
    vi.mocked(auth.handler).mockResolvedValue(
      new Response(JSON.stringify({ user: null }), { status: 200 })
    );
    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(401);
  });

  it('returns 404 when user not found in DB', async () => {
    setupAuth();
    mockDbSelect.mockReturnValue(makeChain([]));
    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(404);
  });

  it('returns 400 for invalid JSON', async () => {
    setupAuth();
    mockDbSelect.mockReturnValue(makeChain([{ id: 'user-uuid', xp: 100 }]));
    const req = new Request('http://localhost/api/progress/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json{',
    });
    const res = await handler({ request: req });
    expect(res.status).toBe(400);
  });

  it('returns 400 for validation failure (empty step_slug)', async () => {
    setupAuth();
    mockDbSelect.mockReturnValue(makeChain([{ id: 'user-uuid', xp: 100 }]));
    const res = await handler({ request: makeRequest({ level: 'n5', step_slug: '' }) });
    expect(res.status).toBe(400);
  });

  it('awards 10 XP, calls updateStreak and checkAchievements on new completion', async () => {
    setupAuth();
    mockDbSelect
      .mockReturnValueOnce(makeChain([{ id: 'user-uuid', xp: 100 }])) // find user
      .mockReturnValueOnce(makeChain([{ step_slug: 'n5-1' }]));         // completedRows
    setupTransaction({ alreadyCompleted: false, newXP: 110 });

    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, unknown>;
    expect(data.xpAwarded).toBe(10);
    expect(data.totalXP).toBe(110);
    expect(mockUpdateStreak).toHaveBeenCalledWith('user-uuid');
    expect(mockCheckAchievements).toHaveBeenCalled();
  });

  it('does not award XP, skips streak and achievements on duplicate completion', async () => {
    setupAuth();
    mockDbSelect
      .mockReturnValueOnce(makeChain([{ id: 'user-uuid', xp: 100 }])) // find user
      .mockReturnValueOnce(makeChain([{ streak: 5 }]))                 // streak lookup (alreadyCompleted path)
      .mockReturnValueOnce(makeChain([{ step_slug: 'n5-1' }]));        // completedRows
    setupTransaction({ alreadyCompleted: true });

    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, unknown>;
    expect(data.xpAwarded).toBe(0);
    expect(mockUpdateStreak).not.toHaveBeenCalled();
    expect(mockCheckAchievements).not.toHaveBeenCalled();
    expect(data.achievementUnlocked).toBeNull();
  });

  it('returns nextStep and levelProgress based on completed rows', async () => {
    setupAuth();
    mockDbSelect
      .mockReturnValueOnce(makeChain([{ id: 'user-uuid', xp: 100 }]))
      .mockReturnValueOnce(makeChain([{ step_slug: 'n5-1' }])); // n5-1 done, n5-2 is next
    setupTransaction({ alreadyCompleted: false, newXP: 110 });

    const res = await handler({ request: makeRequest(validBody) });
    const data = await res.json() as Record<string, unknown>;
    expect(data.nextStep).toBe('n5-2');
    const lp = data.levelProgress as { completed: number; total: number };
    expect(lp.completed).toBe(1);
    expect(lp.total).toBe(2);
  });

  it('includes unlocked achievement in response when granted', async () => {
    setupAuth();
    mockDbSelect
      .mockReturnValueOnce(makeChain([{ id: 'user-uuid', xp: 100 }]))
      .mockReturnValueOnce(makeChain([{ step_slug: 'n5-1' }]));
    setupTransaction({ alreadyCompleted: false, newXP: 110 });
    mockCheckAchievements.mockResolvedValue([{ slug: 'first-step' }]);

    const res = await handler({ request: makeRequest(validBody) });
    const data = await res.json() as Record<string, unknown>;
    expect((data.achievementUnlocked as { slug: string })?.slug).toBe('first-step');
  });
});
