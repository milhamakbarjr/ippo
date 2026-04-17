import { ProgressBarBase } from '@/components/base/progress-indicators/progress-indicators';
import { BadgeWithDot } from '@/components/base/badges/badges';
import type { Level } from '@/types/learning';

interface YouAreHereCardProps {
  level: Level;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
  streak?: number;
}

export function YouAreHereCard({ level, completedCount, totalCount, progressPercent, streak }: YouAreHereCardProps) {
  return (
    <div className="rounded-xl border border-secondary bg-primary p-4 border-l-4 border-l-[var(--color-fg-success-secondary)]">
      <p className="text-primary font-semibold text-sm">
        Kamu di sini: {level.label}
      </p>

      <div className="mt-3 space-y-1.5">
        <ProgressBarBase
          value={progressPercent}
          className="h-1"
        />
        <p className="text-secondary text-xs">
          {completedCount} dari {totalCount} steps ({progressPercent}%)
        </p>
        {streak != null && streak >= 2 && (
          <BadgeWithDot
            color={streak >= 30 ? 'error' : 'warning'}
          >
            {streak >= 30 ? '30+ day streak 🔥🔥🔥' : `${streak}-day streak 🔥`}
          </BadgeWithDot>
        )}
      </div>
    </div>
  );
}
