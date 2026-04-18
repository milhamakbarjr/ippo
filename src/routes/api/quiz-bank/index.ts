import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_bank, quiz_results } from '@/db/schema';
import { optionalAuth } from '@/server/auth-guard';
import { count, eq } from 'drizzle-orm';

export const Route = createFileRoute('/api/quiz-bank/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const [rows, authResult] = await Promise.all([
          db
            .select({
              slug:          quiz_bank.slug,
              title:         quiz_bank.title,
              level:         quiz_bank.level,
              category:      quiz_bank.category,
              questionCount: count(quiz_bank.id),
            })
            .from(quiz_bank)
            .groupBy(quiz_bank.slug, quiz_bank.title, quiz_bank.level, quiz_bank.category),
          optionalAuth(request),
        ]);

        let completedSlugs: string[] = [];
        if (authResult) {
          const results = await db
            .selectDistinct({ quiz_slug: quiz_results.quiz_slug })
            .from(quiz_results)
            .where(eq(quiz_results.user_id, authResult.appUser.id));
          completedSlugs = results.map((r) => r.quiz_slug);
        }

        return Response.json({
          quizzes: rows.map((r) => ({
            slug:          r.slug,
            title:         r.title,
            level:         r.level,
            category:      r.category,
            questionCount: Number(r.questionCount),
          })),
          completedSlugs,
        });
      },
    },
  },
});
