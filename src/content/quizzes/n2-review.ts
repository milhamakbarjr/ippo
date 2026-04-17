import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n2-review',
  title: 'N2 Review Quiz',
  level: 'n2',
  category: 'grammar',
  questions: [
    {
      id: 'n2-1',
      questionText: '雨が降っている（　　）、試合は予定通り行われた。',
      options: [
        { id: 'a', text: 'にもかかわらず', isCorrect: true },
        { id: 'b', text: 'に対して', isCorrect: false },
        { id: 'c', text: 'において', isCorrect: false },
        { id: 'd', text: 'に加えて', isCorrect: false },
      ],
      explanation:
        '「〜にもかかわらず」berarti "meskipun/walaupun". Kalimat ini bermakna: "Meskipun hujan turun, pertandingan tetap dilaksanakan sesuai jadwal." Pola ini digunakan ketika hasil bertentangan dengan kondisi.',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-2',
      questionText: '日本の文化（　　）、インドネシアの文化にも興味がある。',
      options: [
        { id: 'a', text: 'に対して', isCorrect: true },
        { id: 'b', text: 'にもかかわらず', isCorrect: false },
        { id: 'c', text: 'に伴って', isCorrect: false },
        { id: 'd', text: 'をはじめ', isCorrect: false },
      ],
      explanation:
        '「〜に対して」di sini berarti "dibandingkan dengan/terhadap". Kalimat bermakna: "Dibandingkan dengan budaya Jepang, saya juga tertarik dengan budaya Indonesia." Pola ini menunjukkan kontras antara dua hal.',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-3',
      questionText: 'インターネット（　　）、世界中の情報を得ることができる。',
      options: [
        { id: 'a', text: 'を通じて', isCorrect: true },
        { id: 'b', text: 'をはじめ', isCorrect: false },
        { id: 'c', text: 'をめぐって', isCorrect: false },
        { id: 'd', text: 'に際して', isCorrect: false },
      ],
      explanation:
        '「〜を通じて」berarti "melalui". Kalimat bermakna: "Melalui internet, kita bisa mendapatkan informasi dari seluruh dunia." Pola ini menunjukkan sarana atau media.',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-4',
      questionText: '「契約」の読み方はどれですか。',
      options: [
        { id: 'a', text: 'けいやく', isCorrect: true },
        { id: 'b', text: 'けいかく', isCorrect: false },
        { id: 'c', text: 'きやく', isCorrect: false },
        { id: 'd', text: 'けやく', isCorrect: false },
      ],
      explanation:
        '「契約」(けいやく/keiyaku) berarti "kontrak/perjanjian". Jangan tertukar dengan 「計画」(けいかく/keikaku) yang berarti "rencana". Kanji 契 berarti "janji" dan 約 berarti "ringkasan/perjanjian".',
      category: 'kanji',
      level: 'n2',
    },
    {
      id: 'n2-5',
      questionText: '人口の増加（　　）、住宅問題も深刻になっている。',
      options: [
        { id: 'a', text: 'に伴って', isCorrect: true },
        { id: 'b', text: 'に対して', isCorrect: false },
        { id: 'c', text: 'について', isCorrect: false },
        { id: 'd', text: 'にとって', isCorrect: false },
      ],
      explanation:
        '「〜に伴って」berarti "seiring dengan". Kalimat bermakna: "Seiring dengan pertambahan penduduk, masalah perumahan juga menjadi serius." Pola ini menunjukkan dua perubahan yang terjadi bersamaan.',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-6',
      questionText: 'お忙しいところ恐れ入りますが、ご確認のほどよろしくお願いいたします。この文の意味はどれですか。',
      options: [
        { id: 'a', text: 'Maaf mengganggu di saat Anda sibuk, mohon untuk diperiksa.', isCorrect: true },
        { id: 'b', text: 'Saya sibuk sekarang, tolong tunggu.', isCorrect: false },
        { id: 'c', text: 'Terima kasih sudah membantu, saya sangat senang.', isCorrect: false },
        { id: 'd', text: 'Saya tidak setuju dengan keputusan ini.', isCorrect: false },
      ],
      explanation:
        '「お忙しいところ恐れ入りますが」adalah ungkapan sopan pembuka email bisnis yang berarti "maaf mengganggu di saat sibuk". 「ご確認のほどよろしくお願いいたします」berarti "mohon untuk diperiksa/dikonfirmasi". Ini adalah pola standar email bisnis Jepang.',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-7',
      questionText: '「影響」の正しい読み方はどれですか。',
      options: [
        { id: 'a', text: 'えいきょう', isCorrect: true },
        { id: 'b', text: 'えいこう', isCorrect: false },
        { id: 'c', text: 'いんきょう', isCorrect: false },
        { id: 'd', text: 'えいひびき', isCorrect: false },
      ],
      explanation:
        '「影響」(えいきょう/eikyou) berarti "pengaruh/dampak". Kata ini sangat sering muncul dalam teks N2, terutama dalam konteks berita dan esai. Contoh: 「環境に影響を与える」(memberi dampak pada lingkungan).',
      category: 'kanji',
      level: 'n2',
    },
    {
      id: 'n2-8',
      questionText: '東京（　　）大阪や京都など、多くの都市を訪問した。',
      options: [
        { id: 'a', text: 'をはじめ', isCorrect: true },
        { id: 'b', text: 'を通じて', isCorrect: false },
        { id: 'c', text: 'をめぐって', isCorrect: false },
        { id: 'd', text: 'に伴って', isCorrect: false },
      ],
      explanation:
        '「〜をはじめ」berarti "dimulai dari/termasuk". Kalimat bermakna: "Dimulai dari Tokyo, saya mengunjungi banyak kota termasuk Osaka dan Kyoto." Pola ini menyebutkan contoh utama diikuti contoh lainnya.',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-9',
      questionText: '上司に「承知いたしました」と言いました。この表現はどのような場面で使いますか。',
      options: [
        { id: 'a', text: 'Menerima instruksi dari atasan dengan sangat sopan', isCorrect: true },
        { id: 'b', text: 'Menolak permintaan dengan halus', isCorrect: false },
        { id: 'c', text: 'Memperkenalkan diri kepada rekan baru', isCorrect: false },
        { id: 'd', text: 'Mengakhiri percakapan telepon', isCorrect: false },
      ],
      explanation:
        '「承知いたしました」(shouchi itashimashita) adalah bentuk 謙譲語 (merendahkan diri) dari "mengerti/memahami". Digunakan untuk menerima instruksi atau permintaan dari atasan atau klien dengan sangat sopan. Lebih formal dari 「わかりました」.',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-10',
      questionText: '新しい法律の導入（　　）、さまざまな議論が続いている。',
      options: [
        { id: 'a', text: 'をめぐって', isCorrect: true },
        { id: 'b', text: 'をはじめ', isCorrect: false },
        { id: 'c', text: 'を通じて', isCorrect: false },
        { id: 'd', text: 'に加えて', isCorrect: false },
      ],
      explanation:
        '「〜をめぐって」berarti "seputar/mengenai" dan digunakan ketika ada perdebatan atau kontroversi. Kalimat bermakna: "Seputar pengenalan undang-undang baru, berbagai diskusi terus berlangsung."',
      category: 'grammar',
      level: 'n2',
    },
    {
      id: 'n2-11',
      questionText: '次の文を読んでください。「経済の発展に伴い、環境問題がますます深刻になっている。この問題に対して、政府は新たな対策を検討している。」筆者が最も伝えたいことは何ですか。',
      options: [
        { id: 'a', text: 'Pemerintah sedang mempertimbangkan langkah baru untuk masalah lingkungan yang memburuk seiring perkembangan ekonomi', isCorrect: true },
        { id: 'b', text: 'Ekonomi berkembang pesat dan tidak ada masalah', isCorrect: false },
        { id: 'c', text: 'Masalah lingkungan sudah selesai berkat pemerintah', isCorrect: false },
        { id: 'd', text: 'Perkembangan ekonomi harus dihentikan demi lingkungan', isCorrect: false },
      ],
      explanation:
        'Teks menyatakan: "Seiring perkembangan ekonomi (経済の発展に伴い), masalah lingkungan semakin serius (環境問題がますます深刻). Terhadap masalah ini (この問題に対して), pemerintah mempertimbangkan langkah baru (新たな対策を検討)." Intinya adalah pemerintah merespons masalah lingkungan yang memburuk.',
      category: 'reading',
      level: 'n2',
    },
    {
      id: 'n2-12',
      questionText: '「維持」の意味として最も適切なものはどれですか。',
      options: [
        { id: 'a', text: 'Mempertahankan/menjaga keadaan tetap sama', isCorrect: true },
        { id: 'b', text: 'Mengubah sesuatu menjadi lebih baik', isCorrect: false },
        { id: 'c', text: 'Menghancurkan atau merusak sesuatu', isCorrect: false },
        { id: 'd', text: 'Memulai sesuatu yang baru', isCorrect: false },
      ],
      explanation:
        '「維持」(いじ/iji) berarti "mempertahankan/menjaga". Contoh: 「健康を維持する」(menjaga kesehatan), 「品質を維持する」(mempertahankan kualitas). Kanji 維 berarti "mengikat/memelihara" dan 持 berarti "memegang".',
      category: 'vocab',
      level: 'n2',
    },
  ],
};

export default quiz;
