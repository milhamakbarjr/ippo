import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/learning/')({
  beforeLoad: () => {
    throw redirect({ to: '/learning/$level', params: { level: 'kana' } });
  },
});
