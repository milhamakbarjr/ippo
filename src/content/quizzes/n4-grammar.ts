import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n4-grammar',
  title: 'N4 Grammar Quiz',
  level: 'n4',
  category: 'grammar',
  questions: [
    {
      id: 'n4-grammar-1',
      questionText: 'さいふを わすれて（　　）、こまりました。',
      options: [
        { id: 'a', text: 'しまって', isCorrect: true },
        { id: 'b', text: 'おいて', isCorrect: false },
        { id: 'c', text: 'みて', isCorrect: false },
        { id: 'd', text: 'あげて', isCorrect: false },
      ],
      explanation: '"〜てしまう" mengekspresikan kejadian yang tidak diinginkan atau penyesalan. "わすれてしまって" = terlanjur lupa (dan menyesal). "〜ておく" = melakukan sebelumnya, "〜てみる" = mencoba, "〜てあげる" = melakukan untuk orang lain.',
      category: 'grammar',
      level: 'n4',
    },
    {
      id: 'n4-grammar-2',
      questionText: 'あした の かいぎの ために、しりょうを コピーして（　　）。',
      options: [
        { id: 'a', text: 'おきます', isCorrect: true },
        { id: 'b', text: 'しまいます', isCorrect: false },
        { id: 'c', text: 'あります', isCorrect: false },
        { id: 'd', text: 'います', isCorrect: false },
      ],
      explanation: '"〜ておく" berarti melakukan sesuatu sebagai persiapan untuk masa depan. Menyalin materi sebelum rapat besok adalah persiapan yang tepat.',
      category: 'grammar',
      level: 'n4',
    },
    {
      id: 'n4-grammar-3',
      questionText: 'この りょうりは はじめてなので、ちょっと たべて（　　）。',
      options: [
        { id: 'a', text: 'みます', isCorrect: true },
        { id: 'b', text: 'おきます', isCorrect: false },
        { id: 'c', text: 'しまいます', isCorrect: false },
        { id: 'd', text: 'きます', isCorrect: false },
      ],
      explanation: '"〜てみる" berarti mencoba melakukan sesuatu. Karena pertama kali mencoba masakan ini, "たべてみます" = mencoba memakannya sangat tepat.',
      category: 'grammar',
      level: 'n4',
    },
    {
      id: 'n4-grammar-4',
      questionText: 'もし やすみが（　　）、りょこうに いきたいです。',
      options: [
        { id: 'a', text: 'あったら', isCorrect: true },
        { id: 'b', text: 'あれば', isCorrect: false },
        { id: 'c', text: 'あるなら', isCorrect: false },
        { id: 'd', text: 'あっても', isCorrect: false },
      ],
      explanation: '"〜たら" menyatakan kondisi hipotetikal. "もし〜たら" = jika seandainya. Semua pilihan bisa menyatakan kondisi, tetapi "〜たら" adalah yang paling alami dengan "もし" dan mengekspresikan keinginan pribadi.',
      category: 'grammar',
      level: 'n4',
    },
    {
      id: 'n4-grammar-5',
      questionText: 'せんせいが わたしに かんじを おしえて（　　）。',
      options: [
        { id: 'a', text: 'くれました', isCorrect: true },
        { id: 'b', text: 'あげました', isCorrect: false },
        { id: 'c', text: 'もらいました', isCorrect: false },
        { id: 'd', text: 'やりました', isCorrect: false },
      ],
      explanation: '"〜てくれる" digunakan ketika seseorang (guru, dalam hal ini) melakukan sesuatu yang menguntungkan pembicara (saya). Guru → saya, sehingga "くれました" tepat. "あげる" = pembicara memberi ke orang lain, "もらう" = sudut pandang penerima.',
      category: 'grammar',
      level: 'n4',
    },
  ],
};

export default quiz;
