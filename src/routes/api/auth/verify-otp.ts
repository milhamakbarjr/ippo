import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { users, otp_codes } from '@/db/schema';
import { VerifyOtpSchema } from '@/db/validators';
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

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

          // Find most recent unused OTP for this email
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

          // Mark OTP as used
          await db
            .update(otp_codes)
            .set({ used: true })
            .where(eq(otp_codes.id, storedOtp.id));

          // Find or create user
          let [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (!user && mode === 'register') {
            const [newUser] = await db
              .insert(users)
              .values({ email })
              .returning();
            user = newUser;
          }

          if (!user) {
            return Response.json(
              { error: 'USER_NOT_FOUND', messageId: 'Akun tidak ditemukan. Daftar baru?' },
              { status: 404 }
            );
          }

          // TODO: Create Better Auth session
          // The session creation depends on how Better Auth exposes createSession.
          // For now, return the user so the client can proceed.
          // Full session implementation requires checking Better Auth's API.

          return Response.json({
            success: true,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              language: user.preferred_language ?? 'id',
              createdAt: user.created_at?.toISOString(),
              isNew: mode === 'register',
            },
          });
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
