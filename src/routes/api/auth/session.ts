import { createFileRoute } from '@tanstack/react-router';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const Route = createFileRoute('/api/auth/session')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        url.pathname = '/api/auth/get-session';
        const res = await auth.handler(new Request(url.toString(), { method: 'GET', headers: request.headers }));
        if (!res.ok) return Response.json({ user: null });

        const data = await res.json() as { user?: { email?: string } | null } | null;
        if (!data?.user?.email) return Response.json({ user: null });

        const [appUser] = await db
          .select({ id: users.id, email: users.email, name: users.name, assessed_level: users.assessed_level, preferred_language: users.preferred_language })
          .from(users)
          .where(eq(users.email, data.user.email))
          .limit(1);

        if (!appUser) return Response.json({ user: null });

        return Response.json({
          user: {
            id:             appUser.id,
            email:          appUser.email,
            name:           appUser.name,
            assessed_level: appUser.assessed_level,
            language:       appUser.preferred_language ?? 'id',
          },
        });
      },
    },
  },
});
