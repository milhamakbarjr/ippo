import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/base/buttons/button';
import { ProgressBarBase } from '@/components/base/progress-indicators/progress-indicators';
import type { Level } from '@/types/learning';

interface YouAreHereCardProps {
  level: Level;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
}

export function YouAreHereCard({ level, completedCount, totalCount, progressPercent }: YouAreHereCardProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-secondary bg-primary p-4 border-l-4 border-l-[var(--color-fg-success-secondary)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-primary font-semibold text-sm">
            ✨ Kamu di sini: {level.label}
          </p>
          <p className="text-secondary text-sm mt-0.5">
            {level.estimatedMonthsToN2}
          </p>
        </div>
        <Button
          color="tertiary"
          size="sm"
          onClick={() => navigate({ to: '/assessment' })}
          className="shrink-0"
        >
          Ambil Assessment Ulang
        </Button>
      </div>

      <div className="mt-3 space-y-1.5">
        <ProgressBarBase
          value={progressPercent}
          className="h-1"
        />
        <p className="text-secondary text-xs">
          {completedCount} dari {totalCount} steps ({progressPercent}%)
        </p>
      </div>
    </div>
  );
}
