import { createFileRoute } from '@tanstack/react-router';
import { AdminSubmissionsListPage } from '@/pages/admin/submissions-list-page';

export const Route = createFileRoute('/admin/submissions')({
  component: AdminSubmissionsListPage,
});
