import { useEffect, useState } from 'react';
import { useQuizStore } from '@/stores/quiz-store';
import type { QuizContent } from '@/types/quiz';

// Dynamic imports for quiz content (code-split per slug)
const QUIZ_LOADERS: Record<string, () => Promise<{ default: QuizContent }>> = {
  'n5-vocab':   () => import('@/content/quizzes/n5-vocab'),
  'n5-grammar': () => import('@/content/quizzes/n5-grammar'),
  'n5-kanji':   () => import('@/content/quizzes/n5-kanji'),
  'n4-vocab':   () => import('@/content/quizzes/n4-vocab'),
  'n4-grammar': () => import('@/content/quizzes/n4-grammar'),
  'n3-vocab':   () => import('@/content/quizzes/n3-vocab'),
  'n3-grammar': () => import('@/content/quizzes/n3-grammar'),
  'n3-reading': () => import('@/content/quizzes/n3-reading'),
  'n2-grammar': () => import('@/content/quizzes/n2-grammar'),
  'n2-reading': () => import('@/content/quizzes/n2-reading'),
};

export function useQuiz(slug: string) {
  const { initQuiz, questions } = useQuizStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );

  useEffect(() => {
    const loader = QUIZ_LOADERS[slug];
    if (!loader) {
      setError('Quiz not found');
      setIsLoading(false);
      return;
    }
    loader()
      .then((mod) => {
        initQuiz(slug, mod.default.questions);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to load quiz');
        setIsLoading(false);
      });
  }, [slug, initQuiz]);

  useEffect(() => {
    function onOnline() { setIsOnline(true); }
    function onOffline() { setIsOnline(false); }
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return { isLoading, error, questions, isOnline };
}
