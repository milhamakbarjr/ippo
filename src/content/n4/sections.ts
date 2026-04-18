import type { LevelPathConfig } from '@/types/learning';

export const n4Sections: LevelPathConfig = {
  levelId: 'n4',
  sections: [
    {
      slug: 'kanji-kosakata',
      title: 'Kanji & Kosakata N4',
      sectionNumber: 1,
      guide: {
        title: 'Panduan Seksi 1: Kanji & Kosakata N4',
        description:
          'Di level N4, kamu akan memperluas penguasaan kanji dari 80 menjadi 300 karakter dan menambah kosakata hingga 500 kata. Kanji N4 mencakup karakter yang sering muncul dalam kehidupan sehari-hari seperti 食（makan）、飲（minum）、行（pergi）、来（datang）、見（melihat）、聞（mendengar）、書（menulis）、読（membaca）、話（berbicara）、待（menunggu）.',
        objectives: [
          'Menghafal 300 kanji JLPT N4 beserta cara baca on-yomi dan kun-yomi',
          'Menguasai 500 kosakata N4 yang sering muncul di ujian JLPT',
          'Mampu membaca dan menulis kanji dalam konteks kalimat sederhana',
          'Mengenali kanji gabungan (jukugo) yang umum seperti 電車、会社、食堂',
        ],
        strategies: [
          {
            title: 'Gunakan WaniKani untuk Belajar Kanji Terstruktur',
            body: 'WaniKani mengajarkan kanji menggunakan metode SRS (Spaced Repetition System) dengan mnemonik. Mulailah dari level 1 dan targetkan 10 kanji baru per minggu. Konsistensi lebih penting dari kecepatan.',
          },
          {
            title: 'Buat Flashcard Anki dengan Konteks Kalimat',
            body: 'Jangan hanya hafal arti kanji tunggal — buat kartu yang menyertakan contoh kalimat. Contoh: 食べる（taberu = makan）→ 朝ごはんを食べます（saya makan sarapan）. Ini membantu mengingat cara penggunaan.',
          },
          {
            title: 'Kelompokkan Kanji Berdasarkan Tema',
            body: 'Pelajari kanji dalam kelompok tematik: transportasi（電車、駅、道）, makanan（食、飲、料）, aktivitas（読、書、聞、話）. Hubungan antar kanji memperkuat ingatan.',
          },
          {
            title: 'Gunakan JLPT Sensei untuk Daftar Kosakata Lengkap',
            body: 'JLPT Sensei menyediakan daftar kosakata N4 lengkap dengan contoh kalimat. Review 10-15 kata baru per hari dan ulangi kata yang sudah dipelajari menggunakan Anki.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mengacaukan On-yomi dan Kun-yomi',
            body: 'Banyak pelajar bingung kapan menggunakan on-yomi vs kun-yomi. Aturan umum: kanji sendiri atau dengan okurigana (hiragana) → kun-yomi（食べる = taberu）. Kanji gabungan (jukugo) → on-yomi（食堂 = shokudou）. Tapi ada banyak pengecualian, jadi selalu pelajari dalam konteks.',
          },
          {
            title: 'Menghafal Kanji Tanpa Konteks',
            body: 'Menghafal arti kanji tunggal tanpa contoh penggunaan membuat kamu cepat lupa. Selalu pelajari kanji bersama minimal 2-3 kata yang menggunakannya. Contoh: 会 → 会う（bertemu）、会社（perusahaan）、会議（rapat）.',
          },
          {
            title: 'Mengabaikan Urutan Coretan (Stroke Order)',
            body: 'Menulis kanji dengan urutan coretan yang benar membantu mengingat bentuk kanji dan membuat tulisan lebih rapi. Gunakan aplikasi seperti Kanji Study untuk melatih stroke order yang benar.',
          },
        ],
      },
      units: [
        {
          slug: 'n4-kanji',
          title: 'Kanji N4 (300 Kanji)',
          titleEn: 'N4 Kanji (300 Characters)',
          stepSlugs: ['n4-kanji-300'],
          phrases: [
            { japanese: '食べる', romaji: 'taberu', indonesian: 'makan' },
            { japanese: '飲む', romaji: 'nomu', indonesian: 'minum' },
            { japanese: '行く', romaji: 'iku', indonesian: 'pergi' },
            { japanese: '来る', romaji: 'kuru', indonesian: 'datang' },
            { japanese: '見る', romaji: 'miru', indonesian: 'melihat' },
            { japanese: '聞く', romaji: 'kiku', indonesian: 'mendengar' },
            { japanese: '書く', romaji: 'kaku', indonesian: 'menulis' },
            { japanese: '読む', romaji: 'yomu', indonesian: 'membaca' },
          ],
          content: {
            pronunciationCards: [
              { char: '食', romaji: 'shoku / ta(beru)', comparison: 'makan — 食べる (taberu), 食堂 (shokudou = kantin)' },
              { char: '飲', romaji: 'in / no(mu)', comparison: 'minum — 飲む (nomu), 飲み物 (nomimono = minuman)' },
              { char: '行', romaji: 'kou / i(ku)', comparison: 'pergi — 行く (iku), 銀行 (ginkou = bank)' },
              { char: '来', romaji: 'rai / ku(ru)', comparison: 'datang — 来る (kuru), 来年 (rainen = tahun depan)' },
              { char: '見', romaji: 'ken / mi(ru)', comparison: 'melihat — 見る (miru), 意見 (iken = pendapat)' },
              { char: '聞', romaji: 'bun / ki(ku)', comparison: 'mendengar — 聞く (kiku), 新聞 (shinbun = koran)' },
              { char: '書', romaji: 'sho / ka(ku)', comparison: 'menulis — 書く (kaku), 図書館 (toshokan = perpustakaan)' },
              { char: '読', romaji: 'doku / yo(mu)', comparison: 'membaca — 読む (yomu), 読書 (dokusho = membaca buku)' },
              { char: '話', romaji: 'wa / hana(su)', comparison: 'berbicara — 話す (hanasu), 電話 (denwa = telepon)' },
              { char: '待', romaji: 'tai / ma(tsu)', comparison: 'menunggu — 待つ (matsu), 期待 (kitai = harapan)' },
            ],
            mnemonics: [
              {
                title: 'Kanji Aktivitas Sehari-hari',
                body: '食飲行来見聞書読話待 — bayangkan rutinitas: bangun → makan (食) → minum (飲) → pergi (行) → datang (来) di kantor → melihat (見) → mendengar (聞) → menulis (書) → membaca (読) → berbicara (話) → menunggu (待) pulang.',
              },
              {
                title: 'Radikal Membantu Hafalan',
                body: 'Banyak kanji N4 berbagi radikal. Contoh: 語・話・読 semuanya mengandung 言 (kata/bicara). Jika kamu melihat 言 di sisi kiri, kanji itu kemungkinan berhubungan dengan bahasa atau komunikasi.',
              },
              {
                title: 'On-yomi untuk Jukugo',
                body: 'Ingat pola: kanji gabungan biasanya pakai on-yomi. 電話 = DEN-WA, 会社 = KAI-SHA, 食堂 = SHOKU-DOU. Hafal jukugo populer untuk menguasai on-yomi secara alami.',
              },
            ],
            practicePrompts: [
              'Tulis 10 kanji aktivitas (食飲行来見聞書読話待) masing-masing 5 kali dengan urutan coretan yang benar',
              'Buat 5 kalimat sederhana menggunakan kanji yang baru dipelajari',
              'Gunakan WaniKani atau Anki untuk review 20 kanji N4 per hari',
              'Latihan di JLPT Sensei: coba kuis kanji N4 dan targetkan skor 80%',
              'Tulis 5 jukugo (kanji gabungan) dan artinya: 電車、会社、食堂、図書館、病院',
            ],
          },
        },
        {
          slug: 'n4-kosakata',
          title: 'Kosakata N4 (500 Kata)',
          titleEn: 'N4 Vocabulary (500 Words)',
          stepSlugs: ['n4-vocabulary-500'],
          phrases: [
            { japanese: '授業', romaji: 'jugyou', indonesian: 'pelajaran / kelas' },
            { japanese: '準備', romaji: 'junbi', indonesian: 'persiapan' },
            { japanese: '経験', romaji: 'keiken', indonesian: 'pengalaman' },
            { japanese: '説明', romaji: 'setsumei', indonesian: 'penjelasan' },
            { japanese: '予定', romaji: 'yotei', indonesian: 'rencana / jadwal' },
            { japanese: '景色', romaji: 'keshiki', indonesian: 'pemandangan' },
          ],
          content: {
            pronunciationCards: [
              { char: '授業', romaji: 'jugyou', comparison: 'pelajaran — 授業が始まる (pelajaran dimulai)' },
              { char: '準備', romaji: 'junbi', comparison: 'persiapan — 準備する (mempersiapkan)' },
              { char: '経験', romaji: 'keiken', comparison: 'pengalaman — 経験がある (punya pengalaman)' },
              { char: '説明', romaji: 'setsumei', comparison: 'penjelasan — 説明する (menjelaskan)' },
              { char: '予定', romaji: 'yotei', comparison: 'rencana — 予定がある (punya rencana)' },
              { char: '景色', romaji: 'keshiki', comparison: 'pemandangan — きれいな景色 (pemandangan indah)' },
              { char: '趣味', romaji: 'shumi', comparison: 'hobi — 趣味は何ですか (apa hobimu?)' },
              { char: '最近', romaji: 'saikin', comparison: 'akhir-akhir ini — 最近忙しい (akhir-akhir ini sibuk)' },
            ],
            mnemonics: [
              {
                title: 'Kelompokkan Kosakata per Tema',
                body: 'Belajar kosakata lebih mudah jika dikelompokkan: sekolah（授業、宿題、試験）, pekerjaan（会社、仕事、会議）, waktu（最近、将来、予定）. Otak lebih mudah mengingat kata dalam konteks terkait.',
              },
              {
                title: 'Kata Kerja する yang Serbaguna',
                body: 'Banyak kata benda N4 bisa jadi kata kerja dengan menambah する: 準備する（mempersiapkan）、説明する（menjelaskan）、経験する（mengalami）. Hafal kata bendanya, dan kamu otomatis dapat kata kerjanya juga.',
              },
            ],
            practicePrompts: [
              'Buat flashcard Anki untuk 15 kosakata N4 baru hari ini dengan contoh kalimat',
              'Tulis 5 kalimat pendek menggunakan kosakata baru yang dipelajari',
              'Review daftar kosakata N4 di JLPT Sensei dan tandai kata yang belum dikenal',
              'Coba dengarkan podcast NHK Web Easy dan catat kosakata N4 yang kamu dengar',
            ],
          },
        },
      ],
    },
    {
      slug: 'tata-bahasa',
      title: 'Tata Bahasa N4',
      sectionNumber: 2,
      guide: {
        title: 'Panduan Seksi 2: Tata Bahasa N4',
        description:
          'Tata bahasa N4 memperkenalkan bentuk kata kerja lanjutan dan pola kalimat yang lebih kompleks. Kamu akan mempelajari bentuk potensial (できる), bentuk volitional (よう・おう), bentuk pasif (られる), berbagai penggunaan te-form, dan tiga bentuk kalimat kondisional (たら・ば・と). Penguasaan tata bahasa N4 memungkinkan kamu mengekspresikan kemampuan, keinginan, syarat, dan urutan kejadian.',
        objectives: [
          'Menguasai konjugasi bentuk potensial, volitional, dan pasif untuk semua kelompok kata kerja',
          'Menggunakan pola te-form（〜ている、〜てから、〜てもいい）dengan benar dalam kalimat',
          'Membedakan dan menggunakan tiga bentuk kondisional（〜たら、〜ば、〜と）sesuai konteks',
          'Mampu menyusun kalimat kompleks yang menggabungkan beberapa pola tata bahasa N4',
        ],
        strategies: [
          {
            title: 'Latihan Konjugasi dengan Bunpo / BunPro',
            body: 'Aplikasi Bunpo dan BunPro menyediakan latihan tata bahasa terstruktur dengan SRS. Fokus pada pola N4 dan lakukan 10-15 soal per hari. BunPro khususnya bagus untuk melatih produksi kalimat, bukan hanya pemahaman.',
          },
          {
            title: 'Pelajari Pola dari Tae Kim\'s Guide',
            body: 'Panduan tata bahasa Tae Kim (guidetojapanese.org) menjelaskan setiap pola dengan contoh yang jelas. Baca bagian "Essential Grammar" untuk memahami logika di balik setiap bentuk, bukan hanya menghafal rumus.',
          },
          {
            title: 'Buat Kalimat Sendiri untuk Setiap Pola',
            body: 'Setelah belajar pola baru, langsung buat 3-5 kalimat sendiri. Contoh untuk 〜てから: ご飯を食べてから、勉強します（setelah makan, saya belajar）. Produksi aktif jauh lebih efektif dari sekadar membaca.',
          },
          {
            title: 'Gunakan JLPT Sensei untuk Daftar Tata Bahasa',
            body: 'JLPT Sensei menyediakan daftar lengkap pola tata bahasa N4 dengan contoh kalimat. Centang setiap pola yang sudah dipahami dan review yang belum dikuasai secara berkala.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mengacaukan 〜たら dan 〜ば',
            body: '〜たら lebih serbaguna dan bisa dipakai untuk kondisi umum dan kejadian satu kali. 〜ば lebih untuk kondisi hipotetis/umum. Contoh: 雨が降ったら、傘を持っていきます（kalau hujan, saya bawa payung — situasi spesifik）vs 安ければ、買います（kalau murah, saya beli — kondisi umum）.',
          },
          {
            title: 'Salah Konjugasi Bentuk Potensial Kelompok 1',
            body: 'Kata kerja kelompok 1: ganti akhiran -u ke -eru. 書く→書ける (bukan 書くれる). 読む→読める (bukan 読むれる). Ingat: "pindahkan ke baris え lalu tambah る".',
          },
          {
            title: 'Menggunakan 〜ている Hanya untuk "Sedang"',
            body: '〜ている bukan hanya "sedang melakukan". Juga berarti keadaan hasil: 窓が開いている（jendela terbuka — bukan "sedang membuka"）. Dan kebiasaan: 毎日走っている（saya berlari setiap hari — bukan "sedang berlari sekarang"）.',
          },
        ],
      },
      units: [
        {
          slug: 'n4-kata-kerja',
          title: 'Bentuk Kata Kerja Lanjutan',
          titleEn: 'Advanced Verb Forms',
          stepSlugs: ['n4-verb-forms', 'n4-te-form-grammar'],
          phrases: [
            { japanese: '食べられる', romaji: 'taberareru', indonesian: 'bisa makan (bentuk potensial)' },
            { japanese: '行こう', romaji: 'ikou', indonesian: 'ayo pergi (bentuk volitional)' },
            { japanese: '読まれる', romaji: 'yomareru', indonesian: 'dibaca (bentuk pasif)' },
            { japanese: '食べている', romaji: 'tabete iru', indonesian: 'sedang makan / biasa makan' },
            { japanese: '食べてから', romaji: 'tabete kara', indonesian: 'setelah makan' },
            { japanese: '食べてもいい', romaji: 'tabete mo ii', indonesian: 'boleh makan' },
            { japanese: '書ける', romaji: 'kakeru', indonesian: 'bisa menulis (potensial kelompok 1)' },
          ],
          content: {
            pronunciationCards: [
              { char: '食べられる', romaji: 'taberareru', comparison: 'bentuk potensial kelompok 2: kata dasar + られる' },
              { char: '書ける', romaji: 'kakeru', comparison: 'bentuk potensial kelompok 1: 書く → 書ける (u→eru)' },
              { char: '行こう', romaji: 'ikou', comparison: 'bentuk volitional kelompok 1: 行く → 行こう (u→ou)' },
              { char: '食べよう', romaji: 'tabeyou', comparison: 'bentuk volitional kelompok 2: 食べる → 食べよう (ru→you)' },
              { char: '読まれる', romaji: 'yomareru', comparison: 'bentuk pasif kelompok 1: 読む → 読まれる (u→areru)' },
              { char: '〜ている', romaji: '~te iru', comparison: 'sedang/kebiasaan/hasil — 勉強している (sedang belajar)' },
              { char: '〜てから', romaji: '~te kara', comparison: 'setelah — 食べてから寝る (setelah makan, tidur)' },
              { char: '〜てもいい', romaji: '~te mo ii', comparison: 'boleh — ここで写真を撮ってもいいですか (boleh foto di sini?)' },
            ],
            mnemonics: [
              {
                title: 'Potensial = "Bisa" → Pindah ke Baris E',
                body: 'Untuk kelompok 1: ganti akhiran ke baris え + る. 書く→書ける, 読む→読める, 話す→話せる. Untuk kelompok 2: tambah られる. 食べる→食べられる, 見る→見られる. Kata kerja tidak beraturan: する→できる, くる→こられる.',
              },
              {
                title: 'Volitional = "Ayo/Mau" → Pindah ke Baris O + う',
                body: 'Kelompok 1: ganti ke baris お + う. 行く→行こう, 飲む→飲もう. Kelompok 2: ganti る→よう. 食べる→食べよう. Tidak beraturan: する→しよう, くる→こよう.',
              },
              {
                title: 'Te-form = "Swiss Army Knife" Bahasa Jepang',
                body: 'Te-form adalah bentuk paling serbaguna. Tambah ください(tolong), いる(sedang), から(setelah), もいい(boleh), はいけない(tidak boleh), みる(mencoba). Kuasai te-form = buka banyak pintu tata bahasa.',
              },
            ],
            practicePrompts: [
              'Konjugasikan 5 kata kerja kelompok 1 ke bentuk potensial: 書く、読む、話す、飲む、待つ',
              'Buat 3 kalimat dengan bentuk volitional: 〜ましょう atau 〜よう/〜おう',
              'Latihan di BunPro: selesaikan 10 soal pola te-form（〜ている、〜てから、〜てもいい）',
              'Tulis 5 kalimat menggunakan pola te-form yang berbeda-beda',
              'Review konjugasi kata kerja tidak beraturan する dan くる untuk semua bentuk',
            ],
          },
        },
        {
          slug: 'n4-kondisional',
          title: 'Kalimat Kondisional',
          titleEn: 'Conditional Sentences',
          stepSlugs: ['n4-conditional-grammar'],
          phrases: [
            { japanese: '雨が降ったら、行きません', romaji: 'ame ga futtara, ikimasen', indonesian: 'kalau hujan, saya tidak pergi (〜たら)' },
            { japanese: '安ければ、買います', romaji: 'yasukereba, kaimasu', indonesian: 'kalau murah, saya beli (〜ば)' },
            { japanese: '春になると、桜が咲く', romaji: 'haru ni naru to, sakura ga saku', indonesian: 'kalau musim semi tiba, sakura mekar (〜と)' },
            { japanese: '時間があったら、映画を見たい', romaji: 'jikan ga attara, eiga wo mitai', indonesian: 'kalau ada waktu, ingin nonton film' },
            { japanese: 'もっと勉強すれば、合格できる', romaji: 'motto benkyou sureba, goukaku dekiru', indonesian: 'kalau belajar lebih giat, bisa lulus' },
          ],
          content: {
            pronunciationCards: [
              { char: '〜たら', romaji: '~tara', comparison: 'kondisional umum — "kalau/ketika" — paling serbaguna dan aman dipakai' },
              { char: '〜ば', romaji: '~ba', comparison: 'kondisional hipotetis — "kalau (seandainya)" — untuk kondisi umum' },
              { char: '〜と', romaji: '~to', comparison: 'kondisional otomatis — "kalau...pasti" — untuk hal yang selalu terjadi' },
              { char: '降ったら', romaji: 'futtara', comparison: '降る (hujan) → 降った + ら = kalau hujan' },
              { char: '安ければ', romaji: 'yasukereba', comparison: '安い (murah) → 安けれ + ば = kalau murah' },
              { char: 'なると', romaji: 'naru to', comparison: 'なる (menjadi) + と = kalau menjadi (otomatis)' },
            ],
            mnemonics: [
              {
                title: 'たら = "Kalau Nanti" (Paling Aman)',
                body: '〜たら adalah bentuk kondisional paling serbaguna. Kalau ragu, pakai たら. Cara buat: bentuk た + ら. 食べた→食べたら, 行った→行ったら, 高かった→高かったら.',
              },
              {
                title: 'ば = "Kalau Seandainya" (Hipotetis)',
                body: '〜ば digunakan untuk kondisi umum/hipotetis. Cara buat kata kerja kelompok 1: ganti -u ke -eba. 行く→行けば, 読む→読めば. Kata sifat -i: ganti -i ke -kereba. 高い→高ければ.',
              },
              {
                title: 'と = "Kalau...Otomatis" (Hukum Alam)',
                body: '〜と digunakan untuk hal yang PASTI terjadi. ボタンを押すと、ドアが開く（kalau tombol ditekan, pintu pasti terbuka）. Tidak bisa dipakai untuk permintaan atau ajakan.',
              },
            ],
            practicePrompts: [
              'Buat 3 kalimat dengan 〜たら menggunakan situasi sehari-hari',
              'Buat 2 kalimat dengan 〜ば untuk kondisi hipotetis',
              'Buat 2 kalimat dengan 〜と untuk kejadian yang selalu terjadi (hukum alam)',
              'Latihan di Tae Kim: baca bagian "Conditional" dan kerjakan contoh soalnya',
              'Review perbedaan たら vs ば vs と dengan membuat tabel perbandingan',
            ],
          },
        },
      ],
    },
    {
      slug: 'kemampuan-praktis',
      title: 'Kemampuan Praktis N4',
      sectionNumber: 3,
      quizSlug: 'n4-review',
      guide: {
        title: 'Panduan Seksi 3: Kemampuan Praktis N4',
        description:
          'Seksi terakhir N4 menggabungkan semua yang sudah dipelajari ke dalam kemampuan praktis: membaca teks level N4 dan menggunakan bahasa sopan (keigo) dasar. Kamu akan berlatih memahami surat, email, pengumuman, dan teks pendek, serta menguasai pola keigo yang penting untuk kehidupan sehari-hari dan lingkungan kerja di Jepang.',
        objectives: [
          'Membaca dan memahami teks N4 seperti surat, email, dan pengumuman pendek',
          'Menguasai teineigo (丁寧語) — bahasa sopan standar dengan ます/です',
          'Memahami pola dasar sonkeigo (お〜になる) dan kenjougo (お〜する/いただく)',
          'Mampu menggunakan keigo dasar dalam percakapan sehari-hari dan situasi kerja',
        ],
        strategies: [
          {
            title: 'Baca NHK Web Easy Setiap Hari',
            body: 'NHK Web Easy (www3.nhk.or.jp/news/easy/) menyediakan berita dalam bahasa Jepang sederhana dengan furigana. Baca 1 artikel per hari dan coba pahami isi utama tanpa menerjemahkan setiap kata. Fokus pada kosakata dan pola tata bahasa N4.',
          },
          {
            title: 'Latihan Membaca dengan JLPT Sensei',
            body: 'JLPT Sensei menyediakan latihan membaca level N4 dengan format mirip ujian. Kerjakan 1-2 soal reading per minggu dan analisis jawaban yang salah untuk memahami di mana kamu perlu perbaikan.',
          },
          {
            title: 'Hafalkan Pola Keigo Penting dengan Anki',
            body: 'Buat flashcard untuk pola keigo yang sering dipakai: いらっしゃいます, おっしゃいます, ご覧になります (sonkeigo), いただきます, まいります, おります (kenjougo). Review 5 pola per hari.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mencampur Level Keigo dalam Satu Kalimat',
            body: 'Jangan campur keigo dengan bahasa kasual dalam satu kalimat. Contoh salah: 先生が来たんですけど → seharusnya 先生がいらっしゃいました. Pilih satu register dan konsisten.',
          },
          {
            title: 'Menggunakan Sonkeigo untuk Diri Sendiri',
            body: 'Sonkeigo (尊敬語) hanya untuk orang lain yang dihormati. Contoh salah: 私がいらっしゃいます → seharusnya 私がまいります (kenjougo). Sonkeigo = menaikkan orang lain, kenjougo = merendahkan diri sendiri.',
          },
        ],
      },
      units: [
        {
          slug: 'n4-membaca-keigo',
          title: 'Membaca & Bahasa Sopan',
          titleEn: 'Reading & Polite Language',
          stepSlugs: ['n4-reading-n4', 'n4-keigo-basics'],
          phrases: [
            { japanese: 'いらっしゃいませ', romaji: 'irasshaimase', indonesian: 'selamat datang (di toko/restoran)' },
            { japanese: 'お待ちください', romaji: 'omachi kudasai', indonesian: 'silakan tunggu (sopan)' },
            { japanese: 'ご覧になる', romaji: 'goran ni naru', indonesian: 'melihat (sonkeigo — untuk orang lain)' },
            { japanese: 'いただく', romaji: 'itadaku', indonesian: 'menerima (kenjougo — merendahkan diri)' },
            { japanese: 'お名前は何ですか', romaji: 'onamae wa nan desu ka', indonesian: 'siapa nama Anda? (sopan)' },
            { japanese: 'こちらにお座りください', romaji: 'kochira ni osuwari kudasai', indonesian: 'silakan duduk di sini (sopan)' },
          ],
          content: {
            pronunciationCards: [
              { char: 'です/ます', romaji: 'desu/masu', comparison: 'teineigo — bentuk sopan standar yang paling dasar dan sering dipakai' },
              { char: 'お〜になる', romaji: 'o~ni naru', comparison: 'pola sonkeigo — お読みになる = membaca (menghormati orang lain)' },
              { char: 'お〜する', romaji: 'o~suru', comparison: 'pola kenjougo — お持ちする = membawakan (merendahkan diri)' },
              { char: 'いただく', romaji: 'itadaku', comparison: 'kenjougo dari もらう — menerima dengan rendah hati' },
              { char: 'いらっしゃる', romaji: 'irassharu', comparison: 'sonkeigo dari いる/行く/来る — ada/pergi/datang (menghormati)' },
              { char: 'おっしゃる', romaji: 'ossharu', comparison: 'sonkeigo dari 言う — berkata (menghormati orang lain)' },
              { char: 'ご〜になる', romaji: 'go~ni naru', comparison: 'pola sonkeigo untuk kata Sino-Jepang — ご覧になる = melihat' },
              { char: 'まいる', romaji: 'mairu', comparison: 'kenjougo dari 行く/来る — pergi/datang (merendahkan diri)' },
            ],
            mnemonics: [
              {
                title: 'Tiga Level Keigo',
                body: 'Bayangkan tangga: teineigo (です/ます) = netral sopan di tengah. Sonkeigo = menaikkan orang lain ke atas (お〜になる, いらっしゃる). Kenjougo = menurunkan diri sendiri ke bawah (お〜する, いただく, まいる). Efeknya sama: menciptakan jarak hormat.',
              },
              {
                title: 'Pola お〜 vs ご〜',
                body: 'Kata Jepang asli (wago) pakai お〜: お名前, お待ちする. Kata Sino-Jepang (kango) pakai ご〜: ご連絡, ご覧になる. Ada pengecualian, tapi aturan ini benar untuk 90% kasus.',
              },
            ],
            practicePrompts: [
              'Baca 1 artikel NHK Web Easy dan identifikasi semua bentuk です/ます yang kamu temukan',
              'Ubah 5 kalimat kasual ke bentuk sopan: 行く→行きます, 食べる→食べます, いい→いいです',
              'Latihan pola sonkeigo: ubah kalimat biasa menjadi sonkeigo menggunakan お〜になる',
              'Buat 3 kalimat kenjougo menggunakan pola お〜する dan kata いただく',
              'Review daftar keigo di JLPT Sensei dan hafalkan 5 pasangan sonkeigo-kenjougo',
            ],
          },
        },
      ],
    },
  ],
};
