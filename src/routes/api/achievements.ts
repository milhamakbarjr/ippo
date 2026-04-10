import { createFileRoute } from '@tanstack/react-router';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { achievements, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const Route = createFileRoute('/api/achievements')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Auth check
        const sessionRes = await auth.handler(
          new Request(new URL('/api/auth/get-session', request.url), {
            method: 'GET',
            headers: request.headers,
          })
        );
        if (!sessionRes.ok) return Response.json({ error: 'Unauthorized' }, { status: 401 });
        const sessionData = (await sessionRes.json()) as { user?: { email?: string } | null } | null;
        if (!sessionData?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 });

        // Find app user
        const [appUser] = await db
          .select({ id: users.id, xp: users.xp, streak: users.streak })
          .from(users)
          .where(eq(users.email, sessionData.user.email))
          .limit(1);
        if (!appUser) return Response.json({ error: 'User not found' }, { status: 404 });

        // Fetch achievements
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
