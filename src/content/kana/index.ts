import type { Level } from '@/types/learning';

export const level: Level = {
  id: 'kana',
  label: 'KANA',
  description: 'Kuasai hiragana dan katakana sebagai fondasi bahasa Jepang.',
  estimatedWeeks: 4,
  estimatedMonthsToN2: '18-24 bulan',
  steps: [
    {
      slug: 'hiragana-gojuuon',
      title: 'Hiragana Gojuuon',
      titleEn: 'Hiragana Gojuuon (Basic 46)',
      description:
        'Pelajari 46 karakter hiragana dasar (あいうえお、かきくけこ, dst.) beserta cara membaca dan menulisnya.',
      descriptionEn:
        'Learn the 46 basic hiragana characters (あいうえお, かきくけこ, etc.) including how to read and write them.',
      estimatedMinutes: 15,
      category: 'kana',
      resources: [
        {
          title: 'Pelajari Hiragana — NHK World',
          titleEn: 'Learn Hiragana — NHK World',
          url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Latihan Hiragana Interaktif — RealKana',
          titleEn: 'Hiragana Interactive Practice — RealKana',
          url: 'https://realkana.com/hiragana/',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'Video Hiragana Lengkap — YouTube',
          titleEn: 'Complete Hiragana Video — YouTube',
          url: 'https://www.youtube.com/watch?v=6p9Il_j0zjc',
          type: 'video',
          language: 'en',
        },
        {
          title: 'Panduan Kana — JapanesePod101',
          titleEn: 'Kana Guide — JapanesePod101',
          url: 'https://www.japanesepod101.com/japanese-alphabet/',
          type: 'article',
          language: 'en',
        },
      ],
    },
    {
      slug: 'hiragana-dakuten-youon',
      title: 'Hiragana Dakuten & Youon',
      titleEn: 'Hiragana Dakuten & Youon (Voiced & Compound)',
      description:
        'Pelajari hiragana dengan tanda dakuten (が、ざ、だ、ば) dan youon (きゃ、きゅ、きょ) untuk melengkapi sistem hiragana.',
      descriptionEn:
        'Learn hiragana with dakuten marks (が、ざ、だ、ば) and youon contractions (きゃ、きゅ、きょ) to complete the hiragana system.',
      estimatedMinutes: 20,
      category: 'kana',
      resources: [
        {
          title: 'Panduan Tata Bahasa Tae Kim — Kana',
          titleEn: "Tae Kim's Grammar Guide — Kana",
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Latihan Hiragana Interaktif — RealKana',
          titleEn: 'Hiragana Interactive Practice — RealKana',
          url: 'https://realkana.com/hiragana/',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'Panduan Kana — JapanesePod101',
          titleEn: 'Kana Guide — JapanesePod101',
          url: 'https://www.japanesepod101.com/japanese-alphabet/',
          type: 'article',
          language: 'en',
        },
      ],
    },
    {
      slug: 'katakana-gojuuon',
      title: 'Katakana Gojuuon',
      titleEn: 'Katakana Gojuuon (Basic 46)',
      description:
        'Pelajari 46 karakter katakana dasar (ア、イ、ウ、エ、オ、カ、キ, dst.) yang digunakan untuk kata serapan dan nama asing.',
      descriptionEn:
        'Learn the 46 basic katakana characters (ア、イ、ウ、エ、オ、カ、キ, etc.) used for loanwords and foreign names.',
      estimatedMinutes: 15,
      category: 'kana',
      resources: [
        {
          title: 'Pelajari Katakana — NHK World',
          titleEn: 'Learn Katakana — NHK World',
          url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Latihan Katakana Interaktif — RealKana',
          titleEn: 'Katakana Interactive Practice — RealKana',
          url: 'https://realkana.com/katakana/',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'Video Katakana Lengkap — YouTube',
          titleEn: 'Complete Katakana Video — YouTube',
          url: 'https://www.youtube.com/watch?v=s6DKRgtVLGA',
          type: 'video',
          language: 'en',
        },
        {
          title: 'Panduan Kana — JapanesePod101',
          titleEn: 'Kana Guide — JapanesePod101',
          url: 'https://www.japanesepod101.com/japanese-alphabet/',
          type: 'article',
          language: 'en',
        },
      ],
    },
    {
      slug: 'katakana-dakuten-youon',
      title: 'Katakana Dakuten & Youon',
      titleEn: 'Katakana Dakuten & Youon (Voiced & Compound)',
      description:
        'Pelajari katakana dengan tanda dakuten (ガ、ザ、ダ、バ) dan youon (キャ、キュ、キョ) beserta kombinasi untuk kata pinjaman modern.',
      descriptionEn:
        'Learn katakana with dakuten marks (ガ、ザ、ダ、バ) and youon (キャ、キュ、キョ) including modern loanword combinations.',
      estimatedMinutes: 20,
      category: 'kana',
      resources: [
        {
          title: 'Latihan Katakana Interaktif — RealKana',
          titleEn: 'Katakana Interactive Practice — RealKana',
          url: 'https://realkana.com/katakana/',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'Panduan Tata Bahasa Tae Kim — Kana',
          titleEn: "Tae Kim's Grammar Guide — Kana",
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Video Katakana Lengkap — YouTube',
          titleEn: 'Complete Katakana Video — YouTube',
          url: 'https://www.youtube.com/watch?v=s6DKRgtVLGA',
          type: 'video',
          language: 'en',
        },
      ],
    },
    {
      slug: 'kana-reading-practice',
      title: 'Latihan Membaca Kana',
      titleEn: 'Kana Reading Practice',
      description:
        'Latihan membaca teks pendek menggunakan hiragana dan katakana. Fokus pada kecepatan dan akurasi membaca kata-kata umum.',
      descriptionEn:
        'Practice reading short texts using hiragana and katakana. Focus on speed and accuracy when reading common words.',
      estimatedMinutes: 30,
      category: 'reading',
      resources: [
        {
          title: 'Latihan Membaca — Duolingo Jepang',
          titleEn: 'Reading Practice — Duolingo Japanese',
          url: 'https://www.duolingo.com/course/ja/en/Learn-Japanese',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'Latihan Hiragana — RealKana',
          titleEn: 'Hiragana Practice — RealKana',
          url: 'https://realkana.com/hiragana/',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'Latihan Katakana — RealKana',
          titleEn: 'Katakana Practice — RealKana',
          url: 'https://realkana.com/katakana/',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'Pelajari Bahasa Jepang — NHK World',
          titleEn: 'Learn Japanese — NHK World',
          url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/',
          type: 'article',
          language: 'en',
        },
      ],
    },
    {
      slug: 'kana-vocabulary',
      title: 'Kosakata Kana Dasar',
      titleEn: 'Basic Kana Vocabulary',
      description:
        'Pelajari kosakata dasar yang ditulis dalam hiragana dan katakana, seperti: みず (air), パン (roti), テレビ (TV), アイスクリーム (es krim).',
      descriptionEn:
        'Learn basic vocabulary written in hiragana and katakana, such as: みず (water), パン (bread), テレビ (TV), アイスクリーム (ice cream).',
      estimatedMinutes: 25,
      category: 'vocabulary',
      resources: [
        {
          title: 'Kosakata Bahasa Jepang — Duolingo',
          titleEn: 'Japanese Vocabulary — Duolingo',
          url: 'https://www.duolingo.com/course/ja/en/Learn-Japanese',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'Panduan Kana — JapanesePod101',
          titleEn: 'Kana Guide — JapanesePod101',
          url: 'https://www.japanesepod101.com/japanese-alphabet/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Panduan Tata Bahasa Tae Kim',
          titleEn: "Tae Kim's Grammar Guide",
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
      ],
    },
  ],
};

export default level;
