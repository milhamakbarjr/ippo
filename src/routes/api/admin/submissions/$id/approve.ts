import { createFileRoute } from '@tanstack/react-router';
import { txDb } from '@/db';
import { quiz_submissions, quiz_bank } from '@/db/schema';
import { requireAuth, isAuthError, requireAdminRole } from '@/server/auth-guard';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { QuizQuestionInputSchema } from '@/db/validators';
import type { QuizQuestionInput } from '@/db/validators';

export const Route = createFileRoute('/api/admin/submissions/$id/approve')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const authResult = await requireAuth(request);
        if (isAuthError(authResult)) return authResult;
        const { appUser } = authResult;

        const forbidden = requireAdminRole(appUser);
        if (forbidden) return forbidden;

        const { id } = params;

        let questionsAdded: number;
        try {
          questionsAdded = await txDb.transaction(async (tx) => {
            const [submission] = await tx
              .select()
              .from(quiz_submissions)
              .where(eq(quiz_submissions.id, id))
              .limit(1);

            if (!submission) throw Object.assign(new Error('Submission not found'), { status: 404 });
            if (submission.status !== 'pending_review') throw Object.assign(new Error('Submission is not pending review'), { status: 400 });

            const parsed = z.array(QuizQuestionInputSchema).safeParse(submission.questions);
            if (!parsed.success) throw Object.assign(new Error('Invalid questions data'), { status: 400 });

            const questions: QuizQuestionInput[] = parsed.data;
            const insertValues = questions.map((q, index) => ({
              slug:          submission.slug,
              title:         submission.title,
              question_id:   q.id,
              question_text: q.questionText,
              options:       q.options,
              explanation:   q.explanation,
              category:      q.category,
              level:         q.level,
              sort_order:    index,
            }));

            let added = 0;
            if (insertValues.length > 0) {
              const inserted = await tx
                .insert(quiz_bank)
                .values(insertValues)
                .onConflictDoNothing({ target: quiz_bank.question_id })
                .returning({ id: quiz_bank.id });
              added = inserted.length;
            }

            const now = new Date();
            await tx
              .update(quiz_submissions)
              .set({ status: 'published', reviewer_id: appUser.id, reviewed_at: now, updated_at: now })
              .where(eq(quiz_submissions.id, id));

            return added;
          });
        } catch (err) {
          const e = err as Error & { status?: number };
          return Response.json({ error: e.message }, { status: e.status ?? 500 });
        }

        return Response.json({ success: true, questionsAdded });
      },
    },
  },
});
