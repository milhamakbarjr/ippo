import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { otp_codes } from '@/db/schema';
import { SendOtpSchema } from '@/db/validators';
import { eq, and } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const Route = createFileRoute('/api/auth/send-otp')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = SendOtpSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json({ error: 'INVALID_INPUT', message: 'Email tidak valid' }, { status: 400 });
          }
          const { email } = parsed.data;
          const otp = generateOtp();
          const otpHash = await bcrypt.hash(otp, 10);
          const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

          // Invalidate any existing unused OTPs for this email before issuing a new one
          // so only the latest code is ever valid (prevents confusion on resend).
          await db
            .update(otp_codes)
            .set({ used: true })
            .where(and(eq(otp_codes.email, email), eq(otp_codes.used, false)));

          await db.insert(otp_codes).values({ email, otp_hash: otpHash, expires_at: expiresAt });

          if (process.env.NODE_ENV === 'production') {
            await resend.emails.send({
              from: 'Ippo <noreply@ippo.jp>',
              to: email,
              subject: 'Kode OTP Ippo',
              html: `<p>Kode OTP Anda: <strong>${otp}</strong></p><p>Berlaku 10 menit.</p>`,
            });
          } else {
            console.log(`[DEV] OTP for ${email}: ${otp}`);
          }

          return Response.json({ success: true });
        } catch (err) {
          console.error('[send-otp] error:', err);
          return Response.json({ error: 'SEND_FAILED', message: 'Gagal mengirim OTP' }, { status: 500 });
        }
      },
    },
  },
});
