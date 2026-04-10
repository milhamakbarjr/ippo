import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/auth/logout')({
  server: {
    handlers: {
      POST: async () => {
        // TODO: Destroy Better Auth session
        // For now, instruct client to clear its state
        return Response.json({ success: true });
      },
    },
  },
});
