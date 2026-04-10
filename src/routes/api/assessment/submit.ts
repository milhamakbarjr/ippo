import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { users } from '@/db/schema';
import { AssessmentSubmitSchema } from '@/db/validators';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export const Route = createFileRoute('/api/assessment/submit')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          let body: unknown;
          try {
            body = await request.json();
          } catch {
            return Response.json({ error: 'Invalid JSON' }, { status: 400 });
          }

          const parsed = AssessmentSubmitSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json({ error: parsed.error.message }, { status: 400 });
          }

          const { assessed_level } = parsed.data;

          // Auth check — proxy to Better Auth get-session
          const sessionRes = await auth.handler(
            new Request(
              new URL('/api/auth/get-session', request.url),
              { method: 'GET', headers: request.headers }
            )
          );

          // Guest path: no session — return assessed level without DB write
          if (!sessionRes.ok) {
            return Response.json({ success: true, assessedLevel: assessed_level });
          }

          const sessionData = (await sessionRes.json()) as {
            user?: { id?: string; email?: string } | null;
          } | null;

          if (!sessionData?.user?.email) {
            return Response.json({ success: true, assessedLevel: assessed_level });
          }

          // Authenticated path: persist assessed_level to DB
          const [appUser] = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.email, sessionData.user.email))
            .limit(1);

          if (!appUser) {
            return Response.json({ error: 'User not found' }, { status: 404 });
          }

          await db
            .update(users)
            .set({ assessed_level, updated_at: new Date() })
            .where(eq(users.id, appUser.id));

          return Response.json({ success: true, assessedLevel: assessed_level });
        } catch (err) {
          console.error('[assessment/submit] error:', err);
          return Response.json({ error: 'Submit failed' }, { status: 500 });
        }
      },
    },
  },
});
