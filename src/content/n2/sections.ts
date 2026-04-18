import type { LevelPathConfig } from '@/types/learning';

export const n2Sections: LevelPathConfig = {
  levelId: 'n2',
  sections: [
    {
      slug: 'kanji-kosakata',
      title: 'Kanji & Kosakata N2',
      sectionNumber: 1,
      guide: {
        title: 'Panduan Seksi 1: Kanji & Kosakata N2',
        description:
          'Level N2 menuntut penguasaan sekitar 1000 kanji dan 3000 kosakata. Kanji di level ini mencakup karakter kompleks yang sering muncul dalam dokumen bisnis, berita, dan teks akademis. Kosakata mencakup istilah abstrak, formal, dan kata majemuk yang jarang digunakan dalam percakapan sehari-hari.',
        objectives: [
          'Menguasai 1000 kanji JLPT N2 termasuk kanji majemuk kompleks',
          'Memahami 3000 kosakata kumulatif termasuk sinonim dan antonim',
          'Membaca kanji dalam konteks dokumen bisnis dan berita',
          'Mengenali dan menggunakan kata majemuk (複合語) secara tepat',
        ],
        strategies: [
          {
            title: 'Gunakan WaniKani untuk Kanji Terstruktur',
            body: 'WaniKani mengajarkan kanji dengan metode SRS (Spaced Repetition System) dan mnemonik. Level 30-50 di WaniKani mencakup sebagian besar kanji N2. Targetkan 10-15 kanji baru per hari.',
          },
          {
            title: 'Buat Deck Anki untuk Kosakata N2',
            body: 'Unduh deck JLPT N2 di Anki dan review 30-50 kartu per hari. Tambahkan contoh kalimat sendiri untuk setiap kata baru agar konteksnya lebih kuat.',
          },
          {
            title: 'Baca Berita NHK Web Easy Setiap Hari',
            body: 'NHK Web Easy (www3.nhk.or.jp/news/easy/) menyediakan berita dengan furigana. Setelah terbiasa, beralihlah ke NHK News biasa tanpa furigana untuk melatih pengenalan kanji N2.',
          },
          {
            title: 'Pelajari Kanji dalam Kelompok Makna',
            body: 'Kelompokkan kanji berdasarkan tema: bisnis (契約・規則・収益), hukum (権利・義務・違反), emosi (感激・憂鬱・充実). Belajar dalam konteks lebih efektif daripada menghafal satu per satu.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mengacaukan kanji yang mirip bentuknya',
            body: '議 (gi/rapat) vs 義 (gi/keadilan) vs 儀 (gi/upacara) — ketiganya dibaca "gi" tapi punya makna sangat berbeda. Fokus pada radikal pembeda: 議 punya 言 (bicara), 義 punya 羊 (domba), 儀 punya 亻 (orang).',
          },
          {
            title: 'Salah membaca kanji majemuk (jukugo)',
            body: '大人 dibaca "otona" (bukan "daijin"), 今日 dibaca "kyou" (bukan "konbi"). Banyak kanji majemuk N2 punya bacaan khusus (熟字訓). Hafalkan sebagai satu kesatuan, bukan per karakter.',
          },
          {
            title: 'Mengabaikan nuansa sinonim',
            body: '始める (hajimeru) vs 開始する (kaishi suru) — keduanya berarti "memulai" tapi konteksnya berbeda. 始める informal/sehari-hari, 開始する formal/tertulis. N2 menguji pemahaman nuansa ini.',
          },
        ],
      },
      units: [
        {
          slug: 'n2-kanji',
          title: 'Kanji N2 (1000 Kanji)',
          titleEn: 'N2 Kanji (1000 Characters)',
          stepSlugs: ['n2-kanji-1000'],
          phrases: [
            { japanese: '契約', romaji: 'keiyaku', indonesian: 'kontrak/perjanjian' },
            { japanese: '規則', romaji: 'kisoku', indonesian: 'peraturan/aturan' },
            { japanese: '収益', romaji: 'shuueki', indonesian: 'pendapatan/keuntungan' },
            { japanese: '違反', romaji: 'ihan', indonesian: 'pelanggaran' },
            { japanese: '権利', romaji: 'kenri', indonesian: 'hak' },
            { japanese: '義務', romaji: 'gimu', indonesian: 'kewajiban/tugas' },
            { japanese: '責任', romaji: 'sekinin', indonesian: 'tanggung jawab' },
            { japanese: '従業員', romaji: 'juugyouin', indonesian: 'karyawan/pegawai' },
          ],
          content: {
            pronunciationCards: [
              { char: '契約', romaji: 'keiyaku', comparison: 'kontrak — sering digunakan dalam dokumen kerja dan bisnis' },
              { char: '規則', romaji: 'kisoku', comparison: 'peraturan — muncul dalam konteks hukum dan perusahaan' },
              { char: '収益', romaji: 'shuueki', comparison: 'pendapatan — istilah laporan keuangan perusahaan' },
              { char: '違反', romaji: 'ihan', comparison: 'pelanggaran — sering dalam berita hukum dan peraturan lalu lintas' },
              { char: '権利', romaji: 'kenri', comparison: 'hak — konteks hukum, mirip "hak" dalam bahasa Indonesia formal' },
              { char: '義務', romaji: 'gimu', comparison: 'kewajiban — sering dipasangkan dengan 権利 (hak dan kewajiban)' },
              { char: '責任', romaji: 'sekinin', comparison: 'tanggung jawab — sangat umum dalam percakapan bisnis Jepang' },
              { char: '従業員', romaji: 'juugyouin', comparison: 'karyawan — istilah formal, seperti "pegawai" dalam bahasa Indonesia resmi' },
              { char: '損害', romaji: 'songai', comparison: 'kerugian — digunakan dalam konteks hukum dan asuransi' },
              { char: '批判', romaji: 'hihan', comparison: 'kritik — sering muncul dalam esai opini dan editorial' },
            ],
            mnemonics: [
              {
                title: 'Kelompok Kanji Bisnis: 契約・規則・収益',
                body: 'Bayangkan skenario kerja: kamu menandatangani 契約 (kontrak), mengikuti 規則 (aturan), dan menghasilkan 収益 (keuntungan). Tiga kanji ini sering muncul bersama dalam konteks bisnis.',
              },
              {
                title: 'Pasangan Hak & Kewajiban: 権利 & 義務',
                body: '権利 (kenri/hak) dan 義務 (gimu/kewajiban) selalu dipasangkan di Jepang, sama seperti "hak dan kewajiban" di Indonesia. Ingat: 権 punya radikal 木 (pohon) = hak yang kokoh, 義 punya 羊 (domba) = kewajiban yang harus diikuti.',
              },
              {
                title: 'Radikal 言 (bicara) dalam Kanji N2',
                body: '議 (rapat), 論 (argumen), 評 (evaluasi), 訳 (terjemahan) — semua mengandung radikal 言 karena berhubungan dengan komunikasi. Kenali radikal ini untuk menebak makna kanji baru.',
              },
            ],
            practicePrompts: [
              'Tulis 10 kanji majemuk bertema bisnis (契約、規則、収益、損害、批判) dan buat kalimat untuk masing-masing',
              'Gunakan WaniKani level 30+ untuk review kanji N2 selama 20 menit',
              'Baca satu artikel NHK News (bukan Easy) dan catat semua kanji yang belum dikenal',
              'Buat flashcard Anki untuk 15 kanji baru hari ini dengan contoh kalimat',
              'Kelompokkan 20 kanji N2 berdasarkan radikal yang sama dan cari pola maknanya',
            ],
          },
        },
        {
          slug: 'n2-kosakata',
          title: 'Kosakata N2 (3000 Kata)',
          titleEn: 'N2 Vocabulary (3000 Words)',
          stepSlugs: ['n2-vocabulary-3000'],
          phrases: [
            { japanese: '充実', romaji: 'juujitsu', indonesian: 'memuaskan/penuh/bermakna' },
            { japanese: '維持', romaji: 'iji', indonesian: 'mempertahankan/menjaga' },
            { japanese: '対策', romaji: 'taisaku', indonesian: 'tindakan pencegahan/strategi' },
            { japanese: '影響', romaji: 'eikyou', indonesian: 'pengaruh/dampak' },
            { japanese: '状況', romaji: 'joukyou', indonesian: 'situasi/keadaan' },
            { japanese: '傾向', romaji: 'keikou', indonesian: 'kecenderungan/tren' },
          ],
          content: {
            pronunciationCards: [
              { char: '充実', romaji: 'juujitsu', comparison: 'bermakna/penuh — menggambarkan kehidupan atau pengalaman yang memuaskan' },
              { char: '維持', romaji: 'iji', comparison: 'mempertahankan — seperti "memelihara" dalam bahasa Indonesia formal' },
              { char: '対策', romaji: 'taisaku', comparison: 'strategi — sering digunakan dalam konteks kebijakan dan rencana' },
              { char: '影響', romaji: 'eikyou', comparison: 'pengaruh — sangat umum dalam esai dan berita formal' },
              { char: '状況', romaji: 'joukyou', comparison: 'situasi — mirip penggunaan "kondisi" dalam laporan resmi Indonesia' },
              { char: '傾向', romaji: 'keikou', comparison: 'kecenderungan — sering dalam analisis data dan survei' },
              { char: '把握', romaji: 'haaku', comparison: 'memahami/menguasai — istilah formal, sering dalam rapat bisnis' },
              { char: '促進', romaji: 'sokushin', comparison: 'mempromosikan/mendorong — konteks kebijakan dan program pemerintah' },
            ],
            mnemonics: [
              {
                title: 'Kata Abstrak N2: Konteks adalah Kunci',
                body: 'Banyak kosakata N2 bersifat abstrak (充実、影響、傾向). Jangan hafalkan terjemahan saja — hafalkan dalam kalimat utuh. Contoh: 充実した生活 (kehidupan yang bermakna) lebih mudah diingat daripada 充実 = bermakna.',
              },
              {
                title: 'Pasangan Kata Sering Muncul',
                body: '影響を与える (memberi pengaruh), 対策を立てる (menyusun strategi), 状況を把握する (memahami situasi) — pola kata kerja + kata benda ini sangat sering diujikan di N2.',
              },
            ],
            practicePrompts: [
              'Buat 5 kalimat menggunakan pola: [kata benda N2] + を + [kata kerja] (contoh: 影響を与える)',
              'Review 50 kartu flashcard Anki deck JLPT N2 dan tandai kata yang masih sulit',
              'Baca editorial di JLPT Sensei dan catat semua kosakata N2 yang muncul',
              'Tulis paragraf pendek (100 kata) menggunakan minimal 5 kosakata N2 baru',
            ],
          },
        },
      ],
    },
    {
      slug: 'tata-bahasa-bisnis',
      title: 'Tata Bahasa & Bahasa Bisnis',
      sectionNumber: 2,
      guide: {
        title: 'Panduan Seksi 2: Tata Bahasa & Bahasa Bisnis',
        description:
          'Seksi ini mencakup pola tata bahasa lanjutan N2 dan bahasa Jepang untuk lingkungan kerja. Tata bahasa N2 banyak digunakan dalam tulisan formal, esai, dan berita. Bahasa bisnis mencakup keigo tingkat lanjut, penulisan email, dan komunikasi rapat.',
        objectives: [
          'Menguasai 50+ pola tata bahasa N2 termasuk 〜にもかかわらず、〜に対して、〜をはじめ',
          'Menggunakan keigo bisnis (尊敬語・謙譲語) dengan tepat dalam situasi kerja',
          'Menulis email bisnis Jepang dengan format dan ungkapan yang benar',
          'Memahami dan berpartisipasi dalam rapat menggunakan bahasa formal Jepang',
        ],
        strategies: [
          {
            title: 'Gunakan BunPro untuk Tata Bahasa Terstruktur',
            body: 'BunPro (bunpro.jp) mengorganisir semua pola tata bahasa N2 dengan SRS. Kerjakan 3-5 pola baru per hari dan review pola lama. Setiap pola dilengkapi contoh kalimat dan penjelasan.',
          },
          {
            title: 'Tonton Nihongo no Mori — Kelas N2',
            body: 'Channel YouTube Nihongo no Mori menyediakan video penjelasan tata bahasa N2 dalam bahasa Jepang sederhana. Tonton satu video per hari dan catat pola yang dipelajari.',
          },
          {
            title: 'Latihan Email Bisnis dengan Template',
            body: 'Cari template ビジネスメール di internet dan latihan menulis email untuk berbagai situasi: permohonan cuti, laporan proyek, undangan rapat. Minta native speaker atau AI untuk mengoreksi.',
          },
          {
            title: 'Simulasi Rapat dengan JLPT Sensei',
            body: 'Gunakan soal latihan listening N2 di JLPT Sensei yang bertema rapat dan presentasi. Catat ungkapan formal yang digunakan dan hafalkan pola-polanya.',
          },
        ],
        commonMistakes: [
          {
            title: 'Mencampur register formal dan informal',
            body: '〜にもかかわらず (formal/tertulis) tidak cocok dicampur dengan 〜けど (informal) dalam satu paragraf. N2 menguji konsistensi register bahasa — pastikan satu teks menggunakan satu level formalitas.',
          },
          {
            title: 'Salah menggunakan 尊敬語 dan 謙譲語',
            body: 'いらっしゃる (尊敬語/untuk orang lain) vs 参る (謙譲語/untuk diri sendiri). Kesalahan paling umum: menggunakan 尊敬語 untuk membicarakan diri sendiri. Ingat: tinggikan orang lain, rendahkan diri sendiri.',
          },
          {
            title: 'Mengacaukan 〜に対して dan 〜について',
            body: '〜に対して (terhadap/kontras) vs 〜について (tentang/mengenai). "Pendapat saya に対して masalah ini" salah — yang benar "masalah ini について". に対して digunakan untuk kontras atau arah aksi.',
          },
        ],
      },
      units: [
        {
          slug: 'n2-tata-bahasa',
          title: 'Tata Bahasa Lanjutan N2',
          titleEn: 'N2 Advanced Grammar',
          stepSlugs: ['n2-advanced-grammar'],
          phrases: [
            { japanese: '〜にもかかわらず', romaji: '~ni mo kakawarazu', indonesian: 'meskipun/walaupun (formal)' },
            { japanese: '〜に対して', romaji: '~ni taishite', indonesian: 'terhadap/sebagai kontras' },
            { japanese: '〜をはじめ', romaji: '~wo hajime', indonesian: 'dimulai dari/termasuk' },
            { japanese: '〜に伴って', romaji: '~ni tomonatte', indonesian: 'seiring dengan/bersamaan dengan' },
            { japanese: '〜を通じて', romaji: '~wo tsuujite', indonesian: 'melalui/sepanjang' },
            { japanese: '〜に際して', romaji: '~ni saishite', indonesian: 'pada saat/ketika (formal)' },
            { japanese: '〜に加えて', romaji: '~ni kuwaete', indonesian: 'selain itu/di samping' },
          ],
          content: {
            pronunciationCards: [
              { char: '〜にもかかわらず', romaji: '~ni mo kakawarazu', comparison: 'meskipun — setara "walaupun demikian" dalam bahasa Indonesia formal' },
              { char: '〜に対して', romaji: '~ni taishite', comparison: 'terhadap — digunakan untuk menunjukkan kontras atau arah aksi' },
              { char: '〜をはじめ', romaji: '~wo hajime', comparison: 'dimulai dari — seperti "termasuk" saat menyebutkan contoh utama' },
              { char: '〜に伴って', romaji: '~ni tomonatte', comparison: 'seiring dengan — menunjukkan dua hal yang terjadi bersamaan' },
              { char: '〜を通じて', romaji: '~wo tsuujite', comparison: 'melalui — bisa berarti "sepanjang" (waktu) atau "lewat" (cara)' },
              { char: '〜に際して', romaji: '~ni saishite', comparison: 'pada saat — sangat formal, digunakan dalam pidato dan dokumen resmi' },
              { char: '〜に加えて', romaji: '~ni kuwaete', comparison: 'selain itu — seperti "di samping itu" dalam tulisan formal Indonesia' },
              { char: '〜をめぐって', romaji: '~wo megutte', comparison: 'seputar/mengenai — digunakan saat ada perdebatan atau kontroversi' },
            ],
            mnemonics: [
              {
                title: 'Kelompok "Meskipun": にもかかわらず vs ものの vs とはいえ',
                body: 'Ketiganya berarti "meskipun" tapi berbeda nuansa: にもかかわらず paling formal (dokumen), ものの medium (esai), とはいえ paling ringan (editorial). Di ujian N2, perhatikan konteks kalimat untuk memilih yang tepat.',
              },
              {
                title: 'Pola に + Kata Kerja: Penanda Hubungan',
                body: 'Banyak pola N2 diawali に: に対して (kontras), に伴って (bersamaan), に際して (saat), に加えて (tambahan). Partikel に di sini menandakan "hubungan" antara dua hal — seperti penghubung dalam kalimat majemuk.',
              },
              {
                title: 'を通じて vs を通して — Apa Bedanya?',
                body: 'Keduanya dibaca "wo tsuujite/tooshite" dan bermakna "melalui". Perbedaannya tipis: を通じて lebih abstrak (一年を通じて = sepanjang tahun), を通して lebih konkret (窓を通して = melalui jendela). Di N2, keduanya sering dipertukarkan.',
              },
            ],
            practicePrompts: [
              'Buat 3 kalimat menggunakan 〜にもかかわらず dengan topik kehidupan sehari-hari',
              'Tulis paragraf pendek yang menggunakan 〜に対して untuk membandingkan dua hal',
              'Kerjakan 10 soal tata bahasa N2 di BunPro dan review pola yang salah',
              'Tonton satu video Nihongo no Mori tentang pola N2 dan buat catatan ringkas',
              'Baca satu artikel berita dan identifikasi semua pola tata bahasa N2 yang muncul',
            ],
          },
        },
        {
          slug: 'n2-bisnis',
          title: 'Bahasa Jepang Bisnis',
          titleEn: 'Business Japanese',
          stepSlugs: ['n2-business-japanese'],
          phrases: [
            { japanese: 'お忙しいところ恐れ入りますが', romaji: 'oisogashii tokoro osoreirimasu ga', indonesian: 'maaf mengganggu di saat Anda sibuk (pembuka email)' },
            { japanese: 'ご確認のほどよろしくお願いいたします', romaji: 'gokakunin no hodo yoroshiku onegai itashimasu', indonesian: 'mohon untuk diperiksa/dikonfirmasi' },
            { japanese: '承知いたしました', romaji: 'shouchi itashimashita', indonesian: 'saya mengerti/memahami (sangat sopan)' },
            { japanese: '検討させていただきます', romaji: 'kentou sasete itadakimasu', indonesian: 'izinkan saya untuk mempertimbangkan' },
            { japanese: 'ご報告申し上げます', romaji: 'gohoukoku moushiagemasu', indonesian: 'saya ingin melaporkan (sangat formal)' },
            { japanese: '会議の議題', romaji: 'kaigi no gidai', indonesian: 'agenda rapat' },
          ],
          content: {
            pronunciationCards: [
              { char: 'お忙しいところ', romaji: 'oisogashii tokoro', comparison: 'pembuka sopan — setara "mohon maaf mengganggu" dalam email formal Indonesia' },
              { char: '恐れ入りますが', romaji: 'osoreirimasu ga', comparison: 'sangat sopan — seperti "dengan hormat" dalam surat resmi Indonesia' },
              { char: '承知いたしました', romaji: 'shouchi itashimashita', comparison: 'mengerti (謙譲語) — lebih sopan dari わかりました, wajib di lingkungan kerja' },
              { char: '検討する', romaji: 'kentou suru', comparison: 'mempertimbangkan — istilah standar dalam rapat dan negosiasi bisnis' },
              { char: '報告する', romaji: 'houkoku suru', comparison: 'melaporkan — kata kunci dalam budaya kerja Jepang (報連相)' },
              { char: '議題', romaji: 'gidai', comparison: 'agenda — digunakan di awal setiap rapat formal Jepang' },
              { char: '敬語', romaji: 'keigo', comparison: 'bahasa sopan — sistem kesopanan tiga tingkat dalam bahasa Jepang' },
              { char: 'ビジネスメール', romaji: 'bijinesu meeru', comparison: 'email bisnis — format penulisan email formal khas Jepang' },
            ],
            mnemonics: [
              {
                title: '報連相 (HouRenSou) — Budaya Kerja Jepang',
                body: '報告 (laporan) + 連絡 (komunikasi) + 相談 (konsultasi) = 報連相, prinsip dasar kerja di Jepang. Hafal tiga kata ini karena sangat sering digunakan dan diujikan di N2 konteks bisnis.',
              },
              {
                title: 'Tiga Level Keigo: 丁寧語・尊敬語・謙譲語',
                body: '丁寧語 (sopan umum: です/ます), 尊敬語 (meninggikan orang lain: いらっしゃる), 謙譲語 (merendahkan diri: 参る). Bayangkan tangga: 丁寧語 = tengah, 尊敬語 = naik (untuk lawan bicara), 謙譲語 = turun (untuk diri sendiri).',
              },
            ],
            practicePrompts: [
              'Tulis email bisnis pendek untuk meminta cuti menggunakan format: 件名 → 宛名 → 挨拶 → 本文 → 結び → 署名',
              'Latihan mengubah kalimat biasa ke 尊敬語 dan 謙譲語: 食べる → 召し上がる / いただく',
              'Buat dialog rapat pendek (5 kalimat) menggunakan ungkapan formal yang dipelajari',
              'Tonton video Nihongo no Mori tentang ビジネス日本語 dan catat 5 ungkapan baru',
              'Review soal listening N2 bertema kantor di JLPT Sensei dan catat pola yang muncul',
            ],
          },
        },
      ],
    },
    {
      slug: 'komprehensi-ujian',
      title: 'Komprehensi & Persiapan Ujian',
      sectionNumber: 3,
      quizSlug: 'n2-review',
      guide: {
        title: 'Panduan Seksi 3: Komprehensi & Persiapan Ujian',
        description:
          'Seksi terakhir N2 memfokuskan pada kemampuan membaca dan mendengarkan tingkat lanjut, serta persiapan ujian JLPT N2 sesungguhnya. Di sini kamu akan berlatih dengan teks panjang, dialog kompleks, dan simulasi ujian penuh.',
        objectives: [
          'Membaca dan memahami teks panjang (artikel opini, esai, laporan) tanpa kamus',
          'Memahami percakapan kompleks termasuk niat implisit dan perubahan topik',
          'Menyelesaikan simulasi ujian JLPT N2 dalam batas waktu yang ditentukan',
          'Mengidentifikasi kelemahan pribadi dan menyusun strategi review akhir',
        ],
        strategies: [
          {
            title: 'Baca Teks Panjang di NHK Web Easy → NHK News',
            body: 'Mulai dengan NHK Web Easy untuk pemanasan, lalu beralih ke berita NHK biasa. Targetkan membaca 2-3 artikel per hari. Fokus pada pemahaman struktur argumen, bukan menerjemahkan kata per kata.',
          },
          {
            title: 'Latihan Listening dengan Nihongo no Mori',
            body: 'Channel Nihongo no Mori menyediakan soal listening N2 gratis di YouTube. Dengarkan tanpa subtitle dulu, lalu periksa jawaban. Lakukan minimal 3 soal listening per hari.',
          },
          {
            title: 'Kerjakan Mock Exam JLPT Resmi',
            body: 'Download contoh soal resmi dari jlpt.jp dan kerjakan dengan timer. Satu mock exam penuh memakan ~2 jam. Analisis setiap jawaban salah dan catat pola kelemahan.',
          },
        ],
        commonMistakes: [
          {
            title: 'Terjebak di satu soal terlalu lama',
            body: 'Ujian JLPT N2 punya batas waktu ketat. Jika satu soal membingungkan, tandai dan lanjutkan. Kembali nanti jika masih ada waktu. Latihan mock exam dengan timer sangat penting untuk membangun kecepatan.',
          },
          {
            title: 'Tidak membaca semua opsi jawaban',
            body: 'Di bagian reading, banyak opsi jawaban yang terlihat benar tapi ada detail kecil yang salah. Baca SEMUA opsi sebelum memilih, dan bandingkan dengan teks asli. Jawaban yang "hampir benar" adalah jebakan paling umum di N2.',
          },
          {
            title: 'Mengabaikan konteks dalam listening',
            body: 'Soal listening N2 sering menguji pemahaman niat implisit — apa yang pembicara "sebenarnya" maksud, bukan kata-kata literal. Perhatikan intonasi, partikel akhir kalimat (ね、よ、けど), dan konteks situasi.',
          },
        ],
      },
      units: [
        {
          slug: 'n2-komprehensi',
          title: 'Membaca & Mendengarkan Lanjutan',
          titleEn: 'Advanced Reading & Listening',
          stepSlugs: ['n2-reading-advanced', 'n2-listening-advanced'],
          phrases: [
            { japanese: '筆者の主張', romaji: 'hissha no shuchou', indonesian: 'argumen/klaim penulis' },
            { japanese: '要旨', romaji: 'youshi', indonesian: 'inti/ringkasan' },
            { japanese: '論点', romaji: 'ronten', indonesian: 'poin argumen/isu' },
            { japanese: '趣旨', romaji: 'shushi', indonesian: 'maksud/tujuan utama' },
            { japanese: '文脈', romaji: 'bunmyaku', indonesian: 'konteks' },
            { japanese: '暗示する', romaji: 'anji suru', indonesian: 'mengisyaratkan/menyiratkan' },
          ],
          content: {
            pronunciationCards: [
              { char: '筆者', romaji: 'hissha', comparison: 'penulis — istilah formal untuk pengarang teks, sering dalam soal ujian' },
              { char: '主張', romaji: 'shuchou', comparison: 'argumen/klaim — kata kunci dalam soal reading comprehension N2' },
              { char: '要旨', romaji: 'youshi', comparison: 'inti — sering diminta dalam soal: "要旨は何ですか" (apa intinya?)' },
              { char: '論点', romaji: 'ronten', comparison: 'poin argumen — digunakan dalam esai dan debat formal' },
              { char: '趣旨', romaji: 'shushi', comparison: 'maksud utama — mirip 要旨 tapi lebih menekankan "niat" penulis' },
              { char: '文脈', romaji: 'bunmyaku', comparison: 'konteks — kemampuan memahami 文脈 adalah kunci kelulusan N2' },
              { char: '暗示する', romaji: 'anji suru', comparison: 'menyiratkan — soal N2 sering bertanya: apa yang "diisyaratkan" penulis' },
              { char: '傾聴する', romaji: 'keichou suru', comparison: 'mendengarkan dengan seksama — kemampuan inti untuk listening N2' },
            ],
            mnemonics: [
              {
                title: 'Kata Kunci Soal Reading: 筆者・主張・要旨・趣旨',
                body: 'Keempat kata ini hampir selalu muncul dalam instruksi soal reading N2. 筆者 = siapa yang menulis, 主張 = apa yang diklaim, 要旨 = inti keseluruhan, 趣旨 = maksud di baliknya. Hafalkan sebagai satu set.',
              },
              {
                title: 'Listening: Perhatikan Akhiran Kalimat',
                body: 'Di listening N2, akhiran kalimat mengubah makna drastis: 〜けど (tapi = ada kelanjutan yang tidak diucapkan), 〜んですが (minta tolong secara halus), 〜ないこともない (bukan berarti tidak = sebenarnya iya). Fokus di 3 detik terakhir setiap kalimat.',
              },
            ],
            practicePrompts: [
              'Baca satu artikel opini di NHK News dan identifikasi: 筆者の主張、要旨、dan 論点',
              'Kerjakan 5 soal reading comprehension N2 dari JLPT Sensei dengan timer (8 menit per teks)',
              'Dengarkan 3 soal listening N2 di Nihongo no Mori tanpa subtitle, lalu periksa jawaban',
              'Latihan mendengarkan siaran berita NHK World selama 10 menit dan catat topik utama',
            ],
          },
        },
        {
          slug: 'n2-ujian',
          title: 'Mock Exam N2',
          titleEn: 'N2 Mock Exam',
          stepSlugs: ['n2-mock-exam'],
          phrases: [
            { japanese: '言語知識', romaji: 'gengo chishiki', indonesian: 'pengetahuan bahasa (bagian ujian)' },
            { japanese: '読解', romaji: 'dokkai', indonesian: 'pemahaman bacaan' },
            { japanese: '聴解', romaji: 'choukai', indonesian: 'pemahaman mendengarkan' },
            { japanese: '合格', romaji: 'goukaku', indonesian: 'lulus' },
            { japanese: '不合格', romaji: 'fugoukaku', indonesian: 'tidak lulus' },
            { japanese: '配点', romaji: 'haiten', indonesian: 'distribusi nilai' },
            { japanese: '制限時間', romaji: 'seigen jikan', indonesian: 'batas waktu' },
          ],
          content: {
            pronunciationCards: [
              { char: '言語知識', romaji: 'gengo chishiki', comparison: 'pengetahuan bahasa — bagian pertama ujian JLPT (文字・語彙・文法)' },
              { char: '読解', romaji: 'dokkai', comparison: 'reading comprehension — bagian kedua ujian, bobot nilai tinggi' },
              { char: '聴解', romaji: 'choukai', comparison: 'listening comprehension — bagian terakhir ujian JLPT' },
              { char: '合格', romaji: 'goukaku', comparison: 'lulus — target utama! Skor minimum N2: 90/180 dengan minimum per seksi' },
              { char: '制限時間', romaji: 'seigen jikan', comparison: 'batas waktu — N2 total ~155 menit, manajemen waktu sangat krusial' },
              { char: '模擬試験', romaji: 'mogi shiken', comparison: 'mock exam — simulasi ujian untuk latihan dan evaluasi kesiapan' },
            ],
            mnemonics: [
              {
                title: 'Struktur Ujian JLPT N2',
                body: '言語知識 (105 menit: kanji + kosakata + tata bahasa + reading) → 聴解 (50 menit: listening). Total 180 poin, minimum 90 untuk lulus, dengan minimum 19 per seksi. Ingat angka: 105-50-180-90-19.',
              },
              {
                title: 'Strategi Waktu: 読解 Makan Waktu Paling Banyak',
                body: 'Dalam bagian 言語知識+読解 (105 menit), alokasikan: 文字・語彙 15 menit, 文法 20 menit, 読解 70 menit. Reading membutuhkan waktu paling banyak — jangan habiskan terlalu lama di bagian awal.',
              },
              {
                title: '合格 vs 不合格: Satu Kanji Pembeda',
                body: '合格 (lulus) → 不合格 (tidak lulus). Prefiks 不 mengubah makna jadi negatif. Pola ini sangat produktif di N2: 可能 → 不可能, 満足 → 不満足, 安定 → 不安定.',
              },
            ],
            practicePrompts: [
              'Kerjakan satu set soal mock exam JLPT N2 resmi dari jlpt.jp dengan timer penuh (155 menit)',
              'Analisis hasil mock exam: identifikasi 3 area terlemah dan buat rencana review',
              'Review semua jawaban salah dan catat pola kesalahan (kanji/grammar/reading/listening)',
              'Kerjakan soal mock exam tambahan di JLPT Sensei fokus pada area terlemah',
              'Latihan manajemen waktu: kerjakan 5 soal reading dalam 8 menit per teks',
            ],
          },
        },
      ],
    },
  ],
};
