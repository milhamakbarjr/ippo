import type { CharacterSection } from '@/types/letters';

// JLPT N4 Kanji — ~160 kanji (excludes N5 kanji already defined in kanji.ts)

export const N4_PEOPLE: CharacterSection = {
  title: 'N4: Orang & Keluarga',
  description: 'Anggota keluarga dan hubungan',
  columns: 4,
  entries: [
    { char: '兄', romaji: 'ani', meaning: 'kakak laki-laki', onyomi: 'ケイ・キョウ', kunyomi: 'あに', examples: [{ word: 'お兄さん', reading: 'おにいさん', meaning: 'kakak laki-laki (sopan)' }] },
    { char: '姉', romaji: 'ane', meaning: 'kakak perempuan', onyomi: 'シ', kunyomi: 'あね', examples: [{ word: 'お姉さん', reading: 'おねえさん', meaning: 'kakak perempuan (sopan)' }] },
    { char: '弟', romaji: 'otouto', meaning: 'adik laki-laki', onyomi: 'テイ・ダイ', kunyomi: 'おとうと', examples: [{ word: '兄弟', reading: 'きょうだい', meaning: 'saudara laki-laki' }] },
    { char: '妹', romaji: 'imouto', meaning: 'adik perempuan', onyomi: 'マイ', kunyomi: 'いもうと', examples: [{ word: '姉妹', reading: 'しまい', meaning: 'saudara perempuan' }] },
    { char: '夫', romaji: 'otto', meaning: 'suami', onyomi: 'フウ・フ', kunyomi: 'おっと', examples: [{ word: '夫婦', reading: 'ふうふ', meaning: 'pasangan suami istri' }] },
    { char: '妻', romaji: 'tsuma', meaning: 'istri', onyomi: 'サイ', kunyomi: 'つま', examples: [{ word: '妻子', reading: 'さいし', meaning: 'istri dan anak' }] },
    { char: '親', romaji: 'oya', meaning: 'orang tua', onyomi: 'シン', kunyomi: 'おや', examples: [{ word: '親切', reading: 'しんせつ', meaning: 'ramah/baik hati' }] },
    { char: '族', romaji: 'zoku', meaning: 'keluarga, suku', onyomi: 'ゾク', kunyomi: '—', examples: [{ word: '家族', reading: 'かぞく', meaning: 'keluarga' }] },
    { char: '彼', romaji: 'kare', meaning: 'dia (laki-laki)', onyomi: 'ヒ', kunyomi: 'かれ', examples: [{ word: '彼女', reading: 'かのじょ', meaning: 'dia (perempuan)/pacar' }] },
    { char: '自', romaji: 'ji', meaning: 'diri sendiri', onyomi: 'ジ・シ', kunyomi: 'みずか.ら', examples: [{ word: '自分', reading: 'じぶん', meaning: 'diri sendiri' }] },
    { char: '主', romaji: 'shu', meaning: 'tuan, utama', onyomi: 'シュ', kunyomi: 'ぬし・おも', examples: [{ word: '主人', reading: 'しゅじん', meaning: 'suami/tuan rumah' }] },
  ],
};

export const N4_BODY: CharacterSection = {
  title: 'N4: Tubuh & Kesehatan',
  description: 'Bagian tubuh dan istilah kesehatan',
  columns: 4,
  entries: [
    { char: '体', romaji: 'karada', meaning: 'tubuh', onyomi: 'タイ', kunyomi: 'からだ', examples: [{ word: '体育', reading: 'たいいく', meaning: 'pendidikan jasmani' }] },
    { char: '頭', romaji: 'atama', meaning: 'kepala', onyomi: 'トウ・ズ', kunyomi: 'あたま', examples: [{ word: '頭痛', reading: 'ずつう', meaning: 'sakit kepala' }] },
    { char: '顔', romaji: 'kao', meaning: 'wajah', onyomi: 'ガン', kunyomi: 'かお', examples: [{ word: '笑顔', reading: 'えがお', meaning: 'wajah tersenyum' }] },
    { char: '声', romaji: 'koe', meaning: 'suara', onyomi: 'セイ', kunyomi: 'こえ', examples: [{ word: '大声', reading: 'おおごえ', meaning: 'suara keras' }] },
    { char: '心', romaji: 'kokoro', meaning: 'hati, pikiran', onyomi: 'シン', kunyomi: 'こころ', examples: [{ word: '安心', reading: 'あんしん', meaning: 'tenang/lega' }] },
    { char: '首', romaji: 'kubi', meaning: 'leher', onyomi: 'シュ', kunyomi: 'くび', examples: [{ word: '首都', reading: 'しゅと', meaning: 'ibu kota' }] },
    { char: '歯', romaji: 'ha', meaning: 'gigi', onyomi: 'シ', kunyomi: 'は', examples: [{ word: '歯医者', reading: 'はいしゃ', meaning: 'dokter gigi' }] },
    { char: '病', romaji: 'byou', meaning: 'penyakit', onyomi: 'ビョウ', kunyomi: 'や.む', examples: [{ word: '病気', reading: 'びょうき', meaning: 'sakit' }] },
    { char: '薬', romaji: 'kusuri', meaning: 'obat', onyomi: 'ヤク', kunyomi: 'くすり', examples: [{ word: '薬局', reading: 'やっきょく', meaning: 'apotek' }] },
    { char: '医', romaji: 'i', meaning: 'kedokteran', onyomi: 'イ', kunyomi: '—', examples: [{ word: '医者', reading: 'いしゃ', meaning: 'dokter' }] },
    { char: '死', romaji: 'shi', meaning: 'kematian', onyomi: 'シ', kunyomi: 'し.ぬ', examples: [{ word: '死亡', reading: 'しぼう', meaning: 'meninggal dunia' }] },
  ],
};

export const N4_EDUCATION: CharacterSection = {
  title: 'N4: Sekolah & Pendidikan',
  description: 'Belajar, ujian, dan pendidikan',
  columns: 5,
  entries: [
    { char: '教', romaji: 'oshieru', meaning: 'mengajar', onyomi: 'キョウ', kunyomi: 'おし.える', examples: [{ word: '教室', reading: 'きょうしつ', meaning: 'ruang kelas' }] },
    { char: '習', romaji: 'narau', meaning: 'belajar', onyomi: 'シュウ', kunyomi: 'なら.う', examples: [{ word: '練習', reading: 'れんしゅう', meaning: 'latihan' }] },
    { char: '研', romaji: 'ken', meaning: 'penelitian', onyomi: 'ケン', kunyomi: 'と.ぐ', examples: [{ word: '研究', reading: 'けんきゅう', meaning: 'penelitian' }] },
    { char: '究', romaji: 'kyuu', meaning: 'menyelidiki', onyomi: 'キュウ', kunyomi: 'きわ.める', examples: [{ word: '研究所', reading: 'けんきゅうしょ', meaning: 'lembaga penelitian' }] },
    { char: '質', romaji: 'shitsu', meaning: 'kualitas', onyomi: 'シツ', kunyomi: '—', examples: [{ word: '質問', reading: 'しつもん', meaning: 'pertanyaan' }] },
    { char: '問', romaji: 'mon', meaning: 'pertanyaan', onyomi: 'モン', kunyomi: 'と.う', examples: [{ word: '問題', reading: 'もんだい', meaning: 'masalah/soal' }] },
    { char: '題', romaji: 'dai', meaning: 'judul, topik', onyomi: 'ダイ', kunyomi: '—', examples: [{ word: '宿題', reading: 'しゅくだい', meaning: 'PR (pekerjaan rumah)' }] },
    { char: '答', romaji: 'kotaeru', meaning: 'jawaban', onyomi: 'トウ', kunyomi: 'こた.える', examples: [{ word: '答え', reading: 'こたえ', meaning: 'jawaban' }] },
    { char: '文', romaji: 'bun', meaning: 'kalimat, tulisan', onyomi: 'ブン・モン', kunyomi: 'ふみ', examples: [{ word: '文化', reading: 'ぶんか', meaning: 'budaya' }] },
    { char: '字', romaji: 'ji', meaning: 'huruf', onyomi: 'ジ', kunyomi: 'あざ', examples: [{ word: '漢字', reading: 'かんじ', meaning: 'huruf kanji' }] },
    { char: '考', romaji: 'kangaeru', meaning: 'berpikir', onyomi: 'コウ', kunyomi: 'かんが.える', examples: [{ word: '参考', reading: 'さんこう', meaning: 'referensi' }] },
    { char: '試', romaji: 'shi', meaning: 'mencoba, ujian', onyomi: 'シ', kunyomi: 'こころ.みる', examples: [{ word: '試験', reading: 'しけん', meaning: 'ujian' }] },
    { char: '験', romaji: 'ken', meaning: 'pengalaman', onyomi: 'ケン', kunyomi: '—', examples: [{ word: '経験', reading: 'けいけん', meaning: 'pengalaman' }] },
    { char: '知', romaji: 'shiru', meaning: 'mengetahui', onyomi: 'チ', kunyomi: 'し.る', examples: [{ word: '知識', reading: 'ちしき', meaning: 'pengetahuan' }] },
  ],
};

export const N4_WORK: CharacterSection = {
  title: 'N4: Pekerjaan & Bisnis',
  description: 'Pekerjaan, perdagangan, dan industri',
  columns: 4,
  entries: [
    { char: '仕', romaji: 'shi', meaning: 'melayani', onyomi: 'シ', kunyomi: 'つか.える', examples: [{ word: '仕事', reading: 'しごと', meaning: 'pekerjaan' }] },
    { char: '事', romaji: 'koto', meaning: 'hal, urusan', onyomi: 'ジ', kunyomi: 'こと', examples: [{ word: '食事', reading: 'しょくじ', meaning: 'makan' }] },
    { char: '働', romaji: 'hataraku', meaning: 'bekerja', onyomi: 'ドウ', kunyomi: 'はたら.く', examples: [{ word: '働く', reading: 'はたらく', meaning: 'bekerja' }] },
    { char: '業', romaji: 'gyou', meaning: 'bisnis, industri', onyomi: 'ギョウ・ゴウ', kunyomi: 'わざ', examples: [{ word: '授業', reading: 'じゅぎょう', meaning: 'pelajaran' }] },
    { char: '産', romaji: 'san', meaning: 'produksi', onyomi: 'サン', kunyomi: 'う.む', examples: [{ word: '産業', reading: 'さんぎょう', meaning: 'industri' }] },
    { char: '品', romaji: 'hin', meaning: 'barang, produk', onyomi: 'ヒン', kunyomi: 'しな', examples: [{ word: '食品', reading: 'しょくひん', meaning: 'bahan makanan' }] },
    { char: '売', romaji: 'uru', meaning: 'menjual', onyomi: 'バイ', kunyomi: 'う.る', examples: [{ word: '売り場', reading: 'うりば', meaning: 'tempat penjualan' }] },
    { char: '送', romaji: 'okuru', meaning: 'mengirim', onyomi: 'ソウ', kunyomi: 'おく.る', examples: [{ word: '送料', reading: 'そうりょう', meaning: 'ongkos kirim' }] },
    { char: '届', romaji: 'todokeru', meaning: 'mengantarkan', onyomi: '—', kunyomi: 'とど.ける', examples: [{ word: '届く', reading: 'とどく', meaning: 'sampai' }] },
    { char: '払', romaji: 'harau', meaning: 'membayar', onyomi: 'フツ', kunyomi: 'はら.う', examples: [{ word: '支払い', reading: 'しはらい', meaning: 'pembayaran' }] },
    { char: '特', romaji: 'toku', meaning: 'khusus', onyomi: 'トク', kunyomi: '—', examples: [{ word: '特別', reading: 'とくべつ', meaning: 'khusus/istimewa' }] },
  ],
};

export const N4_PLACES: CharacterSection = {
  title: 'N4: Kota & Bangunan',
  description: 'Kota, tempat, dan bangunan',
  columns: 5,
  entries: [
    { char: '都', romaji: 'to', meaning: 'kota besar', onyomi: 'ト', kunyomi: 'みやこ', examples: [{ word: '都会', reading: 'とかい', meaning: 'kota besar' }] },
    { char: '市', romaji: 'shi', meaning: 'kota, pasar', onyomi: 'シ', kunyomi: 'いち', examples: [{ word: '市場', reading: 'いちば', meaning: 'pasar' }] },
    { char: '町', romaji: 'machi', meaning: 'kota kecil', onyomi: 'チョウ', kunyomi: 'まち', examples: [{ word: '町中', reading: 'まちなか', meaning: 'pusat kota' }] },
    { char: '村', romaji: 'mura', meaning: 'desa', onyomi: 'ソン', kunyomi: 'むら', examples: [{ word: '村人', reading: 'むらびと', meaning: 'penduduk desa' }] },
    { char: '区', romaji: 'ku', meaning: 'distrik', onyomi: 'ク', kunyomi: '—', examples: [{ word: '地区', reading: 'ちく', meaning: 'wilayah' }] },
    { char: '地', romaji: 'chi', meaning: 'tanah, tempat', onyomi: 'チ・ジ', kunyomi: '—', examples: [{ word: '地図', reading: 'ちず', meaning: 'peta' }] },
    { char: '場', romaji: 'ba', meaning: 'tempat', onyomi: 'ジョウ', kunyomi: 'ば', examples: [{ word: '駐車場', reading: 'ちゅうしゃじょう', meaning: 'tempat parkir' }] },
    { char: '堂', romaji: 'dou', meaning: 'aula', onyomi: 'ドウ', kunyomi: '—', examples: [{ word: '食堂', reading: 'しょくどう', meaning: 'kantin' }] },
    { char: '屋', romaji: 'ya', meaning: 'toko, atap', onyomi: 'オク', kunyomi: 'や', examples: [{ word: '本屋', reading: 'ほんや', meaning: 'toko buku' }] },
    { char: '館', romaji: 'kan', meaning: 'gedung', onyomi: 'カン', kunyomi: '—', examples: [{ word: '図書館', reading: 'としょかん', meaning: 'perpustakaan' }] },
    { char: '院', romaji: 'in', meaning: 'lembaga', onyomi: 'イン', kunyomi: '—', examples: [{ word: '病院', reading: 'びょういん', meaning: 'rumah sakit' }] },
    { char: '所', romaji: 'tokoro', meaning: 'tempat', onyomi: 'ショ', kunyomi: 'ところ', examples: [{ word: '台所', reading: 'だいどころ', meaning: 'dapur' }] },
    { char: '室', romaji: 'shitsu', meaning: 'ruangan', onyomi: 'シツ', kunyomi: 'むろ', examples: [{ word: '教室', reading: 'きょうしつ', meaning: 'ruang kelas' }] },
    { char: '広', romaji: 'hiroi', meaning: 'luas', onyomi: 'コウ', kunyomi: 'ひろ.い', examples: [{ word: '広場', reading: 'ひろば', meaning: 'lapangan' }] },
    { char: '門', romaji: 'mon', meaning: 'gerbang', onyomi: 'モン', kunyomi: 'かど', examples: [{ word: '専門', reading: 'せんもん', meaning: 'spesialisasi' }] },
  ],
};

export const N4_TRANSPORT: CharacterSection = {
  title: 'N4: Transportasi & Gerakan',
  description: 'Bergerak, berjalan, dan transportasi',
  columns: 4,
  entries: [
    { char: '走', romaji: 'hashiru', meaning: 'berlari', onyomi: 'ソウ', kunyomi: 'はし.る', examples: [{ word: '走る', reading: 'はしる', meaning: 'berlari' }] },
    { char: '歩', romaji: 'aruku', meaning: 'berjalan kaki', onyomi: 'ホ', kunyomi: 'ある.く', examples: [{ word: '散歩', reading: 'さんぽ', meaning: 'jalan-jalan' }] },
    { char: '乗', romaji: 'noru', meaning: 'naik (kendaraan)', onyomi: 'ジョウ', kunyomi: 'の.る', examples: [{ word: '乗客', reading: 'じょうきゃく', meaning: 'penumpang' }] },
    { char: '通', romaji: 'tooru', meaning: 'melewati', onyomi: 'ツウ', kunyomi: 'とお.る', examples: [{ word: '交通', reading: 'こうつう', meaning: 'lalu lintas' }] },
    { char: '運', romaji: 'hakobu', meaning: 'membawa', onyomi: 'ウン', kunyomi: 'はこ.ぶ', examples: [{ word: '運動', reading: 'うんどう', meaning: 'olahraga' }] },
    { char: '転', romaji: 'ten', meaning: 'berputar', onyomi: 'テン', kunyomi: 'ころ.がる', examples: [{ word: '自転車', reading: 'じてんしゃ', meaning: 'sepeda' }] },
    { char: '動', romaji: 'ugoku', meaning: 'bergerak', onyomi: 'ドウ', kunyomi: 'うご.く', examples: [{ word: '動物', reading: 'どうぶつ', meaning: 'binatang' }] },
    { char: '止', romaji: 'tomaru', meaning: 'berhenti', onyomi: 'シ', kunyomi: 'と.まる', examples: [{ word: '中止', reading: 'ちゅうし', meaning: 'pembatalan' }] },
    { char: '進', romaji: 'susumu', meaning: 'maju', onyomi: 'シン', kunyomi: 'すす.む', examples: [{ word: '進学', reading: 'しんがく', meaning: 'melanjutkan sekolah' }] },
    { char: '引', romaji: 'hiku', meaning: 'menarik', onyomi: 'イン', kunyomi: 'ひ.く', examples: [{ word: '引っ越し', reading: 'ひっこし', meaning: 'pindah rumah' }] },
    { char: '押', romaji: 'osu', meaning: 'mendorong', onyomi: 'オウ', kunyomi: 'お.す', examples: [{ word: '押す', reading: 'おす', meaning: 'menekan/mendorong' }] },
    { char: '急', romaji: 'isogu', meaning: 'terburu-buru', onyomi: 'キュウ', kunyomi: 'いそ.ぐ', examples: [{ word: '急行', reading: 'きゅうこう', meaning: 'kereta ekspres' }] },
  ],
};

export const N4_NATURE: CharacterSection = {
  title: 'N4: Alam & Musim',
  description: 'Musim, alam, dan hewan',
  columns: 5,
  entries: [
    { char: '風', romaji: 'kaze', meaning: 'angin', onyomi: 'フウ', kunyomi: 'かぜ', examples: [{ word: '台風', reading: 'たいふう', meaning: 'topan' }] },
    { char: '雪', romaji: 'yuki', meaning: 'salju', onyomi: 'セツ', kunyomi: 'ゆき', examples: [{ word: '大雪', reading: 'おおゆき', meaning: 'salju lebat' }] },
    { char: '春', romaji: 'haru', meaning: 'musim semi', onyomi: 'シュン', kunyomi: 'はる', examples: [{ word: '春休み', reading: 'はるやすみ', meaning: 'liburan musim semi' }] },
    { char: '夏', romaji: 'natsu', meaning: 'musim panas', onyomi: 'カ', kunyomi: 'なつ', examples: [{ word: '夏休み', reading: 'なつやすみ', meaning: 'liburan musim panas' }] },
    { char: '秋', romaji: 'aki', meaning: 'musim gugur', onyomi: 'シュウ', kunyomi: 'あき', examples: [{ word: '秋風', reading: 'あきかぜ', meaning: 'angin musim gugur' }] },
    { char: '冬', romaji: 'fuyu', meaning: 'musim dingin', onyomi: 'トウ', kunyomi: 'ふゆ', examples: [{ word: '冬休み', reading: 'ふゆやすみ', meaning: 'liburan musim dingin' }] },
    { char: '海', romaji: 'umi', meaning: 'laut', onyomi: 'カイ', kunyomi: 'うみ', examples: [{ word: '海外', reading: 'かいがい', meaning: 'luar negeri' }] },
    { char: '池', romaji: 'ike', meaning: 'kolam', onyomi: 'チ', kunyomi: 'いけ', examples: [{ word: '電池', reading: 'でんち', meaning: 'baterai' }] },
    { char: '林', romaji: 'hayashi', meaning: 'hutan kecil', onyomi: 'リン', kunyomi: 'はやし', examples: [{ word: '林業', reading: 'りんぎょう', meaning: 'kehutanan' }] },
    { char: '森', romaji: 'mori', meaning: 'hutan lebat', onyomi: 'シン', kunyomi: 'もり', examples: [{ word: '森林', reading: 'しんりん', meaning: 'hutan belantara' }] },
    { char: '野', romaji: 'no', meaning: 'ladang, padang', onyomi: 'ヤ', kunyomi: 'の', examples: [{ word: '野菜', reading: 'やさい', meaning: 'sayuran' }] },
    { char: '光', romaji: 'hikari', meaning: 'cahaya', onyomi: 'コウ', kunyomi: 'ひかり', examples: [{ word: '日光', reading: 'にっこう', meaning: 'sinar matahari' }] },
    { char: '鳥', romaji: 'tori', meaning: 'burung', onyomi: 'チョウ', kunyomi: 'とり', examples: [{ word: '焼き鳥', reading: 'やきとり', meaning: 'sate ayam Jepang' }] },
    { char: '犬', romaji: 'inu', meaning: 'anjing', onyomi: 'ケン', kunyomi: 'いぬ', examples: [{ word: '子犬', reading: 'こいぬ', meaning: 'anak anjing' }] },
  ],
};

export const N4_FOOD: CharacterSection = {
  title: 'N4: Makanan & Minuman',
  description: 'Bahan makanan, masakan, dan rasa',
  columns: 4,
  entries: [
    { char: '料', romaji: 'ryou', meaning: 'biaya, bahan', onyomi: 'リョウ', kunyomi: '—', examples: [{ word: '料理', reading: 'りょうり', meaning: 'masakan' }] },
    { char: '理', romaji: 'ri', meaning: 'alasan, logika', onyomi: 'リ', kunyomi: '—', examples: [{ word: '料理', reading: 'りょうり', meaning: 'masakan' }] },
    { char: '肉', romaji: 'niku', meaning: 'daging', onyomi: 'ニク', kunyomi: '—', examples: [{ word: '牛肉', reading: 'ぎゅうにく', meaning: 'daging sapi' }] },
    { char: '茶', romaji: 'cha', meaning: 'teh', onyomi: 'チャ・サ', kunyomi: '—', examples: [{ word: 'お茶', reading: 'おちゃ', meaning: 'teh' }] },
    { char: '飯', romaji: 'meshi', meaning: 'nasi', onyomi: 'ハン', kunyomi: 'めし', examples: [{ word: 'ご飯', reading: 'ごはん', meaning: 'nasi/makan' }] },
    { char: '菜', romaji: 'sai', meaning: 'sayuran', onyomi: 'サイ', kunyomi: 'な', examples: [{ word: '野菜', reading: 'やさい', meaning: 'sayuran' }] },
    { char: '酒', romaji: 'sake', meaning: 'alkohol', onyomi: 'シュ', kunyomi: 'さけ', examples: [{ word: '居酒屋', reading: 'いざかや', meaning: 'kedai sake' }] },
    { char: '味', romaji: 'aji', meaning: 'rasa', onyomi: 'ミ', kunyomi: 'あじ', examples: [{ word: '意味', reading: 'いみ', meaning: 'arti/makna' }] },
  ],
};

export const N4_TIME: CharacterSection = {
  title: 'N4: Waktu & Frekuensi',
  description: 'Pagi, siang, malam, dan frekuensi',
  columns: 4,
  entries: [
    { char: '朝', romaji: 'asa', meaning: 'pagi', onyomi: 'チョウ', kunyomi: 'あさ', examples: [{ word: '朝食', reading: 'ちょうしょく', meaning: 'sarapan' }] },
    { char: '昼', romaji: 'hiru', meaning: 'siang', onyomi: 'チュウ', kunyomi: 'ひる', examples: [{ word: '昼食', reading: 'ちゅうしょく', meaning: 'makan siang' }] },
    { char: '夜', romaji: 'yoru', meaning: 'malam', onyomi: 'ヤ', kunyomi: 'よる', examples: [{ word: '夜中', reading: 'よなか', meaning: 'tengah malam' }] },
    { char: '早', romaji: 'hayai', meaning: 'cepat, awal', onyomi: 'ソウ・サッ', kunyomi: 'はや.い', examples: [{ word: '早朝', reading: 'そうちょう', meaning: 'pagi buta' }] },
    { char: '遅', romaji: 'osoi', meaning: 'lambat', onyomi: 'チ', kunyomi: 'おそ.い', examples: [{ word: '遅刻', reading: 'ちこく', meaning: 'terlambat' }] },
    { char: '度', romaji: 'do', meaning: 'derajat, kali', onyomi: 'ド', kunyomi: 'たび', examples: [{ word: '温度', reading: 'おんど', meaning: 'suhu' }] },
    { char: '回', romaji: 'kai', meaning: 'kali (hitungan)', onyomi: 'カイ', kunyomi: 'まわ.る', examples: [{ word: '一回', reading: 'いっかい', meaning: 'satu kali' }] },
    { char: '以', romaji: 'i', meaning: 'dengan, dari', onyomi: 'イ', kunyomi: '—', examples: [{ word: '以上', reading: 'いじょう', meaning: 'lebih dari' }] },
  ],
};

export const N4_VERBS: CharacterSection = {
  title: 'N4: Kata Kerja',
  description: 'Tindakan dan kegiatan sehari-hari',
  columns: 5,
  entries: [
    { char: '使', romaji: 'tsukau', meaning: 'menggunakan', onyomi: 'シ', kunyomi: 'つか.う', examples: [{ word: '大使', reading: 'たいし', meaning: 'duta besar' }] },
    { char: '持', romaji: 'motsu', meaning: 'memegang', onyomi: 'ジ', kunyomi: 'も.つ', examples: [{ word: '気持ち', reading: 'きもち', meaning: 'perasaan' }] },
    { char: '待', romaji: 'matsu', meaning: 'menunggu', onyomi: 'タイ', kunyomi: 'ま.つ', examples: [{ word: '待合室', reading: 'まちあいしつ', meaning: 'ruang tunggu' }] },
    { char: '座', romaji: 'suwaru', meaning: 'duduk', onyomi: 'ザ', kunyomi: 'すわ.る', examples: [{ word: '座席', reading: 'ざせき', meaning: 'tempat duduk' }] },
    { char: '開', romaji: 'akeru', meaning: 'membuka', onyomi: 'カイ', kunyomi: 'あ.ける', examples: [{ word: '開始', reading: 'かいし', meaning: 'mulai' }] },
    { char: '閉', romaji: 'shimeru', meaning: 'menutup', onyomi: 'ヘイ', kunyomi: 'し.める', examples: [{ word: '閉店', reading: 'へいてん', meaning: 'tutup toko' }] },
    { char: '切', romaji: 'kiru', meaning: 'memotong', onyomi: 'セツ', kunyomi: 'き.る', examples: [{ word: '大切', reading: 'たいせつ', meaning: 'penting' }] },
    { char: '洗', romaji: 'arau', meaning: 'mencuci', onyomi: 'セン', kunyomi: 'あら.う', examples: [{ word: '洗濯', reading: 'せんたく', meaning: 'mencuci baju' }] },
    { char: '貸', romaji: 'kasu', meaning: 'meminjamkan', onyomi: 'タイ', kunyomi: 'か.す', examples: [{ word: '貸し出し', reading: 'かしだし', meaning: 'peminjaman' }] },
    { char: '借', romaji: 'kariru', meaning: 'meminjam', onyomi: 'シャク', kunyomi: 'か.りる', examples: [{ word: '借金', reading: 'しゃっきん', meaning: 'utang' }] },
    { char: '返', romaji: 'kaesu', meaning: 'mengembalikan', onyomi: 'ヘン', kunyomi: 'かえ.す', examples: [{ word: '返事', reading: 'へんじ', meaning: 'balasan' }] },
    { char: '決', romaji: 'kimeru', meaning: 'memutuskan', onyomi: 'ケツ', kunyomi: 'き.める', examples: [{ word: '決定', reading: 'けってい', meaning: 'keputusan' }] },
    { char: '変', romaji: 'kawaru', meaning: 'berubah, aneh', onyomi: 'ヘン', kunyomi: 'か.わる', examples: [{ word: '変化', reading: 'へんか', meaning: 'perubahan' }] },
    { char: '集', romaji: 'atsumaru', meaning: 'berkumpul', onyomi: 'シュウ', kunyomi: 'あつ.まる', examples: [{ word: '集合', reading: 'しゅうごう', meaning: 'berkumpul' }] },
    { char: '発', romaji: 'hatsu', meaning: 'berangkat', onyomi: 'ハツ', kunyomi: '—', examples: [{ word: '出発', reading: 'しゅっぱつ', meaning: 'keberangkatan' }] },
    { char: '着', romaji: 'tsuku', meaning: 'tiba, memakai', onyomi: 'チャク', kunyomi: 'つ.く・き.る', examples: [{ word: '到着', reading: 'とうちゃく', meaning: 'kedatangan' }] },
    { char: '映', romaji: 'utsuru', meaning: 'memantulkan', onyomi: 'エイ', kunyomi: 'うつ.る', examples: [{ word: '映画', reading: 'えいが', meaning: 'film' }] },
    { char: '写', romaji: 'utsusu', meaning: 'memotret', onyomi: 'シャ', kunyomi: 'うつ.す', examples: [{ word: '写真', reading: 'しゃしん', meaning: 'foto' }] },
    { char: '歌', romaji: 'uta', meaning: 'lagu, bernyanyi', onyomi: 'カ', kunyomi: 'うた', examples: [{ word: '歌手', reading: 'かしゅ', meaning: 'penyanyi' }] },
    { char: '飛', romaji: 'tobu', meaning: 'terbang', onyomi: 'ヒ', kunyomi: 'と.ぶ', examples: [{ word: '飛行機', reading: 'ひこうき', meaning: 'pesawat terbang' }] },
    { char: '渡', romaji: 'wataru', meaning: 'menyeberang', onyomi: 'ト', kunyomi: 'わた.る', examples: [{ word: '渡す', reading: 'わたす', meaning: 'menyerahkan' }] },
    { char: '起', romaji: 'okiru', meaning: 'bangun', onyomi: 'キ', kunyomi: 'お.きる', examples: [{ word: '起きる', reading: 'おきる', meaning: 'bangun tidur' }] },
    { char: '泊', romaji: 'tomaru', meaning: 'menginap', onyomi: 'ハク', kunyomi: 'と.まる', examples: [{ word: '一泊', reading: 'いっぱく', meaning: 'satu malam menginap' }] },
  ],
};

export const N4_ADJECTIVES: CharacterSection = {
  title: 'N4: Kata Sifat',
  description: 'Ukuran, kualitas, dan deskripsi',
  columns: 4,
  entries: [
    { char: '重', romaji: 'omoi', meaning: 'berat', onyomi: 'ジュウ・チョウ', kunyomi: 'おも.い', examples: [{ word: '重要', reading: 'じゅうよう', meaning: 'penting' }] },
    { char: '軽', romaji: 'karui', meaning: 'ringan', onyomi: 'ケイ', kunyomi: 'かる.い', examples: [{ word: '軽い', reading: 'かるい', meaning: 'ringan' }] },
    { char: '太', romaji: 'futoi', meaning: 'tebal, gemuk', onyomi: 'タイ', kunyomi: 'ふと.い', examples: [{ word: '太陽', reading: 'たいよう', meaning: 'matahari' }] },
    { char: '細', romaji: 'hosoi', meaning: 'tipis, sempit', onyomi: 'サイ', kunyomi: 'ほそ.い', examples: [{ word: '細かい', reading: 'こまかい', meaning: 'detail/halus' }] },
    { char: '暗', romaji: 'kurai', meaning: 'gelap', onyomi: 'アン', kunyomi: 'くら.い', examples: [{ word: '暗記', reading: 'あんき', meaning: 'hafalan' }] },
    { char: '明', romaji: 'akarui', meaning: 'terang', onyomi: 'メイ・ミョウ', kunyomi: 'あか.るい', examples: [{ word: '説明', reading: 'せつめい', meaning: 'penjelasan' }] },
    { char: '強', romaji: 'tsuyoi', meaning: 'kuat', onyomi: 'キョウ・ゴウ', kunyomi: 'つよ.い', examples: [{ word: '勉強', reading: 'べんきょう', meaning: 'belajar' }] },
    { char: '弱', romaji: 'yowai', meaning: 'lemah', onyomi: 'ジャク', kunyomi: 'よわ.い', examples: [{ word: '弱点', reading: 'じゃくてん', meaning: 'kelemahan' }] },
    { char: '短', romaji: 'mijikai', meaning: 'pendek', onyomi: 'タン', kunyomi: 'みじか.い', examples: [{ word: '短期', reading: 'たんき', meaning: 'jangka pendek' }] },
    { char: '低', romaji: 'hikui', meaning: 'rendah', onyomi: 'テイ', kunyomi: 'ひく.い', examples: [{ word: '低い', reading: 'ひくい', meaning: 'rendah' }] },
    { char: '悪', romaji: 'warui', meaning: 'buruk, jahat', onyomi: 'アク', kunyomi: 'わる.い', examples: [{ word: '悪い', reading: 'わるい', meaning: 'buruk' }] },
    { char: '正', romaji: 'tadashii', meaning: 'benar', onyomi: 'セイ・ショウ', kunyomi: 'ただ.しい', examples: [{ word: '正月', reading: 'しょうがつ', meaning: 'Tahun Baru' }] },
    { char: '同', romaji: 'onaji', meaning: 'sama', onyomi: 'ドウ', kunyomi: 'おな.じ', examples: [{ word: '同じ', reading: 'おなじ', meaning: 'sama' }] },
    { char: '違', romaji: 'chigau', meaning: 'berbeda', onyomi: 'イ', kunyomi: 'ちが.う', examples: [{ word: '間違い', reading: 'まちがい', meaning: 'kesalahan' }] },
    { char: '若', romaji: 'wakai', meaning: 'muda', onyomi: 'ジャク', kunyomi: 'わか.い', examples: [{ word: '若者', reading: 'わかもの', meaning: 'anak muda' }] },
    { char: '忙', romaji: 'isogashii', meaning: 'sibuk', onyomi: 'ボウ', kunyomi: 'いそが.しい', examples: [{ word: '忙しい', reading: 'いそがしい', meaning: 'sibuk' }] },
  ],
};

export const N4_ABSTRACT: CharacterSection = {
  title: 'N4: Konsep Abstrak',
  description: 'Dunia, kekuatan, ide, dan rencana',
  columns: 5,
  entries: [
    { char: '世', romaji: 'se', meaning: 'dunia, generasi', onyomi: 'セ・セイ', kunyomi: 'よ', examples: [{ word: '世界', reading: 'せかい', meaning: 'dunia' }] },
    { char: '界', romaji: 'kai', meaning: 'dunia, batas', onyomi: 'カイ', kunyomi: '—', examples: [{ word: '世界中', reading: 'せかいじゅう', meaning: 'seluruh dunia' }] },
    { char: '力', romaji: 'chikara', meaning: 'kekuatan', onyomi: 'リョク・リキ', kunyomi: 'ちから', examples: [{ word: '努力', reading: 'どりょく', meaning: 'usaha' }] },
    { char: '意', romaji: 'i', meaning: 'makna, niat', onyomi: 'イ', kunyomi: '—', examples: [{ word: '意見', reading: 'いけん', meaning: 'pendapat' }] },
    { char: '思', romaji: 'omou', meaning: 'berpikir', onyomi: 'シ', kunyomi: 'おも.う', examples: [{ word: '思い出', reading: 'おもいで', meaning: 'kenangan' }] },
    { char: '合', romaji: 'au', meaning: 'cocok', onyomi: 'ゴウ・ガッ', kunyomi: 'あ.う', examples: [{ word: '場合', reading: 'ばあい', meaning: 'situasi/kasus' }] },
    { char: '代', romaji: 'dai', meaning: 'generasi, era', onyomi: 'ダイ', kunyomi: 'か.わる・よ', examples: [{ word: '時代', reading: 'じだい', meaning: 'zaman/era' }] },
    { char: '用', romaji: 'you', meaning: 'penggunaan', onyomi: 'ヨウ', kunyomi: 'もち.いる', examples: [{ word: '用事', reading: 'ようじ', meaning: 'keperluan' }] },
    { char: '説', romaji: 'setsu', meaning: 'penjelasan', onyomi: 'セツ', kunyomi: 'と.く', examples: [{ word: '説明', reading: 'せつめい', meaning: 'penjelasan' }] },
    { char: '計', romaji: 'kei', meaning: 'mengukur', onyomi: 'ケイ', kunyomi: 'はか.る', examples: [{ word: '計画', reading: 'けいかく', meaning: 'rencana' }] },
    { char: '画', romaji: 'ga', meaning: 'gambar, rencana', onyomi: 'ガ・カク', kunyomi: '—', examples: [{ word: '映画', reading: 'えいが', meaning: 'film' }] },
    { char: '経', romaji: 'kei', meaning: 'melewati', onyomi: 'ケイ', kunyomi: 'へ.る', examples: [{ word: '経済', reading: 'けいざい', meaning: 'ekonomi' }] },
  ],
};

export const N4_COLORS: CharacterSection = {
  title: 'N4: Warna',
  description: 'Warna dasar',
  columns: 4,
  entries: [
    { char: '色', romaji: 'iro', meaning: 'warna', onyomi: 'ショク・シキ', kunyomi: 'いろ', examples: [{ word: '茶色', reading: 'ちゃいろ', meaning: 'cokelat' }] },
    { char: '赤', romaji: 'aka', meaning: 'merah', onyomi: 'セキ', kunyomi: 'あか', examples: [{ word: '赤ちゃん', reading: 'あかちゃん', meaning: 'bayi' }] },
    { char: '青', romaji: 'ao', meaning: 'biru', onyomi: 'セイ', kunyomi: 'あお', examples: [{ word: '青空', reading: 'あおぞら', meaning: 'langit biru' }] },
    { char: '黒', romaji: 'kuro', meaning: 'hitam', onyomi: 'コク', kunyomi: 'くろ', examples: [{ word: '黒板', reading: 'こくばん', meaning: 'papan tulis' }] },
  ],
};

export const N4_MISC: CharacterSection = {
  title: 'N4: Lainnya',
  description: 'Komunikasi, konsep, dan kata fungsi',
  columns: 5,
  entries: [
    { char: '伝', romaji: 'tsutaeru', meaning: 'menyampaikan', onyomi: 'デン', kunyomi: 'つた.える', examples: [{ word: '伝言', reading: 'でんごん', meaning: 'pesan' }] },
    { char: '記', romaji: 'ki', meaning: 'mencatat', onyomi: 'キ', kunyomi: 'しる.す', examples: [{ word: '日記', reading: 'にっき', meaning: 'buku harian' }] },
    { char: '注', romaji: 'chuu', meaning: 'perhatian', onyomi: 'チュウ', kunyomi: 'そそ.ぐ', examples: [{ word: '注意', reading: 'ちゅうい', meaning: 'hati-hati/perhatian' }] },
    { char: '漢', romaji: 'kan', meaning: 'Tiongkok', onyomi: 'カン', kunyomi: '—', examples: [{ word: '漢字', reading: 'かんじ', meaning: 'huruf kanji' }] },
    { char: '不', romaji: 'fu', meaning: 'tidak-', onyomi: 'フ・ブ', kunyomi: '—', examples: [{ word: '不便', reading: 'ふべん', meaning: 'tidak nyaman' }] },
    { char: '有', romaji: 'aru', meaning: 'ada, memiliki', onyomi: 'ユウ・ウ', kunyomi: 'あ.る', examples: [{ word: '有名', reading: 'ゆうめい', meaning: 'terkenal' }] },
    { char: '無', romaji: 'mu', meaning: 'tidak ada', onyomi: 'ム・ブ', kunyomi: 'な.い', examples: [{ word: '無料', reading: 'むりょう', meaning: 'gratis' }] },
    { char: '別', romaji: 'betsu', meaning: 'terpisah, lain', onyomi: 'ベツ', kunyomi: 'わか.れる', examples: [{ word: '特別', reading: 'とくべつ', meaning: 'khusus' }] },
    { char: '便', romaji: 'ben', meaning: 'kenyamanan', onyomi: 'ベン・ビン', kunyomi: 'たよ.り', examples: [{ word: '便利', reading: 'べんり', meaning: 'praktis/nyaman' }] },
    { char: '真', romaji: 'shin', meaning: 'benar, asli', onyomi: 'シン', kunyomi: 'ま', examples: [{ word: '写真', reading: 'しゃしん', meaning: 'foto' }] },
    { char: '物', romaji: 'mono', meaning: 'benda', onyomi: 'ブツ・モツ', kunyomi: 'もの', examples: [{ word: '買い物', reading: 'かいもの', meaning: 'belanja' }] },
    { char: '全', romaji: 'zen', meaning: 'semua, seluruh', onyomi: 'ゼン', kunyomi: 'まった.く', examples: [{ word: '全部', reading: 'ぜんぶ', meaning: 'semuanya' }] },
    { char: '員', romaji: 'in', meaning: 'anggota', onyomi: 'イン', kunyomi: '—', examples: [{ word: '店員', reading: 'てんいん', meaning: 'pegawai toko' }] },
  ],
};

export const KANJI_N4_SECTIONS: CharacterSection[] = [
  N4_PEOPLE,
  N4_BODY,
  N4_EDUCATION,
  N4_WORK,
  N4_PLACES,
  N4_TRANSPORT,
  N4_NATURE,
  N4_FOOD,
  N4_TIME,
  N4_VERBS,
  N4_ADJECTIVES,
  N4_ABSTRACT,
  N4_COLORS,
  N4_MISC,
];
