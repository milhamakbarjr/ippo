import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_bank } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { JLPT_EXAM_CONFIG, JLPT_TOTAL_QUESTIONS } from '@/config/jlpt-exam-config';
import type { QuizCategory } from '@/db/validators';

export const Route = createFileRoute('/api/quiz-sets/pool-stats')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const level = url.searchParams.get('level');

        if (!level || !(level in JLPT_EXAM_CONFIG)) {
          return Response.json({ error: 'Valid level required (n5–n1)' }, { status: 400 });
        }

        const needed = JLPT_EXAM_CONFIG[level] as Record<QuizCategory, number>;
        const categories = (Object.keys(needed) as QuizCategory[]).filter((cat) => needed[cat] > 0);

        const poolRows = await db
          .select({
            category: quiz_bank.category,
            count: sql<number>`count(*)::int`,
          })
          .from(quiz_bank)
          .where(eq(quiz_bank.level, level))
          .groupBy(quiz_bank.category);

        const pool: Record<string, number> = { vocab: 0, kanji: 0, grammar: 0, reading: 0 };
        for (const row of poolRows) {
          pool[row.category] = row.count;
        }

        let shortage = 0;
        let ready = true;
        for (const cat of categories) {
          const have = pool[cat] ?? 0;
          const need = needed[cat];
          if (have < need) {
            shortage += need - have;
            ready = false;
          }
        }

        return Response.json({
          level,
          pool,
          needed,
          total_needed: JLPT_TOTAL_QUESTIONS[level],
          ready,
          shortage,
        });
      },
    },
  },
});
