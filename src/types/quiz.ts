export type QuizQuestion = {
  id: string;
  questionText: string;       // Japanese question shown to user
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  explanation: string;        // Indonesian explanation shown after answer
  category: 'vocab' | 'kanji' | 'grammar' | 'reading';
  level: 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
};

export type QuizContent = {
  slug: string;
  title: string;
  level: 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
  category: 'vocab' | 'kanji' | 'grammar' | 'reading';
  questions: QuizQuestion[];
};

export type QuizSessionAnswer = {
  questionId: string;
  selectedOptionId: string;
  correct: boolean;
};

export type QuizScoreResult = {
  quizSlug: string;
  score: number;
  total: number;
  percentage: number;
  quizResultId?: string;
};

export function calculateQuizScore(
  questions: QuizQuestion[],
  answers: Record<string, string>
): { score: number; total: number; percentage: number } {
  const total = questions.length;
  const score = questions.filter(
    (q) => q.options.find((o) => o.id === answers[q.id])?.isCorrect === true
  ).length;
  return { score, total, percentage: Math.round((score / total) * 100) };
}
