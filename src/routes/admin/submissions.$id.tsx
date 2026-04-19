import { createFileRoute } from '@tanstack/react-router';
import { AdminSubmissionDetailPage } from '@/pages/admin/submission-detail-page';

export const Route = createFileRoute('/admin/submissions/$id')({
  component: AdminSubmissionDetailPage,
});
