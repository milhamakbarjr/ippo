import { createFileRoute } from '@tanstack/react-router';
import { LearningLevelPage } from '@/pages/learning-level-page';

export const Route = createFileRoute('/learning/$level')({
  component: LearningLevelPage,
});
