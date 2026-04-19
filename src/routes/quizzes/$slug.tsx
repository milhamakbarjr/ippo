import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { QuizPage } from '@/pages/quiz';
import { QuizDetailPage } from '@/pages/quiz-detail-page';

function QuizRoute() {
  const { slug } = Route.useParams();
  const [showQuiz, setShowQuiz] = useState(false);

  // Reset to detail view if the slug changes (navigating between quizzes)
  useEffect(() => {
    setShowQuiz(false);
  }, [slug]);

  if (showQuiz) return <QuizPage />;
  return <QuizDetailPage slug={slug} onStart={() => setShowQuiz(true)} />;
}

export const Route = createFileRoute('/quizzes/$slug')({
  component: QuizRoute,
});
