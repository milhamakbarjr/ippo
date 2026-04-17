import { Link } from '@tanstack/react-router';
import { ArrowLeft } from '@untitledui/icons';
import type { CharacterType } from '@/types/letters';

const TYPE_LABEL: Record<CharacterType, string> = {
  hiragana: 'Tips Hiragana',
  katakana: 'Tips Katakana',
  kanji: 'Tips Kanji',
};

interface TipDetailHeaderProps {
  type: CharacterType;
  title: string;
}

export function TipDetailHeader({ type, title }: TipDetailHeaderProps) {
  const backLabel = TYPE_LABEL[type] ?? 'Tips';

  return (
    <div className="flex flex-col gap-3">
      <Link
        to="/letters/tips/$type"
        params={{ type }}
        className="inline-flex items-center gap-1.5 text-sm text-tertiary outline-focus-ring transition duration-100 ease-linear hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {backLabel}
      </Link>
      <h1 className="text-xl font-bold text-primary">{title}</h1>
    </div>
  );
}
