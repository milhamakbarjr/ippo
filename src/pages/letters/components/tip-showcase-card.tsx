import { VolumeMax } from '@untitledui/icons';
import type { TipCard } from '@/types/letters';

interface TipShowcaseCardProps {
  card: TipCard;
}

export function TipShowcaseCard({ card }: TipShowcaseCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-brand-solid px-5 py-4">
      <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-white/10 px-4 py-3 min-w-[72px]">
        <span className="text-4xl font-medium text-white leading-none">{card.char}</span>
        <VolumeMax className="mt-1.5 size-4 text-quaternary_on-brand" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-semibold text-white">{card.romaji}</span>
        {card.englishComparison && (
          <span className="text-sm text-tertiary_on-brand">{card.englishComparison}</span>
        )}
      </div>
    </div>
  );
}
