import { motion } from 'motion/react';
import {
  Flag01,
  VolumeMax,
  Star01,
  Trophy01,
  Zap,
  Sun,
  Lock01,
} from '@untitledui/icons';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';
import type { FC } from 'react';

type IconKey = 'flag' | 'volume' | 'star' | 'trophy' | 'fire' | 'sun';

const ICON_MAP: Record<IconKey, FC<{ className?: string }>> = {
  flag: Flag01,
  volume: VolumeMax,
  star: Star01,
  trophy: Trophy01,
  fire: Zap,
  sun: Sun,
};

const ALL_ACHIEVEMENTS = [
  { slug: 'first-step',    titleId: 'Langkah Pertama', icon: 'flag' as IconKey,   hint: 'Selesaikan langkah pertamamu' },
  { slug: 'sound-learner', titleId: 'Pelajar Suara',   icon: 'volume' as IconKey, hint: 'Selesaikan step pertama Kana' },
  { slug: 'kana-master',   titleId: 'Kana Master',     icon: 'star' as IconKey,   hint: 'Selesaikan semua langkah Kana' },
  { slug: 'n5-master',     titleId: 'Juara N5',        icon: 'trophy' as IconKey, hint: 'Selesaikan semua langkah N5' },
  { slug: 'n4-master',     titleId: 'Juara N4',        icon: 'trophy' as IconKey, hint: 'Selesaikan semua langkah N4' },
  { slug: 'n3-master',     titleId: 'Juara N3',        icon: 'trophy' as IconKey, hint: 'Selesaikan semua langkah N3' },
  { slug: 'n2-master',     titleId: 'Juara N2',        icon: 'trophy' as IconKey, hint: 'Selesaikan semua langkah N2' },
  { slug: 'streak-3',      titleId: 'Api 3 Hari',      icon: 'fire' as IconKey,   hint: 'Belajar 3 hari berturut-turut' },
  { slug: 'streak-7',      titleId: 'Api 7 Hari',      icon: 'fire' as IconKey,   hint: 'Belajar 7 hari berturut-turut' },
  { slug: 'streak-30',     titleId: 'Api 30 Hari',     icon: 'fire' as IconKey,   hint: 'Belajar 30 hari berturut-turut' },
  { slug: 'early-bird',    titleId: 'Burung Pagi',     icon: 'sun' as IconKey,    hint: 'Selesaikan step sebelum jam 8 pagi (Segera hadir)' },
];

function formatDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

type AchievementGalleryProps = {
  unlockedSlugs: Set<string>;
  unlockDates: Map<string, string>; // slug -> ISO date string
};

export function AchievementGallery({ unlockedSlugs, unlockDates }: AchievementGalleryProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {ALL_ACHIEVEMENTS.map((achievement) => {
        const isUnlocked = unlockedSlugs.has(achievement.slug);
        const IconComponent = ICON_MAP[achievement.icon];
        const unlockDate = unlockDates.get(achievement.slug);

        if (isUnlocked) {
          return (
            <motion.div
              key={achievement.slug}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <FeaturedIcon
                icon={IconComponent}
                color="brand"
                theme="light"
                size="lg"
              />
              <p className="text-primary text-xs font-medium leading-tight">
                {achievement.titleId}
              </p>
              {unlockDate && (
                <p className="text-tertiary text-xs leading-tight">
                  {formatDate(unlockDate)}
                </p>
              )}
            </motion.div>
          );
        }

        return (
          <div
            key={achievement.slug}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <div className="relative">
              <FeaturedIcon
                icon={IconComponent}
                color="gray"
                theme="light"
                size="lg"
                className="grayscale opacity-40"
              />
              <span className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full bg-primary ring-1 ring-secondary p-0.5">
                <Lock01 className="size-3 text-tertiary" aria-hidden="true" />
              </span>
            </div>
            <p className="text-tertiary text-xs font-medium leading-tight">
              {achievement.titleId}
            </p>
            <p className="text-tertiary text-xs leading-tight">
              {achievement.hint}
            </p>
          </div>
        );
      })}
    </div>
  );
}
