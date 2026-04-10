import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { users, otp_codes } from '@/db/schema';
import { SendOtpSchema } from '@/db/validators';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const Route = createFileRoute('/api/auth/send-otp')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = SendOtpSchema.safeParse(body);

          if (!parsed.success) {
            return Response.json(
              { error: 'INVALID_EMAIL', messageId: 'Email tidak valid' },
              { status: 400 }
            );
          }

          const { email, mode = 'register' } = parsed.data;

          // Check if user exists
          const [existingUser] = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (mode === 'register' && existingUser) {
            return Response.json(
              { error: 'EMAIL_EXISTS', messageId: 'Akun sudah terdaftar. Coba Login' },
              { status: 409 }
            );
          }

          if (mode === 'login' && !existingUser) {
            return Response.json(
              { error: 'USER_NOT_FOUND', messageId: 'Akun tidak ditemukan. Daftar baru?' },
              { status: 404 }
            );
          }

          // Generate 6-digit OTP
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          const otp_hash = await bcrypt.hash(otp, 10);
          const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

          // Store OTP
          await db.insert(otp_codes).values({ email, otp_hash, expires_at });

          // Send email via Resend
          const isDev = process.env.NODE_ENV === 'development';

          if (isDev) {
            console.log(`[DEV] OTP for ${email}: ${otp}`);
          } else {
            await resend.emails.send({
              from: 'Ippo <noreply@ippo.jp>',
              replyTo: 'support@ippo.jp',
              to: email,
              subject: `Kode OTP Ippo Kamu: ${otp}`,
              html: `
                <div style="font-family: Inter, sans-serif; max-width: 400px; margin: 0 auto; padding: 24px;">
                  <h2 style="color: #101828;">Kode OTP Ippo Kamu</h2>
                  <p style="color: #475467;">Masukkan kode berikut untuk melanjutkan:</p>
                  <div style="background: #F9FAFB; border: 1px solid #EAECF0; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
                    <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #6941C6;">${otp}</span>
                  </div>
                  <p style="color: #475467; font-size: 14px;">Kode ini berlaku selama <strong>10 menit</strong>. Jangan bagikan ke siapapun.</p>
                </div>
              `,
            });
          }

          return Response.json({ success: true });
        } catch (err) {
          console.error('[send-otp] error:', err);
          return Response.json(
            { error: 'SEND_FAILED', messageId: 'Gagal mengirim kode. Coba beberapa saat lagi.' },
            { status: 500 }
          );
        }
      },
    },
  },
});
