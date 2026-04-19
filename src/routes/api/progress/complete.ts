import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { db, txDb } from '@/db';
import { progress, users } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { requireAuth, isAuthError } from '@/server/auth-guard';
import { updateStreak } from '@/lib/streak';
import { checkAchievements } from '@/server/achievements';
import { level as kanaLevel } from '@/content/kana/index';
import { level as n5Level } from '@/content/n5/index';
import { level as n4Level } from '@/content/n4/index';
import { level as n3Level } from '@/content/n3/index';
import { level as n2Level } from '@/content/n2/index';
import { level as n1Level } from '@/content/n1/index';
import type { Level } from '@/types/learning';

const LEVELS: Record<string, Level> = {
  kana: kanaLevel,
  n5: n5Level,
  n4: n4Level,
  n3: n3Level,
  n2: n2Level,
  n1: n1Level,
};

const ProgressUpdateSchema = z.object({
  level: z.enum(['kana', 'n5', 'n4', 'n3', 'n2', 'n1']),
  step_slug: z.string().min(1).max(255),
});

export const Route = createFileRoute('/api/progress/complete')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // 1. Auth check
        const authResult = await requireAuth(request);
        if (isAuthError(authResult)) return authResult;
        const { appUser } = authResult;

        // 2. Validate body
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 });
        }
        const parsed = ProgressUpdateSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: parsed.error.message }, { status: 400 });
        }
        const { level, step_slug } = parsed.data;
        const user_id = appUser.id;

        // 4–7. Atomically check completion, upsert progress, and award XP in a
        // single transaction to prevent double-awarding XP on concurrent requests.
        const { alreadyCompleted, xpAwarded, totalXP } = await txDb.transaction(async (tx) => {
          const existing = await tx
            .select({ completed: progress.completed })
            .from(progress)
            .where(and(eq(progress.user_id, user_id), eq(progress.level, level), eq(progress.step_slug, step_slug)))
            .limit(1);
          const alreadyCompleted = existing[0]?.completed === true;

          await tx
            .insert(progress)
            .values({ user_id, level, step_slug, completed: true, completed_at: new Date() })
            .onConflictDoUpdate({
              target: [progress.user_id, progress.level, progress.step_slug],
              set: { completed: true, completed_at: new Date(), updated_at: new Date() },
            });

          let xpAwarded = 0;
          let totalXP = appUser.xp ?? 0;
          if (!alreadyCompleted) {
            const [updatedUser] = await tx
              .update(users)
              .set({ xp: sql`${users.xp} + 10`, updated_at: new Date() })
              .where(eq(users.id, user_id))
              .returning({ xp: users.xp });
            xpAwarded = 10;
            totalXP = updatedUser?.xp ?? (totalXP + 10);
          }

          return { alreadyCompleted, xpAwarded, totalXP };
        });

        // 8. Update streak — only on new completions to avoid falsely resetting
        // streaks from duplicate or retried submissions.
        let newStreak: number;
        if (alreadyCompleted) {
          const [u] = await db.select({ streak: users.streak }).from(users).where(eq(users.id, user_id)).limit(1);
          newStreak = u?.streak ?? 0;
        } else {
          newStreak = await updateStreak(user_id);
        }

        // Check achievements — only on new completions to avoid spurious grant
        // attempts on re-submissions (DB unique constraint prevents double-grant,
        // but skipping here avoids unnecessary write attempts).
        const unlockedAchievements = alreadyCompleted
          ? []
          : await checkAchievements(user_id, level, step_slug, newStreak);
        const firstUnlocked = unlockedAchievements[0];

        // 9. Fetch completed steps once — used for next step + level progress
        const completedRows = await db
          .select({ step_slug: progress.step_slug })
          .from(progress)
          .where(
            and(
              eq(progress.user_id, user_id),
              eq(progress.level, level),
              eq(progress.completed, true)
            )
          );
        const completedSet = new Set(completedRows.map((r) => r.step_slug));
        const levelConfig = LEVELS[level];
        const nextStep = levelConfig?.steps.find((s) => !completedSet.has(s.slug))?.slug;

        return Response.json({
          success: true,
          completed_at: new Date().toISOString(),
          levelProgress: {
            completed: completedRows.length,
            total: levelConfig?.steps.length ?? 0,
          },
          nextStep,
          xpAwarded,
          totalXP,
          streak: newStreak,
          achievementUnlocked: firstUnlocked ?? null,
        });
      },
    },
  },
});
