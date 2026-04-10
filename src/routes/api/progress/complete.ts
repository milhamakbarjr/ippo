import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { db } from '@/db';
import { progress, users } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { updateStreak } from '@/lib/streak';
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
  user_id: z.string().uuid(),
  level: z.enum(['kana', 'n5', 'n4', 'n3', 'n2', 'n1']),
  step_slug: z.string().min(1).max(255),
});

export const Route = createFileRoute('/api/progress/complete')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // 1. Auth check — proxy to Better Auth get-session
        const sessionRes = await auth.handler(
          new Request(
            new URL('/api/auth/get-session', request.url),
            { method: 'GET', headers: request.headers }
          )
        );
        if (!sessionRes.ok) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const sessionData = (await sessionRes.json()) as {
          user?: { id?: string; email?: string } | null;
        } | null;
        if (!sessionData?.user?.email) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Find app user by email
        const [appUser] = await db
          .select({ id: users.id, xp: users.xp })
          .from(users)
          .where(eq(users.email, sessionData.user.email))
          .limit(1);
        if (!appUser) {
          return Response.json({ error: 'User not found' }, { status: 404 });
        }

        // 3. Validate body
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
        const { user_id, level, step_slug } = parsed.data;

        // 4. Guard: user_id must match app user
        if (user_id !== appUser.id) {
          return Response.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 5. Check if already completed
        const existing = await db
          .select({ completed: progress.completed })
          .from(progress)
          .where(
            and(
              eq(progress.user_id, user_id),
              eq(progress.level, level),
              eq(progress.step_slug, step_slug)
            )
          )
          .limit(1);
        const alreadyCompleted = existing[0]?.completed === true;

        // 6. UPSERT progress
        await db
          .insert(progress)
          .values({ user_id, level, step_slug, completed: true, completed_at: new Date() })
          .onConflictDoUpdate({
            target: [progress.user_id, progress.level, progress.step_slug],
            set: { completed: true, completed_at: new Date(), updated_at: new Date() },
          });

        // 7. Award XP (only if not previously completed)
        let xpAwarded = 0;
        let totalXP = appUser.xp ?? 0;
        if (!alreadyCompleted) {
          const [updatedUser] = await db
            .update(users)
            .set({ xp: sql`${users.xp} + 10`, updated_at: new Date() })
            .where(eq(users.id, user_id))
            .returning({ xp: users.xp });
          xpAwarded = 10;
          totalXP = updatedUser?.xp ?? (totalXP + 10);
        }

        // 8. Update streak
        const newStreak = await updateStreak(user_id);

        // 9. Compute next step from level config
        const levelConfig = LEVELS[level];
        let nextStep: string | undefined;
        if (levelConfig) {
          const allSlugs = await db
            .select({ step_slug: progress.step_slug })
            .from(progress)
            .where(
              and(
                eq(progress.user_id, user_id),
                eq(progress.level, level),
                eq(progress.completed, true)
              )
            );
          const completedSet = new Set(allSlugs.map((r) => r.step_slug));
          nextStep = levelConfig.steps.find((s) => !completedSet.has(s.slug))?.slug;
        }

        // 10. Level progress counts
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
        const levelConfig2 = LEVELS[level];

        return Response.json({
          success: true,
          completed_at: new Date().toISOString(),
          levelProgress: {
            completed: completedRows.length,
            total: levelConfig2?.steps.length ?? 0,
          },
          nextStep,
          xpAwarded,
          totalXP,
          streak: newStreak,
        });
      },
    },
  },
});
