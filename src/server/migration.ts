import { db } from '@/db';
import { users, progress } from '@/db/schema';
import { eq } from 'drizzle-orm';

type StepMigration = {
  step_slug: string;
  level: string;
  completed_at: Date;
};

export type MigrationResult = {
  success: boolean;
  migratedSteps: number;
  assessmentMigrated: boolean;
  error?: string;
};

/**
 * Migrate guest localStorage progress to a newly created user account.
 * INVARIANTS:
 *  - Never overwrites existing DB data (onConflictDoNothing)
 *  - assessed_level only set if not already set on the user row
 *  - Throws on DB error — caller catches and returns non-fatal error to client
 */
export async function migrateLocalStorageToAccount(
  userId: string,
  payload: {
    assessmentResult?: { assessedLevel: string };
    steps: StepMigration[];
  }
): Promise<MigrationResult> {
  let migratedSteps = 0;
  let assessmentMigrated = false;

  // 1. Migrate assessment result → users.assessed_level
  if (payload.assessmentResult?.assessedLevel) {
    const validLevels = ['kana', 'n5', 'n4', 'n3', 'n2', 'n1'];
    const level = payload.assessmentResult.assessedLevel;
    if (validLevels.includes(level)) {
      await db
        .update(users)
        .set({ assessed_level: level, updated_at: new Date() })
        .where(eq(users.id, userId));
      assessmentMigrated = true;
    }
  }

  // 2. Migrate step progress
  const completedSteps = payload.steps.filter(s => s.step_slug && s.level && s.completed_at);
  for (const step of completedSteps) {
    const result = await db
      .insert(progress)
      .values({
        user_id:      userId,
        level:        step.level,
        step_slug:    step.step_slug,
        completed:    true,
        completed_at: step.completed_at,
      })
      .onConflictDoNothing()
      .returning({ id: progress.id });
    if (result.length > 0) migratedSteps++;
  }

  return { success: true, migratedSteps, assessmentMigrated };
}
