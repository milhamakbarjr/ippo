import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n5-kanji',
  title: 'N5 Kanji Quiz',
  level: 'n5',
  category: 'kanji',
  questions: [
    {
      id: 'n5-kanji-1',
      questionText: '「山」の読み方はどれですか。',
      options: [
        { id: 'a', text: 'やま', isCorrect: true },
        { id: 'b', text: 'かわ', isCorrect: false },
        { id: 'c', text: 'うみ', isCorrect: false },
        { id: 'd', text: 'もり', isCorrect: false },
      ],
      explanation: '"山" dibaca "やま" yang berarti "gunung". "かわ（川）" = sungai, "うみ（海）" = laut, "もり（森）" = hutan.',
      category: 'kanji',
      level: 'n5',
    },
    {
      id: 'n5-kanji-2',
      questionText: '「火曜日」の「火」はどんな意味ですか。',
      options: [
        { id: 'a', text: 'api / Selasa', isCorrect: true },
        { id: 'b', text: 'air / Rabu', isCorrect: false },
        { id: 'c', text: 'kayu / Kamis', isCorrect: false },
        { id: 'd', text: 'bumi / Jumat', isCorrect: false },
      ],
      explanation: '"火（ひ）" berarti "api". "火曜日（かようび）" = Selasa. Hari-hari dalam bahasa Jepang menggunakan unsur: 月(bulan/Senin), 火(api/Selasa), 水(air/Rabu), 木(kayu/Kamis), 金(emas/Jumat), 土(tanah/Sabtu), 日(matahari/Minggu).',
      category: 'kanji',
      level: 'n5',
    },
    {
      id: 'n5-kanji-3',
      questionText: '「人口」の読み方はどれですか。',
      options: [
        { id: 'a', text: 'じんこう', isCorrect: true },
        { id: 'b', text: 'ひとくち', isCorrect: false },
        { id: 'c', text: 'じんぐち', isCorrect: false },
        { id: 'd', text: 'ひとこう', isCorrect: false },
      ],
      explanation: '"人口（じんこう）" berarti "populasi/jumlah penduduk". "人" dalam kata majemuk sering dibaca "じん" (on-yomi), dan "口" dibaca "こう". "ひとくち" berarti "satu tegukan/gigitan".',
      category: 'kanji',
      level: 'n5',
    },
    {
      id: 'n5-kanji-4',
      questionText: '「右手」の読み方はどれですか。',
      options: [
        { id: 'a', text: 'みぎて', isCorrect: true },
        { id: 'b', text: 'ひだりて', isCorrect: false },
        { id: 'c', text: 'みぎめ', isCorrect: false },
        { id: 'd', text: 'うて', isCorrect: false },
      ],
      explanation: '"右手（みぎて）" berarti "tangan kanan". "右（みぎ）" = kanan, "手（て）" = tangan. "ひだり（左）" = kiri, "め（目）" = mata.',
      category: 'kanji',
      level: 'n5',
    },
    {
      id: 'n5-kanji-5',
      questionText: '「川」の読み方はどれですか。',
      options: [
        { id: 'a', text: 'かわ', isCorrect: true },
        { id: 'b', text: 'やま', isCorrect: false },
        { id: 'c', text: 'はな', isCorrect: false },
        { id: 'd', text: 'いし', isCorrect: false },
      ],
      explanation: '"川" dibaca "かわ" yang berarti "sungai". "やま（山）" = gunung, "はな（花）" = bunga, "いし（石）" = batu.',
      category: 'kanji',
      level: 'n5',
    },
  ],
};

export default quiz;
