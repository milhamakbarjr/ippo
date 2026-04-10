// localStorage progress utilities for guest (unauthenticated) users.
// Key format: step_{slug} = JSON.stringify({ completed: boolean, completedAt?: number })

import type { Level } from '@/types/learning';

export function isStepComplete(slug: string): boolean {
  try {
    const key = `step_${slug}`;
    const raw = localStorage.getItem(key) ?? sessionStorage.getItem(key);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { completed?: boolean };
    return parsed.completed === true;
  } catch {
    return false;
  }
}

export function getLevelProgress(level: Level): {
  completedSlugs: string[];
  completedCount: number;
  totalCount: number;
  progressPercent: number;
  recommendedNextSlug: string | undefined;
} {
  const completedSlugs = level.steps
    .filter((step) => isStepComplete(step.slug))
    .map((step) => step.slug);

  const completedSet = new Set(completedSlugs);
  const recommendedNextSlug = level.steps.find(
    (step) => !completedSet.has(step.slug)
  )?.slug;

  return {
    completedSlugs,
    completedCount: completedSlugs.length,
    totalCount: level.steps.length,
    progressPercent: level.steps.length > 0 ? Math.round((completedSlugs.length / level.steps.length) * 100) : 0,
    recommendedNextSlug,
  };
}

export function markStepComplete(slug: string): void {
  try {
    localStorage.setItem(
      `step_${slug}`,
      JSON.stringify({ completed: true, timestamp: Date.now() })
    );
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      try {
        sessionStorage.setItem(
          `step_${slug}`,
          JSON.stringify({ completed: true, timestamp: Date.now() })
        );
      } catch {
        // Both storages full — silent fail
      }
    }
  }
}
