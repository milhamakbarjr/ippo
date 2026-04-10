import { inferLevelFromSlug } from '@/lib/level-inference';

export type MigrationPayload = {
  assessmentResult?: { assessedLevel: string };
  steps: Array<{
    step_slug:    string;
    level:        string;
    completed_at: string; // ISO date string
  }>;
};

/**
 * Collect all migratable data from localStorage.
 * Returns null if there is nothing to migrate.
 * Called immediately before OTP submission to capture any progress made
 * while waiting for the OTP email.
 */
export function collectMigrationPayload(): MigrationPayload | null {
  const steps: MigrationPayload['steps'] = [];

  // Collect completed step keys
  const stepKeys = Object.keys(localStorage).filter(key => key.startsWith('step_'));
  for (const key of stepKeys) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as { completed: boolean; timestamp: number };
      if (!parsed.completed) continue;
      const slug = key.replace('step_', '');
      steps.push({
        step_slug:    slug,
        level:        inferLevelFromSlug(slug),
        completed_at: new Date(parsed.timestamp ?? Date.now()).toISOString(),
      });
    } catch {
      console.warn(`Skipping malformed localStorage key: ${key}`);
    }
  }

  // Collect assessment result
  let assessmentResult: MigrationPayload['assessmentResult'] | undefined;
  const rawAssessment = localStorage.getItem('assessment_result');
  if (rawAssessment) {
    try {
      const parsed = JSON.parse(rawAssessment) as { assessedLevel?: string };
      if (parsed?.assessedLevel) {
        assessmentResult = { assessedLevel: parsed.assessedLevel };
      }
    } catch {
      console.warn('Skipping malformed assessment_result in localStorage');
    }
  }

  if (steps.length === 0 && !assessmentResult) return null;
  return { assessmentResult, steps };
}

/**
 * Clear only migration-related keys from localStorage.
 * ONLY call after server confirms migration success.
 */
export function clearMigrationKeys(): void {
  const stepKeys = Object.keys(localStorage).filter(key => key.startsWith('step_'));
  stepKeys.forEach(key => localStorage.removeItem(key));
  localStorage.removeItem('assessment_result');
  localStorage.removeItem('assessment_started');
}
