export type StepId =
  | 'welcome'
  | 'intro2'
  | 'source'
  | 'motivation'
  | 'knowledge'
  | 'path'
  | 'quiz/1'
  | 'quiz/2'
  | 'quiz/3'
  | 'quiz/4'
  | 'quiz/5';

export type StepKind = 'illustration' | 'survey' | 'quiz';

export type StepMeta = {
  id: StepId;
  kind: StepKind;
  /** Whether to show the top progress bar + back button. */
  showChrome: boolean;
};

export const STEPS: StepMeta[] = [
  { id: 'welcome',    kind: 'illustration', showChrome: false },
  { id: 'intro2',     kind: 'illustration', showChrome: false },
  { id: 'source',     kind: 'survey',       showChrome: true  },
  { id: 'motivation', kind: 'survey',       showChrome: true  },
  { id: 'knowledge',  kind: 'survey',       showChrome: true  },
  { id: 'path',       kind: 'survey',       showChrome: true  },
  { id: 'quiz/1',     kind: 'quiz',         showChrome: true  },
  { id: 'quiz/2',     kind: 'quiz',         showChrome: true  },
  { id: 'quiz/3',     kind: 'quiz',         showChrome: true  },
  { id: 'quiz/4',     kind: 'quiz',         showChrome: true  },
  { id: 'quiz/5',     kind: 'quiz',         showChrome: true  },
];

export const SURVEY_STEPS: StepId[] = ['source', 'motivation', 'knowledge', 'path'];
export const QUIZ_STEPS: StepId[] = ['quiz/1', 'quiz/2', 'quiz/3', 'quiz/4', 'quiz/5'];

/** Steps without quiz branch — shown always. */
export const BASE_STEPS: StepId[] = ['welcome', 'intro2', 'source', 'motivation', 'knowledge', 'path'];

export function getStepIndex(stepId: StepId): number {
  return STEPS.findIndex((s) => s.id === stepId);
}

export function getPrevStepId(stepId: StepId): StepId | null {
  const idx = getStepIndex(stepId);
  if (idx <= 0) return null;
  return STEPS[idx - 1]?.id ?? null;
}

export function getNextStepId(stepId: StepId): StepId | null {
  const idx = getStepIndex(stepId);
  if (idx < 0 || idx >= STEPS.length - 1) return null;
  return STEPS[idx + 1]?.id ?? null;
}

/** Progress percentage for top chrome (starts at step index 2 = 'source'). */
export function getProgressValue(stepId: StepId): number {
  const chromeSteps = STEPS.filter((s) => s.showChrome);
  const idx = chromeSteps.findIndex((s) => s.id === stepId);
  if (idx < 0) return 0;
  return Math.round(((idx + 1) / chromeSteps.length) * 100);
}

export function isQuizStep(stepId: StepId): boolean {
  return stepId.startsWith('quiz/');
}

export function getQuizIndex(stepId: StepId): number {
  if (!isQuizStep(stepId)) return -1;
  return parseInt(stepId.split('/')[1] ?? '1', 10) - 1;
}

const VALID_STEP_IDS = new Set<string>(STEPS.map((s) => s.id));

export function isValidStepId(value: string): value is StepId {
  return VALID_STEP_IDS.has(value);
}
