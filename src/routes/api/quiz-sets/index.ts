import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_sets, quiz_bank, quiz_results } from '@/db/schema';
import { eq, and, sql, desc } from 'drizzle-orm';
import { optionalAuth } from '@/server/auth-guard';
import { QUIZ_SET_NEW_DAYS } from '@/config/jlpt-exam-config';

export const Route = createFileRoute('/api/quiz-sets/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const level = url.searchParams.get('level') ?? undefined;
        const type  = url.searchParams.get('type') ?? undefined;

        const where = and(
          eq(quiz_sets.is_published, true),
          level ? eq(quiz_sets.level, level) : undefined,
          type  ? eq(quiz_sets.set_type, type) : undefined,
        );

        const rows = await db
          .select({
            id:            quiz_sets.id,
            slug:          quiz_sets.slug,
            title:         quiz_sets.title,
            description:   quiz_sets.description,
            level:         quiz_sets.level,
            set_type:      quiz_sets.set_type,
            categories:    quiz_sets.categories,
            is_published:  quiz_sets.is_published,
            created_at:    quiz_sets.created_at,
            question_count: sql<number>`count(${quiz_bank.id})::int`,
          })
          .from(quiz_sets)
          .leftJoin(quiz_bank, eq(quiz_bank.quiz_set_id, quiz_sets.id))
          .where(where)
          .groupBy(quiz_sets.id)
          .orderBy(desc(quiz_sets.created_at));

        const newThreshold = new Date();
        newThreshold.setDate(newThreshold.getDate() - QUIZ_SET_NEW_DAYS);

        const authResult = await optionalAuth(request);
        let completedSlugs: string[] = [];
        if (authResult) {
          const completed = await db
            .select({ quiz_slug: quiz_results.quiz_slug })
            .from(quiz_results)
            .where(eq(quiz_results.user_id, authResult.appUser.id));
          completedSlugs = completed.map((r) => r.quiz_slug);
        }

        const quizSets = rows.map((row) => ({
          ...row,
          isNew:       row.created_at ? row.created_at > newThreshold : false,
          isCompleted: completedSlugs.includes(row.slug),
        }));

        return Response.json({ quizSets });
      },
    },
  },
});
