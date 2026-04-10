import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n3-grammar',
  title: 'N3 Grammar Quiz',
  level: 'n3',
  category: 'grammar',
  questions: [
    {
      id: 'n3-grammar-1',
      questionText: 'かんきょうを まもる（　　）、ごみを ぶんべつしています。',
      options: [
        { id: 'a', text: 'ために', isCorrect: true },
        { id: 'b', text: 'ように', isCorrect: false },
        { id: 'c', text: 'ながら', isCorrect: false },
        { id: 'd', text: 'くせに', isCorrect: false },
      ],
      explanation: '"〜ために" mengekspresikan tujuan yang dilakukan secara sadar. "環境を守るために" = demi menjaga lingkungan. "〜ように" digunakan untuk tujuan yang hasilnya tidak langsung dikontrol pelaku.',
      category: 'grammar',
      level: 'n3',
    },
    {
      id: 'n3-grammar-2',
      questionText: 'まいにち たんごを おぼえられる（　　）、アプリを つかっています。',
      options: [
        { id: 'a', text: 'ように', isCorrect: true },
        { id: 'b', text: 'ために', isCorrect: false },
        { id: 'c', text: 'ながら', isCorrect: false },
        { id: 'd', text: 'だけに', isCorrect: false },
      ],
      explanation: '"〜ように" digunakan ketika tujuan diekspresikan dengan kondisi/kemampuan yang ingin dicapai (potensiial/negatif). "覚えられる" = bisa mengingat (kata kerja potensial), sehingga "ように" lebih tepat dari "ために".',
      category: 'grammar',
      level: 'n3',
    },
    {
      id: 'n3-grammar-3',
      questionText: 'おんがくを きき（　　）、しゅくだいを しました。',
      options: [
        { id: 'a', text: 'ながら', isCorrect: true },
        { id: 'b', text: 'てから', isCorrect: false },
        { id: 'c', text: 'たあとで', isCorrect: false },
        { id: 'd', text: 'ために', isCorrect: false },
      ],
      explanation: '"〜ながら" menunjukkan dua aksi yang dilakukan secara bersamaan oleh subjek yang sama. Mendengarkan musik sambil mengerjakan PR dilakukan secara bersamaan. "てから" = setelah melakukan, "たあとで" = setelah selesai.',
      category: 'grammar',
      level: 'n3',
    },
    {
      id: 'n3-grammar-4',
      questionText: 'かれは にほんご（　　）えいごも はなせます。',
      options: [
        { id: 'a', text: 'ばかりでなく', isCorrect: true },
        { id: 'b', text: 'だけでなく', isCorrect: false },
        { id: 'c', text: 'しか', isCorrect: false },
        { id: 'd', text: 'ほど', isCorrect: false },
      ],
      explanation: 'Baik "〜ばかりでなく" maupun "〜だけでなく" berarti "tidak hanya〜, tapi juga〜". Keduanya benar secara gramatikal, namun "ばかりでなく" terasa lebih formal/N3. "しか" = hanya (dengan negatif), "ほど" = sejauh/sekira.',
      category: 'grammar',
      level: 'n3',
    },
    {
      id: 'n3-grammar-5',
      questionText: 'にほんごが じょうずに なったと いっても、まだ ぺらぺら（　　）。',
      options: [
        { id: 'a', text: 'わけではない', isCorrect: true },
        { id: 'b', text: 'はずがない', isCorrect: false },
        { id: 'c', text: 'にちがいない', isCorrect: false },
        { id: 'd', text: 'かもしれない', isCorrect: false },
      ],
      explanation: '"〜わけではない" berarti "bukan berarti〜 / tidak sampai ke tingkat〜". Meski bahasa Jepangnya sudah membaik, "bukan berarti sudah fasih". "はずがない" = mustahil, "にちがいない" = pasti, "かもしれない" = mungkin.',
      category: 'grammar',
      level: 'n3',
    },
  ],
};

export default quiz;
