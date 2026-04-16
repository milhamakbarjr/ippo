import { Star01 } from '@untitledui/icons';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';

interface StreakCardProps {
  streak?: number;
}

export function StreakCard({ streak = 0 }: StreakCardProps) {
  const hasStreak = streak >= 1;

  return (
    <div className="rounded-xl border border-secondary bg-primary p-4 flex items-start gap-3">
      <FeaturedIcon
        icon={Star01}
        size="md"
        color={hasStreak ? 'warning' : 'gray'}
        theme="light"
      />
      <div className="flex-1 min-w-0">
        <p className="text-primary text-sm font-semibold">
          {hasStreak ? `${streak}-hari streak 🔥` : 'Mulai streak kamu!'}
        </p>
        <p className="text-tertiary text-xs mt-0.5">
          {hasStreak
            ? 'Terus semangat belajar setiap hari.'
            : 'Belajar setiap hari untuk membangun kebiasaan.'}
        </p>
      </div>
    </div>
  );
}
