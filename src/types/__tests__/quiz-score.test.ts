import { describe, it, expect } from 'vitest';
import { calculateQuizScore } from '@/types/quiz';
import type { QuizQuestion } from '@/types/quiz';

function makeQuestion(id: string, correctOptionId = `${id}-correct`): QuizQuestion {
  return {
    id,
    questionText: 'test?',
    explanation: 'explanation',
    category: 'vocab',
    level: 'n5',
    options: [
      { id: correctOptionId, text: 'correct', isCorrect: true },
      { id: `${id}-wrong`, text: 'wrong', isCorrect: false },
    ],
  };
}

describe('calculateQuizScore', () => {
  it('returns zeros for empty questions array', () => {
    expect(calculateQuizScore([], {})).toEqual({ score: 0, total: 0, percentage: 0 });
  });

  it('returns 100% when all answers are correct', () => {
    const questions = [makeQuestion('q1'), makeQuestion('q2')];
    const answers = { q1: 'q1-correct', q2: 'q2-correct' };
    expect(calculateQuizScore(questions, answers)).toEqual({ score: 2, total: 2, percentage: 100 });
  });

  it('returns 0% when all answers are wrong', () => {
    const questions = [makeQuestion('q1'), makeQuestion('q2')];
    const answers = { q1: 'q1-wrong', q2: 'q2-wrong' };
    expect(calculateQuizScore(questions, answers)).toEqual({ score: 0, total: 2, percentage: 0 });
  });

  it('returns 50% for 2 correct out of 4', () => {
    const questions = Array.from({ length: 4 }, (_, i) => makeQuestion(`q${i}`));
    const answers = { q0: 'q0-correct', q1: 'q1-correct', q2: 'q2-wrong', q3: 'q3-wrong' };
    expect(calculateQuizScore(questions, answers)).toEqual({ score: 2, total: 4, percentage: 50 });
  });

  it('rounds percentage correctly (1 of 3 = 33%)', () => {
    const questions = Array.from({ length: 3 }, (_, i) => makeQuestion(`q${i}`));
    const answers = { q0: 'q0-correct', q1: 'q1-wrong', q2: 'q2-wrong' };
    const result = calculateQuizScore(questions, answers);
    expect(result.percentage).toBe(33);
  });

  it('counts missing answers as wrong', () => {
    const questions = [makeQuestion('q1'), makeQuestion('q2')];
    const answers = { q1: 'q1-correct' }; // q2 not answered
    const result = calculateQuizScore(questions, answers);
    expect(result.score).toBe(1);
    expect(result.total).toBe(2);
  });

  it('counts answers to non-existent options as wrong', () => {
    const questions = [makeQuestion('q1')];
    const answers = { q1: 'nonexistent-option' };
    const result = calculateQuizScore(questions, answers);
    expect(result.score).toBe(0);
  });

  it('correctly identifies the correct option by id', () => {
    const questions = [makeQuestion('q1', 'special-correct-id')];
    const answers = { q1: 'special-correct-id' };
    expect(calculateQuizScore(questions, answers).score).toBe(1);
  });
});
