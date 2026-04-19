import { describe, it, expect } from 'vitest';
import { questions as assessmentQuestions } from '@/content/onboarding-assessment';
import { level as kanaLevel } from '@/content/kana/index';
import { level as n5Level } from '@/content/n5/index';
import { level as n4Level } from '@/content/n4/index';
import { level as n3Level } from '@/content/n3/index';
import { level as n2Level } from '@/content/n2/index';
import { level as n1Level } from '@/content/n1/index';
import type { Level } from '@/types/learning';

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
