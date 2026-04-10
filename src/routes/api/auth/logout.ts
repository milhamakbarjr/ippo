import { createFileRoute } from '@tanstack/react-router';
import { auth } from '@/lib/auth';

export const Route = createFileRoute('/api/auth/logout')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        url.pathname = '/api/auth/sign-out';
        const res = await auth.handler(new Request(url.toString(), { method: 'POST', headers: request.headers }));
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const setCookie = res.headers.get('Set-Cookie');
        if (setCookie) headers.set('Set-Cookie', setCookie);
        return new Response(JSON.stringify({ success: true }), { status: 200, headers });
      },
    },
  },
});
