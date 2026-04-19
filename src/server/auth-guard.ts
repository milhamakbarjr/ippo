import { auth } from '@/lib/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import type { User } from '@/db/schema';
import { eq } from 'drizzle-orm';

type SessionData = { user?: { email?: string } | null } | null;

export type AuthGuardSuccess = {
  session: NonNullable<SessionData> & { user: { email: string } };
  appUser: User;
};

export function isAuthError(result: AuthGuardSuccess | Response): result is Response {
  return result instanceof Response;
}

async function getSessionData(request: Request): Promise<SessionData> {
  const sessionRes = await auth.handler(
    new Request(new URL('/api/auth/get-session', request.url), {
      method: 'GET',
      headers: request.headers,
    })
  );
  if (!sessionRes.ok) return null;
  return (await sessionRes.json()) as SessionData;
}

async function lookupAppUser(email: string): Promise<User | undefined> {
  const [appUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return appUser;
}

/** For protected routes — returns 401/503 if not authenticated. */
export async function requireAuth(request: Request): Promise<AuthGuardSuccess | Response> {
  const sessionData = await getSessionData(request);
  if (sessionData === null) {
    return Response.json({ error: 'Auth service unavailable' }, { status: 503 });
  }
  if (!sessionData?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const appUser = await lookupAppUser(sessionData.user.email);
  if (!appUser) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }
  return {
    session: sessionData as NonNullable<SessionData> & { user: { email: string } },
    appUser,
  };
}

/** Returns a 403 Response if the user is not an admin, otherwise null. */
export function requireAdminRole(appUser: User): Response | null {
  return appUser.role === 'admin'
    ? null
    : Response.json({ error: 'Forbidden' }, { status: 403 });
}

/** Returns a 403 Response if the user is not a contributor or admin, otherwise null. */
export function requireContributorRole(appUser: User): Response | null {
  return appUser.role === 'contributor' || appUser.role === 'admin'
    ? null
    : Response.json({ error: 'Forbidden' }, { status: 403 });
}

/** For public routes that optionally personalize for authenticated users. Returns null for guests. */
export async function optionalAuth(request: Request): Promise<AuthGuardSuccess | null> {
  const sessionData = await getSessionData(request);
  if (!sessionData?.user?.email) return null;
  const appUser = await lookupAppUser(sessionData.user.email);
  if (!appUser) return null;
  return {
    session: sessionData as NonNullable<SessionData> & { user: { email: string } },
    appUser,
  };
}
