import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n3-reading',
  title: 'N3 Reading Comprehension Quiz',
  level: 'n3',
  category: 'reading',
  questions: [
    {
      id: 'n3-reading-1',
      questionText: `田中さんは毎朝６時に起きます。シャワーを浴びてから、朝ごはんを食べます。そして、７時半に家を出て、電車で会社に行きます。\n\n田中さんは朝ごはんを食べる前に何をしますか。`,
      options: [
        { id: 'a', text: 'シャワーを浴びる', isCorrect: true },
        { id: 'b', text: '電車に乗る', isCorrect: false },
        { id: 'c', text: '家を出る', isCorrect: false },
        { id: 'd', text: '起きる', isCorrect: false },
      ],
      explanation: 'Teks menyebutkan urutan: bangun → mandi → sarapan → berangkat. Jadi sebelum sarapan, Tanaka-san mandi (シャワーを浴びる). "起きる" adalah yang paling pertama, bukan tepat sebelum makan.',
      category: 'reading',
      level: 'n3',
    },
    {
      id: 'n3-reading-2',
      questionText: `このレストランは月曜日から土曜日まで、午前１１時から午後１０時まで営業しています。日曜日と祝日はお休みです。ランチタイムは午前１１時から午後２時までです。\n\nこのレストランについて、正しいのはどれですか。`,
      options: [
        { id: 'a', text: '日曜日は休みだ', isCorrect: true },
        { id: 'b', text: '毎日営業している', isCorrect: false },
        { id: 'c', text: 'ランチは午後３時まで食べられる', isCorrect: false },
        { id: 'd', text: '午前９時から開いている', isCorrect: false },
      ],
      explanation: 'Teks menyebutkan "日曜日と祝日はお休みです" = hari Minggu dan hari libur nasional tutup. Restoran buka Senin–Sabtu pukul 11:00–22:00, dan lunch time hanya sampai pukul 14:00.',
      category: 'reading',
      level: 'n3',
    },
    {
      id: 'n3-reading-3',
      questionText: `山田さんはダイエットのために、毎日ジョギングを始めました。最初の週は１キロしか走れませんでしたが、１ヶ月後には５キロ走れるようになりました。\n\n山田さんについて、正しいのはどれですか。`,
      options: [
        { id: 'a', text: '１ヶ月でジョギングの距離が増えた', isCorrect: true },
        { id: 'b', text: '最初から５キロ走っていた', isCorrect: false },
        { id: 'c', text: 'ダイエットに失敗した', isCorrect: false },
        { id: 'd', text: 'ジョギングが嫌いだ', isCorrect: false },
      ],
      explanation: 'Teks menyebutkan awalnya hanya bisa berlari 1 km, tetapi setelah 1 bulan bisa 5 km. Jadi jarak larinya bertambah dalam 1 bulan. Teks tidak menyebutkan kegagalan diet atau ketidaksukaan jogging.',
      category: 'reading',
      level: 'n3',
    },
    {
      id: 'n3-reading-4',
      questionText: `佐藤さんは先週、友達の誕生日プレゼントを買いに行きました。デパートに行きましたが、気に入ったものが見つからなかったので、結局インターネットで注文しました。\n\n佐藤さんはどこでプレゼントを買いましたか。`,
      options: [
        { id: 'a', text: 'インターネットで', isCorrect: true },
        { id: 'b', text: 'デパートで', isCorrect: false },
        { id: 'c', text: '友達の家で', isCorrect: false },
        { id: 'd', text: 'スーパーで', isCorrect: false },
      ],
      explanation: 'Sato-san pergi ke department store tetapi tidak menemukan yang cocok ("気に入ったものが見つからなかった"). Akhirnya ("結局") ia memesan lewat internet. Jawaban yang benar adalah internet, bukan department store.',
      category: 'reading',
      level: 'n3',
    },
    {
      id: 'n3-reading-5',
      questionText: `私の町には小さな図書館があります。本の数は多くありませんが、静かで勉強しやすい場所です。週末になると、近所の子どもたちがよく来て、本を読んだり、宿題をしたりしています。\n\nこの図書館について、正しいのはどれですか。`,
      options: [
        { id: 'a', text: '静かで勉強に向いている', isCorrect: true },
        { id: 'b', text: '本がたくさんある', isCorrect: false },
        { id: 'c', text: '平日は子どもたちが来る', isCorrect: false },
        { id: 'd', text: '大きい図書館だ', isCorrect: false },
      ],
      explanation: 'Teks menyebutkan "静かで勉強しやすい場所" = tempat yang tenang dan mudah untuk belajar. Buku tidak banyak ("多くありません"), dan anak-anak datang saat akhir pekan ("週末"), bukan hari kerja.',
      category: 'reading',
      level: 'n3',
    },
  ],
};

export default quiz;
