import { describe, it, expect } from 'vitest';
import { questions as assessmentQuestions } from '@/content/onboarding-assessment';
import { level as kanaLevel } from '@/content/kana/index';
import { level as n5Level } from '@/content/n5/index';
import { level as n4Level } from '@/content/n4/index';
import { level as n3Level } from '@/content/n3/index';
import { level as n2Level } from '@/content/n2/index';
import { level as n1Level } from '@/content/n1/index';
import n5Vocab from '@/content/quizzes/n5-vocab';
import n5Grammar from '@/content/quizzes/n5-grammar';
import n5Kanji from '@/content/quizzes/n5-kanji';
import n4Vocab from '@/content/quizzes/n4-vocab';
import n4Grammar from '@/content/quizzes/n4-grammar';
import n3Vocab from '@/content/quizzes/n3-vocab';
import n3Grammar from '@/content/quizzes/n3-grammar';
import n3Reading from '@/content/quizzes/n3-reading';
import n2Grammar from '@/content/quizzes/n2-grammar';
import n2Reading from '@/content/quizzes/n2-reading';
import type { QuizContent } from '@/types/quiz';
import type { Level } from '@/types/learning';

const ALL_QUIZZES: QuizContent[] = [
  n5Vocab, n5Grammar, n5Kanji,
  n4Vocab, n4Grammar,
  n3Vocab, n3Grammar, n3Reading,
  n2Grammar, n2Reading,
];

const ALL_LEVELS: Level[] = [kanaLevel, n5Level, n4Level, n3Level, n2Level, n1Level];

// ─── Assessment Questions ─────────────────────────────────────────────────────

describe('Assessment content integrity', () => {
  it('has at least one question', () => {
    expect(assessmentQuestions.length).toBeGreaterThan(0);
  });

  it('all question IDs are unique', () => {
    const ids = assessmentQuestions.map(q => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all question IDs are non-empty strings', () => {
    for (const q of assessmentQuestions) {
      expect(q.id).toBeTruthy();
    }
  });

  it('each question has exactly one correct option', () => {
    for (const q of assessmentQuestions) {
      const correctCount = q.options.filter(o => o.isCorrect).length;
      expect(correctCount, `Question "${q.id}" must have exactly 1 correct option`).toBe(1);
    }
  });

  it('all options have non-empty text', () => {
    for (const q of assessmentQuestions) {
      for (const o of q.options) {
        expect(o.text, `Option "${o.id}" in question "${q.id}" must have non-empty text`).toBeTruthy();
      }
    }
  });

  it('each question has at least 2 options', () => {
    for (const q of assessmentQuestions) {
      expect(q.options.length, `Question "${q.id}" must have at least 2 options`).toBeGreaterThanOrEqual(2);
    }
  });
});

// ─── Quiz Content ─────────────────────────────────────────────────────────────

describe('Quiz content integrity', () => {
  for (const quiz of ALL_QUIZZES) {
    describe(`Quiz: ${quiz.slug}`, () => {
      it('has required metadata fields', () => {
        expect(quiz.slug).toBeTruthy();
        expect(quiz.title).toBeTruthy();
        expect(quiz.level).toBeTruthy();
        expect(quiz.category).toBeTruthy();
      });

      it('has a non-empty questions array', () => {
        expect(quiz.questions.length).toBeGreaterThan(0);
      });

      it('all question IDs are unique within the quiz', () => {
        const ids = quiz.questions.map(q => q.id);
        expect(new Set(ids).size, `Duplicate question IDs in quiz "${quiz.slug}"`).toBe(ids.length);
      });

      it('each question has exactly one correct option', () => {
        for (const q of quiz.questions) {
          const correctCount = q.options.filter(o => o.isCorrect).length;
          expect(correctCount, `Question "${q.id}" in quiz "${quiz.slug}" must have exactly 1 correct option`).toBe(1);
        }
      });

      it('all options have non-empty text', () => {
        for (const q of quiz.questions) {
          for (const o of q.options) {
            expect(o.text, `Option in question "${q.id}" of quiz "${quiz.slug}" must have non-empty text`).toBeTruthy();
          }
        }
      });

      it('level is a valid JLPT value', () => {
        expect(['n5', 'n4', 'n3', 'n2', 'n1']).toContain(quiz.level);
      });

      it('category is a valid value', () => {
        expect(['vocab', 'kanji', 'grammar', 'reading']).toContain(quiz.category);
      });
    });
  }

  it('no duplicate question IDs across all quizzes', () => {
    const allIds = ALL_QUIZZES.flatMap(q => q.questions.map(q => q.id));
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size, 'Duplicate question IDs found across quizzes').toBe(allIds.length);
  });
});

// ─── Level Definitions ────────────────────────────────────────────────────────

describe('Level definitions integrity', () => {
  for (const level of ALL_LEVELS) {
    describe(`Level: ${level.id}`, () => {
      it('has required metadata fields', () => {
        expect(level.id).toBeTruthy();
        expect(level.label).toBeTruthy();
        expect(level.description).toBeTruthy();
      });

      it('has a non-empty steps array', () => {
        expect(level.steps.length).toBeGreaterThan(0);
      });

      it('all steps have non-empty slugs', () => {
        for (const step of level.steps) {
          expect(step.slug, `Step in level "${level.id}" must have a non-empty slug`).toBeTruthy();
        }
      });

      it('all steps have non-empty titles', () => {
        for (const step of level.steps) {
          expect(step.title, `Step "${step.slug}" in level "${level.id}" must have a non-empty title`).toBeTruthy();
        }
      });

      it('all step slugs within the level are unique', () => {
        const slugs = level.steps.map(s => s.slug);
        expect(new Set(slugs).size, `Duplicate step slugs in level "${level.id}"`).toBe(slugs.length);
      });
    });
  }

  it('no duplicate step slugs across all levels', () => {
    const allSlugs = ALL_LEVELS.flatMap(l => l.steps.map(s => s.slug));
    const unique = new Set(allSlugs);
    expect(unique.size, 'Duplicate step slugs found across levels').toBe(allSlugs.length);
  });
});
