import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n5-vocab',
  title: 'N5 Vocabulary Quiz',
  level: 'n5',
  category: 'vocab',
  questions: [
    {
      id: 'n5-vocab-1',
      questionText: '「水」の読み方はどれですか。',
      options: [
        { id: 'a', text: 'みず', isCorrect: true },
        { id: 'b', text: 'ゆき', isCorrect: false },
        { id: 'c', text: 'かぜ', isCorrect: false },
        { id: 'd', text: 'ひ', isCorrect: false },
      ],
      explanation: '"水" dibaca "みず" yang berarti "air". "ゆき" = salju, "かぜ" = angin, "ひ" = api/hari.',
      category: 'vocab',
      level: 'n5',
    },
    {
      id: 'n5-vocab-2',
      questionText: 'わたしの（　　）は三人です。かぞく',
      options: [
        { id: 'a', text: '家族', isCorrect: true },
        { id: 'b', text: '友達', isCorrect: false },
        { id: 'c', text: '学生', isCorrect: false },
        { id: 'd', text: '先生', isCorrect: false },
      ],
      explanation: '"かぞく（家族）" berarti "keluarga". "友達（ともだち）" = teman, "学生（がくせい）" = pelajar, "先生（せんせい）" = guru.',
      category: 'vocab',
      level: 'n5',
    },
    {
      id: 'n5-vocab-3',
      questionText: 'まいあさ（　　）でがっこうにいきます。',
      options: [
        { id: 'a', text: '電車', isCorrect: true },
        { id: 'b', text: '飛行機', isCorrect: false },
        { id: 'c', text: '船', isCorrect: false },
        { id: 'd', text: '自転車', isCorrect: false },
      ],
      explanation: '"電車（でんしゃ）" berarti "kereta listrik". Pilihan paling umum untuk transportasi ke sekolah sehari-hari di Jepang. "飛行機" = pesawat, "船" = kapal, "自転車" = sepeda.',
      category: 'vocab',
      level: 'n5',
    },
    {
      id: 'n5-vocab-4',
      questionText: 'としょかんで（　　）をよみます。',
      options: [
        { id: 'a', text: '本', isCorrect: true },
        { id: 'b', text: '映画', isCorrect: false },
        { id: 'c', text: '音楽', isCorrect: false },
        { id: 'd', text: '料理', isCorrect: false },
      ],
      explanation: '"本（ほん）" berarti "buku". Di perpustakaan (としょかん), kita membaca buku. "映画" = film, "音楽" = musik, "料理" = masakan.',
      category: 'vocab',
      level: 'n5',
    },
    {
      id: 'n5-vocab-5',
      questionText: 'レストランで（　　）をたべました。',
      options: [
        { id: 'a', text: '食べ物', isCorrect: true },
        { id: 'b', text: '飲み物', isCorrect: false },
        { id: 'c', text: '乗り物', isCorrect: false },
        { id: 'd', text: '着物', isCorrect: false },
      ],
      explanation: '"食べ物（たべもの）" berarti "makanan". Wajar makan makanan di restoran. "飲み物" = minuman, "乗り物" = kendaraan, "着物" = kimono/pakaian.',
      category: 'vocab',
      level: 'n5',
    },
  ],
};

export default quiz;
