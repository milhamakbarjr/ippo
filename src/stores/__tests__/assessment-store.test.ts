import { describe, it, expect, beforeEach } from 'vitest';
import { useAssessmentStore } from '@/stores/assessment-store';
import type { AssessmentQuestion } from '@/types/assessment';

function makeQuestions(): AssessmentQuestion[] {
  return [
    {
      id: 'q1',
      level: 'kana',
      category: 'kana',
      questionText: 'Q1?',
      options: [
        { id: 'q1-a', text: 'correct', isCorrect: true },
        { id: 'q1-b', text: 'wrong', isCorrect: false },
      ],
    },
    {
      id: 'q2',
      level: 'n5',
      category: 'vocab',
      questionText: 'Q2?',
      options: [
        { id: 'q2-a', text: 'wrong', isCorrect: false },
        { id: 'q2-b', text: 'correct', isCorrect: true },
      ],
    },
  ];
}

beforeEach(() => {
  useAssessmentStore.getState().reset();
  localStorage.clear();
  sessionStorage.clear();
});

describe('assessment store — initial state', () => {
  it('starts with empty state', () => {
    const state = useAssessmentStore.getState();
    expect(state.currentQuestion).toBe(0);
    expect(state.answers).toEqual({});
    expect(state.result).toBeNull();
    expect(state.assessedLevel).toBeNull();
  });
});

describe('setAnswer', () => {
  it('stores the answer in state', () => {
    useAssessmentStore.getState().setAnswer('q1', 'q1-a');
    expect(useAssessmentStore.getState().answers['q1']).toBe('q1-a');
  });

  it('persists to sessionStorage', () => {
    useAssessmentStore.getState().setAnswer('q1', 'q1-a');
    const stored = sessionStorage.getItem('assessment_answers');
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!)['q1']).toBe('q1-a');
  });

  it('accumulates multiple answers', () => {
    useAssessmentStore.getState().setAnswer('q1', 'q1-a');
    useAssessmentStore.getState().setAnswer('q2', 'q2-b');
    const { answers } = useAssessmentStore.getState();
    expect(answers['q1']).toBe('q1-a');
    expect(answers['q2']).toBe('q2-b');
  });
});

describe('advance', () => {
  it('increments currentQuestion', () => {
    useAssessmentStore.getState().advance();
    expect(useAssessmentStore.getState().currentQuestion).toBe(1);
    useAssessmentStore.getState().advance();
    expect(useAssessmentStore.getState().currentQuestion).toBe(2);
  });
});

describe('submit', () => {
  it('calculates result and sets assessedLevel', () => {
    const questions = makeQuestions();
    useAssessmentStore.getState().setAnswer('q1', 'q1-a'); // correct
    useAssessmentStore.getState().setAnswer('q2', 'q2-b'); // correct
    const result = useAssessmentStore.getState().submit(questions);
    expect(result.score).toBe(2);
    expect(result.assessedLevel).toBeDefined();
    expect(useAssessmentStore.getState().assessedLevel).toBe(result.assessedLevel);
  });

  it('writes result to localStorage', () => {
    useAssessmentStore.getState().submit(makeQuestions());
    expect(localStorage.getItem('assessment_result')).not.toBeNull();
    expect(localStorage.getItem('assessment_level')).not.toBeNull();
  });

  it('sets result in state', () => {
    useAssessmentStore.getState().submit(makeQuestions());
    expect(useAssessmentStore.getState().result).not.toBeNull();
  });
});

describe('reset', () => {
  it('clears all state', () => {
    useAssessmentStore.getState().setAnswer('q1', 'q1-a');
    useAssessmentStore.getState().advance();
    useAssessmentStore.getState().reset();
    const state = useAssessmentStore.getState();
    expect(state.currentQuestion).toBe(0);
    expect(state.answers).toEqual({});
    expect(state.result).toBeNull();
  });

  it('removes sessionStorage assessment_answers', () => {
    useAssessmentStore.getState().setAnswer('q1', 'q1-a');
    useAssessmentStore.getState().reset();
    expect(sessionStorage.getItem('assessment_answers')).toBeNull();
  });
});

describe('saveDraft and restoreFromDraft', () => {
  it('saveDraft does nothing when answers are empty', () => {
    useAssessmentStore.getState().saveDraft();
    expect(localStorage.getItem('assessment_answers_draft')).toBeNull();
  });

  it('saveDraft writes to localStorage when answers exist', () => {
    useAssessmentStore.getState().setAnswer('q1', 'q1-a');
    useAssessmentStore.getState().saveDraft();
    expect(localStorage.getItem('assessment_answers_draft')).not.toBeNull();
  });

  it('restoreFromDraft restores currentQuestion and answers', () => {
    const draft = { answers: { q1: 'q1-a' }, currentQuestion: 2, startedAt: Date.now(), savedAt: Date.now() };
    useAssessmentStore.getState().restoreFromDraft(draft);
    const state = useAssessmentStore.getState();
    expect(state.currentQuestion).toBe(2);
    expect(state.answers['q1']).toBe('q1-a');
  });
});
