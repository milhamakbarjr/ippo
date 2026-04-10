import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { ba_user, ba_session, ba_account, ba_verification } from '@/db/schema';

export const auth = betterAuth({
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
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.VITE_APP_URL ?? 'http://localhost:5173',
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge:  60 * 60 * 24,
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  trustedOrigins: [process.env.VITE_APP_URL ?? 'http://localhost:5173'],
});
