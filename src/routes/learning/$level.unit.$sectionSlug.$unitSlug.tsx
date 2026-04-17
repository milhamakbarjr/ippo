import { createFileRoute } from '@tanstack/react-router';
import { UnitLearningPage } from '@/pages/unit-learning-page';

export const Route = createFileRoute('/learning/$level/unit/$sectionSlug/$unitSlug')({
  component: UnitLearningPage,
});
