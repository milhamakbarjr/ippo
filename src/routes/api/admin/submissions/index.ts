import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { quiz_submissions } from '@/db/schema';
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
          .select()
          .from(quiz_submissions)
          .where(status ? eq(quiz_submissions.status, status) : undefined)
          .orderBy(desc(quiz_submissions.created_at));

        return Response.json({ submissions: rows });
      },
    },
  },
});
