import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n5-grammar',
  title: 'N5 Grammar Quiz',
  level: 'n5',
  category: 'grammar',
  questions: [
    {
      id: 'n5-grammar-1',
      questionText: 'わたし（　　）がくせいです。',
      options: [
        { id: 'a', text: 'は', isCorrect: true },
        { id: 'b', text: 'が', isCorrect: false },
        { id: 'c', text: 'を', isCorrect: false },
        { id: 'd', text: 'に', isCorrect: false },
      ],
      explanation: 'Partikel "は" digunakan untuk menandai topik kalimat. "わたしは〜です" = "Saya adalah〜". Partikel "が" menandai subjek gramatikal, sedangkan "は" lebih umum untuk perkenalan diri.',
      category: 'grammar',
      level: 'n5',
    },
    {
      id: 'n5-grammar-2',
      questionText: 'まいにち にほんご（　　）べんきょうします。',
      options: [
        { id: 'a', text: 'を', isCorrect: true },
        { id: 'b', text: 'は', isCorrect: false },
        { id: 'c', text: 'が', isCorrect: false },
        { id: 'd', text: 'で', isCorrect: false },
      ],
      explanation: 'Partikel "を" menandai objek langsung dari kata kerja transitif. "べんきょうします（勉強します）" = belajar, dan objeknya adalah "にほんご（日本語）" = bahasa Jepang.',
      category: 'grammar',
      level: 'n5',
    },
    {
      id: 'n5-grammar-3',
      questionText: 'いま、テレビを（　　）。',
      options: [
        { id: 'a', text: 'みています', isCorrect: true },
        { id: 'b', text: 'みました', isCorrect: false },
        { id: 'c', text: 'みます', isCorrect: false },
        { id: 'd', text: 'みません', isCorrect: false },
      ],
      explanation: '"〜ています" menunjukkan aksi yang sedang berlangsung saat ini. "いま" = sekarang, jadi bentuk progresif "みています" (sedang menonton) adalah yang paling tepat.',
      category: 'grammar',
      level: 'n5',
    },
    {
      id: 'n5-grammar-4',
      questionText: 'にほんへ（　　）たいです。',
      options: [
        { id: 'a', text: 'いき', isCorrect: true },
        { id: 'b', text: 'いく', isCorrect: false },
        { id: 'c', text: 'いって', isCorrect: false },
        { id: 'd', text: 'いった', isCorrect: false },
      ],
      explanation: '"〜たい" mengekspresikan keinginan. Pola ini memerlukan bentuk masu-stem (連用形) dari kata kerja: "いき（行き）＋たい" = ingin pergi. Bukan bentuk kamus atau te-form.',
      category: 'grammar',
      level: 'n5',
    },
    {
      id: 'n5-grammar-5',
      questionText: 'すみません、もう すこし ゆっくり （　　）ください。',
      options: [
        { id: 'a', text: 'はなして', isCorrect: true },
        { id: 'b', text: 'はなす', isCorrect: false },
        { id: 'c', text: 'はなした', isCorrect: false },
        { id: 'd', text: 'はなし', isCorrect: false },
      ],
      explanation: '"〜てください" adalah bentuk permintaan sopan. Gunakan te-form dari kata kerja: "はなす（話す）" → "はなして（話して）＋ください" = tolong bicaralah (lebih pelan).',
      category: 'grammar',
      level: 'n5',
    },
  ],
};

export default quiz;
