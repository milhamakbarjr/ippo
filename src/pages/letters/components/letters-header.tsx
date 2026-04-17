import { Button } from '@/components/base/buttons/button';
import type { CharacterType } from '@/types/letters';

const HEADER_CONTENT: Record<CharacterType, { title: string; subtitle: string }> = {
  hiragana: {
    title: 'Ayo belajar Hiragana!',
    subtitle: 'Kenali sistem penulisan utama bahasa Jepang',
  },
  katakana: {
    title: 'Ayo belajar Katakana!',
    subtitle: 'Digunakan untuk kata serapan dan nama asing',
  },
  kanji: {
    title: 'Ayo belajar Kanji!',
    subtitle: 'Karakter dari aksara Tionghoa yang diadaptasi',
  },
};

interface LettersHeaderProps {
  type: CharacterType;
}

export function LettersHeader({ type }: LettersHeaderProps) {
  const { title, subtitle } = HEADER_CONTENT[type];

  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-primary">{title}</h1>
        <p className="text-sm text-tertiary">{subtitle}</p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Button
          href={`/letters/tips/${type}`}
          color="secondary"
          size="sm"
          className="w-full justify-center"
        >
          Tips
        </Button>
        <Button
          color="primary"
          size="sm"
          className="w-full justify-center"
          isDisabled
        >
          Pelajari Karakter
        </Button>
      </div>
    </div>
  );
}
