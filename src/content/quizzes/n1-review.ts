import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n1-review',
  title: 'N1 Review Quiz',
  level: 'n1',
  category: 'grammar',
  questions: [
    {
      id: 'n1-1',
      questionText: '「結果＿＿＿、全員参加していただきます。」に入る正しい表現はどれですか。',
      options: [
        { id: 'a', text: 'いかんによらず', isCorrect: true },
        { id: 'b', text: 'いかんでは', isCorrect: false },
        { id: 'c', text: 'いかんながら', isCorrect: false },
        { id: 'd', text: 'いかんにつき', isCorrect: false },
      ],
      explanation:
        '「〜いかんによらず」berarti "terlepas dari~". Kalimat ini bermakna: "Terlepas dari hasilnya, semua orang diminta berpartisipasi." Pola ini digunakan dalam konteks formal dan dokumen resmi.',
      category: 'grammar',
      level: 'n1',
    },
    {
      id: 'n1-2',
      questionText: '「彼女は若く＿＿＿、会社を設立した。」に入る正しい表現はどれですか。',
      options: [
        { id: 'a', text: 'して', isCorrect: true },
        { id: 'b', text: 'なって', isCorrect: false },
        { id: 'c', text: 'ながら', isCorrect: false },
        { id: 'd', text: 'つつ', isCorrect: false },
      ],
      explanation:
        '「〜にして」dalam konteks ini bermakna "pada saat/di usia~". Kalimat ini bermakna: "Dia mendirikan perusahaan di usia muda." Pola 〜にして menekankan pencapaian luar biasa pada suatu titik waktu.',
      category: 'grammar',
      level: 'n1',
    },
    {
      id: 'n1-3',
      questionText: '「この祭りは京都＿＿＿の伝統行事だ。」に入る正しい表現はどれですか。',
      options: [
        { id: 'a', text: 'ならではの', isCorrect: true },
        { id: 'b', text: 'だけの', isCorrect: false },
        { id: 'c', text: 'にとっての', isCorrect: false },
        { id: 'd', text: 'からの', isCorrect: false },
      ],
      explanation:
        '「〜ならではの」berarti "khas~/yang hanya bisa ditemukan di~". Kalimat ini bermakna: "Festival ini adalah tradisi khas Kyoto." Pola ini selalu digunakan dalam konteks positif untuk memuji keunikan sesuatu.',
      category: 'grammar',
      level: 'n1',
    },
    {
      id: 'n1-4',
      questionText: '「誠意＿＿＿対応させていただきます。」に入る正しい表現はどれですか。',
      options: [
        { id: 'a', text: 'をもって', isCorrect: true },
        { id: 'b', text: 'をもとに', isCorrect: false },
        { id: 'c', text: 'において', isCorrect: false },
        { id: 'd', text: 'にあたり', isCorrect: false },
      ],
      explanation:
        '「〜をもって」berarti "dengan~/melalui~". Kalimat ini bermakna: "Kami akan merespons dengan ketulusan." Pola ini digunakan dalam korespondensi bisnis formal dan pidato resmi.',
      category: 'grammar',
      level: 'n1',
    },
    {
      id: 'n1-5',
      questionText: '「曖昧」の読み方はどれですか。',
      options: [
        { id: 'a', text: 'あいまい', isCorrect: true },
        { id: 'b', text: 'あいばい', isCorrect: false },
        { id: 'c', text: 'わいまい', isCorrect: false },
        { id: 'd', text: 'あいみ', isCorrect: false },
      ],
      explanation:
        '「曖昧」(あいまい/aimai) berarti "ambigu, tidak jelas". Kedua kanji ini (曖 dan 昧) jarang muncul secara terpisah dan hampir selalu digunakan bersama sebagai compound.',
      category: 'kanji',
      level: 'n1',
    },
    {
      id: 'n1-6',
      questionText: '「憂鬱な気分」の「憂鬱」はどういう意味ですか。',
      options: [
        { id: 'a', text: 'Depresi, murung', isCorrect: true },
        { id: 'b', text: 'Gembira, ceria', isCorrect: false },
        { id: 'c', text: 'Marah, kesal', isCorrect: false },
        { id: 'd', text: 'Bingung, ragu', isCorrect: false },
      ],
      explanation:
        '「憂鬱」(yuuutsu) berarti "depresi, murung". Kanji 鬱 memiliki 29 coretan dan merupakan salah satu kanji paling rumit yang masih umum digunakan dalam bahasa Jepang sehari-hari.',
      category: 'vocab',
      level: 'n1',
    },
    {
      id: 'n1-7',
      questionText: '「世論の反対＿＿＿、政府は法案を可決した。」に入る正しい表現はどれですか。',
      options: [
        { id: 'a', text: 'をよそに', isCorrect: true },
        { id: 'b', text: 'をもとに', isCorrect: false },
        { id: 'c', text: 'をかねて', isCorrect: false },
        { id: 'd', text: 'をこめて', isCorrect: false },
      ],
      explanation:
        '「〜をよそに」berarti "mengabaikan~/tanpa menghiraukan~". Kalimat ini bermakna: "Mengabaikan penentangan opini publik, pemerintah meloloskan undang-undang tersebut." Pola ini memiliki konotasi negatif — subjek tidak peduli dengan kekhawatiran orang lain.',
      category: 'grammar',
      level: 'n1',
    },
    {
      id: 'n1-8',
      questionText: '「一目瞭然」はどういう意味ですか。',
      options: [
        { id: 'a', text: 'Jelas pada pandangan pertama', isCorrect: true },
        { id: 'b', text: 'Melihat dari satu sisi saja', isCorrect: false },
        { id: 'c', text: 'Pandangan yang kabur', isCorrect: false },
        { id: 'd', text: 'Memahami secara mendalam', isCorrect: false },
      ],
      explanation:
        '「一目瞭然」(ichimoku ryouzen) adalah yojijukugo yang bermakna "jelas pada pandangan pertama". 一目 = satu pandangan, 瞭然 = jelas/terang. Idiom ini sering digunakan dalam presentasi dan laporan formal.',
      category: 'vocab',
      level: 'n1',
    },
    {
      id: 'n1-9',
      questionText: '「彼は教師の＿＿＿、小説家としても活躍している。」に入る正しい表現はどれですか。',
      options: [
        { id: 'a', text: 'かたわら', isCorrect: true },
        { id: 'b', text: 'かわりに', isCorrect: false },
        { id: 'c', text: 'うちに', isCorrect: false },
        { id: 'd', text: 'あげく', isCorrect: false },
      ],
      explanation:
        '「〜かたわら」berarti "sambil juga~/di samping~". Kalimat ini bermakna: "Di samping menjadi guru, dia juga aktif sebagai novelis." Pola ini menunjukkan dua aktivitas serius yang dilakukan secara bersamaan.',
      category: 'grammar',
      level: 'n1',
    },
    {
      id: 'n1-10',
      questionText: '「恐縮ですが、もう一度ご確認いただけますか。」の「恐縮」はどういう意味ですか。',
      options: [
        { id: 'a', text: 'Merasa tidak enak / merepotkan', isCorrect: true },
        { id: 'b', text: 'Merasa takut', isCorrect: false },
        { id: 'c', text: 'Merasa senang', isCorrect: false },
        { id: 'd', text: 'Merasa bingung', isCorrect: false },
      ],
      explanation:
        '「恐縮」(kyoushuku) adalah ekspresi kesopanan tingkat tinggi dalam bahasa bisnis Jepang yang bermakna "merasa tidak enak/merepotkan". Digunakan saat meminta tolong atau menyampaikan permintaan kepada atasan atau klien.',
      category: 'vocab',
      level: 'n1',
    },
    {
      id: 'n1-11',
      questionText: '「子供＿＿＿、大人でもこの問題は解けないだろう。」に入る正しい表現はどれですか。',
      options: [
        { id: 'a', text: 'ならいざ知らず', isCorrect: true },
        { id: 'b', text: 'ならでは', isCorrect: false },
        { id: 'c', text: 'ならまだしも', isCorrect: false },
        { id: 'd', text: 'ならそれまで', isCorrect: false },
      ],
      explanation:
        '「〜ならいざ知らず」berarti "entahlah kalau~/kalau~sih mungkin wajar, tapi~". Kalimat ini bermakna: "Kalau anak-anak sih mungkin wajar, tapi bahkan orang dewasa pun tidak bisa menyelesaikan soal ini." Pola ini mengecualikan satu kemungkinan dari pernyataan umum.',
      category: 'grammar',
      level: 'n1',
    },
    {
      id: 'n1-12',
      questionText: '次の文を読んで、筆者の主張に最も近いものを選びなさい。\n\n「現代社会において、効率性の追求は必ずしも幸福の増大を意味しない。むしろ、余暇の喪失や人間関係の希薄化を招いている側面がある。」',
      options: [
        { id: 'a', text: 'Mengejar efisiensi tidak selalu membawa kebahagiaan, bahkan bisa mengurangi waktu luang dan melemahkan hubungan antarmanusia.', isCorrect: true },
        { id: 'b', text: 'Efisiensi adalah kunci kebahagiaan di masyarakat modern.', isCorrect: false },
        { id: 'c', text: 'Waktu luang dan hubungan manusia tidak penting dibandingkan efisiensi.', isCorrect: false },
        { id: 'd', text: 'Masyarakat modern sudah mencapai keseimbangan antara efisiensi dan kebahagiaan.', isCorrect: false },
      ],
      explanation:
        'Penulis berargumen bahwa mengejar efisiensi (効率性の追求) tidak selalu berarti peningkatan kebahagiaan (幸福の増大を意味しない). Kata kunci「むしろ」(justru/malahan) menunjukkan bahwa efisiensi justru menyebabkan hilangnya waktu luang (余暇の喪失) dan melemahnya hubungan manusia (人間関係の希薄化).',
      category: 'reading',
      level: 'n1',
    },
  ],
};

export default quiz;
