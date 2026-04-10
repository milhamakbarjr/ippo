import { Button } from '@/components/base/buttons/button';

const LEVEL_ORDER = ['kana', 'n5', 'n4', 'n3', 'n2', 'n1'];

const LEVEL_LABELS: Record<string, string> = {
  kana: 'KANA',
  n5: 'N5',
  n4: 'N4',
  n3: 'N3',
  n2: 'N2',
  n1: 'N1',
};

interface LevelCompleteCardProps {
  currentLevelId: string;
  nextLevelId: string | undefined;
}

export function LevelCompleteCard({ currentLevelId, nextLevelId }: LevelCompleteCardProps) {
  if (!nextLevelId) return null;

  const currentLabel = LEVEL_LABELS[currentLevelId] ?? currentLevelId.toUpperCase();
  const nextLabel = LEVEL_LABELS[nextLevelId] ?? nextLevelId.toUpperCase();

  void LEVEL_ORDER;

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
