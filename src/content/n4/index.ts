import type { Level } from '@/types/learning';

export const level: Level = {
  id: 'n4',
  label: 'N4',
  description:
    'Tingkat dasar lanjutan — kuasai 300 kanji, bentuk kata kerja kompleks, tata bahasa kondisional, dan dasar-dasar keigo.',
  estimatedWeeks: 12,
  estimatedMonthsToN2: '10-16 bulan',
  steps: [
    {
      slug: 'n4-kanji-300',
      title: 'Kanji N4 (300 Kanji)',
      titleEn: 'N4 Kanji (300 Characters)',
      description:
        'Pelajari 300 kanji JLPT N4 (termasuk 80 dari N5). Kanji baru di level ini mencakup: 会、社、電、車、駅、店、食、飲、買、売、読、書、聞、話、見、来、行、帰、作、使、思、知、分、教、習。',
      descriptionEn:
        'Learn the 300 JLPT N4 kanji (including 80 from N5). New kanji at this level include: 会、社、電、車、駅、店、食、飲、買、売、読、書、聞、話、見、来、行、帰、作、使、思、知、分、教、習.',
      estimatedMinutes: 60,
      category: 'kanji',
      resources: [
        {
          title: 'Kanji N4 — JLPT Sensei',
          titleEn: 'N4 Kanji — JLPT Sensei',
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
          title: 'Kartu Flashcard Anki — Deck JLPT N4',
          titleEn: 'Anki Flashcards — JLPT N4 Deck',
          url: 'https://apps.ankiweb.net/',
          type: 'tool',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n4-verb-forms',
      title: 'Bentuk Kata Kerja Lanjutan',
      titleEn: 'Advanced Verb Forms',
      description:
        'Kuasai konjugasi kata kerja: bentuk kamus (辞書形), bentuk ます (丁寧形), bentuk ない (否定形), bentuk た (過去形), dan bentuk て (て形) untuk kelompok 1, 2, dan kata kerja tidak beraturan (する、くる).',
      descriptionEn:
        'Master verb conjugations: dictionary form (辞書形), masu form (丁寧形), nai form (否定形), ta form (過去形), and te form (て形) for Group 1, Group 2, and irregular verbs (する、くる).',
      estimatedMinutes: 45,
      category: 'grammar',
      resources: [
        {
          title: 'Konjugasi Kata Kerja — Tae Kim',
          titleEn: 'Verb Conjugation — Tae Kim',
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Tata Bahasa N4 — JLPT Sensei',
          titleEn: 'N4 Grammar — JLPT Sensei',
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
      slug: 'n4-te-form-grammar',
      title: 'Tata Bahasa dengan Te-form',
      titleEn: 'Te-form Grammar Patterns',
      description:
        'Pelajari pola tata bahasa yang menggunakan て-form: 〜てください (tolong lakukan), 〜ている (sedang/kebiasaan), 〜てみる (mencoba melakukan), 〜てもいい (boleh), 〜てはいけない (tidak boleh), 〜てから (setelah).',
      descriptionEn:
        'Learn grammar patterns using て-form: 〜てください (please do), 〜ている (ongoing/habitual), 〜てみる (try doing), 〜てもいい (may/allowed), 〜てはいけない (must not), 〜てから (after doing).',
      estimatedMinutes: 40,
      category: 'grammar',
      resources: [
        {
          title: 'Pola Te-form — Tae Kim',
          titleEn: 'Te-form Patterns — Tae Kim',
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Tata Bahasa N4 — JLPT Sensei',
          titleEn: 'N4 Grammar — JLPT Sensei',
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
      slug: 'n4-conditional-grammar',
      title: 'Kalimat Kondisional (たら、ば、なら)',
      titleEn: 'Conditional Sentences (たら、ば、なら)',
      description:
        'Pelajari tiga bentuk kondisional utama: 〜たら (jika/ketika — umum), 〜ば (jika — kondisi hipotetis), 〜なら (jika memang begitu), beserta perbedaan nuansa dan penggunaannya.',
      descriptionEn:
        'Learn the three main conditional forms: 〜たら (if/when — general), 〜ば (if — hypothetical condition), 〜なら (if that is the case), along with their nuances and usage differences.',
      estimatedMinutes: 45,
      category: 'grammar',
      resources: [
        {
          title: 'Kalimat Kondisional — Tae Kim',
          titleEn: 'Conditional Sentences — Tae Kim',
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Tata Bahasa N4 — JLPT Sensei',
          titleEn: 'N4 Grammar — JLPT Sensei',
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
      slug: 'n4-reading-n4',
      title: 'Membaca Teks N4',
      titleEn: 'N4 Reading Comprehension',
      description:
        'Latihan membaca teks N4 seperti surat, email, pengumuman, dan artikel singkat. Fokus pada pemahaman isi dan detail penting.',
      descriptionEn:
        'Practice reading N4-level texts such as letters, emails, announcements, and short articles. Focus on understanding content and important details.',
      estimatedMinutes: 40,
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
          title: 'Latihan Membaca N4 — JLPT Sensei',
          titleEn: 'N4 Reading Practice — JLPT Sensei',
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
      slug: 'n4-keigo-basics',
      title: 'Dasar-dasar Keigo (Bahasa Sopan)',
      titleEn: 'Keigo Basics (Polite Language)',
      description:
        'Pelajari dasar keigo: teineigo (丁寧語 — bahasa sopan standar dengan ます/です), sonkeigo (尊敬語 — menghormati orang lain: いらっしゃる、おっしゃる), dan kenjougo (謙譲語 — merendahkan diri: いただく、まいる).',
      descriptionEn:
        'Learn keigo basics: teineigo (丁寧語 — standard polite with ます/です), sonkeigo (尊敬語 — honoring others: いらっしゃる、おっしゃる), and kenjougo (謙譲語 — humbling oneself: いただく、まいる).',
      estimatedMinutes: 35,
      category: 'vocabulary',
      resources: [
        {
          title: 'Keigo — Tae Kim',
          titleEn: 'Keigo — Tae Kim',
          url: 'https://guidetojapanese.org/learn/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Tata Bahasa N4 — JLPT Sensei',
          titleEn: 'N4 Grammar — JLPT Sensei',
          url: 'https://jlptsensei.com/',
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
      slug: 'n4-vocabulary-500',
      title: 'Kosakata N4 (500 Kata)',
      titleEn: 'N4 Vocabulary (500 Words)',
      description:
        'Pelajari 500 kosakata kunci JLPT N4. Mencakup kata benda, kata kerja, kata sifat, dan kata keterangan yang sering muncul dalam soal JLPT N4.',
      descriptionEn:
        'Learn 500 key JLPT N4 vocabulary words. Covers nouns, verbs, adjectives, and adverbs that frequently appear in JLPT N4 questions.',
      estimatedMinutes: 50,
      category: 'vocabulary',
      resources: [
        {
          title: 'Kosakata N4 — JLPT Sensei',
          titleEn: 'N4 Vocabulary — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Kartu Flashcard Anki — Deck JLPT N4',
          titleEn: 'Anki Flashcards — JLPT N4 Deck',
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
  ],
};

export default level;
