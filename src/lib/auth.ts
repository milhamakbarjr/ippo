import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.VITE_APP_URL ?? 'http://localhost:5173',
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge:  60 * 60 * 24,      // refresh if > 1 day old
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  trustedOrigins: [process.env.VITE_APP_URL ?? 'http://localhost:5173'],
});
