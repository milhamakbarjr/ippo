import type { AssessmentQuestion, AssessmentResponse, AssessmentResult, JLPTLevel } from '@/types/assessment';

const levelMap: Record<number, JLPTLevel> = {
  0: 'kana',
  1: 'kana',
  2: 'kana',
  3: 'n5',
  4: 'n4',
  5: 'n3',
  6: 'n2',
  7: 'n1',
};

export function calculateLevel(
  responses: AssessmentResponse[],
  questions: AssessmentQuestion[]
): AssessmentResult {
  let correctCount = 0;
  const categoryBreakdown: AssessmentResult['categoryBreakdown'] = {
    kana: 0,
    vocab: 0,
    grammar: 0,
    kanji: 0,
  };

  for (const response of responses) {
    const question = questions.find((q) => q.id === response.questionId);
    if (!question) continue;

    const selectedOption = question.options.find(
      (o) => o.id === response.selectedOptionId
    );
    if (!selectedOption) continue;

    if (selectedOption.isCorrect) {
      correctCount++;
      categoryBreakdown[question.category]++;
    }
  }

  return {
    assessedLevel: levelMap[Math.min(correctCount, 7)],
    score: correctCount,
    totalQuestions: responses.length,
    categoryBreakdown,
    completedAt: Date.now(),
  };
}

// Level display info for UI
export const levelInfo: Record<
  JLPTLevel,
  {
    label: string;
    description: string;
    estimateToN2: string;
    firstStep: string;
    emoji: string;
  }
> = {
  kana: {
    label: 'Kana',
    description: 'Kamu baru memulai! Kuasai hiragana dan katakana dulu.',
    estimateToN2: '18-24 bulan',
    firstStep: 'Hiragana Gojuuon',
    emoji: '🌱',
  },
  n5: {
    label: 'N5',
    description: 'Kamu sudah kenal kana! Waktunya belajar kosakata dasar.',
    estimateToN2: '12-18 bulan',
    firstStep: 'N5 — Kosakata Dasar',
    emoji: '📖',
  },
  n4: {
    label: 'N4',
    description: 'Bagus! Kamu sudah paham dasar-dasar Jepang.',
    estimateToN2: '9-12 bulan',
    firstStep: 'N4 — Tata Bahasa',
    emoji: '⭐',
  },
  n3: {
    label: 'N3',
    description: 'Kamu di level menengah. Tinggal selangkah lagi ke N2!',
    estimateToN2: '6-9 bulan',
    firstStep: 'N3 — Kanji Menengah',
    emoji: '🔥',
  },
  n2: {
    label: 'N2',
    description: 'Luar biasa! Kamu hampir mencapai level visa kerja.',
    estimateToN2: '3-6 bulan',
    firstStep: 'N2 — Tata Bahasa Lanjutan',
    emoji: '🚀',
  },
  n1: {
    label: 'N1',
    description: 'Mahir! Kamu sudah di level tertinggi JLPT.',
    estimateToN2: 'Sudah tercapai!',
    firstStep: 'N1 — Pemahaman Lanjutan',
    emoji: '🏆',
  },
};
