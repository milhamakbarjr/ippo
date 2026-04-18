import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n5-review',
  title: 'N5 Review Quiz',
  level: 'n5',
  category: 'vocab',
  questions: [
    {
      id: 'n5-1',
      questionText: '「日」の読み方はどれですか。',
      options: [
        { id: 'a', text: 'nichi / hi', isCorrect: true },
        { id: 'b', text: 'getsu / tsuki', isCorrect: false },
        { id: 'c', text: 'ka / hi', isCorrect: false },
        { id: 'd', text: 'sui / mizu', isCorrect: false },
      ],
      explanation:
        '「日」dibaca "nichi" (onyomi) atau "hi" (kunyomi). Artinya hari atau matahari. Contoh: 日曜日 (nichiyoubi = hari Minggu), 毎日 (mainichi = setiap hari).',
      category: 'kanji',
      level: 'n5',
    },
    {
      id: 'n5-2',
      questionText: '「月」はどういう意味ですか。',
      options: [
        { id: 'a', text: 'Bulan', isCorrect: true },
        { id: 'b', text: 'Matahari', isCorrect: false },
        { id: 'c', text: 'Bintang', isCorrect: false },
        { id: 'd', text: 'Langit', isCorrect: false },
      ],
      explanation:
        '「月」berarti "bulan" (moon/month). Dibaca "getsu" (onyomi) atau "tsuki" (kunyomi). Digunakan untuk nama bulan: 一月 (ichigatsu = Januari).',
      category: 'kanji',
      level: 'n5',
    },
    {
      id: 'n5-3',
      questionText: '「人」の読み方で正しいのはどれですか。',
      options: [
        { id: 'a', text: 'jin / hito', isCorrect: true },
        { id: 'b', text: 'kou / kuchi', isCorrect: false },
        { id: 'c', text: 'san / yama', isCorrect: false },
        { id: 'd', text: 'moku / ki', isCorrect: false },
      ],
      explanation:
        '「人」dibaca "jin/nin" (onyomi) atau "hito" (kunyomi). Artinya orang. Contoh: 日本人 (nihonjin = orang Jepang), 一人 (hitori = satu orang).',
      category: 'kanji',
      level: 'n5',
    },
    {
      id: 'n5-4',
      questionText: '「山」はどういう意味ですか。',
      options: [
        { id: 'a', text: 'Gunung', isCorrect: true },
        { id: 'b', text: 'Sungai', isCorrect: false },
        { id: 'c', text: 'Hutan', isCorrect: false },
        { id: 'd', text: 'Laut', isCorrect: false },
      ],
      explanation:
        '「山」berarti "gunung". Dibaca "san" (onyomi) atau "yama" (kunyomi). Bentuk kanji ini menyerupai tiga puncak gunung. Contoh: 富士山 (Fujisan = Gunung Fuji).',
      category: 'kanji',
      level: 'n5',
    },
    {
      id: 'n5-5',
      questionText: '「私は学生です」— 「は」の役割はどれですか。',
      options: [
        { id: 'a', text: 'Menandai topik kalimat', isCorrect: true },
        { id: 'b', text: 'Menandai objek langsung', isCorrect: false },
        { id: 'c', text: 'Menandai tempat', isCorrect: false },
        { id: 'd', text: 'Menandai kepemilikan', isCorrect: false },
      ],
      explanation:
        'Partikel は (dibaca "wa") menandai topik kalimat. Dalam 「私は学生です」, 私 (saya) adalah topik, dan 学生です (adalah murid) adalah deskripsinya.',
      category: 'grammar',
      level: 'n5',
    },
    {
      id: 'n5-6',
      questionText: '「ごはんを食べます」— 「を」は何を表しますか。',
      options: [
        { id: 'a', text: 'Objek langsung dari kata kerja', isCorrect: true },
        { id: 'b', text: 'Topik kalimat', isCorrect: false },
        { id: 'c', text: 'Tempat aktivitas', isCorrect: false },
        { id: 'd', text: 'Waktu aktivitas', isCorrect: false },
      ],
      explanation:
        'Partikel を menandai objek langsung dari kata kerja. Dalam 「ごはんを食べます」, ごはん (nasi) adalah objek yang dimakan (食べます). を selalu diikuti kata kerja aksi.',
      category: 'grammar',
      level: 'n5',
    },
    {
      id: 'n5-7',
      questionText: '「大きい」の反対の言葉はどれですか。',
      options: [
        { id: 'a', text: '小さい', isCorrect: true },
        { id: 'b', text: '好き', isCorrect: false },
        { id: 'c', text: '嫌い', isCorrect: false },
        { id: 'd', text: 'きれい', isCorrect: false },
      ],
      explanation:
        '「大きい」(ookii) berarti "besar" dan lawannya adalah「小さい」(chiisai) yang berarti "kecil". Keduanya adalah kata sifat-i yang sering muncul di N5.',
      category: 'vocab',
      level: 'n5',
    },
    {
      id: 'n5-8',
      questionText: '「食べる」はどういう意味ですか。',
      options: [
        { id: 'a', text: 'Makan', isCorrect: true },
        { id: 'b', text: 'Minum', isCorrect: false },
        { id: 'c', text: 'Pergi', isCorrect: false },
        { id: 'd', text: 'Datang', isCorrect: false },
      ],
      explanation:
        '「食べる」(taberu) berarti "makan". Ini adalah kata kerja golongan 2 (ichidan). Bentuk sopan: 食べます (tabemasu). Bentuk negatif: 食べない (tabenai).',
      category: 'vocab',
      level: 'n5',
    },
    {
      id: 'n5-9',
      questionText: '「三百」はいくつですか。',
      options: [
        { id: 'a', text: '300', isCorrect: true },
        { id: 'b', text: '30', isCorrect: false },
        { id: 'c', text: '3000', isCorrect: false },
        { id: 'd', text: '13', isCorrect: false },
      ],
      explanation:
        '「三百」(sanbyaku) = 300. 三 (san = 3) + 百 (hyaku = 100). Perhatikan perubahan bunyi: 百 menjadi "byaku" setelah 三. Perubahan bunyi serupa: 六百 = roppyaku, 八百 = happyaku.',
      category: 'vocab',
      level: 'n5',
    },
    {
      id: 'n5-10',
      questionText: '「すみません」はどんな時に使いますか。',
      options: [
        { id: 'a', text: 'Minta perhatian, minta maaf, atau berterima kasih', isCorrect: true },
        { id: 'b', text: 'Hanya untuk minta maaf', isCorrect: false },
        { id: 'c', text: 'Hanya untuk salam', isCorrect: false },
        { id: 'd', text: 'Hanya untuk berterima kasih', isCorrect: false },
      ],
      explanation:
        '「すみません」(sumimasen) adalah ekspresi serbaguna: bisa untuk minta perhatian (permisi), minta maaf (maaf), dan bahkan berterima kasih ringan. Ini salah satu frasa paling berguna di Jepang.',
      category: 'vocab',
      level: 'n5',
    },
    {
      id: 'n5-11',
      questionText: '「図書館で本を読みます」— 「で」は何を表しますか。',
      options: [
        { id: 'a', text: 'Tempat di mana aktivitas dilakukan', isCorrect: true },
        { id: 'b', text: 'Tujuan perjalanan', isCorrect: false },
        { id: 'c', text: 'Waktu aktivitas', isCorrect: false },
        { id: 'd', text: 'Kepemilikan', isCorrect: false },
      ],
      explanation:
        'Partikel で menandai tempat di mana aktivitas terjadi. 図書館で本を読みます = Membaca buku di perpustakaan. Bedakan dengan に yang menandai tujuan/keberadaan: 図書館にいます = Ada di perpustakaan.',
      category: 'grammar',
      level: 'n5',
    },
    {
      id: 'n5-12',
      questionText: '「午前九時から午後五時まで」はどういう意味ですか。',
      options: [
        { id: 'a', text: 'Dari jam 9 pagi sampai jam 5 sore', isCorrect: true },
        { id: 'b', text: 'Dari jam 9 malam sampai jam 5 pagi', isCorrect: false },
        { id: 'c', text: 'Jam 9 pagi dan jam 5 sore', isCorrect: false },
        { id: 'd', text: 'Sebelum jam 9 pagi atau setelah jam 5 sore', isCorrect: false },
      ],
      explanation:
        '午前 (gozen) = pagi/AM, 午後 (gogo) = sore/PM. から = dari, まで = sampai. Pola ～から～まで sangat sering muncul di teks N5 seperti jadwal dan pengumuman.',
      category: 'reading',
      level: 'n5',
    },
  ],
};

export default quiz;
