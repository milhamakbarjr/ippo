import type { LevelPathConfig } from '@/types/learning';

export const n3Sections: LevelPathConfig = {
  levelId: 'n3',
  sections: [
    {
      slug: 'kanji-kosakata',
      title: 'Kanji & Kosakata N3',
      sectionNumber: 1,
      guide: {
        title: 'Panduan Seksi 1: Kanji & Kosakata N3',
        description:
          'Di level N3, kamu akan menguasai 650 kanji dan 1500 kosakata. Ini adalah lompatan besar dari N4 — kanji baru mencakup konsep abstrak seperti 情 (perasaan), 決 (keputusan), dan 問題 (masalah). Kosakata juga berkembang ke ranah formal dan akademis.',
        objectives: [
          'Menghafal 650 kanji kumulatif (termasuk N5 dan N4)',
          'Menguasai 1500 kosakata yang sering muncul di media dan percakapan formal',
          'Membedakan on-yomi dan kun-yomi untuk kanji N3 yang umum',
          'Menggunakan kosakata abstrak dalam kalimat lengkap',
        ],
        strategies: [
          {
            title: 'Gunakan WaniKani atau Anki Setiap Hari',
            body: 'WaniKani (wanikani.com) mengajarkan kanji dengan metode SRS (Spaced Repetition). Alternatifnya, gunakan deck Anki JLPT N3 dan review minimal 20 kartu per hari. Konsistensi lebih penting dari jumlah.',
          },
          {
            title: 'Pelajari Kanji dalam Konteks Kata',
            body: 'Jangan hafal kanji secara terpisah. Pelajari dalam konteks kata: 問 saja sulit diingat, tapi 問題 (mondai = masalah) lebih mudah karena sering muncul. Gunakan JLPT Sensei (jlptsensei.com) untuk daftar kosakata per kanji.',
          },
          {
            title: 'Kelompokkan Kanji dengan Radikal yang Sama',
            body: 'Banyak kanji N3 berbagi radikal. Contoh: 話、語、読、説 semuanya berhubungan dengan komunikasi (radikal 言). Mengelompokkan kanji berdasarkan radikal memudahkan hafalan.',
          },
          {
            title: 'Baca NHK Web Easy untuk Konteks Nyata',
            body: 'NHK Web Easy (www3.nhk.or.jp/news/easy/) menggunakan kanji N3 dengan furigana. Baca satu artikel per hari dan catat kanji baru yang kamu temui.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mengacaukan 事 (こと/じ) dan 時 (とき/じ)',
            body: '事 (koto/ji) berarti "hal/urusan" dan 時 (toki/ji) berarti "waktu". Keduanya punya on-yomi "ji" tapi artinya sangat berbeda. Tips: 事 punya radikal 亅 di bawah, 時 punya radikal 日 (matahari/waktu) di kiri.',
          },
          {
            title: 'Menghafal kanji tanpa memahami komponen',
            body: 'Banyak pelajar mencoba menghafal kanji sebagai gambar utuh. Lebih efektif memecah ke komponen: 語 = 言 (kata) + 五 (lima) + 口 (mulut). Gunakan radikal sebagai "cerita" untuk mengingat makna.',
          },
        ],
      },
      units: [
        {
          slug: 'n3-kanji',
          title: 'Kanji N3 (650 Kanji)',
          titleEn: 'N3 Kanji (650 Characters)',
          stepSlugs: ['n3-kanji-650'],
          phrases: [
            { japanese: '問題', romaji: 'mondai', indonesian: 'masalah / soal' },
            { japanese: '全部', romaji: 'zenbu', indonesian: 'semua / seluruhnya' },
            { japanese: '特別', romaji: 'tokubetsu', indonesian: 'khusus / istimewa' },
            { japanese: '決定', romaji: 'kettei', indonesian: 'keputusan' },
            { japanese: '現在', romaji: 'genzai', indonesian: 'saat ini / sekarang' },
            { japanese: '連絡', romaji: 'renraku', indonesian: 'kontak / menghubungi' },
            { japanese: '確認', romaji: 'kakunin', indonesian: 'konfirmasi / memastikan' },
            { japanese: '情報', romaji: 'jouhou', indonesian: 'informasi' },
          ],
          content: {
            pronunciationCards: [
              { char: '問題', romaji: 'mondai', comparison: 'masalah — sering muncul dalam ujian dan berita' },
              { char: '全部', romaji: 'zenbu', comparison: 'semua — digunakan dalam percakapan sehari-hari' },
              { char: '特別', romaji: 'tokubetsu', comparison: 'khusus — mirip "special" dalam bahasa Inggris' },
              { char: '決定', romaji: 'kettei', comparison: 'keputusan — digunakan dalam konteks formal' },
              { char: '現在', romaji: 'genzai', comparison: 'saat ini — sering ditemui di berita dan dokumen' },
              { char: '連絡', romaji: 'renraku', comparison: 'kontak — sangat penting untuk komunikasi kerja' },
              { char: '確認', romaji: 'kakunin', comparison: 'konfirmasi — wajib diketahui untuk lingkungan kerja Jepang' },
              { char: '情報', romaji: 'jouhou', comparison: 'informasi — kata modern yang sering dipakai' },
            ],
            mnemonics: [
              {
                title: 'Radikal 言 (Kata/Bicara)',
                body: 'Kanji dengan radikal 言 berhubungan dengan komunikasi: 話 (bicara), 語 (bahasa), 読 (baca), 説 (menjelaskan), 記 (mencatat). Jika melihat 言 di kiri, pikirkan "ini tentang kata-kata".',
              },
              {
                title: 'Radikal 日 (Matahari/Hari)',
                body: 'Kanji dengan radikal 日 sering berhubungan dengan waktu: 時 (waktu), 明 (terang/besok), 期 (periode), 曜 (hari dalam seminggu). Bayangkan matahari sebagai penanda waktu.',
              },
              {
                title: 'Pasangan Kanji yang Sering Muncul Bersama',
                body: '問+題 = mondai (masalah), 確+認 = kakunin (konfirmasi), 連+絡 = renraku (kontak). Banyak kata N3 terdiri dari 2 kanji — hafal sebagai pasangan, bukan kanji tunggal.',
              },
            ],
            practicePrompts: [
              'Tulis 10 kanji N3 baru hari ini beserta on-yomi dan kun-yomi masing-masing',
              'Buka WaniKani (wanikani.com) dan selesaikan review harian kanji level 20+',
              'Baca satu artikel NHK Web Easy dan catat semua kanji N3 yang kamu temui',
              'Buat kalimat sendiri menggunakan 問題、特別、dan 確認',
              'Gunakan Anki deck JLPT N3 dan review 30 kartu kanji',
            ],
          },
        },
        {
          slug: 'n3-kosakata',
          title: 'Kosakata N3 (1500 Kata)',
          titleEn: 'N3 Vocabulary (1500 Words)',
          stepSlugs: ['n3-vocabulary-1500'],
          phrases: [
            { japanese: '経験', romaji: 'keiken', indonesian: 'pengalaman' },
            { japanese: '関係', romaji: 'kankei', indonesian: 'hubungan / relasi' },
            { japanese: '社会', romaji: 'shakai', indonesian: 'masyarakat / sosial' },
            { japanese: '意見', romaji: 'iken', indonesian: 'pendapat / opini' },
            { japanese: '説明', romaji: 'setsumei', indonesian: 'penjelasan' },
            { japanese: '準備', romaji: 'junbi', indonesian: 'persiapan' },
            { japanese: '比較', romaji: 'hikaku', indonesian: 'perbandingan' },
          ],
          content: {
            pronunciationCards: [
              { char: '経験', romaji: 'keiken', comparison: 'pengalaman — penting untuk CV dan wawancara kerja' },
              { char: '関係', romaji: 'kankei', comparison: 'hubungan — dipakai untuk relasi antar orang maupun konsep' },
              { char: '社会', romaji: 'shakai', comparison: 'masyarakat — sering muncul di berita dan esai' },
              { char: '意見', romaji: 'iken', comparison: 'pendapat — digunakan dalam diskusi formal' },
              { char: '説明', romaji: 'setsumei', comparison: 'penjelasan — sangat umum di tempat kerja Jepang' },
              { char: '準備', romaji: 'junbi', comparison: 'persiapan — kata yang sangat sering dipakai sehari-hari' },
              { char: '比較', romaji: 'hikaku', comparison: 'perbandingan — digunakan dalam konteks akademis dan analitis' },
              { char: '影響', romaji: 'eikyou', comparison: 'pengaruh — sering muncul dalam berita dan laporan' },
              { char: '相談', romaji: 'soudan', comparison: 'konsultasi — penting di lingkungan kerja Jepang (報連相)' },
              { char: '反対', romaji: 'hantai', comparison: 'kebalikan / menentang — berguna untuk menyatakan ketidaksetujuan' },
            ],
            mnemonics: [
              {
                title: 'Kata-kata Kerja dengan 報連相 (Hourensou)',
                body: '報告 (houkoku = laporan), 連絡 (renraku = kontak), 相談 (soudan = konsultasi). Tiga kata ini adalah konsep penting di tempat kerja Jepang — hafal sebagai satu set!',
              },
              {
                title: 'Kata Abstrak = Kanji Gabungan',
                body: 'Kebanyakan kosakata N3 abstrak terdiri dari 2 kanji: 経+験 (lewat+uji = pengalaman), 社+会 (perusahaan+pertemuan = masyarakat). Pahami kanji komponen untuk menebak makna kata baru.',
              },
            ],
            practicePrompts: [
              'Hafal 10 kosakata N3 baru hari ini menggunakan Anki (apps.ankiweb.net)',
              'Buat 5 kalimat menggunakan kosakata abstrak: 経験、関係、社会、意見、説明',
              'Baca daftar kosakata N3 di JLPT Sensei (jlptsensei.com) dan tandai yang belum dikuasai',
              'Tonton video Nihongo no Mori di YouTube tentang kosakata N3',
            ],
          },
        },
      ],
    },
    {
      slug: 'tata-bahasa-menengah',
      title: 'Tata Bahasa Menengah',
      sectionNumber: 2,
      guide: {
        title: 'Panduan Seksi 2: Tata Bahasa Menengah',
        description:
          'Level N3 memperkenalkan pola tata bahasa yang lebih kompleks untuk menyatakan dugaan, keharusan, tujuan, dan hubungan sebab-akibat. Kamu juga akan mempelajari bentuk pasif dan kausatif yang penting untuk percakapan formal.',
        objectives: [
          'Menguasai pola dugaan dan estimasi: 〜ようだ、〜らしい、〜はずだ、〜だろう',
          'Memahami kalimat kompleks dengan 〜ために、〜ように、〜ながら',
          'Menggunakan bentuk pasif (〜られる) dan kausatif (〜させる) dengan benar',
          'Membedakan nuansa antar pola grammar yang mirip (〜ようだ vs 〜らしい)',
        ],
        strategies: [
          {
            title: 'Gunakan BunPro untuk Latihan Terstruktur',
            body: 'BunPro (bunpro.jp) menyediakan latihan SRS khusus tata bahasa Jepang. Fitur N3 grammar path-nya sangat efektif — selesaikan minimal 3 pola baru per minggu dan review setiap hari.',
          },
          {
            title: 'Buat Contoh Kalimat Sendiri',
            body: 'Setiap kali mempelajari pola baru, tulis minimal 3 kalimat sendiri. Contoh untuk 〜はずだ: 「田中さんは来るはずだ」(Tanaka-san seharusnya datang). Kalimat buatan sendiri lebih mudah diingat.',
          },
          {
            title: 'Tonton Nihongo no Mori di YouTube',
            body: 'Channel Nihongo no Mori di YouTube punya playlist lengkap untuk grammar N3. Video-videonya menggunakan bahasa Jepang sederhana dengan contoh yang jelas. Tonton 1-2 video per hari.',
          },
          {
            title: 'Bandingkan Pola yang Mirip',
            body: 'N3 punya banyak pola yang mirip tapi berbeda nuansa. Buat tabel perbandingan: 〜ようだ (tampak seperti, berdasarkan pengamatan sendiri) vs 〜らしい (katanya/sepertinya, berdasarkan info orang lain). Gunakan JLPT Sensei untuk penjelasan detail.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mengacaukan 〜ようだ dan 〜らしい',
            body: '〜ようだ = dugaan berdasarkan pengamatan langsung ("Sepertinya hujan, saya lihat awan gelap"). 〜らしい = dugaan berdasarkan informasi dari orang lain ("Katanya besok hujan"). Perbedaan ini penting di JLPT!',
          },
          {
            title: 'Salah menggunakan bentuk pasif untuk emosi',
            body: 'Bahasa Jepang menggunakan "pasif gangguan" (迷惑の受身): 「雨に降られた」bukan "hujan diturunkan" tapi "saya kena hujan (dan saya tidak suka)". Ini tidak ada padanannya dalam bahasa Indonesia.',
          },
          {
            title: 'Mencampur 〜ために dan 〜ように',
            body: '〜ために digunakan dengan kata kerja bentuk kamus (意志的): 「日本に行くために貯金する」(Menabung untuk pergi ke Jepang). 〜ように digunakan dengan kata kerja non-volitional: 「聞こえるように大きい声で話す」(Berbicara keras agar terdengar).',
          },
        ],
      },
      units: [
        {
          slug: 'n3-tata-bahasa',
          title: 'Tata Bahasa Kompleks N3',
          titleEn: 'N3 Complex Grammar',
          stepSlugs: ['n3-grammar-intermediate', 'n3-complex-sentences'],
          phrases: [
            { japanese: '雨が降るようだ。', romaji: 'Ame ga furu you da.', indonesian: 'Sepertinya akan hujan. (berdasarkan pengamatan)' },
            { japanese: '彼は来るらしい。', romaji: 'Kare wa kuru rashii.', indonesian: 'Katanya dia akan datang. (berdasarkan info)' },
            { japanese: '明日は晴れるはずだ。', romaji: 'Ashita wa hareru hazu da.', indonesian: 'Besok seharusnya cerah. (berdasarkan keyakinan)' },
            { japanese: 'たぶん大丈夫だろう。', romaji: 'Tabun daijoubu darou.', indonesian: 'Mungkin tidak apa-apa.' },
            { japanese: '試験に合格するために勉強する。', romaji: 'Shiken ni goukaku suru tame ni benkyou suru.', indonesian: 'Belajar untuk lulus ujian.' },
            { japanese: '忘れないように書いておく。', romaji: 'Wasurenai you ni kaite oku.', indonesian: 'Menulis supaya tidak lupa.' },
          ],
          content: {
            pronunciationCards: [
              { char: '〜ようだ', romaji: '~you da', comparison: 'sepertinya — dugaan berdasarkan pengamatan sendiri' },
              { char: '〜らしい', romaji: '~rashii', comparison: 'katanya/sepertinya — dugaan berdasarkan info orang lain' },
              { char: '〜はずだ', romaji: '~hazu da', comparison: 'seharusnya — keyakinan kuat berdasarkan logika' },
              { char: '〜だろう', romaji: '~darou', comparison: 'mungkin/barangkali — dugaan ringan' },
              { char: '〜ために', romaji: '~tame ni', comparison: 'untuk/demi — tujuan dengan kata kerja volitional' },
              { char: '〜ように', romaji: '~you ni', comparison: 'supaya/agar — tujuan dengan kata kerja non-volitional' },
              { char: '〜ながら', romaji: '~nagara', comparison: 'sambil — dua aktivitas bersamaan' },
              { char: '〜のに', romaji: '~noni', comparison: 'padahal — menyatakan kontradiksi/kekecewaan' },
            ],
            mnemonics: [
              {
                title: 'Spektrum Dugaan: だろう → らしい → ようだ → はずだ',
                body: 'Dari yang paling tidak yakin ke paling yakin: だろう (mungkin, 30%) → らしい (katanya, 50%) → ようだ (tampaknya, 70%) → はずだ (seharusnya, 90%). Bayangkan termometer keyakinan!',
              },
              {
                title: '〜ために vs 〜ように: Kontrol vs Harapan',
                body: '〜ために = kamu punya kontrol penuh ("Saya belajar UNTUK lulus"). 〜ように = kamu berharap hasil terjadi ("Saya latihan SUPAYA bisa lari cepat"). Tanyakan: "Apakah saya bisa langsung mengontrol hasilnya?"',
              },
            ],
            practicePrompts: [
              'Buka BunPro (bunpro.jp) dan pelajari pola 〜ようだ、〜らしい、〜はずだ',
              'Buat 3 kalimat dengan 〜ために dan 3 kalimat dengan 〜ように, jelaskan perbedaannya',
              'Tonton video Nihongo no Mori tentang N3 grammar dan catat contoh kalimat',
              'Kerjakan latihan grammar N3 di JLPT Sensei (jlptsensei.com)',
              'Tulis diary pendek (5 kalimat) menggunakan 〜ようだ、〜ながら、dan 〜のに',
            ],
          },
        },
        {
          slug: 'n3-pasif-kausatif',
          title: 'Kalimat Pasif & Kausatif',
          titleEn: 'Passive & Causative Sentences',
          stepSlugs: ['n3-passive-causative'],
          phrases: [
            { japanese: '先生に褒められた。', romaji: 'Sensei ni homerareta.', indonesian: 'Dipuji oleh guru.' },
            { japanese: '電車で足を踏まれた。', romaji: 'Densha de ashi wo fumareta.', indonesian: 'Kaki saya diinjak di kereta. (pasif gangguan)' },
            { japanese: '母は弟に野菜を食べさせた。', romaji: 'Haha wa otouto ni yasai wo tabesaseta.', indonesian: 'Ibu menyuruh adik makan sayur.' },
            { japanese: '上司に残業させられた。', romaji: 'Joushi ni zangyou saserareta.', indonesian: 'Terpaksa lembur oleh atasan. (kausatif-pasif)' },
            { japanese: 'この本は多くの人に読まれている。', romaji: 'Kono hon wa ooku no hito ni yomarete iru.', indonesian: 'Buku ini dibaca oleh banyak orang.' },
          ],
          content: {
            pronunciationCards: [
              { char: '〜られる', romaji: '~rareru', comparison: 'bentuk pasif — dikenai tindakan oleh orang lain' },
              { char: '〜させる', romaji: '~saseru', comparison: 'bentuk kausatif — menyuruh/membiarkan seseorang melakukan' },
              { char: '〜させられる', romaji: '~saserareru', comparison: 'kausatif-pasif — dipaksa/terpaksa melakukan sesuatu' },
              { char: '褒められる', romaji: 'homerareru', comparison: 'dipuji — contoh pasif positif' },
              { char: '踏まれる', romaji: 'fumareru', comparison: 'diinjak — contoh pasif gangguan (迷惑の受身)' },
              { char: '食べさせる', romaji: 'tabesaseru', comparison: 'menyuruh makan — contoh kausatif' },
            ],
            mnemonics: [
              {
                title: 'Pasif = "Dikenai" → 〜られる',
                body: 'Cara membuat: Grup 1 (五段): ubah akhiran -u → -areru (読む→読まれる). Grup 2 (一段): ganti -ru → -rareru (食べる→食べられる). Irregular: する→される、来る→来られる.',
              },
              {
                title: 'Kausatif = "Menyuruh" → 〜させる',
                body: 'Cara membuat: Grup 1: ubah -u → -aseru (読む→読ませる). Grup 2: ganti -ru → -saseru (食べる→食べさせる). Irregular: する→させる、来る→来させる. Bayangkan kamu sebagai "bos" yang menyuruh orang lain.',
              },
              {
                title: 'Kausatif-Pasif = "Terpaksa" → 〜させられる',
                body: 'Gabungan kausatif + pasif: kamu TERPAKSA melakukan sesuatu. 「歌わせられた」= dipaksa bernyanyi. Ini adalah bentuk paling "menderita" — kamu tidak punya pilihan!',
              },
            ],
            practicePrompts: [
              'Ubah 5 kata kerja ke bentuk pasif: 読む、書く、食べる、見る、聞く',
              'Ubah 5 kata kerja ke bentuk kausatif: 飲む、走る、泣く、笑う、勉強する',
              'Buat 3 kalimat pasif gangguan (迷惑の受身) tentang situasi sehari-hari',
              'Kerjakan latihan pasif & kausatif di BunPro (bunpro.jp)',
              'Baca penjelasan Tae Kim tentang passive dan causative (guidetojapanese.org)',
            ],
          },
        },
      ],
    },
    {
      slug: 'komprehensi',
      title: 'Komprehensi N3',
      sectionNumber: 3,
      quizSlug: 'n3-review',
      guide: {
        title: 'Panduan Seksi 3: Komprehensi N3',
        description:
          'Seksi terakhir N3 mengintegrasikan semua kemampuan: membaca artikel berita sederhana, mendengarkan percakapan natural, dan memahami konteks secara keseluruhan. Ini adalah persiapan langsung untuk ujian JLPT N3.',
        objectives: [
          'Membaca dan memahami artikel berita NHK Web Easy secara mandiri',
          'Mendengarkan percakapan natural dan mengidentifikasi niat pembicara',
          'Menyimpulkan informasi implisit dari teks dan audio',
          'Menyelesaikan soal membaca dan mendengarkan setara JLPT N3',
        ],
        strategies: [
          {
            title: 'Baca NHK Web Easy Setiap Hari',
            body: 'NHK Web Easy (www3.nhk.or.jp/news/easy/) adalah sumber terbaik untuk latihan membaca N3. Baca satu artikel per hari, catat kosakata baru, dan coba ringkas isi artikel dalam bahasa Indonesia.',
          },
          {
            title: 'Tonton NHK World dengan Subtitle Jepang',
            body: 'NHK World menyediakan berita dalam bahasa Jepang yang lebih lambat. Gunakan subtitle Jepang dan coba pahami ide utama sebelum membaca terjemahan.',
          },
          {
            title: 'Latihan Soal JLPT N3 Resmi',
            body: 'Kerjakan contoh soal resmi dari JLPT (jlpt.jp) untuk terbiasa dengan format ujian. Fokus pada strategi: baca pertanyaan dulu sebelum membaca teks.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mencoba memahami setiap kata',
            body: 'Di level N3, kamu tidak perlu memahami 100% kata dalam teks. Fokus pada kata kunci dan konteks. Jika ada 1-2 kata yang tidak dimengerti, coba tebak maknanya dari kalimat sekitar sebelum membuka kamus.',
          },
          {
            title: 'Tidak memperhatikan kata penghubung',
            body: 'Kata penghubung seperti しかし (namun), そのため (oleh karena itu), つまり (dengan kata lain) adalah kunci untuk memahami struktur argumen dalam teks. Jangan abaikan — kata-kata ini memberi petunjuk tentang hubungan antar kalimat.',
          },
        ],
      },
      units: [
        {
          slug: 'n3-membaca-mendengar',
          title: 'Membaca Koran & Mendengarkan',
          titleEn: 'Reading News & Listening',
          stepSlugs: ['n3-reading-newspaper', 'n3-listening-practice'],
          phrases: [
            { japanese: '政府は新しい法律を発表した。', romaji: 'Seifu wa atarashii houritsu wo happyou shita.', indonesian: 'Pemerintah mengumumkan undang-undang baru.' },
            { japanese: 'この問題について意見を述べてください。', romaji: 'Kono mondai ni tsuite iken wo nobete kudasai.', indonesian: 'Silakan sampaikan pendapat tentang masalah ini.' },
            { japanese: '調査によると、若者の読書量が減っている。', romaji: 'Chousa ni yoru to, wakamono no dokusho-ryou ga hette iru.', indonesian: 'Menurut survei, jumlah bacaan anak muda menurun.' },
            { japanese: 'つまり、この計画は失敗だったということだ。', romaji: 'Tsumari, kono keikaku wa shippai datta to iu koto da.', indonesian: 'Dengan kata lain, rencana ini gagal.' },
            { japanese: 'すみません、もう一度お願いします。', romaji: 'Sumimasen, mou ichido onegai shimasu.', indonesian: 'Maaf, tolong ulangi sekali lagi.' },
          ],
          content: {
            pronunciationCards: [
              { char: '政府', romaji: 'seifu', comparison: 'pemerintah — kata berita yang sangat sering muncul' },
              { char: '発表', romaji: 'happyou', comparison: 'pengumuman/presentasi — penting untuk konteks akademis dan kerja' },
              { char: '調査', romaji: 'chousa', comparison: 'survei/investigasi — sering muncul di artikel berita' },
              { char: '法律', romaji: 'houritsu', comparison: 'hukum/undang-undang — kosakata berita formal' },
              { char: 'しかし', romaji: 'shikashi', comparison: 'namun/tetapi — kata penghubung kunci dalam teks' },
              { char: 'そのため', romaji: 'sono tame', comparison: 'oleh karena itu — menunjukkan hubungan sebab-akibat' },
              { char: 'つまり', romaji: 'tsumari', comparison: 'dengan kata lain — meringkas poin sebelumnya' },
              { char: 'によると', romaji: 'ni yoru to', comparison: 'menurut — mengutip sumber informasi' },
            ],
            mnemonics: [
              {
                title: 'Kata Penghubung = Peta Jalan Teks',
                body: 'しかし (namun) = arah berubah. そのため (oleh karena itu) = kesimpulan dari sebelumnya. つまり (dengan kata lain) = ringkasan. Bayangkan kata penghubung sebagai rambu lalu lintas saat membaca.',
              },
              {
                title: 'Strategi Mendengarkan: 5W1H',
                body: 'Saat mendengarkan, fokus pada: いつ (kapan), どこ (di mana), だれ (siapa), なに (apa), なぜ (mengapa), どう (bagaimana). Catat jawaban 5W1H ini dan kamu sudah memahami 80% konten.',
              },
            ],
            practicePrompts: [
              'Baca satu artikel NHK Web Easy (www3.nhk.or.jp/news/easy/) dan tulis ringkasan 3 kalimat dalam bahasa Indonesia',
              'Tonton satu video berita NHK World dan identifikasi topik utama serta 3 detail pendukung',
              'Kerjakan soal membaca N3 di JLPT Sensei (jlptsensei.com) dengan timer 15 menit',
              'Dengarkan podcast Nihongo no Mori level N3 di YouTube dan catat kata kunci yang kamu dengar',
              'Latihan soal mendengarkan N3 resmi dari JLPT (jlpt.jp) — fokus pada memahami niat pembicara',
            ],
          },
        },
      ],
    },
  ],
};
