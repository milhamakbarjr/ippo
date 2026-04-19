import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_submissions } from '@/db/schema';
import { requireAuth, isAuthError, requireContributorRole } from '@/server/auth-guard';
import { eq } from 'drizzle-orm';

export const Route = createFileRoute('/api/contributor/submissions/$id/submit')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const authResult = await requireAuth(request);
        if (isAuthError(authResult)) return authResult;
        const { appUser } = authResult;

        const forbidden = requireContributorRole(appUser);
        if (forbidden) return forbidden;

        const [existing] = await db
          .select({ id: quiz_submissions.id, status: quiz_submissions.status, submitted_by: quiz_submissions.submitted_by })
          .from(quiz_submissions)
          .where(eq(quiz_submissions.id, params.id))
          .limit(1);

        if (!existing) {
          return Response.json({ error: 'Not found' }, { status: 404 });
        }
        if (existing.submitted_by !== appUser.id) {
          return Response.json({ error: 'Forbidden' }, { status: 403 });
        }
        if (existing.status !== 'draft') {
          return Response.json({ error: 'Only draft submissions can be submitted for review' }, { status: 400 });
        }

        await db
          .update(quiz_submissions)
          .set({ status: 'pending_review', submitted_at: new Date(), updated_at: new Date() })
          .where(eq(quiz_submissions.id, params.id));

        return Response.json({ success: true });
      },
    },
  },
});
