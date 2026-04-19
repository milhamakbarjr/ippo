import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_submissions } from '@/db/schema';
import { QuizSubmissionCreateSchema } from '@/db/validators';
import { requireAuth, isAuthError, requireContributorRole } from '@/server/auth-guard';
import { eq, and } from 'drizzle-orm';

export const Route = createFileRoute('/api/contributor/submissions/$id/')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const authResult = await requireAuth(request);
        if (isAuthError(authResult)) return authResult;
        const { appUser } = authResult;

        const forbidden = requireContributorRole(appUser);
        if (forbidden) return forbidden;

        const [submission] = await db
          .select()
          .from(quiz_submissions)
          .where(
            and(
              eq(quiz_submissions.id, params.id),
              eq(quiz_submissions.submitted_by, appUser.id),
            ),
          )
          .limit(1);

        if (!submission) {
          return Response.json({ error: 'Not found' }, { status: 404 });
        }

        return Response.json({ submission });
      },

      PUT: async ({ request, params }) => {
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
          return Response.json({ error: 'Only draft submissions can be edited' }, { status: 400 });
        }

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

        const { slug, title, level, category, questions } = parsed.data;

        const [submission] = await db
          .update(quiz_submissions)
          .set({ slug, title, level, category, questions, updated_at: new Date() })
          .where(and(eq(quiz_submissions.id, params.id), eq(quiz_submissions.submitted_by, appUser.id)))
          .returning();

        return Response.json({ submission });
      },
    },
  },
});
