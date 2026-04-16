import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { users, otp_codes } from '@/db/schema';
import { VerifyOtpSchema } from '@/db/validators';
import { eq, and, gt, desc } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { auth } from '@/lib/auth';
import { serializeSignedCookie } from 'better-call';
import { migrateLocalStorageToAccount, type MigrationResult } from '@/server/migration';

export const Route = createFileRoute('/api/auth/verify-otp')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = VerifyOtpSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json({ error: 'OTP_INVALID', message: 'Kode tidak valid. Coba lagi' }, { status: 400 });
          }

          const { email, otp, mode = 'register', migrationPayload } = parsed.data;
          const now = new Date();

          // Find most recent unused, non-expired OTP (desc so resent code wins)
          const [storedOtp] = await db
            .select()
            .from(otp_codes)
            .where(and(eq(otp_codes.email, email), eq(otp_codes.used, false), gt(otp_codes.expires_at, now)))
            .orderBy(desc(otp_codes.created_at))
            .limit(1);

          if (!storedOtp) {
            return Response.json({ error: 'OTP_EXPIRED', message: 'Kode sudah kadaluarsa. Kirim ulang' }, { status: 400 });
          }

          const isValid = await bcrypt.compare(otp, storedOtp.otp_hash);
          if (!isValid) {
            // Invalidate OTP immediately on any failed attempt to prevent brute-force.
            // User must request a new code to try again.
            await db.update(otp_codes).set({ used: true }).where(eq(otp_codes.id, storedOtp.id));
            return Response.json({ error: 'OTP_INVALID', message: 'Kode tidak valid. Kirim ulang kode baru.' }, { status: 400 });
          }

          // Mark OTP as used on success
          await db.update(otp_codes).set({ used: true }).where(eq(otp_codes.id, storedOtp.id));

          // Find or create app user
          let [appUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
          if (!appUser && mode === 'register') {
            const [newUser] = await db.insert(users).values({ email }).returning();
            appUser = newUser;
          }
          if (!appUser) {
            return Response.json({ error: 'USER_NOT_FOUND', message: 'Akun tidak ditemukan. Daftar baru?' }, { status: 404 });
          }

          // Find or create Better Auth user
          const ctx = await auth.$context;
          let baUser = await ctx.internalAdapter.findUserByEmail(email);
          if (!baUser && mode === 'register') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            baUser = await ctx.internalAdapter.createUser({
              email,
              name: appUser.name ?? '',
              emailVerified: true,
            }) as any;
          }
          if (!baUser) {
            return Response.json({ error: 'USER_NOT_FOUND', message: 'Akun tidak ditemukan. Daftar baru?' }, { status: 404 });
          }

          // Create Better Auth session
          const baUserId = (baUser as { id?: string; user?: { id: string } }).id ?? (baUser as { user: { id: string } }).user?.id;
          const session = await ctx.internalAdapter.createSession(baUserId);
          const cookieName = ctx.authCookies.sessionToken.name;
          const sessionCookie = await serializeSignedCookie(
            cookieName,
            session.token,
            ctx.secret,
            ctx.authCookies.sessionToken.attributes,
          );

          // Run migration if payload was included (Sprint 07)
          let migrationResult: MigrationResult | null = null;
          if (migrationPayload) {
            try {
              migrationResult = await migrateLocalStorageToAccount(appUser.id, {
                assessmentResult: migrationPayload.assessmentResult,
                steps: migrationPayload.steps.map(s => ({
                  step_slug:    s.step_slug,
                  level:        s.level,
                  completed_at: s.completed_at,
                })),
              });
            } catch (err) {
              console.error('[verify-otp] migration failed for user', appUser.id, err);
              migrationResult = { success: false, migratedSteps: 0, assessmentMigrated: false, error: 'Migration failed' };
            }
          }

          // Refetch user to get updated assessed_level (migration may have set it)
          const [updatedUser] = await db.select().from(users).where(eq(users.id, appUser.id)).limit(1);

          const responseHeaders = new Headers({ 'Content-Type': 'application/json' });
          responseHeaders.append('Set-Cookie', sessionCookie);

          return new Response(
            JSON.stringify({
              success: true,
              user: {
                id:             updatedUser.id,
                email:          updatedUser.email,
                name:           updatedUser.name,
                assessed_level: updatedUser.assessed_level,
                language:       updatedUser.preferred_language ?? 'id',
              },
              migration: migrationResult,
            }),
            { status: 200, headers: responseHeaders }
          );
        } catch (err) {
          console.error('[verify-otp] error:', err);
          return Response.json({ error: 'VERIFY_FAILED', message: 'Verifikasi gagal. Coba lagi.' }, { status: 500 });
        }
      },
    },
  },
});
