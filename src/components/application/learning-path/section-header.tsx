import { BookOpen01 } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import type { Section, Unit } from '@/types/learning';

// Distinct color per section using Untitled UI utility palette CSS variables
const SECTION_THEME: Record<number, { bg: string }> = {
  1: { bg: 'bg-brand-solid' },                                     // purple (Hiragana)
  2: { bg: 'bg-[var(--color-utility-blue-600)]' },                 // blue   (Katakana)
  3: { bg: 'bg-[var(--color-utility-green-600)]' },                // green  (Kana Mastery)
  4: { bg: 'bg-[var(--color-utility-orange-600)]' },               // orange
  5: { bg: 'bg-[var(--color-utility-indigo-600)]' },               // indigo
  6: { bg: 'bg-[var(--color-utility-pink-600)]' },                 // pink
};

interface SectionHeaderProps {
  section: Section;
  unitNumber: number;
  currentUnit: Unit;
  levelId: string;
}

export function SectionHeader({ section, unitNumber, currentUnit, levelId }: SectionHeaderProps) {
  const theme = SECTION_THEME[section.sectionNumber] ?? SECTION_THEME[1];

  return (
    <div className={`sticky top-14 z-20 px-4 py-3 mb-4 rounded-xl ${theme.bg}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-fg-white opacity-70 font-medium">
            SEKSI {section.sectionNumber}, UNIT {unitNumber}
          </p>
          <p className="text-fg-white font-bold text-base">{currentUnit.title}</p>
        </div>
        <Button
          color="secondary"
          size="sm"
          iconLeading={BookOpen01}
          href={`/learning/${levelId}/guidebook/${section.slug}/${currentUnit.slug}`}
        >
          PANDUAN
        </Button>
      </div>
    </div>
  );
}
