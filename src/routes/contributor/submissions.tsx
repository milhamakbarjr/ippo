import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/contributor/submissions')({
  component: () => <Outlet />,
});
