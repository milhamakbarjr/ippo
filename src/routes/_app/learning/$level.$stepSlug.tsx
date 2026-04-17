import { createFileRoute } from '@tanstack/react-router';
import { StepDetailPage } from '@/pages/step-detail-page';

export const Route = createFileRoute('/_app/learning/$level/$stepSlug')({
  component: StepDetailPage,
});
