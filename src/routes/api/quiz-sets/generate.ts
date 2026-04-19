import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_bank } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import type { QuizQuestion } from '@/types/quiz';
import { QuizCategorySchema, JLPTLevelSchema, QuizOptionSchema } from '@/db/validators';
import { JLPT_EXAM_CONFIG, JLPT_TOTAL_QUESTIONS } from '@/config/jlpt-exam-config';
import { z } from 'zod';

export const Route = createFileRoute('/api/quiz-sets/generate')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const level = url.searchParams.get('level');

        if (!level || !(level in JLPT_EXAM_CONFIG)) {
          return Response.json({ error: 'Valid level required (n5–n1)' }, { status: 400 });
        }

        const distribution = JLPT_EXAM_CONFIG[level];
        const totalNeeded = JLPT_TOTAL_QUESTIONS[level];

        // Check pool depth per category
        const categories = (Object.keys(distribution) as (keyof typeof distribution)[]).filter(
          (cat) => distribution[cat] > 0,
        );

        const poolCounts = await Promise.all(
          categories.map((cat) =>
            db
              .select({ count: sql<number>`count(*)::int` })
              .from(quiz_bank)
              .where(and(eq(quiz_bank.level, level), eq(quiz_bank.category, cat)))
              .then(([r]) => ({ cat, count: r?.count ?? 0 })),
          ),
        );

        const shortage = poolCounts.find(({ cat, count }) => count < distribution[cat]);
        if (shortage) {
          const needed = distribution[shortage.cat] - shortage.count;
          return Response.json(
            {
              error: 'insufficient_questions',
              message: `Tidak cukup soal untuk simulasi. Butuh ${needed} soal ${shortage.cat} lagi.`,
              pool: poolCounts,
              needed: totalNeeded,
            },
            { status: 422 },
          );
        }

        // Sample questions per category using random ordering
        const categoryQuestions = await Promise.all(
          categories.map((cat) =>
            db
              .select()
              .from(quiz_bank)
              .where(and(eq(quiz_bank.level, level), eq(quiz_bank.category, cat)))
              .orderBy(sql`RANDOM()`)
              .limit(distribution[cat]),
          ),
        );

        const allRows = categoryQuestions.flat();

        // Shuffle the combined list so categories are interleaved
        for (let i = allRows.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allRows[i], allRows[j]] = [allRows[j], allRows[i]];
        }

        function shuffleArray<T>(arr: T[]): T[] {
          const a = [...arr];
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
        }

        const questions: QuizQuestion[] = allRows.map((row) => ({
          id:           row.question_id,
          questionText: row.question_text,
          options:      shuffleArray(z.array(QuizOptionSchema).parse(row.options)),
          explanation:  row.explanation,
          category:     QuizCategorySchema.parse(row.category),
          level:        JLPTLevelSchema.parse(row.level),
        }));

        const slug = `exam-${level}-${Date.now()}`;

        return Response.json({
          slug,
          title:     `Simulasi Ujian JLPT ${level.toUpperCase()}`,
          level,
          set_type:  'exam',
          questions,
          generated: true,
        });
      },
    },
  },
});
