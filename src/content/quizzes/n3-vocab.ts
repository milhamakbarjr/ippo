import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n3-vocab',
  title: 'N3 Vocabulary Quiz',
  level: 'n3',
  category: 'vocab',
  questions: [
    {
      id: 'n3-vocab-1',
      questionText: 'かれは かいがいで はたらいた（　　）がある。',
      options: [
        { id: 'a', text: '経験', isCorrect: true },
        { id: 'b', text: '印象', isCorrect: false },
        { id: 'c', text: '関係', isCorrect: false },
        { id: 'd', text: '目的', isCorrect: false },
      ],
      explanation: '"経験（けいけん）" berarti "pengalaman". "〜した経験がある" = punya pengalaman melakukan〜. "印象（いんしょう）" = kesan, "関係（かんけい）" = hubungan, "目的（もくてき）" = tujuan.',
      category: 'vocab',
      level: 'n3',
    },
    {
      id: 'n3-vocab-2',
      questionText: 'かれの スピーチは わたしに つよい（　　）をあたえた。',
      options: [
        { id: 'a', text: '印象', isCorrect: true },
        { id: 'b', text: '経験', isCorrect: false },
        { id: 'c', text: '機会', isCorrect: false },
        { id: 'd', text: '結果', isCorrect: false },
      ],
      explanation: '"印象（いんしょう）" berarti "kesan/impresi". "強い印象を与える" = memberikan kesan yang kuat. "機会（きかい）" = kesempatan, "結果（けっか）" = hasil.',
      category: 'vocab',
      level: 'n3',
    },
    {
      id: 'n3-vocab-3',
      questionText: 'にほんごを まなぶ（　　）が やっとできました。',
      options: [
        { id: 'a', text: '機会', isCorrect: true },
        { id: 'b', text: '目的', isCorrect: false },
        { id: 'c', text: '経験', isCorrect: false },
        { id: 'd', text: '理由', isCorrect: false },
      ],
      explanation: '"機会（きかい）" berarti "kesempatan". "〜する機会がやっとできた" = akhirnya mendapat kesempatan untuk〜. "目的" = tujuan, "理由（りゆう）" = alasan.',
      category: 'vocab',
      level: 'n3',
    },
    {
      id: 'n3-vocab-4',
      questionText: 'この プロジェクトの（　　）は かんきょう ほごです。',
      options: [
        { id: 'a', text: '目的', isCorrect: true },
        { id: 'b', text: '関係', isCorrect: false },
        { id: 'c', text: '印象', isCorrect: false },
        { id: 'd', text: '期間', isCorrect: false },
      ],
      explanation: '"目的（もくてき）" berarti "tujuan". "プロジェクトの目的" = tujuan proyek. "関係（かんけい）" = hubungan, "期間（きかん）" = periode/jangka waktu.',
      category: 'vocab',
      level: 'n3',
    },
    {
      id: 'n3-vocab-5',
      questionText: 'ふたりの あいだに どんな（　　）があるのか わからない。',
      options: [
        { id: 'a', text: '関係', isCorrect: true },
        { id: 'b', text: '経験', isCorrect: false },
        { id: 'c', text: '機会', isCorrect: false },
        { id: 'd', text: '目的', isCorrect: false },
      ],
      explanation: '"関係（かんけい）" berarti "hubungan/kaitan". "ふたりの間にどんな関係があるか" = hubungan seperti apa yang ada di antara keduanya.',
      category: 'vocab',
      level: 'n3',
    },
  ],
};

export default quiz;
