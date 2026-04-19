import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_submissions } from '@/db/schema';
import { QuizSubmissionCreateSchema } from '@/db/validators';
import { requireAuth, isAuthError, requireContributorRole } from '@/server/auth-guard';
import { eq, desc, sql } from 'drizzle-orm';

export const Route = createFileRoute('/api/contributor/submissions/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authResult = await requireAuth(request);
        if (isAuthError(authResult)) return authResult;
        const { appUser } = authResult;

        const forbidden = requireContributorRole(appUser);
        if (forbidden) return forbidden;

        const rows = await db
          .select({
            id: quiz_submissions.id,
            submitted_by: quiz_submissions.submitted_by,
            slug: quiz_submissions.slug,
            title: quiz_submissions.title,
            level: quiz_submissions.level,
            category: quiz_submissions.category,
            question_count: sql<number>`jsonb_array_length(${quiz_submissions.questions})`,
            status: quiz_submissions.status,
            review_note: quiz_submissions.review_note,
            submitted_at: quiz_submissions.submitted_at,
            reviewed_at: quiz_submissions.reviewed_at,
            created_at: quiz_submissions.created_at,
            updated_at: quiz_submissions.updated_at,
          })
          .from(quiz_submissions)
          .where(eq(quiz_submissions.submitted_by, appUser.id))
          .orderBy(desc(quiz_submissions.created_at));

        return Response.json({ submissions: rows });
      },

      POST: async ({ request }) => {
        const authResult = await requireAuth(request);
        if (isAuthError(authResult)) return authResult;
        const { appUser } = authResult;

        const forbidden = requireContributorRole(appUser);
        if (forbidden) return forbidden;

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 });
        }

        const parsed = QuizSubmissionCreateSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: parsed.error.message }, { status: 400 });
        }

        const { slug, title, description, level, category, questions } = parsed.data;

        const [submission] = await db
          .insert(quiz_submissions)
          .values({
            submitted_by: appUser.id,
            slug,
            title,
            description,
            level,
            category,
            questions,
            status: 'draft',
          })
          .returning();

        return Response.json({ submission });
      },
    },
  },
});
