import { createFileRoute } from '@tanstack/react-router';
import { QuizPage } from '@/pages/quiz';

export const Route = createFileRoute('/quizzes/$slug')({
  component: QuizPage,
});
