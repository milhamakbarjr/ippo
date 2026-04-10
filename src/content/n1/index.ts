import type { Level } from '@/types/learning';

export const level: Level = {
  id: 'n1',
  label: 'N1',
  description:
    'Tingkat tertinggi JLPT — kuasai 2000+ kanji, tata bahasa N1, membaca teks sastra, dan bahasa bisnis tingkat lanjut.',
  estimatedWeeks: 24,
  estimatedMonthsToN2: 'Sudah melampaui target!',
  steps: [
    {
      slug: 'n1-kanji-2000',
      title: 'Kanji N1 (2000+ Kanji)',
      titleEn: 'N1 Kanji (2000+ Characters)',
      description:
        'Pelajari 2000+ kanji JLPT N1 (kumulatif). Level ini mencakup kanji langka, kanji sastra, dan kanji yang digunakan dalam dokumen hukum, medis, dan teknis: 憂、憧、憤、慄、懐、懸、擁、攻、攫、曖、昧、概、欄、欺、歪、殊、殴、殻。',
      descriptionEn:
        'Learn 2000+ JLPT N1 kanji (cumulative). This level includes rare kanji, literary kanji, and kanji used in legal, medical, and technical documents: 憂、憧、憤、慄、懐、懸、擁、攻、攫、曖、昧、概、欄、欺、歪、殊、殴、殻.',
      estimatedMinutes: 90,
      category: 'kanji',
      resources: [
        {
          title: 'Kanji N1 — JLPT Sensei',
          titleEn: 'N1 Kanji — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'WaniKani — Belajar Kanji Tingkat Lanjut',
          titleEn: 'WaniKani — Advanced Kanji Learning',
          url: 'https://www.wanikani.com/',
          type: 'interactive',
          language: 'en',
        },
        {
          title: 'Kartu Flashcard Anki — Deck JLPT N1',
          titleEn: 'Anki Flashcards — JLPT N1 Deck',
          url: 'https://apps.ankiweb.net/',
          type: 'tool',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n1-advanced-grammar',
      title: 'Tata Bahasa N1',
      titleEn: 'N1 Advanced Grammar',
      description:
        'Kuasai pola tata bahasa N1 yang sangat kompleks dan bernuansa: 〜いかんによらず (terlepas dari), 〜に即して (sesuai dengan), 〜をよそに (mengabaikan), 〜ならいざ知らず (entahlah jika... tapi), 〜かたわら (sambil juga), 〜てやまない (tidak berhenti melakukan).',
      descriptionEn:
        'Master highly complex and nuanced N1 grammar patterns: 〜いかんによらず (regardless of), 〜に即して (in accordance with), 〜をよそに (ignoring/disregarding), 〜ならいざ知らず (I do not know about... but), 〜かたわら (while also doing), 〜てやまない (cannot stop doing).',
      estimatedMinutes: 75,
      category: 'grammar',
      resources: [
        {
          title: 'Tata Bahasa N1 — JLPT Sensei',
          titleEn: 'N1 Grammar — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Nihongo no Mori — Kelas N1 di YouTube',
          titleEn: 'Nihongo no Mori — N1 Classes on YouTube',
          url: 'https://www.youtube.com/c/nihongonomori',
          type: 'video',
          language: 'ja',
        },
        {
          title: 'JLPT Resmi — Referensi N1',
          titleEn: 'Official JLPT — N1 Reference',
          url: 'https://www.jlpt.jp/e/',
          type: 'article',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n1-literary-reading',
      title: 'Membaca Teks Sastra',
      titleEn: 'Literary Text Reading',
      description:
        'Latihan membaca teks sastra Jepang modern: kutipan novel, cerpen, esai filosofis, dan kritik sastra. Fokus pada pemahaman gaya bahasa, metafora, dan nuansa budaya.',
      descriptionEn:
        'Practice reading modern Japanese literary texts: novel excerpts, short stories, philosophical essays, and literary criticism. Focus on understanding writing style, metaphors, and cultural nuances.',
      estimatedMinutes: 60,
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
          title: 'Latihan Membaca N1 — JLPT Sensei',
          titleEn: 'N1 Reading Practice — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'JLPT Resmi — Contoh Soal N1',
          titleEn: 'Official JLPT — N1 Sample Questions',
          url: 'https://www.jlpt.jp/e/',
          type: 'article',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n1-business-advanced',
      title: 'Bahasa Bisnis Tingkat Lanjut',
      titleEn: 'Advanced Business Japanese',
      description:
        'Kuasai bahasa Jepang bisnis tingkat tinggi: presentasi formal (プレゼンテーション), negosiasi (交渉), dokumen hukum sederhana (契約書), laporan keuangan (財務報告), dan komunikasi lintas departemen dalam lingkungan korporat.',
      descriptionEn:
        'Master advanced business Japanese: formal presentations (プレゼンテーション), negotiation (交渉), basic legal documents (契約書), financial reports (財務報告), and cross-departmental communication in a corporate environment.',
      estimatedMinutes: 55,
      category: 'vocabulary',
      resources: [
        {
          title: 'Nihongo no Mori — Bahasa Bisnis Lanjutan di YouTube',
          titleEn: 'Nihongo no Mori — Advanced Business Japanese on YouTube',
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
          title: 'Kartu Flashcard Anki — Deck Bisnis N1',
          titleEn: 'Anki Flashcards — N1 Business Deck',
          url: 'https://apps.ankiweb.net/',
          type: 'tool',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n1-vocabulary-6000',
      title: 'Kosakata N1 (6000 Kata)',
      titleEn: 'N1 Vocabulary (6000 Words)',
      description:
        'Pelajari 6000 kosakata kumulatif JLPT N1. Mencakup idiom (慣用句), peribahasa (ことわざ), kata onomatope (擬音語・擬態語), dan kosakata domain spesifik (hukum, kedokteran, teknologi).',
      descriptionEn:
        'Learn 6000 cumulative JLPT N1 vocabulary words. Covers idioms (慣用句), proverbs (ことわざ), onomatopoeia (擬音語・擬態語), and domain-specific vocabulary (law, medicine, technology).',
      estimatedMinutes: 80,
      category: 'vocabulary',
      resources: [
        {
          title: 'Kosakata N1 — JLPT Sensei',
          titleEn: 'N1 Vocabulary — JLPT Sensei',
          url: 'https://jlptsensei.com/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Kartu Flashcard Anki — Deck JLPT N1',
          titleEn: 'Anki Flashcards — JLPT N1 Deck',
          url: 'https://apps.ankiweb.net/',
          type: 'tool',
          language: 'en',
        },
        {
          title: 'WaniKani — Belajar Kanji & Kosakata Lanjutan',
          titleEn: 'WaniKani — Advanced Kanji & Vocabulary Learning',
          url: 'https://www.wanikani.com/',
          type: 'interactive',
          language: 'en',
        },
      ],
    },
    {
      slug: 'n1-mock-exam',
      title: 'Simulasi Ujian JLPT N1',
      titleEn: 'JLPT N1 Mock Exam',
      description:
        'Kerjakan simulasi ujian JLPT N1 lengkap mencakup semua bagian: 言語知識（文字・語彙・文法）、読解、dan 聴解. Ujian berlangsung 170 menit. Evaluasi hasil secara menyeluruh dan buat rencana belajar akhir.',
      descriptionEn:
        'Complete a full JLPT N1 mock exam covering all sections: 言語知識 (Language Knowledge — characters, vocabulary, grammar), 読解 (Reading), and 聴解 (Listening). The exam runs 170 minutes. Thoroughly evaluate results and create a final study plan.',
      estimatedMinutes: 120,
      category: 'reading',
      resources: [
        {
          title: 'JLPT Resmi — Contoh Soal N1',
          titleEn: 'Official JLPT — N1 Sample Questions',
          url: 'https://www.jlpt.jp/e/',
          type: 'article',
          language: 'en',
        },
        {
          title: 'Nihongo no Mori — Persiapan N1',
          titleEn: 'Nihongo no Mori — N1 Preparation',
          url: 'https://www.youtube.com/c/nihongonomori',
          type: 'video',
          language: 'ja',
        },
        {
          title: 'JLPT Sensei — Simulasi N1',
          titleEn: 'JLPT Sensei — N1 Practice Tests',
          url: 'https://jlptsensei.com/',
          type: 'interactive',
          language: 'en',
        },
      ],
    },
  ],
};

export default level;
