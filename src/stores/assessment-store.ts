import { create } from 'zustand';
import type {
  AssessmentDraft,
  AssessmentQuestion,
  AssessmentResponse,
  AssessmentResult,
  JLPTLevel,
} from '@/types/assessment';
import { calculateLevel } from '@/utils/calculate-level';

type AssessmentStore = {
  currentQuestion: number;
  answers: Record<string, string>;
  startTime: number | null;
  assessedLevel: JLPTLevel | null;
  result: AssessmentResult | null;

  setAnswer: (questionId: string, optionId: string) => void;
  advance: () => void;
  submit: (questions: AssessmentQuestion[]) => AssessmentResult;
  reset: () => void;
  restoreFromDraft: (draft: AssessmentDraft) => void;
  saveDraft: () => void;
};

export const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  currentQuestion: 0,
  answers: {},
  startTime: null,
  assessedLevel: null,
  result: null,

  setAnswer: (questionId, optionId) => {
    set((state) => {
      const answers = { ...state.answers, [questionId]: optionId };
      try {
        sessionStorage.setItem('assessment_answers', JSON.stringify(answers));
      } catch {
        // ignore storage errors
      }
      return { answers };
    });
  },

  advance: () => set((state) => ({ currentQuestion: state.currentQuestion + 1 })),

  submit: (questions) => {
    const { answers } = get();
    const responses: AssessmentResponse[] = Object.entries(answers).map(
      ([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId,
        answeredAt: Date.now(),
      })
    );

    const result = calculateLevel(responses, questions);

    try {
      localStorage.setItem('assessment_result', JSON.stringify(result));
      localStorage.setItem('assessment_level', result.assessedLevel);
      sessionStorage.setItem('user_level', result.assessedLevel);
    } catch {
      // ignore storage errors
    }

    set({ assessedLevel: result.assessedLevel, result });
    return result;
  },

  reset: () => {
    try {
      sessionStorage.removeItem('assessment_answers');
      localStorage.removeItem('assessment_answers_draft');
    } catch {
      // ignore storage errors
    }
    set({
      currentQuestion: 0,
      answers: {},
      startTime: null,
      assessedLevel: null,
      result: null,
    });
  },

  restoreFromDraft: (draft) => {
    try {
      sessionStorage.setItem('assessment_answers', JSON.stringify(draft.answers));
    } catch {
      // ignore storage errors
    }
    set({
      currentQuestion: draft.currentQuestion,
      answers: draft.answers,
      startTime: draft.startedAt,
    });
  },

  saveDraft: () => {
    const { answers, currentQuestion, startTime } = get();
    if (Object.keys(answers).length === 0) return;
    const draft: AssessmentDraft = {
      answers,
      currentQuestion,
      startedAt: startTime ?? Date.now(),
      savedAt: Date.now(),
    };
    try {
      localStorage.setItem('assessment_answers_draft', JSON.stringify(draft));
    } catch {
      // ignore storage errors
    }
  },
}));
