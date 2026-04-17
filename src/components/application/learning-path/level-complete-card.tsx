import { Button } from '@/components/base/buttons/button';
import { LEVEL_LABELS } from '@/content/levels';
import type { JLPTLevelId } from '@/types/learning';

interface LevelCompleteCardProps {
  currentLevelId: string;
  nextLevelId: string | undefined;
}

export function LevelCompleteCard({ currentLevelId, nextLevelId }: LevelCompleteCardProps) {
  if (!nextLevelId) return null;

  const currentLabel = LEVEL_LABELS[currentLevelId as JLPTLevelId] ?? currentLevelId.toUpperCase();
  const nextLabel = LEVEL_LABELS[nextLevelId as JLPTLevelId] ?? nextLevelId.toUpperCase();

  return (
    <div className="rounded-xl border border-secondary bg-success-primary/10 p-4">
      <p className="text-success-primary font-semibold text-sm mb-1">
        🎉 Level {currentLabel} Selesai! Siap untuk {nextLabel}?
      </p>
      <p className="text-tertiary text-xs mb-3">
        Kamu telah menyelesaikan semua step di level ini. Lanjutkan perjalananmu!
      </p>
      <Button color="primary" size="sm" href={`/learning/${nextLevelId}`}>
        Mulai Level {nextLabel}
      </Button>
    </div>
  );
}
