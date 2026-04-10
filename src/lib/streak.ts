import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function updateStreak(userId: string): Promise<number> {
  const [user] = await db
    .select({ streak: users.streak, last_completion_date: users.last_completion_date })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDate = user.last_completion_date ? new Date(user.last_completion_date) : null;
  if (lastDate) lastDate.setHours(0, 0, 0, 0);

  let newStreak: number;
  if (!lastDate) {
    newStreak = 1;
  } else {
    const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      newStreak = user.streak ?? 1;
    } else if (diffDays === 1) {
      newStreak = (user.streak ?? 0) + 1;
    } else {
      newStreak = 1;
    }
  }

  await db
    .update(users)
    .set({ streak: newStreak, last_completion_date: today, updated_at: today })
    .where(eq(users.id, userId));

  return newStreak;
}
