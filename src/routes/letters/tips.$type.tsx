import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/letters/tips/$type')({
  component: () => <Outlet />,
});
