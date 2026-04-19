import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_submissions, users } from '@/db/schema';
import { requireAuth, isAuthError, requireAdminRole } from '@/server/auth-guard';
import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

export const Route = createFileRoute('/api/admin/submissions/$id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const authResult = await requireAuth(request);
        if (isAuthError(authResult)) return authResult;
        const { appUser } = authResult;

        const forbidden = requireAdminRole(appUser);
        if (forbidden) return forbidden;

        const { id } = params;

        const submitterAlias = alias(users, 'submitter');
        const reviewerAlias = alias(users, 'reviewer');

        const [row] = await db
          .select({
            id: quiz_submissions.id,
            submitted_by: quiz_submissions.submitted_by,
            slug: quiz_submissions.slug,
            title: quiz_submissions.title,
            level: quiz_submissions.level,
            category: quiz_submissions.category,
            questions: quiz_submissions.questions,
            status: quiz_submissions.status,
            reviewer_id: quiz_submissions.reviewer_id,
            review_note: quiz_submissions.review_note,
            submitted_at: quiz_submissions.submitted_at,
            reviewed_at: quiz_submissions.reviewed_at,
            created_at: quiz_submissions.created_at,
            updated_at: quiz_submissions.updated_at,
            submitter_id: submitterAlias.id,
            submitter_name: submitterAlias.name,
            submitter_email: submitterAlias.email,
            reviewer_db_id: reviewerAlias.id,
            reviewer_name: reviewerAlias.name,
            reviewer_email: reviewerAlias.email,
          })
          .from(quiz_submissions)
          .leftJoin(submitterAlias, eq(quiz_submissions.submitted_by, submitterAlias.id))
          .leftJoin(reviewerAlias, eq(quiz_submissions.reviewer_id, reviewerAlias.id))
          .where(eq(quiz_submissions.id, id))
          .limit(1);

        if (!row) {
          return Response.json({ error: 'Submission not found' }, { status: 404 });
        }

        const { submitter_id, submitter_name, submitter_email, reviewer_db_id, reviewer_name, reviewer_email, ...submissionFields } = row;
        const submission = {
          ...submissionFields,
          submitter: { id: submitter_id ?? row.submitted_by, name: submitter_name ?? null, email: submitter_email ?? '' },
          reviewer: reviewer_db_id ? { id: reviewer_db_id, name: reviewer_name ?? null, email: reviewer_email ?? '' } : null,
        };

        return Response.json({ submission });
      },
    },
  },
});
