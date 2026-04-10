import { createFileRoute } from '@tanstack/react-router';
import { auth } from '@/lib/auth';

export const Route = createFileRoute('/api/auth/session')({
  server: {
    handlers: {
      // Proxy to Better Auth's built-in /get-session endpoint.
      // Returns { user: null } for unauthenticated — never 401.
      GET: async ({ request }) => {
        const url = new URL(request.url);
        url.pathname = '/api/auth/get-session';

        const proxyRequest = new Request(url.toString(), {
          method: 'GET',
          headers: request.headers,
        });

        const response = await auth.handler(proxyRequest);

        // Better Auth returns the raw session object; reshape for our API contract
        if (!response.ok) {
          return Response.json({ user: null });
        }

        const data = await response.json() as { user?: Record<string, unknown> } | null;

        if (!data?.user) {
          return Response.json({ user: null });
        }

        return Response.json({
          user: {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name ?? null,
            language: (data.user.preferred_language as string) ?? 'id',
          },
        });
      },
    },
  },
});
