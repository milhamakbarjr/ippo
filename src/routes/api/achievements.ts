import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db';
import { achievements } from '@/db/schema';
import { requireAuth, isAuthError } from '@/server/auth-guard';
import { eq } from 'drizzle-orm';

export const Route = createFileRoute('/api/achievements')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authResult = await requireAuth(request);
        if (isAuthError(authResult)) return authResult;
        const { appUser } = authResult;

        const userAchievements = await db
          .select({
            achievement_slug: achievements.achievement_slug,
            unlocked_at: achievements.unlocked_at,
          })
          .from(achievements)
          .where(eq(achievements.user_id, appUser.id));

        return Response.json({
          xp: appUser.xp ?? 0,
          streak: appUser.streak ?? 0,
          achievements: userAchievements.map((a) => ({
            slug: a.achievement_slug,
            unlocked_at: a.unlocked_at?.toISOString() ?? null,
          })),
        });
      },
    },
  },
});
