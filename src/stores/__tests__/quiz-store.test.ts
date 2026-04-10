import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useQuizStore } from '@/stores/quiz-store';
import type { QuizQuestion } from '@/types/quiz';

function makeQuestions(count = 3): QuizQuestion[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `q${i}`,
    questionText: `Q${i}?`,
    explanation: 'exp',
    category: 'vocab' as const,
    level: 'n5' as const,
    options: [
      { id: `q${i}-correct`, text: 'correct', isCorrect: true },
      { id: `q${i}-wrong`, text: 'wrong', isCorrect: false },
    ],
  }));
}

beforeEach(() => {
  useQuizStore.getState().reset();
  sessionStorage.clear();
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('initQuiz', () => {
  it('initializes fresh state when no saved session', () => {
    useQuizStore.getState().initQuiz('n5-vocab', makeQuestions());
    const s = useQuizStore.getState();
    expect(s.quizSlug).toBe('n5-vocab');
    expect(s.currentQuestion).toBe(0);
    expect(s.answers).toEqual({});
  });

  it('restores answers from sessionStorage', () => {
    const saved = { currentQuestion: 1, answers: { q0: 'q0-correct' } };
    sessionStorage.setItem('quiz_session_n5-vocab', JSON.stringify(saved));
    useQuizStore.getState().initQuiz('n5-vocab', makeQuestions(3));
    const s = useQuizStore.getState();
    expect(s.currentQuestion).toBe(1);
    expect(s.answers['q0']).toBe('q0-correct');
  });

  it('clamps restored currentQuestion to last valid index', () => {
    const saved = { currentQuestion: 99, answers: {} };
    sessionStorage.setItem('quiz_session_test-slug', JSON.stringify(saved));
    useQuizStore.getState().initQuiz('test-slug', makeQuestions(3)); // 3 questions, max index = 2
    expect(useQuizStore.getState().currentQuestion).toBe(2);
  });

  it('starts fresh on malformed sessionStorage JSON', () => {
    sessionStorage.setItem('quiz_session_bad-slug', '{{bad json');
    useQuizStore.getState().initQuiz('bad-slug', makeQuestions());
    expect(useQuizStore.getState().currentQuestion).toBe(0);
    expect(useQuizStore.getState().answers).toEqual({});
  });
});

describe('setAnswer', () => {
  it('stores answer in state', () => {
    useQuizStore.getState().initQuiz('n5-vocab', makeQuestions());
    useQuizStore.getState().setAnswer('q0', 'q0-correct', true);
    expect(useQuizStore.getState().answers['q0']).toBe('q0-correct');
  });

  it('sets showFeedback to true and lastAnswerCorrect', () => {
    useQuizStore.getState().initQuiz('n5-vocab', makeQuestions());
    useQuizStore.getState().setAnswer('q0', 'q0-wrong', false);
    const s = useQuizStore.getState();
    expect(s.showFeedback).toBe(true);
    expect(s.lastAnswerCorrect).toBe(false);
  });

  it('persists answer to sessionStorage', () => {
    useQuizStore.getState().initQuiz('n5-vocab', makeQuestions());
    useQuizStore.getState().setAnswer('q0', 'q0-correct', true);
    const stored = sessionStorage.getItem('quiz_session_n5-vocab');
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!).answers['q0']).toBe('q0-correct');
  });
});

describe('advance', () => {
  it('increments currentQuestion and clears feedback', () => {
    useQuizStore.getState().initQuiz('n5-vocab', makeQuestions());
    useQuizStore.getState().setAnswer('q0', 'q0-correct', true);
    useQuizStore.getState().advance();
    const s = useQuizStore.getState();
    expect(s.currentQuestion).toBe(1);
    expect(s.showFeedback).toBe(false);
    expect(s.lastAnswerCorrect).toBeNull();
  });
});

describe('submit (guest)', () => {
  it('calculates score locally without calling fetch', async () => {
    const mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);
    const questions = makeQuestions(2);
    useQuizStore.getState().initQuiz('n5-vocab', questions);
    useQuizStore.getState().setAnswer('q0', 'q0-correct', true);
    useQuizStore.getState().setAnswer('q1', 'q1-wrong', false);
    await useQuizStore.getState().submit(); // no userId = guest
    const s = useQuizStore.getState();
    expect(s.scoreResult?.score).toBe(1);
    expect(s.scoreResult?.total).toBe(2);
    expect(s.scoreResult?.percentage).toBe(50);
    expect(s.isSubmitting).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('clears sessionStorage after guest submit', async () => {
    useQuizStore.getState().initQuiz('n5-vocab', makeQuestions());
    sessionStorage.setItem('quiz_session_n5-vocab', '{"currentQuestion":0,"answers":{}}');
    await useQuizStore.getState().submit();
    expect(sessionStorage.getItem('quiz_session_n5-vocab')).toBeNull();
  });
});

describe('submit (authenticated)', () => {
  it('calls fetch with correct body on success', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ quiz_result_id: 'result-123' }),
    });
    vi.stubGlobal('fetch', mockFetch);
    const questions = makeQuestions(2);
    useQuizStore.getState().initQuiz('n5-vocab', questions);
    useQuizStore.getState().setAnswer('q0', 'q0-correct', true);
    await useQuizStore.getState().submit('user-abc');
    expect(mockFetch).toHaveBeenCalledOnce();
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.user_id).toBe('user-abc');
    expect(body.quiz_slug).toBe('n5-vocab');
    expect(useQuizStore.getState().scoreResult?.quizResultId).toBe('result-123');
    expect(useQuizStore.getState().isSubmitting).toBe(false);
  });

  it('sets SUBMIT_FAILED on non-ok response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal('fetch', mockFetch);
    useQuizStore.getState().initQuiz('n5-vocab', makeQuestions());
    await useQuizStore.getState().submit('user-abc');
    expect(useQuizStore.getState().submitError).toBe('SUBMIT_FAILED');
    expect(useQuizStore.getState().isSubmitting).toBe(false);
  });

  it('sets NETWORK_TIMEOUT on AbortError', async () => {
    const abortError = new Error('aborted');
    abortError.name = 'AbortError';
    const mockFetch = vi.fn().mockRejectedValue(abortError);
    vi.stubGlobal('fetch', mockFetch);
    useQuizStore.getState().initQuiz('n5-vocab', makeQuestions());
    await useQuizStore.getState().submit('user-abc');
    expect(useQuizStore.getState().submitError).toBe('NETWORK_TIMEOUT');
    expect(useQuizStore.getState().isSubmitting).toBe(false);
  });
});

describe('reset', () => {
  it('clears all state including isSubmitting', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal('fetch', mockFetch);
    useQuizStore.getState().initQuiz('n5-vocab', makeQuestions());
    await useQuizStore.getState().submit('user-abc');
    useQuizStore.getState().reset();
    const s = useQuizStore.getState();
    expect(s.currentQuestion).toBe(0);
    expect(s.answers).toEqual({});
    expect(s.isSubmitting).toBe(false);
    expect(s.submitError).toBeNull();
    expect(s.scoreResult).toBeNull();
  });

  it('removes sessionStorage quiz session entry', () => {
    useQuizStore.getState().initQuiz('n5-vocab', makeQuestions());
    sessionStorage.setItem('quiz_session_n5-vocab', '{}');
    useQuizStore.getState().reset();
    expect(sessionStorage.getItem('quiz_session_n5-vocab')).toBeNull();
  });
});
