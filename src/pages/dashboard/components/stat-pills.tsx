import { Zap, Star01, Trophy01 } from '@untitledui/icons';
import { BadgeWithIcon } from '@/components/base/badges/badges';
import { useAchievements } from '@/hooks/use-achievements';

interface StatPillsProps {
  isAuthenticated: boolean;
}

export function StatPills({ isAuthenticated }: StatPillsProps) {
  const { data } = useAchievements(isAuthenticated);

  const xp = data?.xp ?? 0;
  const streak = data?.streak ?? 0;
  const achievementsCount = data?.achievements.filter((a) => a.unlocked_at).length ?? 0;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <BadgeWithIcon color="warning" size="md" iconLeading={Zap}>
        {xp} XP
      </BadgeWithIcon>
      <BadgeWithIcon color={streak >= 1 ? 'error' : 'gray'} size="md" iconLeading={Star01}>
        {streak} hari
      </BadgeWithIcon>
      <BadgeWithIcon color="brand" size="md" iconLeading={Trophy01}>
        {achievementsCount} Pencapaian
      </BadgeWithIcon>
    </div>
  );
}
