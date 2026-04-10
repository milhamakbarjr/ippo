import type { AssessmentQuestion } from '@/types/assessment';

export const questions: AssessmentQuestion[] = [
  {
    id: 'q1-hiragana',
    level: 'kana',
    category: 'kana',
    questionText: 'Mana yang merupakan hiragana untuk "hi"?',
    questionTextEn: 'Which is the hiragana for "hi"?',
    options: [
      { id: 'q1-a', text: 'は', isCorrect: false },
      { id: 'q1-b', text: 'ひ', isCorrect: true },
      { id: 'q1-c', text: 'へ', isCorrect: false },
      { id: 'q1-d', text: 'ほ', isCorrect: false },
    ],
    explanation: 'ひ (hi) adalah hiragana untuk suku kata "hi".',
  },
  {
    id: 'q2-katakana',
    level: 'kana',
    category: 'kana',
    questionText: 'Mana yang merupakan katakana untuk "ka"?',
    questionTextEn: 'Which is the katakana for "ka"?',
    options: [
      { id: 'q2-a', text: 'カ', isCorrect: true },
      { id: 'q2-b', text: 'ケ', isCorrect: false },
      { id: 'q2-c', text: 'コ', isCorrect: false },
      { id: 'q2-d', text: 'キ', isCorrect: false },
    ],
    explanation: 'カ (ka) adalah katakana untuk suku kata "ka".',
  },
  {
    id: 'q3-n5-vocab',
    level: 'n5',
    category: 'vocab',
    questionText: 'Apa arti kata "水 (みず)" dalam bahasa Indonesia?',
    questionTextEn: 'What does "水 (みず)" mean?',
    options: [
      { id: 'q3-a', text: 'Api', isCorrect: false },
      { id: 'q3-b', text: 'Angin', isCorrect: false },
      { id: 'q3-c', text: 'Air', isCorrect: true },
      { id: 'q3-d', text: 'Tanah', isCorrect: false },
    ],
    explanation: '水 (みず) berarti "air" dalam bahasa Indonesia.',
  },
  {
    id: 'q4-n4-grammar',
    level: 'n4',
    category: 'grammar',
    questionText: 'Pilih kalimat yang benar: "Saya sudah selesai makan ___."',
    questionTextEn: 'Choose the correct sentence form: "I have finished eating ___."',
    options: [
      { id: 'q4-a', text: '食べている', isCorrect: false },
      { id: 'q4-b', text: '食べた', isCorrect: false },
      { id: 'q4-c', text: '食べてしまった', isCorrect: true },
      { id: 'q4-d', text: '食べる', isCorrect: false },
    ],
    explanation: '〜てしまった menunjukkan tindakan yang sudah selesai (sering dengan nuansa penyesalan atau penyelesaian).',
  },
  {
    id: 'q5-n3-kanji',
    level: 'n3',
    category: 'kanji',
    questionText: 'Bagaimana cara membaca kanji "場合"?',
    questionTextEn: 'How do you read the kanji "場合"?',
    options: [
      { id: 'q5-a', text: 'ばあい', isCorrect: true },
      { id: 'q5-b', text: 'じょうごう', isCorrect: false },
      { id: 'q5-c', text: 'ばごう', isCorrect: false },
      { id: 'q5-d', text: 'じょうあい', isCorrect: false },
    ],
    explanation: '場合 (ばあい) berarti "dalam kasus" atau "situasi".',
  },
];
