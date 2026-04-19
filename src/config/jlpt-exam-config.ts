import type { QuizCategory } from '@/db/validators';

export const JLPT_EXAM_CONFIG: Record<string, Record<QuizCategory, number>> = {
  n5: { vocab: 25, kanji: 0, grammar: 15, reading: 5 },
  n4: { vocab: 30, kanji: 0, grammar: 15, reading: 7 },
  n3: { vocab: 30, kanji: 0, grammar: 15, reading: 12 },
  n2: { vocab: 30, kanji: 0, grammar: 15, reading: 20 },
  n1: { vocab: 30, kanji: 0, grammar: 15, reading: 25 },
};

// Total written questions per level (vocab+kanji counts as one section in real JLPT)
export const JLPT_TOTAL_QUESTIONS: Record<string, number> = {
  n5: 45,
  n4: 52,
  n3: 57,
  n2: 65,
  n1: 70,
};

// A quiz set is considered "new" if created within this many days
export const QUIZ_SET_NEW_DAYS = 14;
