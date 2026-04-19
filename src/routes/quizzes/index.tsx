import { createFileRoute } from '@tanstack/react-router';
import { QuizCatalogPage } from '@/pages/quiz-catalog-page';

export const Route = createFileRoute('/quizzes/')({
  component: QuizCatalogPage,
});
