import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n1-grammar',
  title: 'N1 Grammar Quiz',
  level: 'n1',
  category: 'grammar',
  questions: [
    {
      id: 'n1-grammar-1',
      questionText: 'あの選手は怪我（　　）、最後まで試合に出場し続けた。',
      options: [
        { id: 'a', text: 'をものともせず', isCorrect: true },
        { id: 'b', text: 'をよそに', isCorrect: false },
        { id: 'c', text: 'をかわきりに', isCorrect: false },
        { id: 'd', text: 'をもって', isCorrect: false },
      ],
      explanation: '"〜をものともせず" berarti "tanpa gentar terhadap〜 / meskipun menghadapi〜". Digunakan untuk menyatakan bahwa seseorang tidak terpengaruh oleh kesulitan. "怪我をものともせず" = tanpa gentar oleh cedera.',
      category: 'grammar',
      level: 'n1',
    },
    {
      id: 'n1-grammar-2',
      questionText: 'この伝統的な祭りは、京都（　　）の文化体験だ。',
      options: [
        { id: 'a', text: 'ならでは', isCorrect: true },
        { id: 'b', text: 'なりに', isCorrect: false },
        { id: 'c', text: 'ともなると', isCorrect: false },
        { id: 'd', text: 'に至っては', isCorrect: false },
      ],
      explanation: '"〜ならでは" berarti "hanya bisa di〜 / khas dari〜". Mengekspresikan sesuatu yang unik dan hanya ada di tempat atau situasi tertentu. "京都ならではの文化体験" = pengalaman budaya yang hanya bisa dialami di Kyoto.',
      category: 'grammar',
      level: 'n1',
    },
    {
      id: 'n1-grammar-3',
      questionText: '社長（　　）、全社員の名前を覚えていなければならない。',
      options: [
        { id: 'a', text: 'ともなると', isCorrect: true },
        { id: 'b', text: 'ならでは', isCorrect: false },
        { id: 'c', text: 'をおいて', isCorrect: false },
        { id: 'd', text: 'をものともせず', isCorrect: false },
      ],
      explanation: '"〜ともなると" berarti "kalau sudah menjadi〜 / mengingat posisi sebagai〜". Menyatakan bahwa pada tingkat atau posisi tertentu, ada ekspektasi yang lebih tinggi. "社長ともなると" = kalau sudah menjadi direktur.',
      category: 'grammar',
      level: 'n1',
    },
    {
      id: 'n1-grammar-4',
      questionText: 'このプロジェクトを任せられるのは、田中さん（　　）他にいない。',
      options: [
        { id: 'a', text: 'をおいて', isCorrect: true },
        { id: 'b', text: 'ともなると', isCorrect: false },
        { id: 'c', text: 'ならでは', isCorrect: false },
        { id: 'd', text: 'にひきかえ', isCorrect: false },
      ],
      explanation: '"〜をおいて他にない" berarti "tidak ada selain〜 / satu-satunya adalah〜". Digunakan untuk menekankan bahwa hanya satu orang atau hal yang cocok. "田中さんをおいて他にいない" = tidak ada selain Tanaka.',
      category: 'grammar',
      level: 'n1',
    },
    {
      id: 'n1-grammar-5',
      questionText: '彼は周囲の反対（　　）、独立して会社を設立した。',
      options: [
        { id: 'a', text: 'をよそに', isCorrect: true },
        { id: 'b', text: 'をものともせず', isCorrect: false },
        { id: 'c', text: 'をかわきりに', isCorrect: false },
        { id: 'd', text: 'をもって', isCorrect: false },
      ],
      explanation: '"〜をよそに" berarti "mengabaikan〜 / tanpa menghiraukan〜". Digunakan saat seseorang tidak peduli dengan pendapat atau kekhawatiran orang lain. "反対をよそに" = mengabaikan penentangan dari sekitar.',
      category: 'grammar',
      level: 'n1',
    },
  ],
};

export default quiz;
