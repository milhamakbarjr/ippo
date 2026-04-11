import { describe, it, expect, vi, beforeEach } from 'vitest';

// Must mock before importing the route (both throw without env vars)
vi.mock('@/db', () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
  },
}));
vi.mock('@/db/schema', () => ({ quiz_results: {}, users: {} }));
vi.mock('drizzle-orm', () => ({ eq: vi.fn(() => 'eq') }));
vi.mock('@/lib/auth', () => ({ auth: { handler: vi.fn() } }));
vi.mock('@tanstack/react-router', () => ({
  createFileRoute: () => (opts: unknown) => ({ options: opts }),
}));

import { db } from '@/db';
import { auth } from '@/lib/auth';
import type { Route as RouteType } from '@/routes/api/quiz/submit';

// Dynamically load so the mocks are in place first
const { Route } = await import('@/routes/api/quiz/submit') as { Route: typeof RouteType };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (Route as any).options.server.handlers.POST as (ctx: { request: Request }) => Promise<Response>;

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/quiz/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
}

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
});

const validBody = { quiz_slug: 'n5-vocab', score: 5, total_questions: 10, level: 'n5' };

describe('POST /api/quiz/submit', () => {
  it('returns 400 for invalid JSON', async () => {
    const req = new Request('http://localhost/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json{',
    });
    const res = await handler({ request: req });
    expect(res.status).toBe(400);
  });

  it('returns 400 when score > total_questions', async () => {
    const res = await handler({ request: makeRequest({ quiz_slug: 'n5-vocab', score: 11, total_questions: 10 }) });
    expect(res.status).toBe(400);
  });

  it('returns score without DB write for guest (auth 4xx)', async () => {
    vi.mocked(auth.handler).mockResolvedValue(new Response(null, { status: 401 }));
    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, unknown>;
    expect(data.success).toBe(true);
    expect(data.score).toBe(5);
    expect(vi.mocked(db.insert)).not.toHaveBeenCalled();
  });

  it('returns 503 when auth service returns 5xx', async () => {
    vi.mocked(auth.handler).mockResolvedValue(new Response(null, { status: 500 }));
    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(503);
  });

  it('returns score without DB write when session has no user email', async () => {
    vi.mocked(auth.handler).mockResolvedValue(
      new Response(JSON.stringify({ user: null }), { status: 200 })
    );
    const res = await handler({ request: makeRequest(validBody) });
    const data = await res.json() as Record<string, unknown>;
    expect(data.success).toBe(true);
    expect(vi.mocked(db.insert)).not.toHaveBeenCalled();
  });

  it('returns 404 when authenticated user not in app DB', async () => {
    vi.mocked(auth.handler).mockResolvedValue(
      new Response(JSON.stringify({ user: { email: 'u@e.com' } }), { status: 200 })
    );
    vi.mocked(db.select).mockReturnValue(makeChain([])); // no user found
    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(404);
  });

  it('persists quiz result and returns quiz_result_id for authenticated user', async () => {
    vi.mocked(auth.handler).mockResolvedValue(
      new Response(JSON.stringify({ user: { email: 'u@e.com' } }), { status: 200 })
    );
    vi.mocked(db.select).mockReturnValue(makeChain([{ id: 'user-uuid' }]));
    vi.mocked(db.insert).mockReturnValue(makeChain([{ id: 'result-uuid' }]));
    const res = await handler({ request: makeRequest(validBody) });
    expect(res.status).toBe(200);
    const data = await res.json() as Record<string, unknown>;
    expect(data.quiz_result_id).toBe('result-uuid');
  });
});
