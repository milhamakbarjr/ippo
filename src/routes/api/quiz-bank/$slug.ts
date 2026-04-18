import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_bank, quiz_results } from '@/db/schema';
import { optionalAuth } from '@/server/auth-guard';
import { and, asc, eq } from 'drizzle-orm';
import type { QuizQuestion } from '@/types/quiz';
import { QuizCategorySchema, JLPTLevelSchema, QuizOptionSchema } from '@/db/validators';
import { z } from 'zod';

export const Route = createFileRoute('/api/quiz-bank/$slug')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { slug } = params;

        const [rows, authResult] = await Promise.all([
          db
            .select()
            .from(quiz_bank)
            .where(eq(quiz_bank.slug, slug))
            .orderBy(asc(quiz_bank.sort_order)),
          optionalAuth(request),
        ]);

        if (rows.length === 0) {
          return Response.json({ error: 'Quiz not found' }, { status: 404 });
        }

        const questions: QuizQuestion[] = rows.map((row) => ({
          id:           row.question_id,
          questionText: row.question_text,
          options:      z.array(QuizOptionSchema).parse(row.options),
          explanation:  row.explanation,
          category:     QuizCategorySchema.parse(row.category),
          level:        JLPTLevelSchema.parse(row.level),
        }));

        const [isCompleted] = await Promise.all([
          authResult
            ? db
                .select({ id: quiz_results.id })
                .from(quiz_results)
                .where(
                  and(
                    eq(quiz_results.user_id, authResult.appUser.id),
                    eq(quiz_results.quiz_slug, slug),
                  ),
                )
                .limit(1)
                .then(([r]) => !!r)
            : Promise.resolve(false),
        ]);

        const { slug: resSlug, title, level, category } = rows[0];

        return Response.json({ slug: resSlug, title, level, category, questions, isCompleted });
      },
    },
  },
});
