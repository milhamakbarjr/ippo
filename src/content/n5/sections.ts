import type { LevelPathConfig } from '@/types/learning';

export const n5Sections: LevelPathConfig = {
  levelId: 'n5',
  sections: [
    {
      slug: 'kanji-kosakata-dasar',
      title: 'Kanji & Kosakata Dasar',
      sectionNumber: 1,
      guide: {
        title: 'Panduan Seksi 1: Kanji & Kosakata Dasar',
        description:
          'Di level N5, kamu akan mulai mengenal 80 kanji dasar dan kosakata penting sehari-hari. Kanji adalah kunci untuk membaca bahasa Jepang — setiap kanji memiliki makna dan cara baca tersendiri. Seksi ini juga mencakup angka, tanggal, dan waktu yang sering muncul di ujian JLPT N5.',
        objectives: [
          'Menguasai cara baca hiragana dan katakana secara lancar sebelum belajar kanji',
          'Menghafal 80 kanji wajib JLPT N5 beserta onyomi dan kunyomi-nya',
          'Mampu menyebutkan angka 1-10.000 dan membaca tanggal serta waktu dalam bahasa Jepang',
          'Mengenali kanji dasar dalam konteks kalimat sederhana',
        ],
        strategies: [
          {
            title: 'Gunakan WaniKani untuk Kanji Terstruktur',
            body: 'WaniKani (wanikani.com) menggunakan metode SRS (spaced repetition) dan mnemonik untuk mengajarkan kanji secara bertahap. Level 1-5 gratis dan mencakup hampir semua kanji N5.',
          },
          {
            title: 'Buat Flashcard di Anki',
            body: 'Download deck JLPT N5 di Anki (apps.ankiweb.net). Review 10-15 kanji baru per hari dan ulangi kartu lama. Konsistensi lebih penting daripada kecepatan.',
          },
          {
            title: 'Cek Daftar Kanji di JLPT Sensei',
            body: 'JLPT Sensei (jlptsensei.com) menyediakan daftar lengkap kanji N5 dengan contoh kata dan kalimat. Gunakan sebagai referensi saat belajar kanji baru.',
          },
          {
            title: 'Latihan Angka dalam Kehidupan Sehari-hari',
            body: 'Setiap kali melihat angka (harga, nomor telepon, jam), coba ucapkan dalam bahasa Jepang. Ini cara tercepat menghafal angka tanpa terasa membosankan.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mengacaukan onyomi dan kunyomi',
            body: 'Setiap kanji punya cara baca Cina (onyomi) dan Jepang (kunyomi). Contoh: 人 dibaca じん (jin) dalam 日本人 tapi ひと (hito) saat berdiri sendiri. Tips: hafalkan kanji dalam konteks kata, bukan cara baca terpisah.',
          },
          {
            title: 'Melupakan counter khusus untuk angka',
            body: 'Bahasa Jepang punya counter berbeda untuk benda tipis (枚/まい), benda panjang (本/ほん), orang (人/にん), dll. Jangan hanya menghafal angka — pelajari juga counter yang sering muncul di N5.',
          },
          {
            title: 'Menghafal kanji tanpa konteks',
            body: 'Menghafal kanji satu per satu tanpa contoh kata tidak efektif. Selalu pelajari kanji bersama minimal 2 kata yang menggunakannya. Contoh: 日 → 日本 (にほん/Jepang), 毎日 (まいにち/setiap hari).',
          },
        ],
      },
      units: [
        {
          slug: 'n5-kanji-dasar',
          title: 'Kanji & Penguasaan Kana N5',
          titleEn: 'N5 Kanji & Kana Mastery',
          stepSlugs: ['n5-hiragana-mastery', 'n5-basic-kanji'],
          phrases: [
            { japanese: '日', romaji: 'nichi / hi', indonesian: 'hari, matahari' },
            { japanese: '月', romaji: 'getsu / tsuki', indonesian: 'bulan' },
            { japanese: '火', romaji: 'ka / hi', indonesian: 'api' },
            { japanese: '水', romaji: 'sui / mizu', indonesian: 'air' },
            { japanese: '木', romaji: 'moku / ki', indonesian: 'pohon, kayu' },
            { japanese: '金', romaji: 'kin / kane', indonesian: 'emas, uang' },
            { japanese: '土', romaji: 'do / tsuchi', indonesian: 'tanah' },
            { japanese: '山', romaji: 'san / yama', indonesian: 'gunung' },
          ],
          content: {
            pronunciationCards: [
              { char: '日', romaji: 'nichi / hi', comparison: 'hari / matahari — kanji paling sering muncul di N5' },
              { char: '月', romaji: 'getsu / tsuki', comparison: 'bulan — digunakan untuk nama bulan (一月, 二月)' },
              { char: '人', romaji: 'jin / hito', comparison: 'orang — 日本人 (nihonjin) = orang Jepang' },
              { char: '山', romaji: 'san / yama', comparison: 'gunung — 富士山 (Fujisan) = Gunung Fuji' },
              { char: '川', romaji: 'sen / kawa', comparison: 'sungai — bentuknya seperti aliran air mengalir' },
              { char: '口', romaji: 'kou / kuchi', comparison: 'mulut — bentuknya seperti mulut terbuka' },
              { char: '手', romaji: 'shu / te', comparison: 'tangan — 上手 (jouzu) = mahir/pandai' },
              { char: '目', romaji: 'moku / me', comparison: 'mata — bentuknya menyerupai mata dengan pupil' },
            ],
            mnemonics: [
              {
                title: 'Hari dalam Seminggu = 7 Elemen',
                body: '月火水木金土日 — Bulan, Api, Air, Kayu, Emas, Tanah, Matahari. Sama seperti planet dalam seminggu! 月曜日 (Senin = bulan), 火曜日 (Selasa = api), dst.',
              },
              {
                title: 'Kanji sebagai Gambar',
                body: '山 terlihat seperti tiga puncak gunung. 川 terlihat seperti tiga aliran sungai. 口 terlihat seperti mulut terbuka. Banyak kanji dasar berasal dari pictogram — cari bentuk gambarnya!',
              },
              {
                title: 'Radikal = Blok Bangunan',
                body: 'Kanji terdiri dari komponen kecil yang disebut radikal. 休 (istirahat) = 人 (orang) + 木 (pohon) → orang bersandar di pohon = istirahat. Pahami radikal untuk menghafal lebih cepat.',
              },
            ],
            practicePrompts: [
              'Tulis 7 kanji hari dalam seminggu (日月火水木金土) masing-masing 5 kali',
              'Buka WaniKani dan selesaikan 10 review kanji N5 hari ini',
              'Buat flashcard Anki untuk 10 kanji pertama: 日月火水木金土山川人',
              'Tulis 5 kata yang menggunakan kanji 人: 日本人、一人、大人、人口、人気',
              'Latihan membaca: 今日は月曜日です (Hari ini hari Senin)',
            ],
          },
        },
        {
          slug: 'n5-angka-waktu',
          title: 'Angka, Tanggal & Waktu',
          titleEn: 'Numbers, Dates & Time',
          stepSlugs: ['n5-numbers-time'],
          phrases: [
            { japanese: '一', romaji: 'ichi', indonesian: 'satu (1)' },
            { japanese: '二', romaji: 'ni', indonesian: 'dua (2)' },
            { japanese: '三', romaji: 'san', indonesian: 'tiga (3)' },
            { japanese: '百', romaji: 'hyaku', indonesian: 'seratus (100)' },
            { japanese: '千', romaji: 'sen', indonesian: 'seribu (1.000)' },
            { japanese: '万', romaji: 'man', indonesian: 'sepuluh ribu (10.000)' },
            { japanese: '三月十五日', romaji: 'sangatsu juugonichi', indonesian: 'tanggal 15 Maret' },
            { japanese: '午前九時', romaji: 'gozen kuji', indonesian: 'jam 9 pagi' },
          ],
          content: {
            pronunciationCards: [
              { char: '一', romaji: 'ichi', comparison: 'satu — satu garis horizontal' },
              { char: '二', romaji: 'ni', comparison: 'dua — dua garis horizontal' },
              { char: '三', romaji: 'san', comparison: 'tiga — tiga garis horizontal' },
              { char: '十', romaji: 'juu', comparison: 'sepuluh — bentuk seperti tanda plus (+)' },
              { char: '百', romaji: 'hyaku', comparison: 'seratus — perhatikan perubahan bunyi: 三百 = sanbyaku' },
              { char: '千', romaji: 'sen', comparison: 'seribu — 三千 = sanzen (bunyi berubah!)' },
              { char: '万', romaji: 'man', comparison: 'sepuluh ribu — 一万円 = ichiman en = 10.000 yen' },
              { char: '時', romaji: 'ji', comparison: 'jam — 三時 (sanji) = jam 3' },
              { char: '分', romaji: 'fun / pun', comparison: 'menit — 五分 (gofun) = 5 menit' },
            ],
            mnemonics: [
              {
                title: 'Angka 1-3 = Jumlah Garis',
                body: '一 (1 garis), 二 (2 garis), 三 (3 garis) — kanji paling intuitif! Setelah itu, sistem berbeda: 四五六七八九十.',
              },
              {
                title: 'Bulan = Angka + 月',
                body: 'Semua nama bulan dalam bahasa Jepang sangat sederhana: 一月 (Januari), 二月 (Februari), ..., 十二月 (Desember). Cukup hafal angka + 月 (gatsu)!',
              },
            ],
            practicePrompts: [
              'Hitung 1-10 dalam bahasa Jepang: いち、に、さん、し/よん、ご、ろく、しち/なな、はち、きゅう/く、じゅう',
              'Sebutkan tanggal lahirmu dalam bahasa Jepang (contoh: 五月二十日 = 20 Mei)',
              'Latihan jam: sebutkan waktu sekarang dalam bahasa Jepang (contoh: 午後三時十五分)',
              'Buka JLPT Sensei dan kerjakan latihan angka dan counter N5',
            ],
          },
        },
      ],
    },
    {
      slug: 'tata-bahasa-ekspresi',
      title: 'Tata Bahasa & Ekspresi',
      sectionNumber: 2,
      guide: {
        title: 'Panduan Seksi 2: Tata Bahasa & Ekspresi',
        description:
          'Tata bahasa adalah kerangka kalimat bahasa Jepang. Di N5, kamu akan belajar partikel dasar yang menentukan peran kata dalam kalimat, kata sifat dan kata kerja dasar, serta ekspresi sehari-hari yang paling sering digunakan. Penguasaan bagian ini sangat penting untuk komunikasi dasar.',
        objectives: [
          'Memahami fungsi 7 partikel dasar: は、が、を、に、で、と、の',
          'Mampu menggunakan kata sifat-i dan kata sifat-na dalam kalimat sederhana',
          'Menguasai konjugasi dasar kata kerja (bentuk masu, bentuk negatif)',
          'Menggunakan 20+ ekspresi sehari-hari dalam situasi nyata',
        ],
        strategies: [
          {
            title: 'Pelajari Partikel lewat Tae Kim\'s Guide',
            body: 'Tae Kim\'s Guide (guidetojapanese.org) menjelaskan partikel dengan cara yang sangat jelas dan gratis. Baca bagian "Basic Grammar" secara berurutan — jangan loncat-loncat.',
          },
          {
            title: 'Gunakan Bunpo untuk Latihan Interaktif',
            body: 'Aplikasi Bunpo (bunpo.app) menyediakan latihan tata bahasa JLPT per level. Kerjakan 10-15 soal per hari untuk membiasakan diri dengan pola kalimat N5.',
          },
          {
            title: 'Praktikkan Ekspresi dengan Shadowing',
            body: 'Dengarkan audio dari NHK World Learn Japanese dan ulangi frasa yang kamu dengar. Teknik shadowing ini sangat efektif untuk menghafal ekspresi dan memperbaiki pelafalan.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mengacaukan は (wa) dan が (ga)',
            body: 'は menandai topik pembicaraan, が menandai subjek baru atau penekanan. Contoh: 私は学生です (Saya adalah murid — fakta umum) vs 私が学生です (SAYA yang murid — menekankan "saya"). Tips: は = "berbicara tentang...", が = "yang...".',
          },
          {
            title: 'Salah menempatkan partikel を dan に',
            body: 'を menandai objek langsung dari aksi (ごはんを食べる = makan nasi), に menandai tujuan/tempat/waktu (学校に行く = pergi ke sekolah). Tips: を selalu setelah "apa yang di-verb", に selalu setelah "ke mana/kapan".',
          },
          {
            title: 'Lupa perbedaan kata sifat-i dan kata sifat-na',
            body: 'Kata sifat-i berakhiran い (大きい、小さい) dan berkonjugasi sendiri. Kata sifat-na (好き、きれい) butuh な sebelum kata benda. Hati-hati: きれい terlihat seperti kata sifat-i tapi sebenarnya kata sifat-na!',
          },
        ],
      },
      units: [
        {
          slug: 'n5-tata-bahasa',
          title: 'Tata Bahasa Dasar N5',
          titleEn: 'N5 Basic Grammar',
          stepSlugs: ['n5-basic-grammar', 'n5-adjectives-verbs'],
          phrases: [
            { japanese: '私は学生です', romaji: 'watashi wa gakusei desu', indonesian: 'Saya adalah murid' },
            { japanese: 'これは本です', romaji: 'kore wa hon desu', indonesian: 'Ini adalah buku' },
            { japanese: '学校に行きます', romaji: 'gakkou ni ikimasu', indonesian: 'Pergi ke sekolah' },
            { japanese: 'ごはんを食べます', romaji: 'gohan wo tabemasu', indonesian: 'Makan nasi' },
            { japanese: '友だちと話します', romaji: 'tomodachi to hanashimasu', indonesian: 'Berbicara dengan teman' },
            { japanese: '私の本', romaji: 'watashi no hon', indonesian: 'Buku saya' },
          ],
          content: {
            pronunciationCards: [
              { char: 'は', romaji: 'wa', comparison: 'partikel topik — dibaca "wa" bukan "ha" saat jadi partikel' },
              { char: 'が', romaji: 'ga', comparison: 'partikel subjek — menandai subjek baru atau penekanan' },
              { char: 'を', romaji: 'wo', comparison: 'partikel objek — menandai objek langsung dari kata kerja' },
              { char: 'に', romaji: 'ni', comparison: 'partikel tujuan/waktu — "ke", "pada", "di"' },
              { char: 'で', romaji: 'de', comparison: 'partikel metode/tempat — "di (tempat aksi)", "dengan (alat)"' },
              { char: 'と', romaji: 'to', comparison: 'partikel bersama — "dan", "bersama"' },
              { char: 'の', romaji: 'no', comparison: 'partikel kepemilikan — "punya", "milik"' },
              { char: '食べる', romaji: 'taberu', comparison: 'makan — kata kerja golongan 2 (ichidan)' },
              { char: '行く', romaji: 'iku', comparison: 'pergi — kata kerja golongan 1 (godan)' },
              { char: '大きい', romaji: 'ookii', comparison: 'besar — kata sifat-i, konjugasi: 大きくない (tidak besar)' },
            ],
            mnemonics: [
              {
                title: 'は = Topik, が = Fokus',
                body: 'Bayangkan は sebagai "spotlight panggung" — menyoroti topik pembicaraan. が sebagai "jari yang menunjuk" — menunjukkan siapa/apa yang melakukan sesuatu. 猫は魚が好きです = Kucing (topik), ikan (yang disukai).',
              },
              {
                title: 'Urutan Kalimat: SOV',
                body: 'Bahasa Jepang menggunakan urutan Subjek-Objek-Verba (bukan SVO seperti bahasa Indonesia). 私は (S) ごはんを (O) 食べます (V) = Saya nasi makan. Kata kerja SELALU di akhir kalimat.',
              },
              {
                title: 'Kata Sifat-i = Sudah Lengkap',
                body: 'Kata sifat-i seperti 大きい sudah bisa langsung menempel ke kata benda: 大きい犬 (anjing besar). Kata sifat-na butuh な: きれいな花 (bunga cantik). Ingat: -i = independen, -na = butuh な.',
              },
            ],
            practicePrompts: [
              'Buat 5 kalimat menggunakan partikel は: (topik)は(deskripsi)です',
              'Buat 3 kalimat dengan を dan に: (objek)を(verb)ます、(tempat)に行きます',
              'Ubah kata sifat-i ke bentuk negatif: 大きい→大きくない、小さい→小さくない',
              'Buka Tae Kim\'s Guide bagian partikel dan baca penjelasan は vs が',
              'Kerjakan 10 soal tata bahasa N5 di Bunpo atau JLPT Sensei',
            ],
          },
        },
        {
          slug: 'n5-ekspresi-harian',
          title: 'Ekspresi Sehari-hari',
          titleEn: 'Daily Expressions',
          stepSlugs: ['n5-daily-expressions'],
          phrases: [
            { japanese: 'おはようございます', romaji: 'ohayou gozaimasu', indonesian: 'Selamat pagi (sopan)' },
            { japanese: 'こんにちは', romaji: 'konnichiwa', indonesian: 'Halo / Selamat siang' },
            { japanese: 'こんばんは', romaji: 'konbanwa', indonesian: 'Selamat malam' },
            { japanese: 'ありがとうございます', romaji: 'arigatou gozaimasu', indonesian: 'Terima kasih (sopan)' },
            { japanese: 'すみません', romaji: 'sumimasen', indonesian: 'Permisi / Maaf' },
            { japanese: 'いただきます', romaji: 'itadakimasu', indonesian: 'Selamat makan (sebelum makan)' },
            { japanese: 'ごちそうさまでした', romaji: 'gochisousama deshita', indonesian: 'Terima kasih atas makanannya' },
          ],
          content: {
            pronunciationCards: [
              { char: 'おはようございます', romaji: 'ohayou gozaimasu', comparison: 'selamat pagi (sopan) — gunakan sampai sekitar jam 10' },
              { char: 'こんにちは', romaji: 'konnichiwa', comparison: 'halo/selamat siang — paling umum, dari siang sampai sore' },
              { char: 'こんばんは', romaji: 'konbanwa', comparison: 'selamat malam — gunakan dari sore hari' },
              { char: 'すみません', romaji: 'sumimasen', comparison: 'permisi/maaf — serbaguna: minta perhatian, minta maaf, berterima kasih' },
              { char: 'いくらですか', romaji: 'ikura desu ka', comparison: 'berapa harganya? — wajib untuk belanja di Jepang' },
              { char: 'どこですか', romaji: 'doko desu ka', comparison: 'di mana? — トイレはどこですか = di mana toiletnya?' },
              { char: 'わかりました', romaji: 'wakarimashita', comparison: 'saya mengerti — bentuk lampau dari わかります' },
              { char: 'お願いします', romaji: 'onegaishimasu', comparison: 'tolong / mohon — gunakan saat meminta sesuatu' },
            ],
            mnemonics: [
              {
                title: 'Salam = Waktu dalam Sehari',
                body: 'おはよう (pagi), こんにちは (siang), こんばんは (malam) — tiga salam dasar sesuai waktu. Bentuk sopan menambahkan ございます di akhir: おはようございます.',
              },
              {
                title: 'Frasa Makan Penting di Jepang',
                body: 'いただきます (sebelum makan) dan ごちそうさまでした (setelah makan) adalah budaya wajib di Jepang. Tidak mengucapkannya dianggap tidak sopan, terutama di tempat kerja.',
              },
            ],
            practicePrompts: [
              'Praktikkan salam sesuai waktu: ucapkan おはようございます pagi ini, こんにちは siang, こんばんは malam',
              'Buka NHK World Learn Japanese dan dengarkan pelafalan 10 ekspresi dasar',
              'Buat dialog pendek di restoran: すみません → 水をお願いします → ありがとうございます',
              'Hafalkan 3 pertanyaan penting: いくらですか、どこですか、なんですか',
              'Latihan shadowing: dengarkan dan ulangi ekspresi dari Bunpo atau NHK World',
            ],
          },
        },
      ],
    },
    {
      slug: 'membaca-review',
      title: 'Membaca & Review',
      sectionNumber: 3,
      quizSlug: 'n5-review',
      guide: {
        title: 'Panduan Seksi 3: Membaca & Review',
        description:
          'Selamat sudah sampai di seksi terakhir level N5! Di sini kamu akan mengintegrasikan semua yang sudah dipelajari — kanji, kosakata, tata bahasa, dan ekspresi — dalam latihan membaca teks nyata. Kemampuan membaca adalah kunci keberhasilan di JLPT.',
        objectives: [
          'Membaca dan memahami teks pendek setara JLPT N5 (pengumuman, jadwal, dialog)',
          'Mengidentifikasi informasi kunci dari teks seperti waktu, tempat, dan aktivitas',
          'Memahami konteks umum kalimat tanpa perlu mengerti setiap kata',
          'Menyelesaikan N5 Review Quiz dengan skor minimal 80%',
        ],
        strategies: [
          {
            title: 'Baca NHK Web Easy Setiap Hari',
            body: 'NHK Web Easy (www3.nhk.or.jp/news/easy/) menyediakan berita dengan furigana di atas kanji. Baca minimal satu artikel pendek per hari — fokus pada memahami ide utama, bukan setiap kata.',
          },
          {
            title: 'Latihan Soal Membaca di JLPT Sensei',
            body: 'JLPT Sensei (jlptsensei.com) punya contoh soal membaca N5. Kerjakan 2-3 soal per sesi dan analisis jawaban yang salah — pahami kenapa jawaban yang benar itu benar.',
          },
          {
            title: 'Gunakan Strategi Scanning',
            body: 'Saat membaca teks N5, cari kata kunci terlebih dahulu (angka, tempat, waktu) sebelum membaca keseluruhan. Ini teknik yang sangat berguna di ujian JLPT yang dibatasi waktu.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mencoba menerjemahkan kata per kata',
            body: 'Bahasa Jepang punya urutan kalimat berbeda (SOV). Jangan menerjemahkan kata per kata ke bahasa Indonesia — coba pahami makna kalimat secara keseluruhan. Latihan: baca seluruh kalimat dulu, baru coba pahami artinya.',
          },
          {
            title: 'Mengabaikan partikel saat membaca',
            body: 'Partikel seperti は、が、を、に menentukan hubungan antar kata. Mengabaikan partikel bisa mengubah makna total. Contoh: 犬が猫を見る (anjing melihat kucing) vs 犬を猫が見る (kucing melihat anjing).',
          },
        ],
      },
      units: [
        {
          slug: 'n5-membaca',
          title: 'Membaca Teks N5',
          titleEn: 'N5 Reading Comprehension',
          stepSlugs: ['n5-reading-comprehension'],
          phrases: [
            { japanese: '明日は学校に行きます', romaji: 'ashita wa gakkou ni ikimasu', indonesian: 'Besok pergi ke sekolah' },
            { japanese: '毎日日本語を勉強します', romaji: 'mainichi nihongo wo benkyou shimasu', indonesian: 'Setiap hari belajar bahasa Jepang' },
            { japanese: '駅は右にあります', romaji: 'eki wa migi ni arimasu', indonesian: 'Stasiun ada di sebelah kanan' },
            { japanese: '午前十時から午後三時まで', romaji: 'gozen juuji kara gogo sanji made', indonesian: 'Dari jam 10 pagi sampai jam 3 sore' },
            { japanese: '図書館で本を読みます', romaji: 'toshokan de hon wo yomimasu', indonesian: 'Membaca buku di perpustakaan' },
          ],
          content: {
            pronunciationCards: [
              { char: '明日', romaji: 'ashita', comparison: 'besok — kanji 明 (terang) + 日 (hari)' },
              { char: '毎日', romaji: 'mainichi', comparison: 'setiap hari — 毎 (setiap) + 日 (hari)' },
              { char: '学校', romaji: 'gakkou', comparison: 'sekolah — 学 (belajar) + 校 (sekolah)' },
              { char: '図書館', romaji: 'toshokan', comparison: 'perpustakaan — sering muncul di soal membaca N5' },
              { char: '右', romaji: 'migi', comparison: 'kanan — lawannya 左 (hidari/kiri)' },
              { char: '午前', romaji: 'gozen', comparison: 'pagi / AM — 午後 (gogo) = sore / PM' },
            ],
            mnemonics: [
              {
                title: 'Pola Kalimat N5 yang Paling Sering',
                body: 'Hafalkan 3 pola ini: (tempat)に行きます (pergi ke...), (tempat)で(verb)ます (melakukan...di...), (waktu)から(waktu)まで (dari...sampai...). Ketiga pola ini muncul di hampir semua teks N5.',
              },
              {
                title: 'Kata Tanya = Kunci Jawaban',
                body: 'Di soal membaca, perhatikan kata tanya: いつ (kapan), どこ (di mana), だれ (siapa), なに (apa). Kata tanya di soal menunjukkan informasi apa yang harus kamu cari di teks.',
              },
            ],
            practicePrompts: [
              'Baca pengumuman ini dan jawab: 図書館は午前九時から午後五時までです。月曜日は休みです。Pertanyaan: jam berapa tutup? Hari apa libur?',
              'Buka NHK Web Easy dan baca satu artikel pendek — tulis 3 kata baru yang kamu temukan',
              'Kerjakan 3 soal membaca N5 di JLPT Sensei dan analisis jawabanmu',
              'Buat jadwal harianmu dalam bahasa Jepang menggunakan pola ～時に～ます',
              'Latihan: baca dialog pendek dan identifikasi siapa, di mana, dan kapan',
            ],
          },
        },
      ],
    },
  ],
};
