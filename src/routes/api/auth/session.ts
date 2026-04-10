import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/auth/session')({
  server: {
    handlers: {
      GET: async () => {
        // TODO: Read Better Auth session from cookie and return user
        // Returns { user: null } for unauthenticated — never 401
        return Response.json({ user: null });
      },
    },
  },
});
