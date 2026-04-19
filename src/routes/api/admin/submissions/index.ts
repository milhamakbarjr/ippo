import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_submissions, users } from '@/db/schema';
import { requireAuth, isAuthError, requireAdminRole } from '@/server/auth-guard';
import { desc, eq } from 'drizzle-orm';

export const Route = createFileRoute('/api/admin/submissions/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authResult = await requireAuth(request);
        if (isAuthError(authResult)) return authResult;
        const { appUser } = authResult;

        const forbidden = requireAdminRole(appUser);
        if (forbidden) return forbidden;

        const url = new URL(request.url);
        const status = url.searchParams.get('status') ?? undefined;

        const VALID_STATUSES = ['draft', 'pending_review', 'published', 'rejected'] as const;
        if (status !== undefined && !VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
          return Response.json({ error: 'Invalid status value' }, { status: 400 });
        }

        const rows = await db
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
            submitter_name: users.name,
            submitter_email: users.email,
          })
          .from(quiz_submissions)
          .leftJoin(users, eq(quiz_submissions.submitted_by, users.id))
          .where(status ? eq(quiz_submissions.status, status) : undefined)
          .orderBy(desc(quiz_submissions.created_at));

        const submissions = rows.map(({ questions, submitter_name, submitter_email, ...rest }) => ({
          ...rest,
          submitter: { id: rest.submitted_by, name: submitter_name ?? null, email: submitter_email ?? '' },
          question_count: Array.isArray(questions) ? (questions as unknown[]).length : 0,
        }));

        return Response.json({ submissions });
      },
    },
  },
});
