import { useParams } from '@tanstack/react-router';
import {
  HIRAGANA_TIP_CATEGORIES,
  KATAKANA_TIP_CATEGORIES,
} from '@/content/letters';
import type { CharacterType, TipCategory } from '@/types/letters';
import { TipsHeader } from './components/tips-header';
import { TipCategoryGroup } from './components/tip-category-group';

const TIP_CATEGORIES_BY_TYPE: Record<CharacterType, TipCategory[]> = {
  hiragana: HIRAGANA_TIP_CATEGORIES,
  katakana: KATAKANA_TIP_CATEGORIES,
  kanji: [],
};

function isValidType(type: string): type is CharacterType {
  return type === 'hiragana' || type === 'katakana' || type === 'kanji';
}

export function TipsPage() {
  const { type } = useParams({ from: '/letters/tips/$type/' });
  const safeType: CharacterType = isValidType(type) ? type : 'hiragana';
  const categories = TIP_CATEGORIES_BY_TYPE[safeType];

  return (
    <main className="mx-auto max-w-2xl px-4 pb-16 pt-6">
      <div className="flex flex-col gap-6">
        <TipsHeader type={safeType} />

        {categories.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-4xl">🚧</p>
            <p className="text-base font-semibold text-primary">Segera hadir!</p>
            <p className="text-sm text-tertiary">Tips untuk {safeType} sedang dalam pengerjaan.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {categories.map((category) => (
              <TipCategoryGroup
                key={category.label}
                category={category}
                type={safeType}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
