import type { CharacterSection } from '@/types/letters';
import { KANJI_N4_SECTIONS } from './kanji-n4';

// JLPT N5 Kanji — 103 kanji organized by thematic category
// Readings: romaji = primary displayed reading, onyomi = on'yomi (katakana), kunyomi = kun'yomi (hiragana)

const N5_NUMBERS: CharacterSection = {
  title: 'Angka',
  description: 'Kanji untuk bilangan dasar',
  columns: 5,
  entries: [
    { char: '一', romaji: 'ichi', meaning: 'satu', onyomi: 'イチ', kunyomi: 'ひと.つ', examples: [{ word: '一人', reading: 'ひとり', meaning: 'satu orang' }, { word: '一つ', reading: 'ひとつ', meaning: 'satu buah' }] },
    { char: '二', romaji: 'ni', meaning: 'dua', onyomi: 'ニ', kunyomi: 'ふた.つ', examples: [{ word: '二人', reading: 'ふたり', meaning: 'dua orang' }, { word: '二つ', reading: 'ふたつ', meaning: 'dua buah' }] },
    { char: '三', romaji: 'san', meaning: 'tiga', onyomi: 'サン', kunyomi: 'み.つ', examples: [{ word: '三月', reading: 'さんがつ', meaning: 'bulan Maret' }, { word: '三つ', reading: 'みっつ', meaning: 'tiga buah' }] },
    { char: '四', romaji: 'shi/yon', meaning: 'empat', onyomi: 'シ', kunyomi: 'よ.つ', examples: [{ word: '四月', reading: 'しがつ', meaning: 'bulan April' }, { word: '四つ', reading: 'よっつ', meaning: 'empat buah' }] },
    { char: '五', romaji: 'go', meaning: 'lima', onyomi: 'ゴ', kunyomi: 'いつ.つ', examples: [{ word: '五月', reading: 'ごがつ', meaning: 'bulan Mei' }, { word: '五つ', reading: 'いつつ', meaning: 'lima buah' }] },
    { char: '六', romaji: 'roku', meaning: 'enam', onyomi: 'ロク', kunyomi: 'む.つ', examples: [{ word: '六月', reading: 'ろくがつ', meaning: 'bulan Juni' }, { word: '六つ', reading: 'むっつ', meaning: 'enam buah' }] },
    { char: '七', romaji: 'shichi/nana', meaning: 'tujuh', onyomi: 'シチ', kunyomi: 'なな.つ', examples: [{ word: '七月', reading: 'しちがつ', meaning: 'bulan Juli' }, { word: '七つ', reading: 'ななつ', meaning: 'tujuh buah' }] },
    { char: '八', romaji: 'hachi', meaning: 'delapan', onyomi: 'ハチ', kunyomi: 'や.つ', examples: [{ word: '八月', reading: 'はちがつ', meaning: 'bulan Agustus' }, { word: '八つ', reading: 'やっつ', meaning: 'delapan buah' }] },
    { char: '九', romaji: 'ku/kyuu', meaning: 'sembilan', onyomi: 'キュウ・ク', kunyomi: 'ここの.つ', examples: [{ word: '九月', reading: 'くがつ', meaning: 'bulan September' }, { word: '九つ', reading: 'ここのつ', meaning: 'sembilan buah' }] },
    { char: '十', romaji: 'juu', meaning: 'sepuluh', onyomi: 'ジュウ', kunyomi: 'とお', examples: [{ word: '十月', reading: 'じゅうがつ', meaning: 'bulan Oktober' }, { word: '十分', reading: 'じゅっぷん', meaning: 'sepuluh menit' }] },
    { char: '百', romaji: 'hyaku', meaning: 'seratus', onyomi: 'ヒャク', kunyomi: '—', examples: [{ word: '三百', reading: 'さんびゃく', meaning: 'tiga ratus' }, { word: '百円', reading: 'ひゃくえん', meaning: '100 yen' }] },
    { char: '千', romaji: 'sen', meaning: 'seribu', onyomi: 'セン', kunyomi: 'ち', examples: [{ word: '三千', reading: 'さんぜん', meaning: 'tiga ribu' }, { word: '千円', reading: 'せんえん', meaning: '1000 yen' }] },
    { char: '万', romaji: 'man', meaning: 'sepuluh ribu', onyomi: 'マン・バン', kunyomi: '—', examples: [{ word: '一万', reading: 'いちまん', meaning: 'sepuluh ribu' }, { word: '万年筆', reading: 'まんねんひつ', meaning: 'pulpen' }] },
  ],
};

const N5_TIME: CharacterSection = {
  title: 'Waktu & Kalender',
  description: 'Hari, bulan, tahun, dan ekspresi waktu',
  columns: 5,
  entries: [
    { char: '日', romaji: 'hi/nichi', meaning: 'hari, matahari', onyomi: 'ニチ・ジツ', kunyomi: 'ひ・か', examples: [{ word: '日曜日', reading: 'にちようび', meaning: 'hari Minggu' }, { word: '毎日', reading: 'まいにち', meaning: 'setiap hari' }] },
    { char: '月', romaji: 'tsuki/gatsu', meaning: 'bulan', onyomi: 'ゲツ・ガツ', kunyomi: 'つき', examples: [{ word: '月曜日', reading: 'げつようび', meaning: 'hari Senin' }, { word: '今月', reading: 'こんげつ', meaning: 'bulan ini' }] },
    { char: '火', romaji: 'hi/ka', meaning: 'api', onyomi: 'カ', kunyomi: 'ひ', examples: [{ word: '火曜日', reading: 'かようび', meaning: 'hari Selasa' }, { word: '火事', reading: 'かじ', meaning: 'kebakaran' }] },
    { char: '水', romaji: 'mizu/sui', meaning: 'air', onyomi: 'スイ', kunyomi: 'みず', examples: [{ word: '水曜日', reading: 'すいようび', meaning: 'hari Rabu' }, { word: 'お水', reading: 'おみず', meaning: 'air' }] },
    { char: '木', romaji: 'ki/moku', meaning: 'pohon, kayu', onyomi: 'モク・ボク', kunyomi: 'き・こ', examples: [{ word: '木曜日', reading: 'もくようび', meaning: 'hari Kamis' }, { word: '木', reading: 'き', meaning: 'pohon' }] },
    { char: '金', romaji: 'kane/kin', meaning: 'emas, uang', onyomi: 'キン・コン', kunyomi: 'かね・かな', examples: [{ word: '金曜日', reading: 'きんようび', meaning: 'hari Jumat' }, { word: 'お金', reading: 'おかね', meaning: 'uang' }] },
    { char: '土', romaji: 'tsuchi/do', meaning: 'tanah', onyomi: 'ド・ト', kunyomi: 'つち', examples: [{ word: '土曜日', reading: 'どようび', meaning: 'hari Sabtu' }, { word: '土地', reading: 'とち', meaning: 'lahan/tanah' }] },
    { char: '年', romaji: 'toshi/nen', meaning: 'tahun', onyomi: 'ネン', kunyomi: 'とし', examples: [{ word: '今年', reading: 'ことし', meaning: 'tahun ini' }, { word: '来年', reading: 'らいねん', meaning: 'tahun depan' }] },
    { char: '時', romaji: 'toki/ji', meaning: 'waktu, jam', onyomi: 'ジ', kunyomi: 'とき', examples: [{ word: '時間', reading: 'じかん', meaning: 'waktu' }, { word: '時計', reading: 'とけい', meaning: 'jam' }] },
    { char: '分', romaji: 'fun/bun', meaning: 'menit, bagian', onyomi: 'ブン・フン', kunyomi: 'わ.かる', examples: [{ word: '十分', reading: 'じゅっぷん', meaning: 'sepuluh menit' }, { word: '分かる', reading: 'わかる', meaning: 'mengerti' }] },
    { char: '半', romaji: 'han', meaning: 'setengah', onyomi: 'ハン', kunyomi: 'なか.ば', examples: [{ word: '半分', reading: 'はんぶん', meaning: 'setengah' }, { word: '三時半', reading: 'さんじはん', meaning: 'jam 3 setengah' }] },
    { char: '毎', romaji: 'mai', meaning: 'setiap', onyomi: 'マイ', kunyomi: '—', examples: [{ word: '毎日', reading: 'まいにち', meaning: 'setiap hari' }, { word: '毎週', reading: 'まいしゅう', meaning: 'setiap minggu' }] },
    { char: '今', romaji: 'ima/kon', meaning: 'sekarang', onyomi: 'コン・キン', kunyomi: 'いま', examples: [{ word: '今日', reading: 'きょう', meaning: 'hari ini' }, { word: '今年', reading: 'ことし', meaning: 'tahun ini' }] },
    { char: '午', romaji: 'go', meaning: 'siang', onyomi: 'ゴ', kunyomi: '—', examples: [{ word: '午前', reading: 'ごぜん', meaning: 'pagi (AM)' }, { word: '午後', reading: 'ごご', meaning: 'sore (PM)' }] },
    { char: '前', romaji: 'mae/zen', meaning: 'depan, sebelum', onyomi: 'ゼン', kunyomi: 'まえ', examples: [{ word: '前', reading: 'まえ', meaning: 'depan' }, { word: '名前', reading: 'なまえ', meaning: 'nama' }] },
    { char: '後', romaji: 'ato/go', meaning: 'belakang, setelah', onyomi: 'ゴ・コウ', kunyomi: 'あと・うし.ろ', examples: [{ word: '午後', reading: 'ごご', meaning: 'sore (PM)' }, { word: '後ろ', reading: 'うしろ', meaning: 'belakang' }] },
    { char: '間', romaji: 'aida/kan', meaning: 'antara, jarak', onyomi: 'カン・ケン', kunyomi: 'あいだ・ま', examples: [{ word: '時間', reading: 'じかん', meaning: 'waktu' }, { word: '間', reading: 'あいだ', meaning: 'antara' }] },
    { char: '週', romaji: 'shuu', meaning: 'minggu', onyomi: 'シュウ', kunyomi: '—', examples: [{ word: '今週', reading: 'こんしゅう', meaning: 'minggu ini' }, { word: '毎週', reading: 'まいしゅう', meaning: 'setiap minggu' }] },
    { char: '先', romaji: 'saki/sen', meaning: 'sebelumnya, depan', onyomi: 'セン', kunyomi: 'さき', examples: [{ word: '先生', reading: 'せんせい', meaning: 'guru' }, { word: '先週', reading: 'せんしゅう', meaning: 'minggu lalu' }] },
  ],
};

const N5_NATURE: CharacterSection = {
  title: 'Alam & Cuaca',
  description: 'Alam, cuaca, dan lingkungan',
  columns: 4,
  entries: [
    { char: '天', romaji: 'ten', meaning: 'langit, surga', onyomi: 'テン', kunyomi: 'あめ・あま', examples: [{ word: '天気', reading: 'てんき', meaning: 'cuaca' }, { word: '天ぷら', reading: 'てんぷら', meaning: 'tempura' }] },
    { char: '気', romaji: 'ki', meaning: 'udara, semangat', onyomi: 'キ・ケ', kunyomi: '—', examples: [{ word: '天気', reading: 'てんき', meaning: 'cuaca' }, { word: '元気', reading: 'げんき', meaning: 'sehat/bersemangat' }] },
    { char: '雨', romaji: 'ame', meaning: 'hujan', onyomi: 'ウ', kunyomi: 'あめ・あま', examples: [{ word: '雨', reading: 'あめ', meaning: 'hujan' }, { word: '大雨', reading: 'おおあめ', meaning: 'hujan lebat' }] },
    { char: '電', romaji: 'den', meaning: 'listrik', onyomi: 'デン', kunyomi: '—', examples: [{ word: '電話', reading: 'でんわ', meaning: 'telepon' }, { word: '電車', reading: 'でんしゃ', meaning: 'kereta listrik' }] },
    { char: '花', romaji: 'hana', meaning: 'bunga', onyomi: 'カ', kunyomi: 'はな', examples: [{ word: '花', reading: 'はな', meaning: 'bunga' }, { word: '花見', reading: 'はなみ', meaning: 'melihat bunga sakura' }] },
    { char: '山', romaji: 'yama', meaning: 'gunung', onyomi: 'サン', kunyomi: 'やま', examples: [{ word: '山', reading: 'やま', meaning: 'gunung' }, { word: '富士山', reading: 'ふじさん', meaning: 'Gunung Fuji' }] },
    { char: '川', romaji: 'kawa', meaning: 'sungai', onyomi: 'セン', kunyomi: 'かわ', examples: [{ word: '川', reading: 'かわ', meaning: 'sungai' }, { word: '小川', reading: 'おがわ', meaning: 'sungai kecil' }] },
    { char: '空', romaji: 'sora', meaning: 'langit, kosong', onyomi: 'クウ', kunyomi: 'そら・あ.く', examples: [{ word: '空', reading: 'そら', meaning: 'langit' }, { word: '空港', reading: 'くうこう', meaning: 'bandara' }] },
  ],
};

const N5_PEOPLE: CharacterSection = {
  title: 'Orang & Tubuh',
  description: 'Manusia, keluarga, dan bagian tubuh',
  columns: 5,
  entries: [
    { char: '人', romaji: 'hito/jin', meaning: 'orang', onyomi: 'ジン・ニン', kunyomi: 'ひと', examples: [{ word: '日本人', reading: 'にほんじん', meaning: 'orang Jepang' }, { word: '一人', reading: 'ひとり', meaning: 'satu orang' }] },
    { char: '子', romaji: 'ko', meaning: 'anak', onyomi: 'シ・ス', kunyomi: 'こ', examples: [{ word: '子供', reading: 'こども', meaning: 'anak' }, { word: '女の子', reading: 'おんなのこ', meaning: 'anak perempuan' }] },
    { char: '女', romaji: 'onna', meaning: 'perempuan', onyomi: 'ジョ', kunyomi: 'おんな・め', examples: [{ word: '女の人', reading: 'おんなのひと', meaning: 'wanita' }, { word: '女子', reading: 'じょし', meaning: 'perempuan' }] },
    { char: '男', romaji: 'otoko', meaning: 'laki-laki', onyomi: 'ダン・ナン', kunyomi: 'おとこ', examples: [{ word: '男の人', reading: 'おとこのひと', meaning: 'pria' }, { word: '男子', reading: 'だんし', meaning: 'laki-laki' }] },
    { char: '父', romaji: 'chichi', meaning: 'ayah', onyomi: 'フ', kunyomi: 'ちち・とう', examples: [{ word: '父', reading: 'ちち', meaning: 'ayah (saya)' }, { word: 'お父さん', reading: 'おとうさん', meaning: 'ayah' }] },
    { char: '母', romaji: 'haha', meaning: 'ibu', onyomi: 'ボ', kunyomi: 'はは・かあ', examples: [{ word: '母', reading: 'はは', meaning: 'ibu (saya)' }, { word: 'お母さん', reading: 'おかあさん', meaning: 'ibu' }] },
    { char: '友', romaji: 'tomo', meaning: 'teman', onyomi: 'ユウ', kunyomi: 'とも', examples: [{ word: '友達', reading: 'ともだち', meaning: 'teman' }, { word: '友人', reading: 'ゆうじん', meaning: 'sahabat' }] },
    { char: '生', romaji: 'sei/i', meaning: 'hidup, lahir', onyomi: 'セイ・ショウ', kunyomi: 'い.きる・う.まれる', examples: [{ word: '先生', reading: 'せんせい', meaning: 'guru' }, { word: '学生', reading: 'がくせい', meaning: 'pelajar' }] },
    { char: '目', romaji: 'me', meaning: 'mata', onyomi: 'モク・ボク', kunyomi: 'め', examples: [{ word: '目', reading: 'め', meaning: 'mata' }, { word: '目的', reading: 'もくてき', meaning: 'tujuan' }] },
    { char: '耳', romaji: 'mimi', meaning: 'telinga', onyomi: 'ジ', kunyomi: 'みみ', examples: [{ word: '耳', reading: 'みみ', meaning: 'telinga' }, { word: '耳鼻科', reading: 'じびか', meaning: 'poli THT' }] },
    { char: '口', romaji: 'kuchi', meaning: 'mulut', onyomi: 'コウ・ク', kunyomi: 'くち', examples: [{ word: '口', reading: 'くち', meaning: 'mulut' }, { word: '入口', reading: 'いりぐち', meaning: 'pintu masuk' }] },
    { char: '手', romaji: 'te', meaning: 'tangan', onyomi: 'シュ', kunyomi: 'て', examples: [{ word: '手', reading: 'て', meaning: 'tangan' }, { word: '上手', reading: 'じょうず', meaning: 'pandai' }] },
    { char: '足', romaji: 'ashi', meaning: 'kaki', onyomi: 'ソク', kunyomi: 'あし・た.りる', examples: [{ word: '足', reading: 'あし', meaning: 'kaki' }, { word: '遠足', reading: 'えんそく', meaning: 'piknik' }] },
  ],
};

const N5_DIRECTIONS: CharacterSection = {
  title: 'Arah & Posisi',
  description: 'Arah mata angin dan posisi relatif',
  columns: 5,
  entries: [
    { char: '上', romaji: 'ue', meaning: 'atas', onyomi: 'ジョウ', kunyomi: 'うえ・あ.がる', examples: [{ word: '上', reading: 'うえ', meaning: 'atas' }, { word: '上手', reading: 'じょうず', meaning: 'pandai' }] },
    { char: '下', romaji: 'shita', meaning: 'bawah', onyomi: 'カ・ゲ', kunyomi: 'した・さ.がる', examples: [{ word: '下', reading: 'した', meaning: 'bawah' }, { word: '下手', reading: 'へた', meaning: 'tidak pandai' }] },
    { char: '中', romaji: 'naka', meaning: 'tengah, dalam', onyomi: 'チュウ', kunyomi: 'なか', examples: [{ word: '中', reading: 'なか', meaning: 'dalam' }, { word: '中国', reading: 'ちゅうごく', meaning: 'Tiongkok' }] },
    { char: '外', romaji: 'soto', meaning: 'luar', onyomi: 'ガイ・ゲ', kunyomi: 'そと・ほか', examples: [{ word: '外', reading: 'そと', meaning: 'luar' }, { word: '外国', reading: 'がいこく', meaning: 'luar negeri' }] },
    { char: '右', romaji: 'migi', meaning: 'kanan', onyomi: 'ウ・ユウ', kunyomi: 'みぎ', examples: [{ word: '右', reading: 'みぎ', meaning: 'kanan' }, { word: '右手', reading: 'みぎて', meaning: 'tangan kanan' }] },
    { char: '左', romaji: 'hidari', meaning: 'kiri', onyomi: 'サ', kunyomi: 'ひだり', examples: [{ word: '左', reading: 'ひだり', meaning: 'kiri' }, { word: '左手', reading: 'ひだりて', meaning: 'tangan kiri' }] },
    { char: '北', romaji: 'kita', meaning: 'utara', onyomi: 'ホク', kunyomi: 'きた', examples: [{ word: '北', reading: 'きた', meaning: 'utara' }, { word: '北海道', reading: 'ほっかいどう', meaning: 'Hokkaido' }] },
    { char: '南', romaji: 'minami', meaning: 'selatan', onyomi: 'ナン', kunyomi: 'みなみ', examples: [{ word: '南', reading: 'みなみ', meaning: 'selatan' }, { word: '南口', reading: 'みなみぐち', meaning: 'pintu selatan' }] },
    { char: '東', romaji: 'higashi', meaning: 'timur', onyomi: 'トウ', kunyomi: 'ひがし', examples: [{ word: '東', reading: 'ひがし', meaning: 'timur' }, { word: '東京', reading: 'とうきょう', meaning: 'Tokyo' }] },
    { char: '西', romaji: 'nishi', meaning: 'barat', onyomi: 'セイ・サイ', kunyomi: 'にし', examples: [{ word: '西', reading: 'にし', meaning: 'barat' }, { word: '西口', reading: 'にしぐち', meaning: 'pintu barat' }] },
  ],
};

const N5_PLACES: CharacterSection = {
  title: 'Tempat & Bangunan',
  description: 'Lokasi dan tempat umum',
  columns: 4,
  entries: [
    { char: '国', romaji: 'kuni/koku', meaning: 'negara', onyomi: 'コク', kunyomi: 'くに', examples: [{ word: '国', reading: 'くに', meaning: 'negara' }, { word: '外国', reading: 'がいこく', meaning: 'luar negeri' }] },
    { char: '学', romaji: 'gaku', meaning: 'belajar', onyomi: 'ガク', kunyomi: 'まな.ぶ', examples: [{ word: '学校', reading: 'がっこう', meaning: 'sekolah' }, { word: '学生', reading: 'がくせい', meaning: 'pelajar' }] },
    { char: '校', romaji: 'kou', meaning: 'sekolah', onyomi: 'コウ', kunyomi: '—', examples: [{ word: '学校', reading: 'がっこう', meaning: 'sekolah' }, { word: '高校', reading: 'こうこう', meaning: 'SMA' }] },
    { char: '店', romaji: 'mise/ten', meaning: 'toko', onyomi: 'テン', kunyomi: 'みせ', examples: [{ word: '店', reading: 'みせ', meaning: 'toko' }, { word: '喫茶店', reading: 'きっさてん', meaning: 'kafe' }] },
    { char: '会', romaji: 'kai', meaning: 'pertemuan', onyomi: 'カイ・エ', kunyomi: 'あ.う', examples: [{ word: '会社', reading: 'かいしゃ', meaning: 'perusahaan' }, { word: '会う', reading: 'あう', meaning: 'bertemu' }] },
    { char: '社', romaji: 'sha', meaning: 'perusahaan, kuil', onyomi: 'シャ', kunyomi: 'やしろ', examples: [{ word: '会社', reading: 'かいしゃ', meaning: 'perusahaan' }, { word: '神社', reading: 'じんじゃ', meaning: 'kuil Shinto' }] },
    { char: '駅', romaji: 'eki', meaning: 'stasiun', onyomi: 'エキ', kunyomi: '—', examples: [{ word: '駅', reading: 'えき', meaning: 'stasiun' }, { word: '東京駅', reading: 'とうきょうえき', meaning: 'Stasiun Tokyo' }] },
    { char: '道', romaji: 'michi/dou', meaning: 'jalan', onyomi: 'ドウ・トウ', kunyomi: 'みち', examples: [{ word: '道', reading: 'みち', meaning: 'jalan' }, { word: '北海道', reading: 'ほっかいどう', meaning: 'Hokkaido' }] },
  ],
};

const N5_SIZE: CharacterSection = {
  title: 'Ukuran & Jumlah',
  description: 'Kata sifat ukuran, harga, dan jumlah',
  columns: 5,
  entries: [
    { char: '大', romaji: 'ookii', meaning: 'besar', onyomi: 'ダイ・タイ', kunyomi: 'おお.きい', examples: [{ word: '大きい', reading: 'おおきい', meaning: 'besar' }, { word: '大学', reading: 'だいがく', meaning: 'universitas' }] },
    { char: '小', romaji: 'chiisai', meaning: 'kecil', onyomi: 'ショウ', kunyomi: 'ちい.さい', examples: [{ word: '小さい', reading: 'ちいさい', meaning: 'kecil' }, { word: '小学校', reading: 'しょうがっこう', meaning: 'SD' }] },
    { char: '多', romaji: 'ooi', meaning: 'banyak', onyomi: 'タ', kunyomi: 'おお.い', examples: [{ word: '多い', reading: 'おおい', meaning: 'banyak' }, { word: '多分', reading: 'たぶん', meaning: 'mungkin' }] },
    { char: '少', romaji: 'sukoshi', meaning: 'sedikit', onyomi: 'ショウ', kunyomi: 'すく.ない・すこ.し', examples: [{ word: '少ない', reading: 'すくない', meaning: 'sedikit (jumlah)' }, { word: '少し', reading: 'すこし', meaning: 'sedikit' }] },
    { char: '高', romaji: 'takai', meaning: 'tinggi, mahal', onyomi: 'コウ', kunyomi: 'たか.い', examples: [{ word: '高い', reading: 'たかい', meaning: 'tinggi/mahal' }, { word: '高校', reading: 'こうこう', meaning: 'SMA' }] },
    { char: '安', romaji: 'yasui', meaning: 'murah, aman', onyomi: 'アン', kunyomi: 'やす.い', examples: [{ word: '安い', reading: 'やすい', meaning: 'murah' }, { word: '安心', reading: 'あんしん', meaning: 'tenang/aman' }] },
    { char: '長', romaji: 'nagai', meaning: 'panjang', onyomi: 'チョウ', kunyomi: 'なが.い', examples: [{ word: '長い', reading: 'ながい', meaning: 'panjang' }, { word: '校長', reading: 'こうちょう', meaning: 'kepala sekolah' }] },
    { char: '新', romaji: 'atarashii', meaning: 'baru', onyomi: 'シン', kunyomi: 'あたら.しい', examples: [{ word: '新しい', reading: 'あたらしい', meaning: 'baru' }, { word: '新聞', reading: 'しんぶん', meaning: 'koran' }] },
    { char: '古', romaji: 'furui', meaning: 'lama, tua', onyomi: 'コ', kunyomi: 'ふる.い', examples: [{ word: '古い', reading: 'ふるい', meaning: 'lama/tua' }, { word: '中古', reading: 'ちゅうこ', meaning: 'bekas' }] },
  ],
};

const N5_VERBS: CharacterSection = {
  title: 'Kata Kerja Dasar',
  description: 'Kegiatan dan tindakan sehari-hari',
  columns: 5,
  entries: [
    { char: '見', romaji: 'miru', meaning: 'melihat', onyomi: 'ケン', kunyomi: 'み.る', examples: [{ word: '見る', reading: 'みる', meaning: 'melihat' }, { word: '花見', reading: 'はなみ', meaning: 'melihat bunga sakura' }] },
    { char: '聞', romaji: 'kiku', meaning: 'mendengar, bertanya', onyomi: 'ブン・モン', kunyomi: 'き.く', examples: [{ word: '聞く', reading: 'きく', meaning: 'mendengar/bertanya' }, { word: '新聞', reading: 'しんぶん', meaning: 'koran' }] },
    { char: '読', romaji: 'yomu', meaning: 'membaca', onyomi: 'ドク・トク', kunyomi: 'よ.む', examples: [{ word: '読む', reading: 'よむ', meaning: 'membaca' }, { word: '読書', reading: 'どくしょ', meaning: 'membaca buku' }] },
    { char: '書', romaji: 'kaku', meaning: 'menulis', onyomi: 'ショ', kunyomi: 'か.く', examples: [{ word: '書く', reading: 'かく', meaning: 'menulis' }, { word: '辞書', reading: 'じしょ', meaning: 'kamus' }] },
    { char: '話', romaji: 'hanasu', meaning: 'berbicara', onyomi: 'ワ', kunyomi: 'はな.す', examples: [{ word: '話す', reading: 'はなす', meaning: 'berbicara' }, { word: '電話', reading: 'でんわ', meaning: 'telepon' }] },
    { char: '言', romaji: 'iu', meaning: 'berkata', onyomi: 'ゲン・ゴン', kunyomi: 'い.う・こと', examples: [{ word: '言う', reading: 'いう', meaning: 'berkata' }, { word: '言葉', reading: 'ことば', meaning: 'kata/bahasa' }] },
    { char: '食', romaji: 'taberu', meaning: 'makan', onyomi: 'ショク', kunyomi: 'た.べる', examples: [{ word: '食べる', reading: 'たべる', meaning: 'makan' }, { word: '食堂', reading: 'しょくどう', meaning: 'kantin' }] },
    { char: '飲', romaji: 'nomu', meaning: 'minum', onyomi: 'イン', kunyomi: 'の.む', examples: [{ word: '飲む', reading: 'のむ', meaning: 'minum' }, { word: '飲み物', reading: 'のみもの', meaning: 'minuman' }] },
    { char: '買', romaji: 'kau', meaning: 'membeli', onyomi: 'バイ', kunyomi: 'か.う', examples: [{ word: '買う', reading: 'かう', meaning: 'membeli' }, { word: '買い物', reading: 'かいもの', meaning: 'belanja' }] },
    { char: '入', romaji: 'hairu', meaning: 'masuk', onyomi: 'ニュウ', kunyomi: 'い.る・はい.る', examples: [{ word: '入る', reading: 'はいる', meaning: 'masuk' }, { word: '入口', reading: 'いりぐち', meaning: 'pintu masuk' }] },
    { char: '出', romaji: 'deru', meaning: 'keluar', onyomi: 'シュツ', kunyomi: 'で.る・だ.す', examples: [{ word: '出る', reading: 'でる', meaning: 'keluar' }, { word: '出口', reading: 'でぐち', meaning: 'pintu keluar' }] },
    { char: '行', romaji: 'iku', meaning: 'pergi', onyomi: 'コウ・ギョウ', kunyomi: 'い.く', examples: [{ word: '行く', reading: 'いく', meaning: 'pergi' }, { word: '旅行', reading: 'りょこう', meaning: 'perjalanan' }] },
    { char: '来', romaji: 'kuru', meaning: 'datang', onyomi: 'ライ', kunyomi: 'く.る', examples: [{ word: '来る', reading: 'くる', meaning: 'datang' }, { word: '来年', reading: 'らいねん', meaning: 'tahun depan' }] },
    { char: '休', romaji: 'yasumu', meaning: 'istirahat', onyomi: 'キュウ', kunyomi: 'やす.む', examples: [{ word: '休む', reading: 'やすむ', meaning: 'istirahat' }, { word: '休み', reading: 'やすみ', meaning: 'libur' }] },
    { char: '立', romaji: 'tatsu', meaning: 'berdiri', onyomi: 'リツ', kunyomi: 'た.つ', examples: [{ word: '立つ', reading: 'たつ', meaning: 'berdiri' }, { word: '立派', reading: 'りっぱ', meaning: 'megah/hebat' }] },
  ],
};

const N5_MISC: CharacterSection = {
  title: 'Lainnya',
  description: 'Kanji penting lainnya di tingkat N5',
  columns: 5,
  entries: [
    { char: '白', romaji: 'shiro', meaning: 'putih', onyomi: 'ハク・ビャク', kunyomi: 'しろ・しろ.い', examples: [{ word: '白い', reading: 'しろい', meaning: 'putih' }, { word: '白人', reading: 'はくじん', meaning: 'orang berkulit putih' }] },
    { char: '何', romaji: 'nani/nan', meaning: 'apa', onyomi: 'カ', kunyomi: 'なに・なん', examples: [{ word: '何', reading: 'なに', meaning: 'apa' }, { word: '何人', reading: 'なんにん', meaning: 'berapa orang' }] },
    { char: '語', romaji: 'go', meaning: 'bahasa', onyomi: 'ゴ', kunyomi: 'かた.る', examples: [{ word: '日本語', reading: 'にほんご', meaning: 'bahasa Jepang' }, { word: '英語', reading: 'えいご', meaning: 'bahasa Inggris' }] },
    { char: '名', romaji: 'na/mei', meaning: 'nama', onyomi: 'メイ・ミョウ', kunyomi: 'な', examples: [{ word: '名前', reading: 'なまえ', meaning: 'nama' }, { word: '名人', reading: 'めいじん', meaning: 'ahli' }] },
    { char: '車', romaji: 'kuruma', meaning: 'mobil, kendaraan', onyomi: 'シャ', kunyomi: 'くるま', examples: [{ word: '車', reading: 'くるま', meaning: 'mobil' }, { word: '電車', reading: 'でんしゃ', meaning: 'kereta api' }] },
    { char: '本', romaji: 'hon', meaning: 'buku, asal', onyomi: 'ホン', kunyomi: 'もと', examples: [{ word: '本', reading: 'ほん', meaning: 'buku' }, { word: '日本', reading: 'にほん', meaning: 'Jepang' }] },
    { char: '円', romaji: 'en', meaning: 'yen, bulat', onyomi: 'エン', kunyomi: 'まる.い', examples: [{ word: '百円', reading: 'ひゃくえん', meaning: '100 yen' }, { word: '円い', reading: 'まるい', meaning: 'bulat' }] },
    { char: '魚', romaji: 'sakana', meaning: 'ikan', onyomi: 'ギョ', kunyomi: 'うお・さかな', examples: [{ word: '魚', reading: 'さかな', meaning: 'ikan' }, { word: '金魚', reading: 'きんぎょ', meaning: 'ikan mas koki' }] },
  ],
};

export const KANJI_SECTIONS: CharacterSection[] = [
  N5_NUMBERS,
  N5_TIME,
  N5_NATURE,
  N5_PEOPLE,
  N5_DIRECTIONS,
  N5_PLACES,
  N5_SIZE,
  N5_VERBS,
  N5_MISC,
  ...KANJI_N4_SECTIONS,
];
