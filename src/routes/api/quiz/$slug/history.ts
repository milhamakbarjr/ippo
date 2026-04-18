import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_results } from '@/db/schema';
import { requireAuth, isAuthError } from '@/server/auth-guard';
import { eq, and, desc } from 'drizzle-orm';

export const Route = createFileRoute('/api/quiz/$slug/history')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const authResult = await requireAuth(request);
        if (isAuthError(authResult)) return authResult;
        const { appUser } = authResult;

        const attempts = await db
          .select({ score: quiz_results.score, total: quiz_results.total_questions, completed_at: quiz_results.completed_at })
          .from(quiz_results)
          .where(and(eq(quiz_results.user_id, appUser.id), eq(quiz_results.quiz_slug, params.slug)))
          .orderBy(desc(quiz_results.completed_at));

        if (attempts.length === 0) return Response.json({ error: 'No attempts found' }, { status: 404 });

        const withPct = attempts.map(a => ({
          score: a.score,
          total: a.total,
          percentage: Math.round((a.score / a.total) * 100),
          completed_at: a.completed_at?.toISOString() ?? null,
        }));

        const bestScore = Math.max(...withPct.map(a => a.score));
        const bestPercentage = Math.max(...withPct.map(a => a.percentage));

        return Response.json({
          quizSlug: params.slug,
          attempts: withPct,
          bestScore,
          bestPercentage,
          lastAttempt: withPct[0]?.completed_at ?? null,
          attemptCount: withPct.length,
        });
      },
    },
  },
});
