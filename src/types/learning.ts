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
