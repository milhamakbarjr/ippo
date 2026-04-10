import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { users, otp_codes } from '@/db/schema';
import { VerifyOtpSchema } from '@/db/validators';
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { auth } from '@/lib/auth';
import { serializeSignedCookie } from 'better-call';

export const Route = createFileRoute('/api/auth/verify-otp')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = VerifyOtpSchema.safeParse(body);

          if (!parsed.success) {
            return Response.json(
              { error: 'OTP_INVALID', messageId: 'Kode tidak valid. Coba lagi' },
              { status: 400 }
            );
          }

          const { email, otp, mode = 'register' } = parsed.data;
          const now = new Date();

          // Find most recent unused, non-expired OTP for this email
          const [storedOtp] = await db
            .select()
            .from(otp_codes)
            .where(
              and(
                eq(otp_codes.email, email),
                eq(otp_codes.used, false),
                gt(otp_codes.expires_at, now)
              )
            )
            .orderBy(otp_codes.created_at)
            .limit(1);

          if (!storedOtp) {
            return Response.json(
              { error: 'OTP_EXPIRED', messageId: 'Kode sudah kadaluarsa. Kirim ulang' },
              { status: 400 }
            );
          }

          const isValid = await bcrypt.compare(otp, storedOtp.otp_hash);

          if (!isValid) {
            return Response.json(
              { error: 'OTP_INVALID', messageId: 'Kode tidak valid. Coba lagi' },
              { status: 400 }
            );
          }

          // Mark OTP as used immediately (single-use)
          await db
            .update(otp_codes)
            .set({ used: true })
            .where(eq(otp_codes.id, storedOtp.id));

          // Find or create user in our app table (assessed_level, preferred_language, etc.)
          let [appUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (!appUser && mode === 'register') {
            const [newUser] = await db
              .insert(users)
              .values({ email })
              .returning();
            appUser = newUser;
          }

          if (!appUser) {
            return Response.json(
              { error: 'USER_NOT_FOUND', messageId: 'Akun tidak ditemukan. Daftar baru?' },
              { status: 404 }
            );
          }

          // Find or create the corresponding Better Auth user record.
          // BA needs its own user row in ba_user to create sessions.
          const ctx = await auth.$context;
          let baUser = await ctx.internalAdapter.findUserByEmail(email);

          if (!baUser && mode === 'register') {
            baUser = await ctx.internalAdapter.createUser({
              email,
              name: appUser.name ?? undefined,
              emailVerified: true, // OTP = email is verified by definition
            });
          }

          if (!baUser) {
            return Response.json(
              { error: 'USER_NOT_FOUND', messageId: 'Akun tidak ditemukan. Daftar baru?' },
              { status: 404 }
            );
          }

          // Create a Better Auth session
          const session = await ctx.internalAdapter.createSession(baUser.id ?? (baUser as { user: { id: string } }).user?.id);

          // Sign and serialize the session token cookie
          // Better Auth uses the 'better-auth.session_token' cookie signed with HMAC
          const cookieName = ctx.authCookies.sessionToken.name;
          const cookieAttrs = ctx.authCookies.sessionToken.attributes;
          const sessionCookie = await serializeSignedCookie(
            cookieName,
            session.token,
            ctx.secret,
            cookieAttrs,
          );

          const responseHeaders = new Headers({ 'Content-Type': 'application/json' });
          responseHeaders.append('Set-Cookie', sessionCookie);

          return new Response(
            JSON.stringify({
              success: true,
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                language: user.preferred_language ?? 'id',
                createdAt: user.created_at?.toISOString(),
                isNew: mode === 'register',
              },
            }),
            { status: 200, headers: responseHeaders }
          );
        } catch (err) {
          console.error('[verify-otp] error:', err);
          return Response.json(
            { error: 'VERIFY_FAILED', messageId: 'Verifikasi gagal. Coba lagi.' },
            { status: 500 }
          );
        }
      },
    },
  },
});
