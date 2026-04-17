export type JLPTLevelId = 'kana' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1';

export type ResourceType = 'video' | 'article' | 'interactive' | 'tool';
export type ResourceLanguage = 'id' | 'en' | 'ja';

export type StepResource = {
  title: string;
  titleEn?: string;
  url: string;
  type: ResourceType;
  language: ResourceLanguage;
};

export type Step = {
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  estimatedMinutes: number;
  resources: StepResource[];
  category: 'vocabulary' | 'kanji' | 'grammar' | 'reading' | 'kana';
};

export type Level = {
  id: JLPTLevelId;
  label: string;             // e.g. 'KANA', 'N5'
  description: string;       // Indonesian description
  estimatedWeeks: number;
  estimatedMonthsToN2: string; // e.g. '18-24 bulan'
  steps: Step[];
};

export type StepProgress = {
  user_id: string;
  level: string;
  step_slug: string;
  completed: boolean;
  completed_at?: Date;
};

export type LevelProgressResult = {
  level: JLPTLevelId;
  totalSteps: number;
  completedSteps: number;
  steps: Array<{ slug: string; title: string; completed: boolean }>;
  recommendedNextStep?: string;
};

// --- Learning path layout types ---

export type GuidebookPhrase = {
  japanese: string;
  romaji: string;
  indonesian: string;
};

export type GuidebookTip = {
  title: string;
  body: string;
};

/** Section-level guide (shown when clicking PANDUAN) */
export type SectionGuide = {
  title: string;
  description: string;
  objectives: string[];
  strategies: GuidebookTip[];
  commonMistakes: GuidebookTip[];
};

/** Pronunciation comparison card for a single character */
export type PronunciationCard = {
  char: string;
  romaji: string;
  comparison: string; // Indonesian pronunciation comparison
};

/** Rich learning content for a unit (shown when clicking a path node) */
export type UnitContent = {
  pronunciationCards: PronunciationCard[];
  mnemonics: GuidebookTip[];
  practicePrompts: string[];
};

export type Unit = {
  slug: string;
  title: string;
  titleEn?: string;
  stepSlugs: string[];
  /** Quick reference phrases shown on the unit learning page */
  phrases: GuidebookPhrase[];
  /** Rich learning content (character grids, pronunciation, mnemonics) */
  content: UnitContent;
};

export type Section = {
  slug: string;
  title: string;
  titleEn?: string;
  sectionNumber: number;
  units: Unit[];
  quizSlug?: string;
  /** Section-level guide (how to excel this whole section) */
  guide: SectionGuide;
};

export type LevelPathConfig = {
  levelId: JLPTLevelId;
  sections: Section[];
};
