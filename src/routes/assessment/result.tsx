import { createFileRoute } from '@tanstack/react-router';
import { AssessmentResultPage } from '@/pages/assessment/result-page';

export const Route = createFileRoute('/assessment/result')({
  component: AssessmentResultPage,
});
