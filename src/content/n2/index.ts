import type { Level } from '@/types/learning';

export const level: Level = {
  id: 'n2',
  label: 'N2',
  description:
    'Target utama untuk visa kerja Jepang — kuasai 1000 kanji, tata bahasa lanjutan, bahasa bisnis, dan simulasi ujian JLPT N2.',
  estimatedWeeks: 20,
  estimatedMonthsToN2: '3-6 bulan',
  steps: [
    {
      slug: 'n2-kanji-1000',
      title: 'Kanji N2 (1000 Kanji)',
      titleEn: 'N2 Kanji (1000 Characters)',
      description:
        'Pelajari 1000 kanji JLPT N2 (kumulatif). Kanji baru di level ini mencakup karakter yang sering muncul dalam dokumen bisnis, berita, dan teks akademis: 議、論、評、批、較、収、益、損、契、約、規、則、違、反、権、義、務、責、任、従。',
      descriptionEn:
        'Learn 1000 JLPT N2 kanji (cumulative). New kanji at this level include characters frequently seen in business documents, news, and academic texts: 議、論、評、批、較、収、益、損、契、約、規、則、違、反、権、義、務、責、任、従.',
      estimatedMinutes: 75,
      category: 'kanji',
      resources: [
        {
          title: 'Kanji N2 — JLPT Sensei',
          titleEn: 'N2 Kanji — JLPT Sensei',
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
          title: 'Kartu Flashcard Anki — Deck JLPT N2',
          titleEn: 'Anki Flashcards — JLPT N2 Deck',
          url: 'https://apps.ankiweb.net/',
          type: 'tool',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n2-advanced-grammar',
      title: 'Tata Bahasa Lanjutan N2',
      titleEn: 'N2 Advanced Grammar',
      description:
        'Kuasai pola tata bahasa N2 yang kompleks: 〜をはじめ (dimulai dari/termasuk), 〜に加えて (selain itu), 〜にもかかわらず (meskipun), 〜に伴って (seiring dengan), 〜に際して (pada saat), 〜をめぐって (seputar), 〜を通じて (melalui).',
      descriptionEn:
        'Master complex N2 grammar patterns: 〜をはじめ (starting from/including), 〜に加えて (in addition to), 〜にもかかわらず (despite), 〜に伴って (along with), 〜に際して (upon/at the time of), 〜をめぐって (surrounding/over), 〜を通じて (through/throughout).',
      estimatedMinutes: 60,
      category: 'grammar',
      resources: [
        {
          title: 'Tata Bahasa N2 — JLPT Sensei',
          titleEn: 'N2 Grammar — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Nihongo no Mori — Kelas N2 di YouTube',
          titleEn: 'Nihongo no Mori — N2 Classes on YouTube',
          url: 'https://www.youtube.com/c/nihongonomori',
          type: 'video',
          language: 'ja',
        },
        {
          title: 'Bunpo — Aplikasi Tata Bahasa Jepang',
          titleEn: 'Bunpo — Japanese Grammar App',
          url: 'https://bunpo.app/',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'JLPT Resmi — Referensi',
          titleEn: 'Official JLPT — Reference',
          url: 'https://www.jlpt.jp/e/',
          type: 'article',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n2-business-japanese',
      title: 'Bahasa Jepang Bisnis',
      titleEn: 'Business Japanese',
      description:
        'Pelajari kosakata dan ekspresi bahasa Jepang untuk lingkungan kerja: keigo bisnis (敬語), surat bisnis (ビジネスメール), laporan (報告), instruksi (指示), dan rapat (会議) dengan ungkapan formal yang tepat.',
      descriptionEn:
        'Learn Japanese vocabulary and expressions for the workplace: business keigo (敬語), business letters (ビジネスメール), reports (報告), instructions (指示), and meetings (会議) with appropriate formal language.',
      estimatedMinutes: 50,
      category: 'vocabulary',
      resources: [
        {
          title: 'Nihongo no Mori — Bahasa Bisnis di YouTube',
          titleEn: 'Nihongo no Mori — Business Japanese on YouTube',
          url: 'https://www.youtube.com/c/nihongonomori',
          type: 'video',
          language: 'ja',
        },
        {
          title: 'Pelajari Bahasa Jepang — NHK World',
          titleEn: 'Learn Japanese — NHK World',
          url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Kartu Flashcard Anki — Deck Bisnis Jepang',
          titleEn: 'Anki Flashcards — Business Japanese Deck',
          url: 'https://apps.ankiweb.net/',
          type: 'tool',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n2-reading-advanced',
      title: 'Membaca Teks Lanjutan',
      titleEn: 'Advanced Reading Comprehension',
      description:
        'Latihan membaca teks N2 yang panjang dan kompleks: artikel opini, esai akademis, dan laporan bisnis. Fokus pada pemahaman argumen, nada penulis, dan struktur logika teks.',
      descriptionEn:
        'Practice reading long and complex N2 texts: opinion articles, academic essays, and business reports. Focus on understanding arguments, author tone, and logical text structure.',
      estimatedMinutes: 55,
      category: 'reading',
      resources: [
        {
          title: 'Berita NHK — Teks Asli Bahasa Jepang',
          titleEn: 'NHK News — Authentic Japanese Text',
          url: 'https://www3.nhk.or.jp/news/easy/',
          type: 'article',
          language: 'ja',
        },
        {
          title: 'Latihan Membaca N2 — JLPT Sensei',
          titleEn: 'N2 Reading Practice — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'JLPT Resmi — Contoh Soal N2',
          titleEn: 'Official JLPT — N2 Sample Questions',
          url: 'https://www.jlpt.jp/e/',
          type: 'article',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n2-listening-advanced',
      title: 'Mendengarkan Lanjutan N2',
      titleEn: 'N2 Advanced Listening',
      description:
        'Latihan mendengarkan siaran berita, diskusi panel, dan percakapan formal setara N2. Fokus pada memahami topik abstrak, niat implisit, dan transisi topik dalam percakapan panjang.',
      descriptionEn:
        'Practice listening to news broadcasts, panel discussions, and formal conversations at N2 level. Focus on understanding abstract topics, implicit intent, and topic transitions in extended conversations.',
      estimatedMinutes: 45,
      category: 'reading',
      resources: [
        {
          title: 'Nihongo no Mori — Mendengarkan N2 di YouTube',
          titleEn: 'Nihongo no Mori — N2 Listening on YouTube',
          url: 'https://www.youtube.com/c/nihongonomori',
          type: 'video',
          language: 'ja',
        },
        {
          title: 'Pelajari Bahasa Jepang — NHK World',
          titleEn: 'Learn Japanese — NHK World',
          url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/',
          type: 'video',
          language: 'en',
        },
        {
          title: 'JLPT Resmi — Contoh Soal Mendengarkan N2',
          titleEn: 'Official JLPT — N2 Sample Listening Questions',
          url: 'https://www.jlpt.jp/e/',
          type: 'article',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n2-vocabulary-3000',
      title: 'Kosakata N2 (3000 Kata)',
      titleEn: 'N2 Vocabulary (3000 Words)',
      description:
        'Pelajari 3000 kosakata kumulatif JLPT N2. Fokus pada sinonim (類義語), antonim (反義語), kata majemuk (複合語), dan kosakata formal yang sering muncul dalam teks N2.',
      descriptionEn:
        'Learn 3000 cumulative JLPT N2 vocabulary words. Focus on synonyms (類義語), antonyms (反義語), compound words (複合語), and formal vocabulary that frequently appears in N2 texts.',
      estimatedMinutes: 70,
      category: 'vocabulary',
      resources: [
        {
          title: 'Kosakata N2 — JLPT Sensei',
          titleEn: 'N2 Vocabulary — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Kartu Flashcard Anki — Deck JLPT N2',
          titleEn: 'Anki Flashcards — JLPT N2 Deck',
          url: 'https://apps.ankiweb.net/',
          type: 'tool',
          language: 'en',
        },
        {
          title: 'WaniKani — Belajar Kanji & Kosakata',
          titleEn: 'WaniKani — Kanji & Vocabulary Learning',
          url: 'https://www.wanikani.com/',
          type: 'interactive',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n2-mock-exam',
      title: 'Simulasi Ujian JLPT N2',
      titleEn: 'JLPT N2 Mock Exam',
      description:
        'Kerjakan simulasi ujian JLPT N2 lengkap mencakup semua bagian: 言語知識（文字・語彙・文法）、読解、dan 聴解. Evaluasi hasil dan identifikasi area yang perlu diperkuat.',
      descriptionEn:
        'Complete a full JLPT N2 mock exam covering all sections: 言語知識 (Language Knowledge — characters, vocabulary, grammar), 読解 (Reading Comprehension), and 聴解 (Listening Comprehension). Evaluate results and identify areas for improvement.',
      estimatedMinutes: 90,
      category: 'reading',
      resources: [
        {
          title: 'JLPT Resmi — Contoh Soal N2',
          titleEn: 'Official JLPT — N2 Sample Questions',
          url: 'https://www.jlpt.jp/e/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Nihongo no Mori — Persiapan N2',
          titleEn: 'Nihongo no Mori — N2 Preparation',
          url: 'https://www.youtube.com/c/nihongonomori',
          type: 'video',
          language: 'ja',
        },
        {
          title: 'JLPT Sensei — Simulasi N2',
          titleEn: 'JLPT Sensei — N2 Practice Tests',
          url: 'https://jlptsensei.com/',
          type: 'interactive',
          language: 'en',
        },
      ],
    },
  ],
};

export default level;
