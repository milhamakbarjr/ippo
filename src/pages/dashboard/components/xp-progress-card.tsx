import { Zap } from '@untitledui/icons';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';
import { ProgressBarBase } from '@/components/base/progress-indicators/progress-indicators';

interface XpProgressCardProps {
  xp: number;
}

export function XpProgressCard({ xp }: XpProgressCardProps) {
  const nextMilestone = Math.ceil((xp + 1) / 100) * 100;
  const progress = Math.round(((xp % 100) / 100) * 100);

  return (
    <div className="rounded-xl border border-secondary bg-primary p-4 flex items-start gap-3">
      <FeaturedIcon icon={Zap} size="md" color="warning" theme="light" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-2">
          <p className="text-primary text-sm font-semibold">{xp} XP</p>
          <p className="text-tertiary text-xs">{nextMilestone} XP</p>
        </div>
        <ProgressBarBase value={progress} className="h-1.5" />
        <p className="text-tertiary text-xs mt-1">{nextMilestone - xp} XP lagi ke level berikutnya</p>
      </div>
    </div>
  );
}
