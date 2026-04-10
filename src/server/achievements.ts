import { db } from '@/db';
import { achievements, progress, users } from '@/db/schema';
import { and, eq, count } from 'drizzle-orm';
import { getStepsForLevel } from '@/content/index';

export type UnlockedAchievement = {
  slug: string;
  titleId: string;
  titleEn: string;
};

const ACHIEVEMENT_TITLES: Record<string, { id: string; en: string }> = {
  'first-step':    { id: 'Langkah Pertama', en: 'First Step' },
  'sound-learner': { id: 'Pelajar Suara',   en: 'Sound Learner' },
  'kana-master':   { id: 'Kana Master',     en: 'Kana Master' },
  'n5-master':     { id: 'Juara N5',        en: 'N5 Champion' },
  'n4-master':     { id: 'Juara N4',        en: 'N4 Champion' },
  'n3-master':     { id: 'Juara N3',        en: 'N3 Champion' },
  'n2-master':     { id: 'Juara N2',        en: 'N2 Champion' },
  'streak-3':      { id: 'Api 3 Hari',      en: '3-Day Fire' },
  'streak-7':      { id: 'Api 7 Hari',      en: '7-Day Fire' },
  'streak-30':     { id: 'Api 30 Hari',     en: '30-Day Fire' },
  'early-bird':    { id: 'Burung Pagi',     en: 'Early Bird' }, // P2 — not checked below
};

async function grantAchievement(
  userId: string,
  slug: string
): Promise<UnlockedAchievement | undefined> {
  try {
    const result = await db
      .insert(achievements)
      .values({ user_id: userId, achievement_slug: slug })
      .onConflictDoNothing()
      .returning();

    if (result.length === 0) return undefined; // already existed

    const titles = ACHIEVEMENT_TITLES[slug];
    if (!titles) return undefined;
    return { slug, titleId: titles.id, titleEn: titles.en };
  } catch (error) {
    console.error(`Failed to grant achievement ${slug} for user ${userId}:`, error);
    return undefined;
  }
}

export async function checkAchievements(
  userId: string,
  level: string,
  stepSlug: string,
  currentStreak: number
): Promise<UnlockedAchievement[]> {
  const unlocked: UnlockedAchievement[] = [];

  try {
    // First step ever
    const [{ totalCompleted }] = await db
      .select({ totalCompleted: count() })
      .from(progress)
      .where(and(eq(progress.user_id, userId), eq(progress.completed, true)));

    if (Number(totalCompleted) === 1) {
      const a = await grantAchievement(userId, 'first-step');
      if (a) unlocked.push(a);
    }

    // First Kana step (sound-learner)
    if (level === 'kana') {
      const kanaSteps = getStepsForLevel('kana');
      if (kanaSteps[0]?.slug === stepSlug) {
        const a = await grantAchievement(userId, 'sound-learner');
        if (a) unlocked.push(a);
      }
    }

    // Level master achievement
    const levelSteps = getStepsForLevel(level);
    if (levelSteps.length > 0) {
      const [{ completedInLevel }] = await db
        .select({ completedInLevel: count() })
        .from(progress)
        .where(
          and(
            eq(progress.user_id, userId),
            eq(progress.level, level),
            eq(progress.completed, true)
          )
        );

      if (Number(completedInLevel) >= levelSteps.length) {
        const levelSlug = `${level}-master`;
        if (ACHIEVEMENT_TITLES[levelSlug]) {
          const a = await grantAchievement(userId, levelSlug);
          if (a) unlocked.push(a);
        }
      }
    }

    // Streak achievements
    for (const [threshold, slug] of [[3, 'streak-3'], [7, 'streak-7'], [30, 'streak-30']] as const) {
      if (currentStreak >= threshold) {
        const a = await grantAchievement(userId, slug);
        if (a) unlocked.push(a);
      }
    }
  } catch (error) {
    console.error('Achievement check failed (non-fatal):', error);
  }

  return unlocked;
}
