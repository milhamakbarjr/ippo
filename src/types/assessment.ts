export type JLPTLevel = 'kana' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
export type QuestionCategory = 'kana' | 'vocab' | 'grammar' | 'kanji';

export type AssessmentQuestion = {
  id: string;
  level: JLPTLevel;
  questionText: string;
  questionTextEn?: string;
  category: QuestionCategory;
  options: Array<{
    id: string;
    text: string;
    textEn?: string;
    isCorrect: boolean;
  }>;
  explanation?: string;
  explanationEn?: string;
};

export type AssessmentResponse = {
  questionId: string;
  selectedOptionId: string;
  answeredAt: number;
};

export type AssessmentResult = {
  assessedLevel: JLPTLevel;
  score: number;
  totalQuestions: number;
  categoryBreakdown: {
    kana: number;
    vocab: number;
    grammar: number;
    kanji: number;
  };
  completedAt: number;
};

export type AssessmentDraft = {
  answers: Record<string, string>;
  currentQuestion: number;
  startedAt: number;
  savedAt: number;
};
