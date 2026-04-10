import type { Level } from '@/types/learning';

export const level: Level = {
  id: 'n3',
  label: 'N3',
  description:
    'Tingkat menengah — kuasai 650 kanji, tata bahasa kompleks, bentuk pasif & kausatif, dan membaca artikel berita sederhana.',
  estimatedWeeks: 16,
  estimatedMonthsToN2: '7-12 bulan',
  steps: [
    {
      slug: 'n3-kanji-650',
      title: 'Kanji N3 (650 Kanji)',
      titleEn: 'N3 Kanji (650 Characters)',
      description:
        'Pelajari 650 kanji JLPT N3 (kumulatif termasuk N5 dan N4). Kanji baru di level ini mencakup: 全、部、者、的、定、特、由、期、際、連、情、現、問、題、決、確、続、提、報、増。',
      descriptionEn:
        'Learn 650 JLPT N3 kanji (cumulative including N5 and N4). New kanji at this level include: 全、部、者、的、定、特、由、期、際、連、情、現、問、題、決、確、続、提、報、増.',
      estimatedMinutes: 60,
      category: 'kanji',
      resources: [
        {
          title: 'Kanji N3 — JLPT Sensei',
          titleEn: 'N3 Kanji — JLPT Sensei',
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
          title: 'Kartu Flashcard Anki — Deck JLPT N3',
          titleEn: 'Anki Flashcards — JLPT N3 Deck',
          url: 'https://apps.ankiweb.net/',
          type: 'tool',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n3-grammar-intermediate',
      title: 'Tata Bahasa Menengah N3',
      titleEn: 'N3 Intermediate Grammar',
      description:
        'Pelajari pola tata bahasa N3 yang penting: 〜によると (menurut), 〜に対して (terhadap), 〜として (sebagai), 〜に関して (mengenai), 〜わけだ (itulah mengapa), 〜はずだ (seharusnya), 〜ものだ (sudah sewajarnya).',
      descriptionEn:
        'Learn important N3 grammar patterns: 〜によると (according to), 〜に対して (toward/against), 〜として (as/in the capacity of), 〜に関して (regarding), 〜わけだ (that is why), 〜はずだ (should be), 〜ものだ (it is natural that).',
      estimatedMinutes: 50,
      category: 'grammar',
      resources: [
        {
          title: 'Tata Bahasa N3 — JLPT Sensei',
          titleEn: 'N3 Grammar — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Tata Bahasa Menengah — Tae Kim',
          titleEn: 'Intermediate Grammar — Tae Kim',
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
      slug: 'n3-complex-sentences',
      title: 'Kalimat Kompleks & Subordinat',
      titleEn: 'Complex & Subordinate Sentences',
      description:
        'Kuasai struktur kalimat kompleks: klausa relatif (〜という、〜ような), conjunctions (〜ので、〜のに、〜けれど), dan pola seperti 〜ために (untuk tujuan), 〜ながら (sambil), 〜たり〜たり (kadang melakukan ini, kadang itu).',
      descriptionEn:
        'Master complex sentence structures: relative clauses (〜という、〜ような), conjunctions (〜ので、〜のに、〜けれど), and patterns like 〜ために (for the purpose of), 〜ながら (while doing), 〜たり〜たり (sometimes doing this, sometimes that).',
      estimatedMinutes: 45,
      category: 'grammar',
      resources: [
        {
          title: 'Kalimat Kompleks — Tae Kim',
          titleEn: 'Complex Sentences — Tae Kim',
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Tata Bahasa N3 — JLPT Sensei',
          titleEn: 'N3 Grammar — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
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
      slug: 'n3-passive-causative',
      title: 'Bentuk Pasif & Kausatif',
      titleEn: 'Passive & Causative Forms',
      description:
        'Pelajari bentuk pasif (受け身形: 〜られる — dikenai tindakan), kausatif (使役形: 〜させる — menyuruh orang lain melakukan), dan kausatif-pasif (使役受け身形: 〜させられる — terpaksa melakukan).',
      descriptionEn:
        'Learn passive form (受け身形: 〜られる — having action done to you), causative form (使役形: 〜させる — making someone do), and causative-passive (使役受け身形: 〜させられる — being made to do).',
      estimatedMinutes: 40,
      category: 'grammar',
      resources: [
        {
          title: 'Bentuk Pasif & Kausatif — Tae Kim',
          titleEn: 'Passive & Causative — Tae Kim',
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Tata Bahasa N3 — JLPT Sensei',
          titleEn: 'N3 Grammar — JLPT Sensei',
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
      ],
    },
    {
      slug: 'n3-reading-newspaper',
      title: 'Membaca Artikel Berita',
      titleEn: 'Reading News Articles',
      description:
        'Latihan membaca artikel berita berbahasa Jepang level N3. Fokus pada pemahaman ide utama, detail pendukung, dan inferensi dari konteks.',
      descriptionEn:
        'Practice reading N3-level Japanese news articles. Focus on understanding the main idea, supporting details, and context-based inference.',
      estimatedMinutes: 45,
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
          title: 'Latihan Membaca N3 — JLPT Sensei',
          titleEn: 'N3 Reading Practice — JLPT Sensei',
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
    {
      slug: 'n3-vocabulary-1500',
      title: 'Kosakata N3 (1500 Kata)',
      titleEn: 'N3 Vocabulary (1500 Words)',
      description:
        'Pelajari 1500 kosakata kunci JLPT N3 (kumulatif dari N5 dan N4). Fokus pada kata-kata yang sering muncul dalam teks media, percakapan formal, dan soal JLPT.',
      descriptionEn:
        'Learn 1500 key JLPT N3 vocabulary words (cumulative from N5 and N4). Focus on words that frequently appear in media texts, formal conversations, and JLPT questions.',
      estimatedMinutes: 55,
      category: 'vocabulary',
      resources: [
        {
          title: 'Kosakata N3 — JLPT Sensei',
          titleEn: 'N3 Vocabulary — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Kartu Flashcard Anki — Deck JLPT N3',
          titleEn: 'Anki Flashcards — JLPT N3 Deck',
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
      slug: 'n3-listening-practice',
      title: 'Latihan Mendengarkan N3',
      titleEn: 'N3 Listening Practice',
      description:
        'Latihan mendengarkan dialog dan monolog setara N3. Fokus pada memahami percakapan alami, mengidentifikasi niat pembicara, dan menyimpulkan informasi implisit.',
      descriptionEn:
        'Practice listening to N3-level dialogues and monologues. Focus on understanding natural conversations, identifying speaker intent, and inferring implicit information.',
      estimatedMinutes: 35,
      category: 'reading',
      resources: [
        {
          title: 'Pelajari Bahasa Jepang — NHK World',
          titleEn: 'Learn Japanese — NHK World',
          url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/',
          type: 'video',
          language: 'en',
        },
        {
          title: 'JLPT Sensei — Latihan Mendengarkan',
          titleEn: 'JLPT Sensei — Listening Practice',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'JLPT Resmi — Contoh Soal Mendengarkan',
          titleEn: 'Official JLPT — Sample Listening Questions',
          url: 'https://www.jlpt.jp/e/',
          type: 'article',
          language: 'en',
        },
      ],
    },
  ],
};

export default level;
