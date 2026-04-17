import type { CharacterSection } from '@/types/letters';
import { CharacterCard } from './character-card';

interface CharacterGridProps {
  section: CharacterSection;
  isKanji?: boolean;
}

export function CharacterGrid({ section, isKanji = false }: CharacterGridProps) {
  // Kanji needs fewer columns on mobile because meanings are longer than romaji
  const kanjiGridColsClass: Record<number, string> = {
    3: 'grid-cols-3',
    4: 'grid-cols-3 sm:grid-cols-4',
    5: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5',
  };

  const kanaGridColsClass: Record<number, string> = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-4 sm:grid-cols-5',
  };

  const gridMap = isKanji ? kanjiGridColsClass : kanaGridColsClass;
  const colClass = gridMap[section.columns] ?? (isKanji ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5' : 'grid-cols-4 sm:grid-cols-5');

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-semibold text-primary">{section.title}</h3>
        {section.description && (
          <p className="text-xs text-tertiary">{section.description}</p>
        )}
      </div>
      <div className={`grid ${colClass} gap-2`}>
        {section.entries.map((entry, idx) =>
          entry === null ? (
            <div key={idx} aria-hidden="true" />
          ) : (
            <CharacterCard key={`${entry.char}-${idx}`} entry={entry} isKanji={isKanji} />
          ),
        )}
      </div>
    </div>
  );
}
