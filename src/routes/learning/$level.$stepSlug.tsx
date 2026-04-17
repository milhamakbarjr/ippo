import { createFileRoute } from '@tanstack/react-router';
import { StepDetailPage } from '@/pages/step-detail-page';

export const Route = createFileRoute('/learning/$level/$stepSlug')({
  component: StepDetailPage,
});
