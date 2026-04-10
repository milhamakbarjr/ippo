import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n4-vocab',
  title: 'N4 Vocabulary Quiz',
  level: 'n4',
  category: 'vocab',
  questions: [
    {
      id: 'n4-vocab-1',
      questionText: 'しけんに ごうかくして、とても（　　）です。',
      options: [
        { id: 'a', text: 'うれしい', isCorrect: true },
        { id: 'b', text: 'かなしい', isCorrect: false },
        { id: 'c', text: 'さびしい', isCorrect: false },
        { id: 'd', text: 'こわい', isCorrect: false },
      ],
      explanation: '"うれしい（嬉しい）" berarti "senang/gembira". Lulus ujian adalah hal yang membahagiakan. "かなしい" = sedih, "さびしい" = kesepian, "こわい" = takut.',
      category: 'vocab',
      level: 'n4',
    },
    {
      id: 'n4-vocab-2',
      questionText: 'この しごとは わたしに とって（　　）です。',
      options: [
        { id: 'a', text: '大切', isCorrect: true },
        { id: 'b', text: '心配', isCorrect: false },
        { id: 'c', text: '不便', isCorrect: false },
        { id: 'd', text: '残念', isCorrect: false },
      ],
      explanation: '"大切（たいせつ）" berarti "penting/berharga". Cocok untuk menyatakan bahwa pekerjaan ini penting bagi saya. "心配" = khawatir, "不便" = tidak nyaman, "残念" = sayang sekali.',
      category: 'vocab',
      level: 'n4',
    },
    {
      id: 'n4-vocab-3',
      questionText: 'かいぎに さんかするために しりょうを（　　）。',
      options: [
        { id: 'a', text: '集めました', isCorrect: true },
        { id: 'b', text: '決めました', isCorrect: false },
        { id: 'c', text: '送りました', isCorrect: false },
        { id: 'd', text: '受けました', isCorrect: false },
      ],
      explanation: '"集める（あつめる）" berarti "mengumpulkan". Mengumpulkan materi untuk rapat adalah tindakan yang logis. "決める" = memutuskan, "送る" = mengirim, "受ける" = menerima/mengikuti.',
      category: 'vocab',
      level: 'n4',
    },
    {
      id: 'n4-vocab-4',
      questionText: 'むずかしくても、べんきょうを（　　）ことが だいじです。',
      options: [
        { id: 'a', text: '続ける', isCorrect: true },
        { id: 'b', text: '始める', isCorrect: false },
        { id: 'c', text: '終わる', isCorrect: false },
        { id: 'd', text: '止める', isCorrect: false },
      ],
      explanation: '"続ける（つづける）" berarti "melanjutkan/meneruskan". Konteks kalimatnya adalah "meskipun sulit, penting untuk terus belajar". "始める" = mulai, "終わる" = selesai, "止める" = berhenti.',
      category: 'vocab',
      level: 'n4',
    },
    {
      id: 'n4-vocab-5',
      questionText: 'かれは びょうきで がっこうを（　　）しました。',
      options: [
        { id: 'a', text: '欠席', isCorrect: true },
        { id: 'b', text: '出席', isCorrect: false },
        { id: 'c', text: '入学', isCorrect: false },
        { id: 'd', text: '卒業', isCorrect: false },
      ],
      explanation: '"欠席（けっせき）" berarti "tidak hadir/absen". Karena sakit, dia tidak hadir di sekolah. "出席（しゅっせき）" = hadir, "入学（にゅうがく）" = masuk sekolah, "卒業（そつぎょう）" = lulus.',
      category: 'vocab',
      level: 'n4',
    },
  ],
};

export default quiz;
