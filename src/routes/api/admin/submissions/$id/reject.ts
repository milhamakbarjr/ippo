import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_submissions } from '@/db/schema';
import { requireAuth, isAuthError, requireAdminRole } from '@/server/auth-guard';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const RejectBodySchema = z.object({
  review_note: z.string().min(1),
});

export const Route = createFileRoute('/api/admin/submissions/$id/reject')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const authResult = await requireAuth(request);
        if (isAuthError(authResult)) return authResult;
        const { appUser } = authResult;

        const forbidden = requireAdminRole(appUser);
        if (forbidden) return forbidden;

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 });
        }

        const parsed = RejectBodySchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: parsed.error.message }, { status: 400 });
        }
        const { review_note } = parsed.data;

        const { id } = params;

        const [submission] = await db
          .select({ id: quiz_submissions.id, status: quiz_submissions.status })
          .from(quiz_submissions)
          .where(eq(quiz_submissions.id, id))
          .limit(1);

        if (!submission) {
          return Response.json({ error: 'Submission not found' }, { status: 404 });
        }
        if (submission.status !== 'pending_review') {
          return Response.json({ error: 'Submission is not pending review' }, { status: 400 });
        }

        await db
          .update(quiz_submissions)
          .set({
            status:      'rejected',
            reviewer_id: appUser.id,
            reviewed_at: new Date(),
            review_note,
            updated_at:  new Date(),
          })
          .where(eq(quiz_submissions.id, id));

        return Response.json({ success: true });
      },
    },
  },
});
