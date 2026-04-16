import { Trophy01 } from '@untitledui/icons';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';
import { Button } from '@/components/base/buttons/button';

interface AchievementsSummaryCardProps {
  count: number;
}

export function AchievementsSummaryCard({ count }: AchievementsSummaryCardProps) {
  return (
    <div className="rounded-xl border border-secondary bg-primary p-4 flex items-start gap-3">
      <FeaturedIcon icon={Trophy01} size="md" color="brand" theme="light" />
      <div className="flex-1 min-w-0">
        <p className="text-primary text-sm font-semibold">{count} Pencapaian</p>
        <p className="text-tertiary text-xs mt-0.5 mb-2">Lihat semua pencapaianmu.</p>
        <Button color="link-color" size="sm" href="/profile">
          Lihat semua
        </Button>
      </div>
    </div>
  );
}
