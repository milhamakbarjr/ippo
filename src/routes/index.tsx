import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    try {
      if (localStorage.getItem('assessment_level')) {
        throw redirect({ to: '/learning' });
      }
    } catch (e) {
      // Re-throw redirect; ignore localStorage errors
      if (e && typeof e === 'object' && 'to' in e) throw e;
    }
    throw redirect({ to: '/assessment' });
  },
});
