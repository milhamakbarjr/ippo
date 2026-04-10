import { describe, it, expect } from 'vitest';
import { calculateLevel } from '@/utils/calculate-level';
import type { AssessmentQuestion, AssessmentResponse } from '@/types/assessment';

function makeQuestion(id: string, category: 'kana' | 'vocab' | 'grammar' | 'kanji' = 'vocab'): AssessmentQuestion {
  return {
    id,
    level: 'n5',
    category,
    questionText: 'test?',
    options: [
      { id: `${id}-correct`, text: 'correct', isCorrect: true },
      { id: `${id}-wrong`, text: 'wrong', isCorrect: false },
    ],
  };
}

function makeResponse(questionId: string, correct: boolean): AssessmentResponse {
  return {
    questionId,
    selectedOptionId: correct ? `${questionId}-correct` : `${questionId}-wrong`,
    answeredAt: Date.now(),
  };
}

describe('calculateLevel', () => {
  it('returns kana for empty responses', () => {
    const result = calculateLevel([], []);
    expect(result.assessedLevel).toBe('kana');
    expect(result.score).toBe(0);
    expect(result.totalQuestions).toBe(0);
  });

  it('returns kana for 0 correct answers', () => {
    const questions = [makeQuestion('q1'), makeQuestion('q2'), makeQuestion('q3')];
    const responses = questions.map(q => makeResponse(q.id, false));
    expect(calculateLevel(responses, questions).assessedLevel).toBe('kana');
  });

  it('returns kana for 1 correct answer', () => {
    const questions = [makeQuestion('q1'), makeQuestion('q2')];
    const responses = [makeResponse('q1', true), makeResponse('q2', false)];
    expect(calculateLevel(responses, questions).assessedLevel).toBe('kana');
  });

  it('returns kana for 2 correct answers', () => {
    const questions = [makeQuestion('q1'), makeQuestion('q2'), makeQuestion('q3')];
    const responses = [makeResponse('q1', true), makeResponse('q2', true), makeResponse('q3', false)];
    expect(calculateLevel(responses, questions).assessedLevel).toBe('kana');
  });

  it('returns n5 for 3 correct answers', () => {
    const questions = Array.from({ length: 3 }, (_, i) => makeQuestion(`q${i}`));
    const responses = questions.map(q => makeResponse(q.id, true));
    expect(calculateLevel(responses, questions).assessedLevel).toBe('n5');
  });

  it('returns n4 for 4 correct answers', () => {
    const questions = Array.from({ length: 4 }, (_, i) => makeQuestion(`q${i}`));
    const responses = questions.map(q => makeResponse(q.id, true));
    expect(calculateLevel(responses, questions).assessedLevel).toBe('n4');
  });

  it('returns n3 for 5 correct answers', () => {
    const questions = Array.from({ length: 5 }, (_, i) => makeQuestion(`q${i}`));
    const responses = questions.map(q => makeResponse(q.id, true));
    expect(calculateLevel(responses, questions).assessedLevel).toBe('n3');
  });

  it('returns n2 for 6 correct answers', () => {
    const questions = Array.from({ length: 6 }, (_, i) => makeQuestion(`q${i}`));
    const responses = questions.map(q => makeResponse(q.id, true));
    expect(calculateLevel(responses, questions).assessedLevel).toBe('n2');
  });

  it('returns n1 for 7 correct answers', () => {
    const questions = Array.from({ length: 7 }, (_, i) => makeQuestion(`q${i}`));
    const responses = questions.map(q => makeResponse(q.id, true));
    expect(calculateLevel(responses, questions).assessedLevel).toBe('n1');
  });

  it('clamps to n1 for more than 7 correct answers', () => {
    const questions = Array.from({ length: 10 }, (_, i) => makeQuestion(`q${i}`));
    const responses = questions.map(q => makeResponse(q.id, true));
    expect(calculateLevel(responses, questions).assessedLevel).toBe('n1');
  });

  it('skips responses with unknown question IDs', () => {
    const questions = [makeQuestion('q1')];
    const responses = [
      makeResponse('q1', true),
      { questionId: 'unknown', selectedOptionId: 'unknown-correct', answeredAt: Date.now() },
    ];
    const result = calculateLevel(responses, questions);
    expect(result.score).toBe(1);
  });

  it('increments category breakdown correctly', () => {
    const questions = [
      makeQuestion('q1', 'kana'),
      makeQuestion('q2', 'vocab'),
      makeQuestion('q3', 'grammar'),
      makeQuestion('q4', 'kanji'),
    ];
    const responses = questions.map(q => makeResponse(q.id, true));
    const result = calculateLevel(responses, questions);
    expect(result.categoryBreakdown.kana).toBe(1);
    expect(result.categoryBreakdown.vocab).toBe(1);
    expect(result.categoryBreakdown.grammar).toBe(1);
    expect(result.categoryBreakdown.kanji).toBe(1);
  });

  it('does not increment category for wrong answers', () => {
    const questions = [makeQuestion('q1', 'vocab')];
    const responses = [makeResponse('q1', false)];
    const result = calculateLevel(responses, questions);
    expect(result.categoryBreakdown.vocab).toBe(0);
  });

  it('completedAt is a number (timestamp)', () => {
    const result = calculateLevel([], []);
    expect(typeof result.completedAt).toBe('number');
    expect(result.completedAt).toBeGreaterThan(0);
  });
});
