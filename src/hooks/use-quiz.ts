import { useEffect, useState } from 'react';
import { useQuizStore } from '@/stores/quiz-store';
import type { QuizQuestion } from '@/types/quiz';
import { getExamLevel } from '@/utils/submission-status';

export function useQuiz(slug: string) {
  const { initQuiz, questions } = useQuizStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const examLevel = getExamLevel(slug);
    const url = examLevel
      ? `/api/quiz-sets/generate?level=${examLevel}`
      : `/api/quiz-sets/${slug}`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Quiz not found');
        return res.json() as Promise<{ questions: QuizQuestion[] }>;
      })
      .then((data) => {
        initQuiz(slug, data.questions);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load quiz');
        setIsLoading(false);
      });
    return () => controller.abort();
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
