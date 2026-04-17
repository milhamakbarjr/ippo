export interface CharacterEntry {
  char: string;
  romaji: string;
  /** Indonesian meaning — used for kanji display */
  meaning?: string;
  /** On'yomi (Chinese reading) in katakana — kanji only */
  onyomi?: string;
  /** Kun'yomi (Japanese reading) in hiragana — kanji only */
  kunyomi?: string;
  examples?: { word: string; reading: string; meaning: string }[];
}

export interface CharacterSection {
  title: string;
  description?: string;
  columns: number;
  entries: (CharacterEntry | null)[];
}

export interface TipCard {
  char: string;
  romaji: string;
  englishComparison?: string;
}

export interface TipItem {
  slug: string;
  characters: string;
  romaji: string;
}

export interface TipDetail {
  slug: string;
  title: string;
  explanation: string;
  cards: TipCard[];
  closingText?: string;
}

export interface TipCategory {
  label: string;
  items: TipItem[];
}

export type CharacterType = 'hiragana' | 'katakana' | 'kanji';
