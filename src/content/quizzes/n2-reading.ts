import type { QuizContent } from '@/types/quiz';

const quiz: QuizContent = {
  slug: 'n2-reading',
  title: 'N2 Reading Comprehension Quiz',
  level: 'n2',
  category: 'reading',
  questions: [
    {
      id: 'n2-reading-1',
      questionText: `近年、日本では在宅勤務を導入する企業が増えている。通勤時間が削減されることで、社員の生活の質が向上したという報告もある。一方で、社員同士のコミュニケーション不足や、自宅での作業環境の整備が課題として挙げられている。\n\nこの文章によると、在宅勤務の問題点は何ですか。`,
      options: [
        { id: 'a', text: '社員間のコミュニケーションが減ること', isCorrect: true },
        { id: 'b', text: '通勤時間が長くなること', isCorrect: false },
        { id: 'c', text: '企業の数が減っていること', isCorrect: false },
        { id: 'd', text: '生活の質が低下すること', isCorrect: false },
      ],
      explanation: 'Teks menyebutkan "社員同士のコミュニケーション不足" (kurangnya komunikasi antar karyawan) sebagai tantangan kerja dari rumah. Waktu komuter justru berkurang, dan kualitas hidup dilaporkan meningkat.',
      category: 'reading',
      level: 'n2',
    },
    {
      id: 'n2-reading-2',
      questionText: `日本の少子化問題は深刻さを増している。出生率の低下は労働力不足につながり、社会保障制度の維持が難しくなってきた。政府はこの問題に対処するため、育児支援の拡充や外国人労働者の受け入れ拡大などの政策を打ち出している。\n\n政府が少子化対策として行っていることは何ですか。`,
      options: [
        { id: 'a', text: '育児支援の充実と外国人労働者の受け入れ拡大', isCorrect: true },
        { id: 'b', text: '出生率を直接上げる法律の制定', isCorrect: false },
        { id: 'c', text: '社会保障制度の廃止', isCorrect: false },
        { id: 'd', text: '労働時間の短縮のみ', isCorrect: false },
      ],
      explanation: 'Teks menyebutkan dua kebijakan pemerintah: "育児支援の拡充" (perluasan dukungan pengasuhan anak) dan "外国人労働者の受け入れ拡大" (perluasan penerimaan tenaga kerja asing). Tidak disebutkan pembatalan jaminan sosial.',
      category: 'reading',
      level: 'n2',
    },
    {
      id: 'n2-reading-3',
      questionText: `鈴木部長は会議で「今期の売上目標は達成できたが、来期に向けてさらなるコスト削減が必要だ」と述べた。また、新製品の開発については「市場調査の結果を踏まえて、慎重に進めたい」と説明した。\n\n鈴木部長が来期の課題として挙げたのは何ですか。`,
      options: [
        { id: 'a', text: 'コストの削減', isCorrect: true },
        { id: 'b', text: '売上目標の未達成', isCorrect: false },
        { id: 'c', text: '市場調査の実施', isCorrect: false },
        { id: 'd', text: '新製品の即時発売', isCorrect: false },
      ],
      explanation: 'Suzuki-bucho menyatakan penjualan periode ini sudah tercapai, namun untuk periode depan "さらなるコスト削減が必要" = perlu pengurangan biaya lebih lanjut. Itu adalah tantangan yang disebutkan untuk periode mendatang.',
      category: 'reading',
      level: 'n2',
    },
    {
      id: 'n2-reading-4',
      questionText: `「フードロス」とは、まだ食べられるにもかかわらず廃棄される食品のことを指す。日本では年間約５００万トンの食品が廃棄されており、これは世界の食料援助量の約１．３倍に相当する。この問題の解決には、消費者の意識改革と小売業者の取り組みの両方が不可欠だとされている。\n\nこの文章でフードロスの解決に必要なこととして述べられているのはどれですか。`,
      options: [
        { id: 'a', text: '消費者の意識改革と小売業者の取り組み', isCorrect: true },
        { id: 'b', text: '食料援助量の削減', isCorrect: false },
        { id: 'c', text: '廃棄量を増やすこと', isCorrect: false },
        { id: 'd', text: '政府による規制のみ', isCorrect: false },
      ],
      explanation: 'Teks menyatakan "消費者の意識改革と小売業者の取り組みの両方が不可欠" = perubahan kesadaran konsumen DAN upaya dari pengecer adalah hal yang tidak bisa diabaikan. Bukan hanya regulasi pemerintah.',
      category: 'reading',
      level: 'n2',
    },
    {
      id: 'n2-reading-5',
      questionText: `先日、社内でハラスメント防止に関する研修が行われた。講師は「ハラスメントは意図の有無にかかわらず、相手が不快に感じた時点で成立する」と強調した。また、被害を受けた際は一人で抱え込まず、上司や人事部門に相談することが重要だと述べた。\n\n講師がハラスメントについて言ったことで正しいのはどれですか。`,
      options: [
        { id: 'a', text: '意図がなくても相手が不快なら成立する', isCorrect: true },
        { id: 'b', text: '意図的な行為のみがハラスメントになる', isCorrect: false },
        { id: 'c', text: '被害は一人で解決すべきだ', isCorrect: false },
        { id: 'd', text: '研修を受ければハラスメントはなくなる', isCorrect: false },
      ],
      explanation: 'Pembicara menekankan "意図の有無にかかわらず、相手が不快に感じた時点で成立する" = terlepas ada atau tidaknya niat, pelecehan terjadi ketika pihak lain merasa tidak nyaman. Ia juga mendorong melapor ke atasan, bukan menyelesaikan sendiri.',
      category: 'reading',
      level: 'n2',
    },
  ],
};

export default quiz;
