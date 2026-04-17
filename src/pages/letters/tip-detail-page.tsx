import { useParams } from '@tanstack/react-router';
import {
  HIRAGANA_TIP_DETAILS,
  KATAKANA_TIP_DETAILS,
} from '@/content/letters';
import type { CharacterType, TipDetail } from '@/types/letters';
import { TipDetailHeader } from './components/tip-detail-header';
import { TipShowcaseCard } from './components/tip-showcase-card';

const TIP_DETAILS_BY_TYPE: Record<CharacterType, TipDetail[]> = {
  hiragana: HIRAGANA_TIP_DETAILS,
  katakana: KATAKANA_TIP_DETAILS,
  kanji: [],
};

function isValidType(type: string): type is CharacterType {
  return type === 'hiragana' || type === 'katakana' || type === 'kanji';
}

export function TipDetailPage() {
  const { type, tipSlug } = useParams({ from: '/letters/tips/$type/$tipSlug' });
  const safeType: CharacterType = isValidType(type) ? type : 'hiragana';
  const details = TIP_DETAILS_BY_TYPE[safeType];
  const tip = details.find((d) => d.slug === tipSlug);

  if (!tip) {
    return (
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-6">
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-4xl">🔍</p>
          <p className="text-base font-semibold text-primary">Tips tidak ditemukan</p>
          <p className="text-sm text-tertiary">Tips dengan slug "{tipSlug}" tidak tersedia.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 pb-16 pt-6">
      <div className="flex flex-col gap-6">
        <TipDetailHeader type={safeType} title={tip.title} />

        <div className="flex flex-col gap-4">
          <p className="text-sm text-tertiary">{tip.explanation}</p>

          {tip.cards.map((card, idx) => (
            <TipShowcaseCard key={`${card.char}-${idx}`} card={card} />
          ))}

          {tip.closingText && (
            <p className="text-sm text-tertiary">{tip.closingText}</p>
          )}
        </div>
      </div>
    </main>
  );
}
