import { Link } from '@tanstack/react-router';
import { ArrowLeft } from '@untitledui/icons';
import type { CharacterType } from '@/types/letters';

const TIPS_CONTENT: Record<CharacterType, { title: string; subtitle: string }> = {
  hiragana: {
    title: 'Tips Hiragana',
    subtitle: 'Lihat semua tips tentang Hiragana',
  },
  katakana: {
    title: 'Tips Katakana',
    subtitle: 'Lihat semua tips tentang Katakana',
  },
  kanji: {
    title: 'Tips Kanji',
    subtitle: 'Lihat semua tips tentang Kanji',
  },
};

interface TipsHeaderProps {
  type: CharacterType;
}

export function TipsHeader({ type }: TipsHeaderProps) {
  const { title, subtitle } = TIPS_CONTENT[type];

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/letters"
        className="inline-flex items-center gap-1.5 text-sm text-tertiary outline-focus-ring transition duration-100 ease-linear hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Karakter
      </Link>

      <div className="flex items-center gap-4 rounded-xl bg-brand-solid px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-base font-bold text-white">{title}</p>
          <p className="text-sm text-white/80">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
