import { create } from 'zustand';
import type { QuizQuestion, QuizScoreResult } from '@/types/quiz';
import { calculateQuizScore } from '@/types/quiz';

type QuizStore = {
  quizSlug: string | null;
  questions: QuizQuestion[];
  currentQuestion: number;
  answers: Record<string, string>;
  showFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  isSubmitting: boolean;
  submitError: string | null;
  scoreResult: QuizScoreResult | null;

  initQuiz: (slug: string, questions: QuizQuestion[]) => void;
  setAnswer: (questionId: string, optionId: string, correct: boolean) => void;
  advance: () => void;
  submit: (userId?: string) => Promise<void>;
  reset: () => void;
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  quizSlug: null,
  questions: [],
  currentQuestion: 0,
  answers: {},
  showFeedback: false,
  lastAnswerCorrect: null,
  isSubmitting: false,
  submitError: null,
  scoreResult: null,

  initQuiz: (slug, questions) => {
    const saved = typeof window !== 'undefined'
      ? sessionStorage.getItem(`quiz_session_${slug}`)
      : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { currentQuestion: number; answers: Record<string, string> };
        // Clamp restored index in case question count changed since session was saved
        const safeIndex = Math.min(Math.max(0, parsed.currentQuestion), Math.max(0, questions.length - 1));
        set({ quizSlug: slug, questions, currentQuestion: safeIndex, answers: parsed.answers, showFeedback: false, lastAnswerCorrect: null, scoreResult: null, submitError: null });
        return;
      } catch { /* ignore malformed session */ }
    }
    set({ quizSlug: slug, questions, currentQuestion: 0, answers: {}, showFeedback: false, lastAnswerCorrect: null, scoreResult: null, submitError: null });
  },

  setAnswer: (questionId, optionId, correct) => {
    set((state) => {
      const answers = { ...state.answers, [questionId]: optionId };
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(
          `quiz_session_${state.quizSlug}`,
          JSON.stringify({ currentQuestion: state.currentQuestion, answers })
        );
      }
      return { answers, showFeedback: true, lastAnswerCorrect: correct };
    });
  },

  advance: () =>
    set((state) => ({
      currentQuestion: state.currentQuestion + 1,
      showFeedback: false,
      lastAnswerCorrect: null,
    })),

  submit: async (userId?: string) => {
    const { quizSlug, questions, answers } = get();
    if (!quizSlug) return;

    set({ isSubmitting: true, submitError: null });

    const { score, total, percentage } = calculateQuizScore(questions, answers);

    // Guest: score locally without DB write
    if (!userId) {
      set({
        isSubmitting: false,
        scoreResult: { quizSlug, score, total, percentage },
      });
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(`quiz_session_${quizSlug}`);
      }
      return;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          quiz_slug: quizSlug,
          level: questions[0]?.level ?? 'n5',
          score,
          total_questions: total,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) throw new Error('SUBMIT_FAILED');
      const data = await res.json() as { quiz_result_id?: string };

      set({
        isSubmitting: false,
        scoreResult: { quizSlug, score, total, percentage, quizResultId: data.quiz_result_id },
      });
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(`quiz_session_${quizSlug}`);
      }
    } catch (err) {
      const msg = err instanceof Error && err.name === 'AbortError' ? 'NETWORK_TIMEOUT' : 'SUBMIT_FAILED';
      set({ isSubmitting: false, submitError: msg });
    }
  },

  reset: () =>
    set((state) => {
      if (typeof window !== 'undefined' && state.quizSlug) {
        sessionStorage.removeItem(`quiz_session_${state.quizSlug}`);
      }
      return {
        isSubmitting: false,
        currentQuestion: 0,
        answers: {},
        showFeedback: false,
        lastAnswerCorrect: null,
        submitError: null,
        scoreResult: null,
      };
    }),
}));
