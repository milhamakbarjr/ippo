import { describe, it, expect, beforeEach, vi } from 'vitest';
import { isStepComplete, markStepComplete, getLevelProgress } from '@/utils/guest-progress';
import type { Level } from '@/types/learning';

function makeLevel(slugs: string[]): Level {
  return {
    id: 'n5',
    label: 'N5',
    description: 'test',
    estimatedWeeks: 4,
    estimatedMonthsToN2: '12 bulan',
    steps: slugs.map(slug => ({
      slug,
      title: slug,
      description: '',
      estimatedMinutes: 10,
      resources: [],
      category: 'vocabulary' as const,
    })),
  };
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  vi.restoreAllMocks();
});

describe('isStepComplete', () => {
  it('returns false when nothing is stored', () => {
    expect(isStepComplete('some-slug')).toBe(false);
  });

  it('returns true when localStorage has { completed: true }', () => {
    localStorage.setItem('step_some-slug', JSON.stringify({ completed: true }));
    expect(isStepComplete('some-slug')).toBe(true);
  });

  it('returns false when localStorage has { completed: false }', () => {
    localStorage.setItem('step_some-slug', JSON.stringify({ completed: false }));
    expect(isStepComplete('some-slug')).toBe(false);
  });

  it('falls back to sessionStorage when localStorage has no entry', () => {
    sessionStorage.setItem('step_fallback-slug', JSON.stringify({ completed: true }));
    expect(isStepComplete('fallback-slug')).toBe(true);
  });

  it('returns false on malformed JSON', () => {
    localStorage.setItem('step_bad-slug', 'not-json{{{');
    expect(isStepComplete('bad-slug')).toBe(false);
  });

  it('uses correct key format step_{slug}', () => {
    localStorage.setItem('step_my-step', JSON.stringify({ completed: true }));
    expect(isStepComplete('my-step')).toBe(true);
    expect(isStepComplete('step_my-step')).toBe(false); // wrong prefix
  });
});

describe('markStepComplete', () => {
  it('writes to localStorage with correct key', () => {
    markStepComplete('my-slug');
    const raw = localStorage.getItem('step_my-slug');
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.completed).toBe(true);
    expect(typeof parsed.timestamp).toBe('number');
  });

  it('step is readable by isStepComplete after marking', () => {
    markStepComplete('roundtrip-slug');
    expect(isStepComplete('roundtrip-slug')).toBe(true);
  });

  it('falls back to sessionStorage on QuotaExceededError', () => {
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      const err = new DOMException('QuotaExceededError');
      Object.defineProperty(err, 'name', { value: 'QuotaExceededError' });
      throw err;
    });
    markStepComplete('fallback-slug');
    const raw = sessionStorage.getItem('step_fallback-slug');
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!).completed).toBe(true);
  });

  it('silently fails when both storages are full', () => {
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      const err = new DOMException('QuotaExceededError');
      Object.defineProperty(err, 'name', { value: 'QuotaExceededError' });
      throw err;
    });
    vi.spyOn(sessionStorage, 'setItem').mockImplementation(() => {
      throw new Error('sessionStorage full');
    });
    expect(() => markStepComplete('silent-fail-slug')).not.toThrow();
  });
});

describe('getLevelProgress', () => {
  it('returns zeros for empty steps', () => {
    const level = makeLevel([]);
    const result = getLevelProgress(level);
    expect(result.completedCount).toBe(0);
    expect(result.totalCount).toBe(0);
    expect(result.progressPercent).toBe(0);
    expect(result.recommendedNextSlug).toBeUndefined();
  });

  it('returns 0% when no steps are completed', () => {
    const level = makeLevel(['step-1', 'step-2', 'step-3']);
    const result = getLevelProgress(level);
    expect(result.progressPercent).toBe(0);
    expect(result.completedSlugs).toHaveLength(0);
    expect(result.recommendedNextSlug).toBe('step-1');
  });

  it('returns 50% for 2 of 4 steps completed', () => {
    const level = makeLevel(['step-1', 'step-2', 'step-3', 'step-4']);
    localStorage.setItem('step_step-1', JSON.stringify({ completed: true }));
    localStorage.setItem('step_step-2', JSON.stringify({ completed: true }));
    const result = getLevelProgress(level);
    expect(result.completedCount).toBe(2);
    expect(result.totalCount).toBe(4);
    expect(result.progressPercent).toBe(50);
    expect(result.recommendedNextSlug).toBe('step-3');
  });

  it('returns 100% when all steps completed', () => {
    const level = makeLevel(['s1', 's2']);
    localStorage.setItem('step_s1', JSON.stringify({ completed: true }));
    localStorage.setItem('step_s2', JSON.stringify({ completed: true }));
    const result = getLevelProgress(level);
    expect(result.progressPercent).toBe(100);
    expect(result.recommendedNextSlug).toBeUndefined();
  });

  it('progressPercent is 0 for zero-length level (no division by zero)', () => {
    const level = makeLevel([]);
    expect(getLevelProgress(level).progressPercent).toBe(0);
  });
});
