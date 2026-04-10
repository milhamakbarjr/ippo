import { createFileRoute } from '@tanstack/react-router';
import { auth } from '@/lib/auth';

export const Route = createFileRoute('/api/auth/logout')({
  server: {
    handlers: {
      // Proxy to Better Auth's built-in /sign-out endpoint.
      // Destroys the session record and clears the session cookie.
      POST: async ({ request }) => {
        const url = new URL(request.url);
        url.pathname = '/api/auth/sign-out';

        const proxyRequest = new Request(url.toString(), {
          method: 'POST',
          headers: request.headers,
        });

        const response = await auth.handler(proxyRequest);

        // Forward the Set-Cookie header (clears the session cookie)
        const responseHeaders = new Headers({ 'Content-Type': 'application/json' });
        const setCookie = response.headers.get('Set-Cookie');
        if (setCookie) {
          responseHeaders.set('Set-Cookie', setCookie);
        }

        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: responseHeaders }
        );
      },
    },
  },
});
