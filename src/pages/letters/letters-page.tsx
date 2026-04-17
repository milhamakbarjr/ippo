import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from '@/components/application/tabs/tabs';
import { HIRAGANA_SECTIONS, KATAKANA_SECTIONS, KANJI_SECTIONS } from '@/content/letters';
import type { CharacterType } from '@/types/letters';
import { LettersHeader } from './components/letters-header';
import { CharacterGrid } from './components/character-grid';

const CHARACTER_TABS: { id: CharacterType; label: string }[] = [
  { id: 'hiragana', label: 'Hiragana' },
  { id: 'katakana', label: 'Katakana' },
  { id: 'kanji', label: 'Kanji' },
];

const SECTIONS_BY_TYPE = {
  hiragana: HIRAGANA_SECTIONS,
  katakana: KATAKANA_SECTIONS,
  kanji: KANJI_SECTIONS,
};

export function LettersPage() {
  const [selectedType, setSelectedType] = useState<CharacterType>('hiragana');

  return (
    <main className="mx-auto max-w-2xl px-4 pb-16">
      <Tabs
        selectedKey={selectedType}
        onSelectionChange={(key) => setSelectedType(key as CharacterType)}
      >
        <div className="sticky top-14 z-30 bg-primary pt-2 lg:top-16">
          <TabList type="underline" size="sm">
            {CHARACTER_TABS.map((tab) => (
              <Tab key={tab.id} id={tab.id} label={tab.label} />
            ))}
          </TabList>
        </div>

        {CHARACTER_TABS.map((tab) => (
          <TabPanel key={tab.id} id={tab.id}>
            <LettersHeader type={tab.id} />

            {SECTIONS_BY_TYPE[tab.id].length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <p className="text-4xl">🚧</p>
                <p className="text-base font-semibold text-primary">Segera hadir!</p>
                <p className="text-sm text-tertiary">Konten {tab.label} sedang dalam pengerjaan.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {SECTIONS_BY_TYPE[tab.id].map((section) => (
                  <CharacterGrid key={section.title} section={section} isKanji={tab.id === 'kanji'} />
                ))}
              </div>
            )}
          </TabPanel>
        ))}
      </Tabs>
    </main>
  );
}
