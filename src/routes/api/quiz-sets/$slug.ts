import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_sets, quiz_bank, quiz_results, users } from '@/db/schema';
import { optionalAuth } from '@/server/auth-guard';
import { and, asc, eq } from 'drizzle-orm';
import type { QuizQuestion } from '@/types/quiz';
import { QuizCategorySchema, JLPTLevelSchema, QuizOptionSchema } from '@/db/validators';
import { z } from 'zod';

export const Route = createFileRoute('/api/quiz-sets/$slug')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { slug } = params;

        const [set] = await db
          .select({
            id:            quiz_sets.id,
            slug:          quiz_sets.slug,
            title:         quiz_sets.title,
            description:   quiz_sets.description,
            level:         quiz_sets.level,
            set_type:      quiz_sets.set_type,
            categories:    quiz_sets.categories,
            created_at:    quiz_sets.created_at,
            author_name:   users.name,
          })
          .from(quiz_sets)
          .leftJoin(users, eq(quiz_sets.author_id, users.id))
          .where(and(eq(quiz_sets.slug, slug), eq(quiz_sets.is_published, true)))
          .limit(1);

        if (!set) return Response.json({ error: 'Quiz set not found' }, { status: 404 });

        const [rows, authResult] = await Promise.all([
          db
            .select()
            .from(quiz_bank)
            .where(eq(quiz_bank.quiz_set_id, set.id))
            .orderBy(asc(quiz_bank.sort_order)),
          optionalAuth(request),
        ]);

        const questions: QuizQuestion[] = rows.map((row) => ({
          id:           row.question_id,
          questionText: row.question_text,
          options:      z.array(QuizOptionSchema).parse(row.options),
          explanation:  row.explanation,
          category:     QuizCategorySchema.parse(row.category),
          level:        JLPTLevelSchema.parse(row.level),
        }));

        let isCompleted = false;
        let best_score: { score: number; total: number; percentage: number } | null = null;

        if (authResult) {
          const results = await db
            .select({
              score:           quiz_results.score,
              total_questions: quiz_results.total_questions,
            })
            .from(quiz_results)
            .where(
              and(
                eq(quiz_results.user_id, authResult.appUser.id),
                eq(quiz_results.quiz_slug, slug),
              ),
            );

          if (results.length > 0) {
            isCompleted = true;
            const best = results.reduce((prev, cur) => {
              const prevPct = prev.score / prev.total_questions;
              const curPct = cur.score / cur.total_questions;
              return curPct > prevPct ? cur : prev;
            });
            best_score = {
              score:      best.score,
              total:      best.total_questions,
              percentage: Math.round((best.score / best.total_questions) * 100),
            };
          }
        }

        return Response.json({
          id:          set.id,
          slug:        set.slug,
          title:       set.title,
          description: set.description,
          level:       set.level,
          set_type:    set.set_type,
          categories:  set.categories,
          created_at:  set.created_at,
          author_name: set.author_name ?? null,
          questions,
          isCompleted,
          best_score,
        });
      },
    },
  },
});
