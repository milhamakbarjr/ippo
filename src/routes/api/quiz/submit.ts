import { createFileRoute } from '@tanstack/react-router';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { quiz_results, users } from '@/db/schema';
import { QuizSubmitSchema } from '@/db/validators';
import { eq } from 'drizzle-orm';

export const Route = createFileRoute('/api/quiz/submit')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try { body = await request.json(); }
        catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }

        const parsed = QuizSubmitSchema.safeParse(body);
        if (!parsed.success) return Response.json({ error: parsed.error.message }, { status: 400 });

        const { quiz_slug, level, score, total_questions } = parsed.data;

        // Check session — save result if authenticated, return score-only for guests
        const sessionRes = await auth.handler(
          new Request(new URL('/api/auth/get-session', request.url), {
            method: 'GET', headers: request.headers,
          })
        );

        if (!sessionRes.ok) {
          return Response.json({ success: true, score, total_questions });
        }

        const sessionData = sessionRes.ok
          ? (await sessionRes.json() as { user?: { email?: string } | null } | null)
          : null;

        if (!sessionData?.user?.email) {
          return Response.json({ success: true, score, total_questions });
        }

        const [appUser] = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, sessionData.user.email))
          .limit(1);

        if (!appUser) {
          return Response.json({ error: 'User not found' }, { status: 404 });
        }

        const [result] = await db
          .insert(quiz_results)
          .values({ user_id: appUser.id, quiz_slug, level, score, total_questions })
          .returning({ id: quiz_results.id });

        return Response.json({ success: true, quiz_result_id: result.id, score, total_questions });
      },
    },
  },
});
