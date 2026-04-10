import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { quiz_results, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const QuizSubmitSchema = z.object({
  user_id: z.string().uuid().optional(),
  quiz_slug: z.string().min(1).max(100),
  level: z.enum(['n5', 'n4', 'n3', 'n2', 'n1']),
  score: z.number().int().min(0).max(20),
  total_questions: z.number().int().min(1).max(20),
});

export const Route = createFileRoute('/api/quiz/submit')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try { body = await request.json(); }
        catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }

        const parsed = QuizSubmitSchema.safeParse(body);
        if (!parsed.success) return Response.json({ error: 'Invalid input' }, { status: 400 });

        const { user_id, quiz_slug, level, score, total_questions } = parsed.data;

        // If user_id provided, validate session and match user
        if (user_id) {
          const sessionRes = await auth.handler(
            new Request(new URL('/api/auth/get-session', request.url), {
              method: 'GET', headers: request.headers,
            })
          );
          const sessionData = sessionRes.ok
            ? (await sessionRes.json() as { user?: { email?: string } | null } | null)
            : null;

          if (!sessionData?.user?.email) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
          }

          const [appUser] = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.email, sessionData.user.email))
            .limit(1);

          if (!appUser || appUser.id !== user_id) {
            return Response.json({ error: 'Forbidden' }, { status: 403 });
          }

          // Insert quiz result
          const [result] = await db
            .insert(quiz_results)
            .values({ user_id, quiz_slug, level, score, total_questions })
            .returning({ id: quiz_results.id });

          return Response.json({ success: true, quiz_result_id: result.id, score, total_questions });
        }

        // Guest: return score without saving
        return Response.json({ success: true, score, total_questions });
      },
    },
  },
});
