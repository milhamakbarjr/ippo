import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_submissions } from '@/db/schema';
import { requireAuth, isAuthError, requireAdminRole } from '@/server/auth-guard';
import { eq } from 'drizzle-orm';

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
        const [submission] = await db
          .select()
          .from(quiz_submissions)
          .where(eq(quiz_submissions.id, id))
          .limit(1);

        if (!submission) {
          return Response.json({ error: 'Submission not found' }, { status: 404 });
        }

        return Response.json({ submission });
      },
    },
  },
});
