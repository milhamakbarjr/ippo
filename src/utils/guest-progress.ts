// localStorage progress utilities for guest (unauthenticated) users.
// Key format: step_{slug} = JSON.stringify({ completed: boolean, completedAt?: number })

import type { Level } from '@/types/learning';

export function isStepComplete(slug: string): boolean {
  try {
    const raw = localStorage.getItem(`step_${slug}`);
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
    progressPercent: Math.round((completedSlugs.length / level.steps.length) * 100),
    recommendedNextSlug,
  };
}
