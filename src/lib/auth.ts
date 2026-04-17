import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { ba_user, ba_session, ba_account, ba_verification } from '@/db/schema';

// Lazy singleton — defer initialization until first use inside a request handler.
// Top-level throws crash Cloudflare Workers SSR before process.env is populated.
function createAuth() {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) throw new Error('Missing required environment variable: BETTER_AUTH_SECRET');
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      camelCase: true,
      schema: {
        user:         ba_user,
        session:      ba_session,
        account:      ba_account,
        verification: ba_verification,
      },
    }),
    secret,
    baseURL: process.env.VITE_APP_URL ?? 'http://localhost:5173',
    session: {
      expiresIn: 60 * 60 * 24 * 30,
      updateAge:  60 * 60 * 24,
      cookieCache: { enabled: true, maxAge: 5 * 60 },
    },
    trustedOrigins: [process.env.VITE_APP_URL ?? 'http://localhost:5173'],
  });
}

type AuthInstance = ReturnType<typeof createAuth>;
let _auth: AuthInstance | undefined;

function getAuth(): AuthInstance {
  if (!_auth) {
    _auth = createAuth();
  }
  return _auth;
}

export const auth = new Proxy({} as AuthInstance, {
  get(_, prop, receiver) {
    return Reflect.get(getAuth(), prop, receiver);
  },
});
