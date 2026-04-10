import { createFileRoute } from '@tanstack/react-router';
import { AssessmentPage } from '@/pages/assessment/assessment-page';

export const Route = createFileRoute('/assessment/')({
  component: AssessmentPage,
});
