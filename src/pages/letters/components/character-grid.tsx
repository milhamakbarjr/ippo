import type { CharacterSection } from '@/types/letters';
import { CharacterCard } from './character-card';

interface CharacterGridProps {
  section: CharacterSection;
}

export function CharacterGrid({ section }: CharacterGridProps) {
  const gridColsClass: Record<number, string> = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  };

  const colClass = gridColsClass[section.columns] ?? 'grid-cols-5';

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
            <CharacterCard key={`${entry.char}-${idx}`} entry={entry} />
          ),
        )}
      </div>
    </div>
  );
}
