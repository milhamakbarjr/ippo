import type { LevelPathConfig } from '@/types/learning';

export const kanaSections: LevelPathConfig = {
  levelId: 'kana',
  sections: [
    {
      slug: 'hiragana',
      title: 'Hiragana',
      sectionNumber: 1,
      guide: {
        title: 'Panduan Seksi 1: Hiragana',
        description:
          'Hiragana adalah fondasi sistem penulisan bahasa Jepang. Menguasai hiragana berarti kamu bisa membaca kata-kata asli Jepang, partikel tata bahasa, dan akhiran kata kerja. Ini adalah langkah pertama yang paling penting.',
        objectives: [
          'Menghafal 46 karakter hiragana dasar (あ-ん)',
          'Memahami dakuten (゛) dan handakuten (゜) untuk suara bersuara',
          'Menguasai youon (kombinasi dengan や・ゆ・よ kecil)',
          'Membaca kata-kata sederhana dalam hiragana',
        ],
        strategies: [
          {
            title: 'Tulis Tangan Setiap Hari',
            body: 'Menulis hiragana dengan tangan mengaktifkan memori otot. Tulis setiap karakter minimal 10 kali per hari. Gunakan buku bergaris atau kertas kotak khas Jepang.',
          },
          {
            title: 'Pelajari Per Baris',
            body: 'Jangan coba hafal semua 46 sekaligus. Pelajari 5 karakter per sesi (satu baris: あいうえお, かきくけこ, dst.). Ulangi baris sebelumnya sebelum menambah yang baru.',
          },
          {
            title: 'Gunakan RealKana Setiap Hari',
            body: 'Situs realkana.com menyediakan latihan acak gratis. Lakukan 50 soal per hari selama 2 minggu pertama untuk mempercepat hafalan.',
          },
          {
            title: 'Buat Cerita Mnemonik',
            body: 'Hubungkan bentuk karakter dengan gambar atau cerita. Contoh: あ (a) terlihat seperti orang yang sedang berteriak "a!". Semakin lucu/aneh ceritanya, semakin mudah diingat.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mengacaukan ね dan め',
            body: 'ね (ne) dan め (me) sangat mirip. Bedanya: ね punya ekor yang melengkung ke kanan, め lebih "tertutup" tanpa ekor. Tips: ね = "ne" memiliki ekor seperti kucing (neko/ねこ).',
          },
          {
            title: 'Mengacaukan は dan ほ',
            body: 'は (ha) dan ほ (ho) berbeda di bagian kanan. は punya garis vertikal tanpa putaran, ほ punya putaran kecil di atas. Tips: ほ = "ho" punya "lubang" seperti dalam kata "hole".',
          },
          {
            title: 'Melupakan youon membentuk satu suku kata',
            body: 'きゃ (kya) dibaca sebagai SATU suku kata, bukan "ki-ya". Karakter kecil (ゃゅょ) SELALU bergabung dengan konsonan sebelumnya.',
          },
        ],
      },
      units: [
        {
          slug: 'hiragana-gojuuon',
          title: 'Hiragana Dasar',
          titleEn: 'Basic Hiragana',
          stepSlugs: ['hiragana-gojuuon'],
          phrases: [
            { japanese: 'あ', romaji: 'a', indonesian: 'a (seperti dalam "apa")' },
            { japanese: 'い', romaji: 'i', indonesian: 'i (seperti dalam "ikan")' },
            { japanese: 'う', romaji: 'u', indonesian: 'u (seperti dalam "urus")' },
            { japanese: 'え', romaji: 'e', indonesian: 'e (seperti dalam "enak")' },
            { japanese: 'お', romaji: 'o', indonesian: 'o (seperti dalam "obat")' },
            { japanese: 'か', romaji: 'ka', indonesian: 'ka (seperti dalam "kata")' },
            { japanese: 'さ', romaji: 'sa', indonesian: 'sa (seperti dalam "satu")' },
            { japanese: 'た', romaji: 'ta', indonesian: 'ta (seperti dalam "tamu")' },
            { japanese: 'な', romaji: 'na', indonesian: 'na (seperti dalam "nama")' },
            { japanese: 'は', romaji: 'ha', indonesian: 'ha (seperti dalam "hari")' },
          ],
          content: {
            pronunciationCards: [
              { char: 'あ', romaji: 'a', comparison: 'seperti "a" dalam "apa"' },
              { char: 'い', romaji: 'i', comparison: 'seperti "i" dalam "ini"' },
              { char: 'う', romaji: 'u', comparison: 'seperti "u" dalam "untuk"' },
              { char: 'え', romaji: 'e', comparison: 'seperti "e" dalam "enak"' },
              { char: 'お', romaji: 'o', comparison: 'seperti "o" dalam "obat"' },
              { char: 'か', romaji: 'ka', comparison: 'seperti "ka" dalam "kamar"' },
              { char: 'さ', romaji: 'sa', comparison: 'seperti "sa" dalam "satu"' },
              { char: 'た', romaji: 'ta', comparison: 'seperti "ta" dalam "tamu"' },
              { char: 'な', romaji: 'na', comparison: 'seperti "na" dalam "nama"' },
              { char: 'ま', romaji: 'ma', comparison: 'seperti "ma" dalam "makan"' },
            ],
            mnemonics: [
              {
                title: 'Mnemonik Vokal Dasar',
                body: 'あいうえお — bayangkan: Ayah Ibu Untuk Enak Obat. Setiap huruf pertama adalah vokal Jepang secara berurutan.',
              },
              {
                title: 'Baris K (ka-row)',
                body: 'Karakter か mirip dengan huruf "K" yang diputar. Semua karakter baris K menggunakan dua garis utama bersilang.',
              },
            ],
            practicePrompts: [
              'Tulis baris vokal あいうえお sebanyak 5 kali tanpa melihat referensi',
              'Tulis baris か-row (かきくけこ) sebanyak 5 kali',
              'Buka realkana.com dan selesaikan 20 soal hiragana dasar',
              'Tulis nama panggilanmu dalam hiragana',
            ],
          },
        },
        {
          slug: 'hiragana-dakuten-youon',
          title: 'Hiragana Lanjutan',
          titleEn: 'Advanced Hiragana',
          stepSlugs: ['hiragana-dakuten-youon'],
          phrases: [
            { japanese: 'が', romaji: 'ga', indonesian: 'ga — dakuten dari か (ka)' },
            { japanese: 'ざ', romaji: 'za', indonesian: 'za — dakuten dari さ (sa)' },
            { japanese: 'だ', romaji: 'da', indonesian: 'da — dakuten dari た (ta)' },
            { japanese: 'ば', romaji: 'ba', indonesian: 'ba — dakuten dari は (ha)' },
            { japanese: 'ぱ', romaji: 'pa', indonesian: 'pa — handakuten dari は (ha)' },
            { japanese: 'きゃ', romaji: 'kya', indonesian: 'kya — youon き + や kecil' },
            { japanese: 'しゅ', romaji: 'shu', indonesian: 'shu — youon し + ゆ kecil' },
            { japanese: 'ちょ', romaji: 'cho', indonesian: 'cho — youon ち + よ kecil' },
          ],
          content: {
            pronunciationCards: [
              { char: 'が', romaji: 'ga', comparison: 'か + tanda ゛, bunyi "ga" seperti dalam "garis"' },
              { char: 'ざ', romaji: 'za', comparison: 'さ + tanda ゛, bunyi "za" seperti dalam "zat"' },
              { char: 'だ', romaji: 'da', comparison: 'た + tanda ゛, bunyi "da" seperti dalam "dapur"' },
              { char: 'ば', romaji: 'ba', comparison: 'は + tanda ゛, bunyi "ba" seperti dalam "baru"' },
              { char: 'ぱ', romaji: 'pa', comparison: 'は + tanda ゜, bunyi "pa" seperti dalam "pagi"' },
              { char: 'きゃ', romaji: 'kya', comparison: 'き + ゃ kecil, bunyi "kya" seperti dalam "kyak"' },
              { char: 'しゅ', romaji: 'shu', comparison: 'し + ゅ kecil, bunyi "shu" seperti dalam "shut"' },
              { char: 'ちょ', romaji: 'cho', comparison: 'ち + ょ kecil, bunyi "cho" seperti dalam "chocolate"' },
            ],
            mnemonics: [
              {
                title: 'Dakuten = Getaran',
                body: 'Bayangkan tanda dakuten ゛ (dua titik) sebagai getaran pada suara. Suara tak bersuara (か=ka) menjadi bersuara (が=ga) — seperti menekan tombol "vibrate" pada karakter.',
              },
              {
                title: 'Youon = Kombinasi',
                body: 'Karakter kecil ゃゅょ selalu "menyatu" dengan konsonan sebelumnya. Bayangkan mereka sebagai anak kecil yang bergantung pada kakaknya — き+ゃ = kya.',
              },
            ],
            practicePrompts: [
              'Tulis semua kombinasi dakuten dari baris K: が、ぎ、ぐ、げ、ご',
              'Tulis 5 youon combination: きゃ、しゅ、ちょ、にゃ、ひょ',
              'Buka realkana.com, aktifkan dakuten dan youon, selesaikan 30 soal',
              'Tulis kata: がっこう (gakkou = sekolah), きゅうり (kyuuri = mentimun)',
            ],
          },
        },
      ],
    },
    {
      slug: 'katakana',
      title: 'Katakana',
      sectionNumber: 2,
      guide: {
        title: 'Panduan Seksi 2: Katakana',
        description:
          'Katakana digunakan terutama untuk kata serapan asing (gairaigo). Hampir semua kata yang berasal dari bahasa lain — termasuk nama merek, nama orang asing, dan kata-kata modern — ditulis dalam katakana.',
        objectives: [
          'Menghafal 46 karakter katakana dasar (ア-ン)',
          'Membaca kata serapan asing dalam katakana',
          'Menguasai kombinasi katakana modern (ティ, ファ, dll.)',
          'Mengenali perbedaan visual antara katakana yang mirip',
        ],
        strategies: [
          {
            title: 'Latih dengan Kata Serapan',
            body: 'Katakana jauh lebih mudah dipelajari kalau kamu langsung latihan dengan kata-kata yang kamu sudah kenal. Contoh: テレビ (TV), コーヒー (kopi), コンピューター (komputer). Cari kata serapan bahasa Inggris dalam katakana.',
          },
          {
            title: 'Bandingkan dengan Hiragana',
            body: 'Setiap katakana punya pasangan hiragana dengan bunyi yang sama. Mulailah dengan menghubungkan katakana ke hiragana yang sudah kamu hafal: あ→ア, い→イ, dst.',
          },
          {
            title: 'Perhatikan Tanda Pemanjang Vokal ー',
            body: 'Katakana menggunakan tanda khusus ー untuk memperpanjang vokal. コーヒー = ko-o-hi-i = "koohii" = kopi. Hiragana tidak punya tanda ini.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mengacaukan ソ (so) dan ン (n)',
            body: 'ソ dan ン sangat mirip! ソ condong ke kanan dan coretan bawahnya miring. ン condong ke kiri. Tips: bayangkan ソ = "so" condong ke kanan seperti "s", ン = "n" condong ke kiri.',
          },
          {
            title: 'Mengacaukan シ (shi) dan ツ (tsu)',
            body: 'シ dan ツ hampir identik. Perbedaannya ada di orientasi. ツ punya dua coretan kecil di atas yang lebih horizontal. シ punya coretan yang lebih vertikal.',
          },
          {
            title: 'Lupa tanda pemanjang ー',
            body: 'Banyak pelajar lupa menuliskan tanda ー pada vokal panjang. コヒ (kohi) salah — yang benar コーヒー (koohii). Ini mengubah makna kata sepenuhnya.',
          },
        ],
      },
      units: [
        {
          slug: 'katakana-gojuuon',
          title: 'Katakana Dasar',
          titleEn: 'Basic Katakana',
          stepSlugs: ['katakana-gojuuon'],
          phrases: [
            { japanese: 'ア', romaji: 'a', indonesian: 'a (katakana)' },
            { japanese: 'カ', romaji: 'ka', indonesian: 'ka (katakana)' },
            { japanese: 'サ', romaji: 'sa', indonesian: 'sa (katakana)' },
            { japanese: 'タ', romaji: 'ta', indonesian: 'ta (katakana)' },
            { japanese: 'テレビ', romaji: 'terebi', indonesian: 'TV (dari bahasa Inggris "television")' },
            { japanese: 'コーヒー', romaji: 'koohii', indonesian: 'kopi (dari bahasa Belanda "koffie")' },
            { japanese: 'パソコン', romaji: 'pasokon', indonesian: 'komputer (singkatan "personal computer")' },
          ],
          content: {
            pronunciationCards: [
              { char: 'ア', romaji: 'a', comparison: 'sama dengan あ — "a" seperti dalam "apa"' },
              { char: 'カ', romaji: 'ka', comparison: 'sama dengan か — "ka" seperti dalam "kamar"' },
              { char: 'サ', romaji: 'sa', comparison: 'sama dengan さ — "sa" seperti dalam "satu"' },
              { char: 'テ', romaji: 'te', comparison: 'sama dengan て — "te" seperti dalam "teman"' },
              { char: 'ナ', romaji: 'na', comparison: 'sama dengan な — "na" seperti dalam "nama"' },
              { char: 'テレビ', romaji: 'terebi', comparison: 'TV — salah satu kata pertama yang harus dihapal' },
              { char: 'コーヒー', romaji: 'koohii', comparison: 'kopi — perhatikan tanda ー untuk vokal panjang' },
              { char: 'パン', romaji: 'pan', comparison: 'roti — dari bahasa Portugis "pão"' },
            ],
            mnemonics: [
              {
                title: 'Katakana vs Hiragana: Lebih Angular',
                body: 'Katakana cenderung lebih tegas dan bersudut dibanding hiragana yang lebih bulat. Bayangkan hiragana = tulisan tangan indah, katakana = tanda-tanda tegas di restoran.',
              },
              {
                title: 'Gunakan Kata yang Sudah Dikenal',
                body: 'Pelajari katakana langsung dengan kata-kata bahasa Inggris/Indonesia yang sudah ada versi Jepangnya: アイスクリーム (es krim), バナナ (pisang), テスト (ujian).',
              },
            ],
            practicePrompts: [
              "Tulis 5 merek internasional dalam katakana: McDonald's = マクドナルド, Nike = ナイキ",
              'Temukan 10 kata serapan dalam bahasa Jepang dari benda di sekitarmu (TV, sofa, dll.)',
              'Buka realkana.com, aktifkan katakana saja, selesaikan 30 soal',
              'Tulis nama asli kamu dalam katakana',
            ],
          },
        },
        {
          slug: 'katakana-dakuten-youon',
          title: 'Katakana Lanjutan',
          titleEn: 'Advanced Katakana',
          stepSlugs: ['katakana-dakuten-youon'],
          phrases: [
            { japanese: 'ガ', romaji: 'ga', indonesian: 'ga — dakuten dari カ (ka)' },
            { japanese: 'ザ', romaji: 'za', indonesian: 'za — dakuten dari サ (sa)' },
            { japanese: 'ティ', romaji: 'ti', indonesian: 'ti (seperti party = パーティー)' },
            { japanese: 'ファ', romaji: 'fa', indonesian: 'fa (seperti family = ファミリー)' },
            { japanese: 'ウィ', romaji: 'wi', indonesian: 'wi (seperti Wikipedia = ウィキペディア)' },
          ],
          content: {
            pronunciationCards: [
              { char: 'ガ', romaji: 'ga', comparison: 'カ + ゛ — "ga" seperti dalam "garpu"' },
              { char: 'ザ', romaji: 'za', comparison: 'サ + ゛ — "za" seperti dalam "zaman"' },
              { char: 'ティ', romaji: 'ti', comparison: 'kombinasi modern untuk suara "ti" seperti dalam "party"' },
              { char: 'ファ', romaji: 'fa', comparison: 'kombinasi modern untuk suara "fa" seperti dalam "family"' },
              { char: 'ウィ', romaji: 'wi', comparison: 'kombinasi modern untuk suara "wi" seperti dalam "wifi"' },
              {
                char: 'パーティー',
                romaji: 'paatii',
                comparison: 'party — perhatikan kombinasi ティ untuk suara "ti"',
              },
            ],
            mnemonics: [
              {
                title: 'Kombinasi Modern untuk Suara Asing',
                body: 'Bahasa Jepang tidak punya beberapa suara dari bahasa lain (f, v, ti, di, dll.). Katakana modern membuat kombinasi khusus untuk ini — inilah mengapa katakana "berkembang" lebih dari hiragana.',
              },
            ],
            practicePrompts: [
              'Tulis 5 kata dengan kombinasi modern: パーティー、ファミリー、ウィルス、ティッシュ',
              'Cari 5 kata serapan yang menggunakan kombinasi ティ atau ファ',
              'Latihan di realkana.com dengan semua opsi katakana aktif',
            ],
          },
        },
      ],
    },
    {
      slug: 'kana-mastery',
      title: 'Kana Mastery',
      sectionNumber: 3,
      quizSlug: 'kana-mastery',
      guide: {
        title: 'Panduan Seksi 3: Kana Mastery',
        description:
          'Selamat! Kamu sudah menguasai hiragana dan katakana. Sekarang saatnya mengintegrasikan keduanya dalam membaca dan kosakata nyata. Seksi ini akan melatih kecepatan, akurasi, dan kosakata praktis.',
        objectives: [
          'Membaca teks campuran hiragana dan katakana dengan lancar',
          'Menguasai 50+ kosakata kana yang umum digunakan',
          'Membaca kalimat sederhana bahasa Jepang',
          'Mempersiapkan diri untuk mulai belajar kanji (N5)',
        ],
        strategies: [
          {
            title: 'Baca NHK Web Easy Setiap Hari',
            body: 'NHK Web Easy (www3.nhk.or.jp/news/easy/) menyediakan berita sederhana dalam hiragana penuh. Coba baca satu artikel pendek per hari, bahkan jika belum mengerti artinya.',
          },
          {
            title: 'Buat Daftar Kosakata Kana Sendiri',
            body: 'Setiap kali kamu menemukan kata baru yang ditulis kana, catat! Targetkan 5 kata baru per hari. Gunakan flashcard (Anki atau RealKana) untuk review.',
          },
          {
            title: 'Tonton Anime dengan Subtitle Jepang',
            body: 'Subtitle bahasa Jepang (biasanya dalam hiragana dan kanji sederhana) sangat efektif untuk melatih membaca kecepatan tinggi. Mulai dengan anime anak-anak seperti Doraemon.',
          },
        ],
        commonMistakes: [
          {
            title: 'Membaca terlalu pelan per karakter',
            body: 'Tujuannya adalah membaca kata secara keseluruhan, bukan karakter per karakter. Latihan rutin akan menggeser otak dari "decoding" ke "membaca" — ini butuh waktu, tapi pasti terjadi.',
          },
          {
            title: 'Mengabaikan panjang vokal dan suku kata ganda',
            body: 'おばさん (obasan = bibi) vs おばあさん (obaasan = nenek) — hanya beda satu ー. Suku kata ganda (っ) juga krusial: きて (kite = datanglah) vs きって (kitte = perangko). Dengarkan dan baca dengan teliti.',
          },
        ],
      },
      units: [
        {
          slug: 'kana-reading',
          title: 'Membaca Kana',
          titleEn: 'Reading Kana',
          stepSlugs: ['kana-reading-practice'],
          phrases: [
            { japanese: 'おはよう', romaji: 'ohayou', indonesian: 'selamat pagi' },
            { japanese: 'ありがとう', romaji: 'arigatou', indonesian: 'terima kasih' },
            { japanese: 'こんにちは', romaji: 'konnichiwa', indonesian: 'halo / selamat siang' },
            { japanese: 'さようなら', romaji: 'sayounara', indonesian: 'selamat tinggal' },
            { japanese: 'すみません', romaji: 'sumimasen', indonesian: 'permisi / maaf' },
          ],
          content: {
            pronunciationCards: [
              { char: 'おはよう', romaji: 'ohayou', comparison: 'selamat pagi — digunakan sampai sekitar jam 10' },
              {
                char: 'こんにちは',
                romaji: 'konnichiwa',
                comparison: 'halo / selamat siang — digunakan siang hingga sore',
              },
              { char: 'こんばんは', romaji: 'konbanwa', comparison: 'selamat malam — digunakan dari sore hari' },
              {
                char: 'ありがとう',
                romaji: 'arigatou',
                comparison: 'terima kasih — informal, untuk teman sebaya',
              },
              {
                char: 'すみません',
                romaji: 'sumimasen',
                comparison: 'permisi / maaf — serbaguna, sangat sering dipakai',
              },
            ],
            mnemonics: [
              {
                title: 'Baca Kata, Bukan Karakter',
                body: 'Tujuan latihan ini adalah membaca kata secara keseluruhan. Coba kenali pola visual kata seperti おはよう tanpa "men-decode" satu per satu karakter.',
              },
              {
                title: 'Mulai dengan Kata yang Sudah Dikenal',
                body: 'Kata-kata seperti すし (sushi), ラーメン (ramen), さくら (sakura) sudah familiar. Gunakan kata-kata ini sebagai "anchor" untuk membangun kecepatan baca.',
              },
            ],
            practicePrompts: [
              'Baca 5 salam berikut keras-keras: おはよう、こんにちは、ありがとう、すみません、さようなら',
              'Buka NHK Web Easy dan coba baca headline artikel (realkana.com/read)',
              'Tulis 3 kalimat pendek dalam hiragana tentang harimu',
            ],
          },
        },
        {
          slug: 'kana-vocab',
          title: 'Kosakata Kana',
          titleEn: 'Kana Vocabulary',
          stepSlugs: ['kana-vocabulary'],
          phrases: [
            { japanese: 'みず', romaji: 'mizu', indonesian: 'air' },
            { japanese: 'ねこ', romaji: 'neko', indonesian: 'kucing' },
            { japanese: 'いぬ', romaji: 'inu', indonesian: 'anjing' },
            { japanese: 'パン', romaji: 'pan', indonesian: 'roti' },
            { japanese: 'テレビ', romaji: 'terebi', indonesian: 'TV' },
            { japanese: 'アイスクリーム', romaji: 'aisukuriimu', indonesian: 'es krim' },
            { japanese: 'でんしゃ', romaji: 'densha', indonesian: 'kereta' },
          ],
          content: {
            pronunciationCards: [
              { char: 'みず', romaji: 'mizu', comparison: 'air — kata Jepang asli, ditulis hiragana' },
              { char: 'ねこ', romaji: 'neko', comparison: 'kucing — kata Jepang asli, ditulis hiragana' },
              { char: 'いぬ', romaji: 'inu', comparison: 'anjing — kata Jepang asli, ditulis hiragana' },
              { char: 'パン', romaji: 'pan', comparison: 'roti — kata serapan (Portugis), ditulis katakana' },
              { char: 'テレビ', romaji: 'terebi', comparison: 'TV — kata serapan (Inggris), ditulis katakana' },
              {
                char: 'でんしゃ',
                romaji: 'densha',
                comparison: 'kereta listrik — kata Jepang asli, ditulis hiragana',
              },
              {
                char: 'アイスクリーム',
                romaji: 'aisukuriimu',
                comparison: 'es krim — kata serapan (Inggris), ditulis katakana',
              },
            ],
            mnemonics: [
              {
                title: 'Hiragana = Kata Jepang Asli',
                body: 'Sebagai aturan umum: kalau katanya terasa "Jepang banget" (seperti みず/air, さくら/bunga sakura), kemungkinan besar ditulis dalam hiragana.',
              },
              {
                title: 'Katakana = Kata Serapan Asing',
                body: 'Kalau katanya terdengar seperti kata bahasa Inggris atau asing (テレビ/TV, バス/bus, コンビニ/konbini), hampir pasti ditulis dalam katakana.',
              },
            ],
            practicePrompts: [
              'Kategorikan 10 benda di sekitarmu: mana yang kata Jepang asli vs kata serapan?',
              'Hafalkan 5 kata hiragana dan 5 kata katakana hari ini',
              'Gunakan Anki atau Quizlet untuk membuat deck kosakata kana pertamamu',
            ],
          },
        },
      ],
    },
  ],
};
