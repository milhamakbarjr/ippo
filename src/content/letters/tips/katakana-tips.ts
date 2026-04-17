import type { TipCategory, TipDetail } from '@/types/letters';

export const KATAKANA_TIP_CATEGORIES: TipCategory[] = [
  {
    label: 'KATAKANA',
    items: [
      { slug: 'katakana-i-ka-a-sa', characters: 'イ、カ、ア、サ', romaji: 'i, ka, a, sa' },
      { slug: 'katakana-ko-su-shi-u', characters: 'コ、ス、シ、ウ', romaji: 'ko, su, shi, u' },
      { slug: 'katakana-chi-wa-e-mi', characters: 'チ、ワ、エ、ミ', romaji: 'chi, wa, e, mi' },
      { slug: 'katakana-ta-ki-n-o', characters: 'タ、キ、ン、オ', romaji: 'ta, ki, n, o' },
      { slug: 'katakana-ri-ra-tsu-yu', characters: 'リ、ラ、ツ、ユ', romaji: 'ri, ra, tsu, yu' },
      { slug: 'katakana-te-ha-so-ma', characters: 'テ、ハ、ソ、マ', romaji: 'te, ha, so, ma' },
      { slug: 'katakana-ku-mo-se-na', characters: 'ク、モ、セ、ナ', romaji: 'ku, mo, se, na' },
      { slug: 'katakana-fu-ke-ne-ni', characters: 'フ、ケ、ネ、ニ', romaji: 'fu, ke, ne, ni' },
      { slug: 'katakana-ru-nu-hi-ho', characters: 'ル、ヌ、ヒ、ホ', romaji: 'ru, nu, hi, ho' },
      { slug: 'katakana-mu-no-he-ya-re', characters: 'ム、ノ、ヘ、ヤ、レ', romaji: 'mu, no, he, ya, re' },
    ],
  },
  {
    label: 'DAKUTEN',
    items: [
      { slug: 'katakana-ga-gi-gu-ge-go', characters: 'ガ、ギ、グ、ゲ、ゴ', romaji: 'ga, gi, gu, ge, go' },
      { slug: 'katakana-za-zu-ze-zo-ji', characters: 'ザ、ズ、ゼ、ゾ、ジ', romaji: 'za, zu, ze, zo, ji' },
      { slug: 'katakana-da-de-do-ji-zu', characters: 'ダ、デ、ド、ヂ、ヅ', romaji: 'da, de, do, ji, zu' },
      { slug: 'katakana-ba-bi-bu-be-bo', characters: 'バ、ビ、ブ、ベ、ボ', romaji: 'ba, bi, bu, be, bo' },
      { slug: 'katakana-pa-pi-pu-pe-po', characters: 'パ、ピ、プ、ペ、ポ', romaji: 'pa, pi, pu, pe, po' },
    ],
  },
  {
    label: 'KANA KECIL',
    items: [
      { slug: 'katakana-hya-combo', characters: 'ヒャ、ミャ、リャ、キャ、ニャ、シャ、チャ', romaji: 'hya, mya, rya, kya, nya, sha, cha' },
      { slug: 'katakana-yu-combo', characters: 'リュ、キュ、シュ、チュ、ニュ、ヒュ、ミュ', romaji: 'ryu, kyu, shu, chu, nyu, hyu, myu' },
      { slug: 'katakana-yo-combo', characters: 'キョ、ニョ、ヒョ、ミョ、リョ、ショ、チョ', romaji: 'kyo, nyo, hyo, myo, ryo, sho, cho' },
    ],
  },
  {
    label: 'EJAAN',
    items: [
      { slug: 'katakana-small-tsu-1', characters: 'ッ 1: kk, pp, ss, tt', romaji: 'kk, pp, ss, tt' },
      { slug: 'katakana-small-tsu-2', characters: 'ッ 2: ss, kk, pp, tt', romaji: 'ss, kk, pp, tt' },
      { slug: 'katakana-small-tsu-3', characters: 'ッ 3: pp, tt, kk, ss', romaji: 'pp, tt, kk, ss' },
      { slug: 'katakana-small-tsu-4', characters: 'ッ 4: kk, pp, cch, ttsu', romaji: 'kk, pp, cch, ttsu' },
      { slug: 'katakana-long-vowels', characters: 'Vokal panjang: aa, ii, uu, oo, ee', romaji: 'aa, ii, uu, oo, ee' },
    ],
  },
];

export const KATAKANA_TIP_DETAILS: TipDetail[] = [
  {
    slug: 'katakana-hya-combo',
    title: 'Katakana 201',
    explanation: 'Kamu bisa menambahkan ャ kecil untuk mengubah bunyi huruf sebelumnya. Ini membentuk satu suku kata — bukan dua!',
    cards: [
      { char: 'シャ', romaji: 'sha', englishComparison: 'seperti "sha" dalam "shop"' },
      { char: 'チャ', romaji: 'cha', englishComparison: 'seperti "cha" dalam "chop"' },
      { char: 'ニャ', romaji: 'nya', englishComparison: 'seperti "nya" dalam "lanyard"' },
      { char: 'キャ', romaji: 'kya', englishComparison: 'seperti "kya" dalam "backyard"' },
    ],
    closingText: 'Untuk melatih bunyi-bunyi ini, bayangkan menambahkan huruf pertama ke kata seperti "yard". キャ dengan ャ kecil diucapkan kya — satu suku kata! Berbeda dengan キヤ dengan ヤ besar yang diucapkan ki-ya — dua suku kata.',
  },
  {
    slug: 'katakana-yu-combo',
    title: 'Katakana: Combo ュ',
    explanation: 'ュ kecil digabungkan dengan konsonan untuk membentuk suku kata "yu".',
    cards: [
      { char: 'リュ', romaji: 'ryu', englishComparison: 'seperti "ryu" dalam "ryuuichi"' },
      { char: 'キュ', romaji: 'kyu', englishComparison: 'seperti "cu" dalam "cute"' },
      { char: 'シュ', romaji: 'shu', englishComparison: 'seperti "shu" dalam "shoe"' },
      { char: 'チュ', romaji: 'chu', englishComparison: 'seperti "chu" dalam "choose"' },
    ],
  },
  {
    slug: 'katakana-yo-combo',
    title: 'Katakana: Combo ョ',
    explanation: 'ョ kecil digabungkan dengan konsonan untuk membentuk suku kata "yo".',
    cards: [
      { char: 'キョ', romaji: 'kyo', englishComparison: 'seperti "kyo" dalam "Tokyo"' },
      { char: 'ショ', romaji: 'sho', englishComparison: 'seperti "sho" dalam "show"' },
      { char: 'チョ', romaji: 'cho', englishComparison: 'seperti "cho" dalam "chocolate"' },
      { char: 'ニョ', romaji: 'nyo', englishComparison: 'seperti "nyo" dalam bahasa Italia' },
    ],
  },
  {
    slug: 'katakana-small-tsu-1',
    title: 'ッ Kecil 1 — kk, pp, ss, tt',
    explanation: 'ッ kecil menggandakan konsonan yang mengikutinya. Ini menciptakan jedaan singkat yang disengaja sebelum konsonan.',
    cards: [
      { char: 'バッグ', romaji: 'baggu', englishComparison: 'tas (bag)' },
      { char: 'カップ', romaji: 'kappu', englishComparison: 'cangkir (cup)' },
      { char: 'クラッシュ', romaji: 'kurasshu', englishComparison: 'tabrakan (crash)' },
      { char: 'ベッド', romaji: 'beddo', englishComparison: 'tempat tidur (bed)' },
    ],
    closingText: 'Dalam kata serapan bahasa Inggris, ッ sering muncul karena bahasa Inggris memiliki banyak konsonan ganda dan bunyi yang dipotong.',
  },
  {
    slug: 'katakana-long-vowels',
    title: 'Vokal Panjang Katakana',
    explanation: 'Dalam katakana, vokal panjang ditandai dengan garis panjang ー (chōonpu). Ini berbeda dengan hiragana yang menggunakan vokal tambahan.',
    cards: [
      { char: 'コーヒー', romaji: 'koohii', englishComparison: 'kopi (coffee)' },
      { char: 'ケーキ', romaji: 'keeki', englishComparison: 'kue (cake)' },
      { char: 'プール', romaji: 'puuru', englishComparison: 'kolam renang (pool)' },
      { char: 'ビール', romaji: 'biiru', englishComparison: 'bir (beer)' },
    ],
    closingText: 'ー selalu memperpanjang vokal dari karakter sebelumnya. Sangat umum dalam kata serapan bahasa asing!',
  },
  {
    slug: 'katakana-i-ka-a-sa',
    title: 'Katakana: イ、カ、ア、サ',
    explanation: 'Kelompok pertama katakana yang perlu kamu pelajari. Perhatikan kemiripan dan perbedaannya dengan hiragana.',
    cards: [
      { char: 'イ', romaji: 'i', englishComparison: 'seperti "i" dalam "Italian"' },
      { char: 'カ', romaji: 'ka', englishComparison: 'seperti "ka" dalam "karate"' },
      { char: 'ア', romaji: 'a', englishComparison: 'seperti "a" dalam "Asia"' },
      { char: 'サ', romaji: 'sa', englishComparison: 'seperti "sa" dalam "safari"' },
    ],
  },
];
