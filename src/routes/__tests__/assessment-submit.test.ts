import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/db', () => ({
  db: {
    select: vi.fn(),
    update: vi.fn(),
  },
}));
vi.mock('@/db/schema', () => ({ users: {} }));
vi.mock('drizzle-orm', () => ({ eq: vi.fn(() => 'eq') }));
vi.mock('@/lib/auth', () => ({ auth: { handler: vi.fn() } }));
vi.mock('@tanstack/react-router', () => ({
  createFileRoute: () => (opts: unknown) => ({ options: opts }),
}));

import { db } from '@/db';
import { auth } from '@/lib/auth';
import type { Route as RouteType } from '@/routes/api/assessment/submit';

const { Route } = await import('@/routes/api/assessment/submit') as { Route: typeof RouteType };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (Route as any).options.server.handlers.POST as (ctx: { request: Request }) => Promise<Response>;

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/assessment/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeChain(value: unknown): any {
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
});

const validBody = { assessed_level: 'n5', score: 3, total_questions: 5 };

describe('POST /api/assessment/submit', () => {
  it('returns 400 for invalid JSON', async () => {
    const req = new Request('http://localhost/api/assessment/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'bad-json',
    });
    const res = await handler({ request: req });
    expect(res.status).toBe(400);
  });

  it('returns 400 when score > total_questions', async () => {
    const res = await handler({ request: makeRequest({ assessed_level: 'n5', score: 6, total_questions: 5 }) });
    expect(res.status).toBe(400);
  });

  it('returns assessed level without DB write for guest (auth fails)', async () => {
    vi.mocked(auth.handler).mockResolvedValue(new Response(null, { status: 401 }));
    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, unknown>;
    expect(data.success).toBe(true);
    expect(data.assessedLevel).toBe('n5');
    expect(vi.mocked(db.update)).not.toHaveBeenCalled();
  });

  it('returns assessed level without DB write when session has no email', async () => {
    vi.mocked(auth.handler).mockResolvedValue(
      new Response(JSON.stringify({ user: null }), { status: 200 })
    );
    const res = await handler({ request: makeRequest(validBody) });
    const data = await res.json() as Record<string, unknown>;
    expect(data.assessedLevel).toBe('n5');
    expect(vi.mocked(db.update)).not.toHaveBeenCalled();
  });

  it('returns 404 when authenticated user not in DB', async () => {
    vi.mocked(auth.handler).mockResolvedValue(
      new Response(JSON.stringify({ user: { email: 'u@e.com' } }), { status: 200 })
    );
    vi.mocked(db.select).mockReturnValue(makeChain([]));
    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(404);
  });

  it('persists assessed_level to DB for authenticated user', async () => {
    vi.mocked(auth.handler).mockResolvedValue(
      new Response(JSON.stringify({ user: { email: 'u@e.com' } }), { status: 200 })
    );
    vi.mocked(db.select).mockReturnValue(makeChain([{ id: 'user-uuid' }]));
    vi.mocked(db.update).mockReturnValue(makeChain([]));
    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, unknown>;
    expect(data.assessedLevel).toBe('n5');
    expect(vi.mocked(db.update)).toHaveBeenCalled();
  });
});
