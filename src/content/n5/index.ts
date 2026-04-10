import type { Level } from '@/types/learning';

export const level: Level = {
  id: 'n5',
  label: 'N5',
  description:
    'Tingkat pemula JLPT — kuasai kana, 80 kanji dasar, tata bahasa sederhana, dan kosakata sehari-hari.',
  estimatedWeeks: 8,
  estimatedMonthsToN2: '14-20 bulan',
  steps: [
    {
      slug: 'n5-hiragana-mastery',
      title: 'Penguasaan Hiragana Penuh',
      titleEn: 'Full Hiragana Mastery',
      description:
        'Pastikan kemampuan membaca dan menulis seluruh hiragana (termasuk dakuten dan youon) secara lancar sebelum memulai N5.',
      descriptionEn:
        'Ensure fluent reading and writing of all hiragana (including dakuten and youon) before starting N5 content.',
      estimatedMinutes: 20,
      category: 'kana',
      resources: [
        {
          title: 'Latihan Hiragana — RealKana',
          titleEn: 'Hiragana Practice — RealKana',
          url: 'https://realkana.com/hiragana/',
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
          title: 'Pelajari Bahasa Jepang — NHK World',
          titleEn: 'Learn Japanese — NHK World',
          url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/',
          type: 'article',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n5-basic-kanji',
      title: 'Kanji Dasar N5 (80 Kanji)',
      titleEn: 'N5 Basic Kanji (80 Characters)',
      description:
        'Pelajari 80 kanji wajib JLPT N5, termasuk: 日、月、火、水、木、金、土、山、川、人、口、手、目、耳、本、学、先、生、年、大、小、中、上、下、右、左。',
      descriptionEn:
        'Learn the 80 required JLPT N5 kanji, including: 日、月、火、水、木、金、土、山、川、人、口、手、目、耳、本、学、先、生、年、大、小、中、上、下、右、左.',
      estimatedMinutes: 45,
      category: 'kanji',
      resources: [
        {
          title: 'Kanji N5 — JLPT Sensei',
          titleEn: 'N5 Kanji — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'WaniKani — Belajar Kanji Terstruktur',
          titleEn: 'WaniKani — Structured Kanji Learning',
          url: 'https://www.wanikani.com/',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'Kartu Flashcard Anki — Deck JLPT N5',
          titleEn: 'Anki Flashcards — JLPT N5 Deck',
          url: 'https://apps.ankiweb.net/',
          type: 'tool',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n5-numbers-time',
      title: 'Angka, Tanggal & Waktu',
      titleEn: 'Numbers, Dates & Time',
      description:
        'Kuasai angka (一、二、三…百、千、万), cara menyebut tanggal (〜月〜日), waktu (〜時〜分), dan hari dalam seminggu (月曜日〜日曜日).',
      descriptionEn:
        'Master numbers (一、二、三…百、千、万), how to express dates (〜月〜日), time (〜時〜分), and days of the week (月曜日〜日曜日).',
      estimatedMinutes: 30,
      category: 'vocabulary',
      resources: [
        {
          title: 'Angka & Waktu — JLPT Sensei',
          titleEn: 'Numbers & Time — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Tata Bahasa Dasar — Tae Kim',
          titleEn: 'Basic Grammar — Tae Kim',
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Bunpo — Aplikasi Tata Bahasa Jepang',
          titleEn: 'Bunpo — Japanese Grammar App',
          url: 'https://bunpo.app/',
          type: 'interactive',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n5-basic-grammar',
      title: 'Tata Bahasa Dasar: は、が、を、に',
      titleEn: 'Basic Grammar: は、が、を、に Particles',
      description:
        'Pelajari partikel dasar bahasa Jepang: は (topik), が (subjek), を (objek), に (tempat/tujuan/waktu), で (metode/tempat aktivitas), と (bersama), dan の (kepemilikan).',
      descriptionEn:
        'Learn basic Japanese particles: は (topic), が (subject), を (object), に (location/direction/time), で (method/location of action), と (together with), and の (possession).',
      estimatedMinutes: 40,
      category: 'grammar',
      resources: [
        {
          title: 'Partikel Bahasa Jepang — Tae Kim',
          titleEn: 'Japanese Particles — Tae Kim',
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Tata Bahasa N5 — JLPT Sensei',
          titleEn: 'N5 Grammar — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Bunpo — Aplikasi Tata Bahasa Jepang',
          titleEn: 'Bunpo — Japanese Grammar App',
          url: 'https://bunpo.app/',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'JLPT Resmi — Materi Referensi',
          titleEn: 'Official JLPT — Reference Materials',
          url: 'https://www.jlpt.jp/e/',
          type: 'article',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n5-adjectives-verbs',
      title: 'Kata Sifat & Kata Kerja Dasar',
      titleEn: 'Basic Adjectives & Verbs',
      description:
        'Pelajari kata sifat i (大きい、小さい、いい、悪い) dan na (好き、嫌い、きれい), serta kata kerja dasar (食べる、飲む、行く、来る、する) beserta konjugasinya.',
      descriptionEn:
        'Learn i-adjectives (大きい、小さい、いい、悪い) and na-adjectives (好き、嫌い、きれい), as well as basic verbs (食べる、飲む、行く、来る、する) with their conjugations.',
      estimatedMinutes: 35,
      category: 'vocabulary',
      resources: [
        {
          title: 'Kata Kerja & Kata Sifat — Tae Kim',
          titleEn: 'Verbs & Adjectives — Tae Kim',
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Kosakata N5 — JLPT Sensei',
          titleEn: 'N5 Vocabulary — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Kartu Flashcard Anki — Deck JLPT N5',
          titleEn: 'Anki Flashcards — JLPT N5 Deck',
          url: 'https://apps.ankiweb.net/',
          type: 'tool',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n5-daily-expressions',
      title: 'Ekspresi Sehari-hari',
      titleEn: 'Daily Expressions',
      description:
        'Kuasai frasa harian penting: あいさつ (salam), すみません (permisi), ありがとう (terima kasih), どこ (di mana), いくら (berapa harga), dan percakapan dasar lainnya.',
      descriptionEn:
        'Master essential daily phrases: あいさつ (greetings), すみません (excuse me), ありがとう (thank you), どこ (where), いくら (how much), and other basic conversations.',
      estimatedMinutes: 25,
      category: 'vocabulary',
      resources: [
        {
          title: 'Pelajari Bahasa Jepang — NHK World',
          titleEn: 'Learn Japanese — NHK World',
          url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Bunpo — Aplikasi Tata Bahasa Jepang',
          titleEn: 'Bunpo — Japanese Grammar App',
          url: 'https://bunpo.app/',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'Duolingo Bahasa Jepang',
          titleEn: 'Duolingo Japanese',
          url: 'https://www.duolingo.com/course/ja/en/Learn-Japanese',
          type: 'interactive',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n5-reading-comprehension',
      title: 'Membaca Teks N5',
      titleEn: 'N5 Reading Comprehension',
      description:
        'Latihan membaca teks pendek setara N5 seperti pengumuman sederhana, jadwal, dan dialog singkat. Fokus pada pemahaman konteks umum.',
      descriptionEn:
        'Practice reading short N5-level texts such as simple announcements, schedules, and brief dialogues. Focus on understanding general context.',
      estimatedMinutes: 30,
      category: 'reading',
      resources: [
        {
          title: 'Berita Mudah NHK — NHK Web Easy',
          titleEn: 'Easy Japanese News — NHK Web Easy',
          url: 'https://www3.nhk.or.jp/news/easy/',
          type: 'article',
          language: 'ja',
        },
        {
          title: 'Latihan Membaca N5 — JLPT Sensei',
          titleEn: 'N5 Reading Practice — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'JLPT Resmi — Contoh Soal',
          titleEn: 'Official JLPT — Sample Questions',
          url: 'https://www.jlpt.jp/e/',
          type: 'article',
          language: 'en',
        },
      ],
    },
  ],
};

export default level;
