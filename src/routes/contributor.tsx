import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/contributor')({
  component: () => <Outlet />,
});
