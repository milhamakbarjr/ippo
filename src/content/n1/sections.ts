import type { LevelPathConfig } from '@/types/learning';

export const n1Sections: LevelPathConfig = {
  levelId: 'n1',
  sections: [
    {
      slug: 'kanji-kosakata',
      title: 'Kanji & Kosakata N1',
      sectionNumber: 1,
      guide: {
        title: 'Panduan Seksi 1: Kanji & Kosakata N1',
        description:
          'Level N1 menuntut penguasaan 2000+ kanji termasuk kanji langka, sastra, dan teknis, serta 6000 kosakata yang mencakup idiom, peribahasa, onomatope, dan istilah domain spesifik. Ini adalah puncak pembelajaran kanji dan kosakata JLPT.',
        objectives: [
          'Menguasai 2000+ kanji kumulatif termasuk kanji langka dan sastra (憂、曖、昧、歪、殊)',
          'Menghafal 6000 kosakata termasuk idiom (慣用句) dan peribahasa (ことわざ)',
          'Membaca dan memahami kanji dalam konteks dokumen hukum, medis, dan teknis',
          'Menggunakan onomatope (擬音語・擬態語) secara tepat dalam tulisan dan percakapan formal',
        ],
        strategies: [
          {
            title: 'Gunakan WaniKani Level Lanjut',
            body: 'WaniKani level 51-60 mencakup kanji N1 yang paling sulit. Targetkan 10 kanji baru per hari dengan review SRS. Fokus pada kanji yang sering muncul di koran dan dokumen resmi.',
          },
          {
            title: 'Buat Deck Anki JLPT N1 Khusus',
            body: 'Unduh deck Anki JLPT N1 dan tambahkan contoh kalimat dari sumber asli (koran, novel). Gunakan metode "sentence mining" — setiap kali menemukan kata baru dalam bacaan, tambahkan ke deck bersama konteksnya.',
          },
          {
            title: 'Baca Koran Jepang Setiap Hari',
            body: 'Baca artikel dari 朝日新聞 (Asahi Shimbun) atau 読売新聞 (Yomiuri Shimbun) minimal 1 artikel per hari. Catat kanji dan kosakata baru. Ini adalah sumber terbaik untuk kanji N1 dalam konteks nyata.',
          },
          {
            title: 'Pelajari Kanji Per Tema',
            body: 'Kelompokkan kanji N1 berdasarkan tema: hukum (訴訟、裁判、弁護), medis (診療、症状、処方), ekonomi (景気、為替、融資). Belajar per tema lebih efektif daripada hafal acak.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mengacaukan Kanji dengan Bentuk Mirip',
            body: '憂 (ureeru/khawatir) vs 優 (yasashii/lembut) — hanya beda satu coretan にんべん. 概 (gai/garis besar) vs 慨 (gai/mengeluh) — beda radikal 木 vs 忄. Selalu perhatikan radikal untuk membedakan kanji yang mirip.',
          },
          {
            title: 'Menghafal Tanpa Konteks',
            body: 'Di level N1, menghafal kanji secara individual tidak cukup. Kanji seperti 曖昧 (aimai/ambigu) harus diingat sebagai compound, bukan karakter terpisah. Selalu pelajari kanji dalam konteks jukugo (熟語).',
          },
          {
            title: 'Mengabaikan Kunyomi Langka',
            body: 'Banyak kanji N1 memiliki kunyomi (bacaan Jepang) yang jarang digunakan tapi muncul di ujian. Contoh: 潔い (isagiyoi/bersih/tegas), 清々しい (sugasugashii/menyegarkan). Jangan hanya hafal onyomi.',
          },
        ],
      },
      units: [
        {
          slug: 'n1-kanji',
          title: 'Kanji N1 (2000+ Kanji)',
          titleEn: 'N1 Kanji (2000+ Characters)',
          stepSlugs: ['n1-kanji-2000'],
          phrases: [
            { japanese: '曖昧', romaji: 'aimai', indonesian: 'ambigu, tidak jelas' },
            { japanese: '憂鬱', romaji: 'yuuutsu', indonesian: 'depresi, murung' },
            { japanese: '懸念', romaji: 'kenen', indonesian: 'kekhawatiran, keprihatinan' },
            { japanese: '攫う', romaji: 'sarau', indonesian: 'menculik, merebut' },
            { japanese: '歪む', romaji: 'yugamu', indonesian: 'melengkung, menyimpang' },
            { japanese: '殊更', romaji: 'kotosara', indonesian: 'secara khusus, sengaja' },
            { japanese: '欺く', romaji: 'azamuku', indonesian: 'menipu, mengelabui' },
            { japanese: '擁護', romaji: 'yougo', indonesian: 'pembelaan, perlindungan' },
          ],
          content: {
            pronunciationCards: [
              { char: '曖昧', romaji: 'aimai', comparison: 'ambigu — sering digunakan dalam debat dan esai formal' },
              { char: '憂鬱', romaji: 'yuuutsu', comparison: 'depresi — kanji paling rumit dalam bahasa Jepang, sering muncul di ujian N1' },
              { char: '懸念', romaji: 'kenen', comparison: 'kekhawatiran — bahasa formal, seperti "keprihatinan" dalam bahasa Indonesia resmi' },
              { char: '攫う', romaji: 'sarau', comparison: 'menculik — bacaan kunyomi langka yang sering diuji di N1' },
              { char: '歪む', romaji: 'yugamu', comparison: 'menyimpang — digunakan baik secara harfiah (bentuk bengkok) maupun kiasan (moral menyimpang)' },
              { char: '殊更', romaji: 'kotosara', comparison: 'sengaja — adverbia formal, setara "dengan sengaja" dalam bahasa Indonesia resmi' },
              { char: '擁護', romaji: 'yougo', comparison: 'pembelaan — istilah hukum dan politik, seperti "advokasi" dalam bahasa Indonesia' },
              { char: '憤慨', romaji: 'fungai', comparison: 'kemarahan — ekspresi formal untuk "marah besar", digunakan dalam berita dan pidato' },
            ],
            mnemonics: [
              {
                title: 'Kanji Rumit: 鬱 (utsu)',
                body: '鬱 adalah kanji dengan jumlah coretan terbanyak (29 coretan) yang masih umum digunakan. Bayangkan labirin gelap yang sulit ditembus — itulah "depresi". Pecah menjadi bagian: 林 (hutan) + 缶 (kaleng) + ワ + 冖 + 鬯 + 彡.',
              },
              {
                title: 'Bedakan 慣 vs 憤 vs 憧',
                body: '慣 (kan/terbiasa) punya 貫 di kanan, 憤 (fun/marah) punya 賁 di kanan, 憧 (dou/rindu) punya 童 di kanan. Ketiganya punya radikal 忄(hati) — semuanya terkait emosi/perasaan, tapi bagian kanan menentukan makna spesifik.',
              },
            ],
            practicePrompts: [
              'Tulis 10 kanji N1 langka beserta compound-nya: 曖昧、憂鬱、懸念、擁護、憤慨',
              'Baca satu artikel 朝日新聞 dan tandai semua kanji yang belum kamu kenal',
              'Gunakan WaniKani level 51+ atau Anki deck N1 untuk review 20 kanji per hari',
              'Tulis kalimat menggunakan 5 kanji compound N1 yang baru dipelajari',
              'Latihan membedakan kanji mirip: 憂/優, 概/慨, 壊/懐',
            ],
          },
        },
        {
          slug: 'n1-kosakata',
          title: 'Kosakata N1 (6000 Kata)',
          titleEn: 'N1 Vocabulary (6000 Words)',
          stepSlugs: ['n1-vocabulary-6000'],
          phrases: [
            { japanese: '一目瞭然', romaji: 'ichimoku ryouzen', indonesian: 'jelas pada pandangan pertama (idiom)' },
            { japanese: '七転八起', romaji: 'nanakorobi yaoki', indonesian: 'jatuh tujuh kali, bangkit delapan kali (peribahasa)' },
            { japanese: 'ぐずぐず', romaji: 'guzuguzu', indonesian: 'berlama-lama, menunda-nunda (onomatope)' },
            { japanese: '訴訟', romaji: 'soshou', indonesian: 'gugatan hukum, litigasi' },
            { japanese: '為替', romaji: 'kawase', indonesian: 'nilai tukar mata uang' },
            { japanese: '矛盾', romaji: 'mujun', indonesian: 'kontradiksi, pertentangan' },
            { japanese: '顕著', romaji: 'kencho', indonesian: 'menonjol, signifikan' },
          ],
          content: {
            pronunciationCards: [
              { char: '一目瞭然', romaji: 'ichimoku ryouzen', comparison: 'jelas pada pandangan pertama — yojijukugo (四字熟語) yang sering muncul di ujian N1' },
              { char: '七転八起', romaji: 'nanakorobi yaoki', comparison: 'jatuh 7 bangkit 8 — peribahasa Jepang terkenal tentang ketangguhan' },
              { char: 'ぐずぐず', romaji: 'guzuguzu', comparison: 'menunda-nunda — onomatope untuk perilaku lambat dan ragu-ragu' },
              { char: 'しぶしぶ', romaji: 'shibushibu', comparison: 'dengan enggan — onomatope untuk melakukan sesuatu dengan terpaksa' },
              { char: '訴訟', romaji: 'soshou', comparison: 'litigasi — istilah hukum yang setara "gugatan" dalam bahasa Indonesia formal' },
              { char: '為替', romaji: 'kawase', comparison: 'nilai tukar — istilah ekonomi, sering muncul di berita keuangan Jepang' },
              { char: '矛盾', romaji: 'mujun', comparison: 'kontradiksi — berasal dari cerita Tiongkok tentang tombak (矛) dan perisai (盾)' },
              { char: '顕著', romaji: 'kencho', comparison: 'signifikan — kata formal yang sering digunakan dalam laporan dan penelitian' },
              { char: '凝縮', romaji: 'gyoushuku', comparison: 'kondensasi/ringkasan padat — digunakan dalam konteks ilmiah dan sastra' },
              { char: '微塵', romaji: 'mijin', comparison: 'sedikit pun (biasanya negatif: 微塵も～ない) — ekspresi sastra tingkat tinggi' },
            ],
            mnemonics: [
              {
                title: 'Yojijukugo: 4 Kanji = 1 Makna',
                body: '四字熟語 (yojijukugo) adalah idiom 4 karakter. Banyak berasal dari sastra Tiongkok klasik. Cara menghafal: pecah jadi 2+2. 一目 (satu pandangan) + 瞭然 (jelas) = "jelas dalam satu pandangan". Pelajari 3 yojijukugo baru per minggu.',
              },
              {
                title: 'Onomatope Berpasangan',
                body: 'Onomatope Jepang biasanya berpola ABAB: ぐずぐず (menunda), しぶしぶ (enggan), ぼんやり (melamun). Kelompokkan berdasarkan nuansa: negatif (ぐずぐず, だらだら), positif (きらきら, わくわく), netral (そろそろ, ぼちぼち).',
              },
              {
                title: 'Kosakata Hukum & Ekonomi',
                body: 'Istilah hukum sering menggunakan kanji 訴 (menuntut), 裁 (menghakimi), 弁 (membela). Istilah ekonomi sering menggunakan 融 (mencair/keuangan), 為 (untuk/melakukan), 替 (mengganti). Kenali pola radikal ini untuk menebak makna kata baru.',
              },
            ],
            practicePrompts: [
              'Hafal 5 yojijukugo (四字熟語) baru: 一目瞭然、一石二鳥、以心伝心、七転八起、自業自得',
              'Buat kalimat menggunakan 5 onomatope berbeda dalam konteks formal',
              'Baca kolom ekonomi 読売新聞 dan catat 10 kosakata domain spesifik',
              'Gunakan Anki deck JLPT N1 Vocabulary untuk review 30 kata per hari',
              'Tulis paragraf pendek menggunakan minimal 3 idiom N1',
            ],
          },
        },
      ],
    },
    {
      slug: 'tata-bahasa-sastra',
      title: 'Tata Bahasa & Membaca Sastra',
      sectionNumber: 2,
      guide: {
        title: 'Panduan Seksi 2: Tata Bahasa & Membaca Sastra',
        description:
          'Seksi ini mencakup pola tata bahasa N1 yang sangat kompleks, membaca teks sastra Jepang modern (文語体), dan bahasa bisnis tingkat lanjut. Kamu akan belajar membaca esai filosofis, kritik sastra, dan dokumen bisnis formal.',
        objectives: [
          'Menguasai 80+ pola tata bahasa N1 (〜にして、〜をもって、〜ならではの、〜いかんによらず)',
          'Membaca dan memahami teks sastra Jepang modern termasuk novel dan esai filosofis',
          'Menulis dan memahami korespondensi bisnis formal tingkat tinggi',
          'Menganalisis nuansa dan implikasi dalam teks kompleks berbahasa Jepang',
        ],
        strategies: [
          {
            title: 'Gunakan BunPro untuk Tata Bahasa N1',
            body: 'BunPro memiliki koleksi lengkap pola tata bahasa N1 dengan SRS. Targetkan 3 pola baru per hari. Setiap pola harus dipraktikkan dalam minimal 5 kalimat berbeda.',
          },
          {
            title: 'Tonton Nihongo no Mori Seri N1',
            body: 'Channel YouTube Nihongo no Mori memiliki playlist khusus N1 grammar yang menjelaskan setiap pola dengan contoh dan nuansa. Tonton 1 video per hari dan catat pola yang dijelaskan.',
          },
          {
            title: 'Baca Karya Sastra Jepang Modern',
            body: 'Mulai dengan cerpen (短編小説) karya penulis seperti 村上春樹 (Murakami Haruki) atau 芥川龍之介 (Akutagawa Ryuunosuke). Baca versi dengan furigana terlebih dahulu, lalu tanpa furigana.',
          },
          {
            title: 'Latihan Membaca Berita NHK Web',
            body: 'Setelah terbiasa dengan NHK Web Easy, tingkatkan ke NHK Web reguler (www3.nhk.or.jp/news/). Berita reguler menggunakan bahasa formal yang setara N1. Baca 2 artikel per hari.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mengacaukan Nuansa Pola Serupa',
            body: '〜をもって (dengan/melalui) vs 〜をもってしても (bahkan dengan) — menambah しても mengubah makna drastis. 〜にして (pada saat/dalam kapasitas) memiliki 3 makna berbeda tergantung konteks. Selalu pelajari pola dalam konteks kalimat lengkap.',
          },
          {
            title: 'Terjemahkan Harfiah dari Bahasa Indonesia',
            body: 'Pola N1 sering tidak memiliki padanan langsung dalam bahasa Indonesia. 〜てやまない bukan "tidak berhenti" secara harfiah, melainkan ekspresi perasaan mendalam ("sangat berharap"). Pahami nuansa Jepang, jangan terjemahkan kata per kata.',
          },
          {
            title: 'Mengabaikan Register Bahasa',
            body: 'Banyak pola N1 hanya digunakan dalam konteks tertentu. 〜ならではの hanya untuk pujian positif, 〜いかんによらず hanya dalam dokumen resmi. Menggunakan pola formal dalam percakapan kasual terdengar sangat aneh bagi penutur asli.',
          },
        ],
      },
      units: [
        {
          slug: 'n1-tata-bahasa',
          title: 'Tata Bahasa N1 & Membaca Sastra',
          titleEn: 'N1 Grammar & Literary Reading',
          stepSlugs: ['n1-advanced-grammar', 'n1-literary-reading'],
          phrases: [
            { japanese: '努力いかんによらず', romaji: 'doryoku ikan ni yorazu', indonesian: 'terlepas dari usaha (apapun)' },
            { japanese: '経験をもって', romaji: 'keiken wo motte', indonesian: 'dengan pengalaman, melalui pengalaman' },
            { japanese: '日本ならではの文化', romaji: 'nihon naradewa no bunka', indonesian: 'budaya khas Jepang (yang hanya ada di Jepang)' },
            { japanese: '若くして成功した', romaji: 'wakaku shite seikou shita', indonesian: 'berhasil di usia muda' },
            { japanese: '平和を願ってやまない', romaji: 'heiwa wo negatte yamanai', indonesian: 'sangat mendambakan perdamaian' },
            { japanese: '結果いかんにかかわらず', romaji: 'kekka ikan ni kakawarazu', indonesian: 'tanpa memandang hasilnya' },
          ],
          content: {
            pronunciationCards: [
              { char: '〜いかんによらず', romaji: '~ikan ni yorazu', comparison: 'terlepas dari — pola formal untuk dokumen resmi dan pidato' },
              { char: '〜をもって', romaji: '~wo motte', comparison: 'dengan/melalui — digunakan dalam konteks formal, berasal dari bahasa klasik' },
              { char: '〜ならではの', romaji: '~naradewa no', comparison: 'khas/unik milik — hanya untuk konteks positif, pujian terhadap keunikan' },
              { char: '〜にして', romaji: '~ni shite', comparison: 'pada saat/dalam kapasitas — pola multimakna: waktu, kapasitas, atau kontras' },
              { char: '〜てやまない', romaji: '~te yamanai', comparison: 'sangat/tidak berhenti — ekspresi perasaan mendalam yang tulus' },
              { char: '〜をよそに', romaji: '~wo yoso ni', comparison: 'mengabaikan — konotasi negatif, orang lain khawatir tapi subjek tidak peduli' },
              { char: '〜かたわら', romaji: '~katawara', comparison: 'sambil juga — melakukan dua aktivitas serius secara bersamaan' },
              { char: '〜ならいざ知らず', romaji: '~nara iza shirazu', comparison: 'entahlah kalau... tapi — mengecualikan satu kemungkinan dari pernyataan umum' },
            ],
            mnemonics: [
              {
                title: 'Pola "Terlepas dari": 3 Variasi',
                body: '〜いかんによらず、〜いかんにかかわらず、〜いかんを問わず — ketiganya bermakna mirip ("terlepas dari") tapi berbeda nuansa. よらず paling formal (dokumen hukum), かかわらず umum (pidato/esai), 問わず paling fleksibel (berbagai konteks).',
              },
              {
                title: 'にして = 3 Makna dalam 1 Pola',
                body: '1) Waktu: 30歳にして (pada usia 30). 2) Kapasitas: 天才にして (sebagai seorang jenius). 3) Kontras: 簡潔にして明瞭 (ringkas namun jelas). Konteks kalimat menentukan makna mana yang digunakan.',
              },
              {
                title: 'Bedakan をもって vs をもってしても',
                body: 'をもって = "dengan/melalui" (positif/netral): 誠意をもって対応する (merespons dengan tulus). をもってしても = "bahkan dengan pun" (kontras): 彼の才能をもってしても (bahkan dengan bakatnya sekalipun). しても menambahkan nuansa "tetap tidak cukup".',
              },
            ],
            practicePrompts: [
              'Buat 5 kalimat menggunakan 〜いかんによらず dalam konteks dokumen resmi',
              'Tulis paragraf pendek menggunakan 〜ならではの untuk mendeskripsikan keunikan Indonesia',
              'Baca satu cerpen pendek dari 芥川龍之介 (tersedia gratis di Aozora Bunko) dan identifikasi pola N1',
              'Gunakan BunPro untuk review 10 pola tata bahasa N1 hari ini',
              'Tonton 1 video Nihongo no Mori N1 grammar dan catat 3 pola baru',
            ],
          },
        },
        {
          slug: 'n1-bisnis',
          title: 'Bahasa Bisnis Tingkat Lanjut',
          titleEn: 'Advanced Business Japanese',
          stepSlugs: ['n1-business-advanced'],
          phrases: [
            { japanese: '貴社のご発展を祈念いたします', romaji: 'kisha no go-hatten wo kinen itashimasu', indonesian: 'semoga perusahaan Anda semakin berkembang (penutup surat formal)' },
            { japanese: '何卒ご査収ください', romaji: 'nanitozo go-sashuu kudasai', indonesian: 'mohon diperiksa dan diterima (lampiran dokumen)' },
            { japanese: '忌憚のないご意見', romaji: 'kitan no nai go-iken', indonesian: 'pendapat yang jujur tanpa sungkan' },
            { japanese: '善処いたします', romaji: 'zensho itashimasu', indonesian: 'akan saya tangani sebaik mungkin' },
            { japanese: '恐縮ですが', romaji: 'kyoushuku desu ga', indonesian: 'maaf merepotkan, tetapi...' },
          ],
          content: {
            pronunciationCards: [
              { char: '貴社', romaji: 'kisha', comparison: 'perusahaan Anda (dalam surat) — bedakan dengan 御社 (onsha) untuk percakapan lisan' },
              { char: '何卒', romaji: 'nanitozo', comparison: 'mohon dengan sangat — kata formal tertinggi untuk meminta sesuatu dalam korespondensi bisnis' },
              { char: '忌憚のない', romaji: 'kitan no nai', comparison: 'tanpa sungkan — digunakan saat meminta feedback jujur dalam rapat formal' },
              { char: '善処', romaji: 'zensho', comparison: 'menangani sebaik mungkin — sering digunakan dalam konteks diplomatik/politik' },
              { char: '恐縮', romaji: 'kyoushuku', comparison: 'merasa tidak enak/merepotkan — ekspresi kesopanan tinggi dalam bisnis Jepang' },
              { char: 'ご査収', romaji: 'go-sashuu', comparison: 'silakan periksa dan terima — frase standar saat mengirim lampiran email bisnis' },
            ],
            mnemonics: [
              {
                title: '貴社 vs 御社: Tulis vs Ucap',
                body: '貴社 (kisha) hanya digunakan dalam tulisan (surat, email). 御社 (onsha) hanya digunakan dalam percakapan lisan (wawancara, rapat). Keduanya bermakna "perusahaan Anda" tapi salah konteks = kesalahan fatal.',
              },
              {
                title: 'Pola Surat Bisnis Jepang',
                body: 'Struktur standar: 1) 拝啓 (pembuka) → 2) 時候の挨拶 (salam musim) → 3) Isi surat → 4) Penutup (ご発展を祈念...) → 5) 敬具 (penutup formal). Hafal struktur ini sebagai template.',
              },
            ],
            practicePrompts: [
              'Tulis email bisnis formal meminta perpanjangan deadline proyek',
              'Latihan membedakan 貴社/御社 — tulis 3 kalimat surat dan 3 kalimat percakapan',
              'Baca 3 contoh surat bisnis Jepang dan identifikasi pola keigo yang digunakan',
            ],
          },
        },
      ],
    },
    {
      slug: 'persiapan-ujian',
      title: 'Persiapan Ujian N1',
      sectionNumber: 3,
      quizSlug: 'n1-review',
      guide: {
        title: 'Panduan Seksi 3: Persiapan Ujian N1',
        description:
          'Seksi terakhir ini mempersiapkanmu untuk ujian JLPT N1 yang sesungguhnya. Kamu akan mengerjakan simulasi ujian lengkap mencakup 言語知識 (pengetahuan bahasa), 読解 (pemahaman bacaan), dan 聴解 (pemahaman mendengar) dalam format dan waktu yang sama dengan ujian resmi.',
        objectives: [
          'Menyelesaikan simulasi ujian N1 lengkap dalam 170 menit',
          'Mencapai skor minimal 100/180 (passing score JLPT N1)',
          'Menguasai strategi manajemen waktu untuk setiap bagian ujian',
          'Mengidentifikasi dan memperbaiki kelemahan sebelum ujian sesungguhnya',
        ],
        strategies: [
          {
            title: 'Kerjakan Mock Exam dalam Kondisi Nyata',
            body: 'Simulasikan kondisi ujian: waktu 170 menit tanpa jeda, tanpa kamus, tanpa gangguan. Gunakan soal dari buku Shin Kanzen Master N1 atau situs JLPT resmi. Evaluasi hasilnya secara kritis.',
          },
          {
            title: 'Analisis Pola Soal Per Bagian',
            body: 'JLPT N1 memiliki pola soal yang konsisten. 文字・語彙: bacaan kanji dan makna kata. 文法: pilih pola yang tepat dan susun kalimat. 読解: cari ide utama dan detail spesifik. Pahami pola ini untuk menjawab lebih efisien.',
          },
          {
            title: 'Gunakan JLPT Sensei untuk Latihan Soal',
            body: 'JLPT Sensei menyediakan ratusan soal latihan N1 gratis yang dikelompokkan per kategori. Kerjakan minimal 20 soal per hari dan review jawabannya secara detail.',
          },
        ],
        commonMistakes: [
          {
            title: 'Kehabisan Waktu di Bagian 読解',
            body: 'Bagian membaca N1 sangat panjang dan padat. Banyak peserta menghabiskan terlalu banyak waktu di teks pertama. Tips: baca pertanyaan dulu, lalu skim teks untuk cari jawaban. Alokasikan maksimal 8 menit per teks panjang.',
          },
          {
            title: 'Terlalu Fokus pada Satu Bagian',
            body: 'JLPT N1 memiliki minimum skor per bagian (19/60). Bisa lulus total 100/180 tapi gagal kalau satu bagian di bawah minimum. Seimbangkan latihan antara 語彙・文法・読解・聴解.',
          },
        ],
      },
      units: [
        {
          slug: 'n1-ujian',
          title: 'Mock Exam N1',
          titleEn: 'N1 Mock Exam',
          stepSlugs: ['n1-mock-exam'],
          phrases: [
            { japanese: '言語知識', romaji: 'gengo chishiki', indonesian: 'pengetahuan bahasa (bagian ujian JLPT)' },
            { japanese: '読解', romaji: 'dokkai', indonesian: 'pemahaman bacaan' },
            { japanese: '聴解', romaji: 'choukai', indonesian: 'pemahaman mendengar' },
            { japanese: '合格点', romaji: 'goukakuten', indonesian: 'skor kelulusan' },
            { japanese: '配点', romaji: 'haiten', indonesian: 'distribusi nilai' },
          ],
          content: {
            pronunciationCards: [
              { char: '言語知識', romaji: 'gengo chishiki', comparison: 'pengetahuan bahasa — bagian pertama ujian JLPT, mencakup kanji, kosakata, dan tata bahasa' },
              { char: '読解', romaji: 'dokkai', comparison: 'pemahaman bacaan — bagian terpanjang dan tersulit di N1, membutuhkan manajemen waktu ketat' },
              { char: '聴解', romaji: 'choukai', comparison: 'pemahaman mendengar — bagian terakhir ujian, audio hanya diputar sekali' },
              { char: '合格', romaji: 'goukaku', comparison: 'lulus — skor minimum N1: total 100/180 dengan minimal 19/60 per bagian' },
              { char: '不合格', romaji: 'fugoukaku', comparison: 'tidak lulus — bisa terjadi meskipun total cukup jika satu bagian di bawah minimum' },
              { char: '模擬試験', romaji: 'mogi shiken', comparison: 'ujian simulasi — latihan dengan format dan waktu yang sama dengan ujian asli' },
            ],
            mnemonics: [
              {
                title: 'Struktur Ujian N1: 3 Bagian',
                body: '1) 言語知識・読解 (110 menit): kanji + kosakata + grammar + reading dalam satu sesi. 2) 聴解 (60 menit): listening. Total 170 menit. Ingat: reading dan grammar digabung — jangan habiskan semua waktu di grammar!',
              },
              {
                title: 'Skor Minimum Per Bagian',
                body: 'Total kelulusan: 100/180. TAPI setiap bagian punya minimum 19/60. Rumus: 言語知識 ≥19 + 読解 ≥19 + 聴解 ≥19, DAN total ≥100. Gagal di satu bagian = gagal keseluruhan.',
              },
            ],
            practicePrompts: [
              'Kerjakan satu set soal mock exam N1 lengkap dari JLPT Sensei dalam 170 menit',
              'Review semua jawaban salah dan kategorikan kelemahan: kanji/kosakata/grammar/reading/listening',
              'Buat rencana belajar 2 minggu berdasarkan hasil mock exam — fokus pada area terlemah',
              'Latihan time management: alokasikan 文字・語彙 25 menit, 文法 20 menit, 読解 65 menit',
              'Tonton 3 video Nihongo no Mori N1 tentang strategi menjawab soal ujian',
            ],
          },
        },
      ],
    },
  ],
};
