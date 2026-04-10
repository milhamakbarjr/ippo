import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n2-grammar',
  title: 'N2 Grammar Quiz',
  level: 'n2',
  category: 'grammar',
  questions: [
    {
      id: 'n2-grammar-1',
      questionText: '大雨（　　）、試合は予定通りに行われた。',
      options: [
        { id: 'a', text: 'にもかかわらず', isCorrect: true },
        { id: 'b', text: 'にともなって', isCorrect: false },
        { id: 'c', text: 'をめぐって', isCorrect: false },
        { id: 'd', text: 'に対して', isCorrect: false },
      ],
      explanation: '"〜にもかかわらず" berarti "meskipun〜 / terlepas dari〜". "大雨にもかかわらず試合が行われた" = meskipun hujan lebat, pertandingan tetap berlangsung. Mengekspresikan kontradiksi antara kondisi dan hasil.',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-grammar-2',
      questionText: '若者の意見（　　）、政府は新しい政策を発表した。',
      options: [
        { id: 'a', text: 'に対して', isCorrect: true },
        { id: 'b', text: 'にともなって', isCorrect: false },
        { id: 'c', text: 'にもかかわらず', isCorrect: false },
        { id: 'd', text: 'をとおして', isCorrect: false },
      ],
      explanation: '"〜に対して" berarti "terhadap〜 / merespons〜". "若者の意見に対して政策を発表する" = mengumumkan kebijakan sebagai respons terhadap pendapat anak muda. Menyatakan hubungan respons atau kontras.',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-grammar-3',
      questionText: '新しい道路の建設（　　）、住民たちの議論が続いている。',
      options: [
        { id: 'a', text: 'をめぐって', isCorrect: true },
        { id: 'b', text: 'に対して', isCorrect: false },
        { id: 'c', text: 'にともなって', isCorrect: false },
        { id: 'd', text: 'にもかかわらず', isCorrect: false },
      ],
      explanation: '"〜をめぐって" berarti "seputar〜 / berkaitan dengan (kontroversi)〜". Digunakan saat ada perdebatan atau perselisihan mengenai suatu topik. "建設をめぐって議論が続く" = perdebatan terus berlanjut seputar pembangunan.',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-grammar-4',
      questionText: '経済の発展（　　）、環境問題も深刻になってきた。',
      options: [
        { id: 'a', text: 'に伴って', isCorrect: true },
        { id: 'b', text: 'にもかかわらず', isCorrect: false },
        { id: 'c', text: 'をめぐって', isCorrect: false },
        { id: 'd', text: 'に対して', isCorrect: false },
      ],
      explanation: '"〜に伴って（にともなって）" berarti "seiring dengan〜 / bersamaan dengan perkembangan〜". "経済の発展に伴って環境問題が深刻になる" = seiring kemajuan ekonomi, masalah lingkungan pun semakin serius.',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-grammar-5',
      questionText: 'もし わたしが しゃちょうだった（　　）、まず しゃいんの きゅうりょうを あげる。',
      options: [
        { id: 'a', text: 'としたら', isCorrect: true },
        { id: 'b', text: 'にしては', isCorrect: false },
        { id: 'c', text: 'にすれば', isCorrect: false },
        { id: 'd', text: 'としても', isCorrect: false },
      ],
      explanation: '"〜としたら" berarti "kalau seandainya〜 / andaikan〜". Mengekspresikan kondisi hipotetis. "もし〜だったとしたら" = andaikan saya adalah direktur. "としても" = bahkan jika, "にしては" = mengingat fakta bahwa.',
      category: 'grammar',
      level: 'n2',
    },
  ],
};

export default quiz;
