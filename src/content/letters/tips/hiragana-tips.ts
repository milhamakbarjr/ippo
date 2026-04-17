import type { TipCategory, TipDetail } from '@/types/letters';

export const HIRAGANA_TIP_CATEGORIES: TipCategory[] = [
  {
    label: 'HIRAGANA DASAR',
    items: [
      { slug: 'hiragana-vokal', characters: 'あ、い、う、え、お', romaji: 'a, i, u, e, o' },
      { slug: 'hiragana-k-group', characters: 'か、き、く、け、こ', romaji: 'ka, ki, ku, ke, ko' },
      { slug: 'hiragana-s-group', characters: 'さ、し、す、せ、そ', romaji: 'sa, shi, su, se, so' },
      { slug: 'hiragana-t-group', characters: 'た、ち、つ、て、と', romaji: 'ta, chi, tsu, te, to' },
      { slug: 'hiragana-n-group', characters: 'な、に、ぬ、ね、の', romaji: 'na, ni, nu, ne, no' },
      { slug: 'hiragana-h-group', characters: 'は、ひ、ふ、へ、ほ', romaji: 'ha, hi, fu, he, ho' },
      { slug: 'hiragana-m-group', characters: 'ま、み、む、め、も', romaji: 'ma, mi, mu, me, mo' },
      { slug: 'hiragana-y-group', characters: 'や、ゆ、よ', romaji: 'ya, yu, yo' },
      { slug: 'hiragana-r-group', characters: 'ら、り、る、れ、ろ', romaji: 'ra, ri, ru, re, ro' },
      { slug: 'hiragana-w-group', characters: 'わ、を、ん', romaji: 'wa, wo, n' },
    ],
  },
  {
    label: 'DAKUON & HANDAKUON',
    items: [
      { slug: 'hiragana-g-group', characters: 'が、ぎ、ぐ、げ、ご', romaji: 'ga, gi, gu, ge, go' },
      { slug: 'hiragana-z-group', characters: 'ざ、じ、ず、ぜ、ぞ', romaji: 'za, ji, zu, ze, zo' },
      { slug: 'hiragana-d-group', characters: 'だ、ぢ、づ、で、ど', romaji: 'da, ji, zu, de, do' },
      { slug: 'hiragana-b-group', characters: 'ば、び、ぶ、べ、ぼ', romaji: 'ba, bi, bu, be, bo' },
      { slug: 'hiragana-p-group', characters: 'ぱ、ぴ、ぷ、ぺ、ぽ', romaji: 'pa, pi, pu, pe, po' },
    ],
  },
  {
    label: 'KANA KECIL',
    items: [
      { slug: 'hiragana-ya-combo', characters: 'きゃ、みゃ、りゃ、にゃ、しゃ、ちゃ', romaji: 'kya, mya, rya, nya, sha, cha' },
      { slug: 'hiragana-yu-combo', characters: 'きゅ、みゅ、りゅ、ちゅ、にゅ、ひゅ、みゅ', romaji: 'kyu, myu, ryu, chu, nyu, hyu, myu' },
      { slug: 'hiragana-yo-combo', characters: 'きょ、にょ、ひょ、みょ、りょ、しょ、ちょ', romaji: 'kyo, nyo, hyo, myo, ryo, sho, cho' },
    ],
  },
  {
    label: 'EJAAN',
    items: [
      { slug: 'hiragana-small-tsu-1', characters: 'っ → kk, ss, tt', romaji: 'kk, ss, tt' },
      { slug: 'hiragana-long-vowels', characters: 'ああ、いい、うう、えい、おう', romaji: 'aa, ii, uu, ei, ou' },
    ],
  },
];

export const HIRAGANA_TIP_DETAILS: TipDetail[] = [
  {
    slug: 'hiragana-vokal',
    title: 'Hiragana: Huruf Vokal',
    explanation: 'Lima vokal dasar adalah fondasi dari seluruh sistem hiragana. Setiap suku kata dalam bahasa Jepang diakhiri dengan salah satu dari lima bunyi vokal ini.',
    cards: [
      { char: 'あ', romaji: 'a', englishComparison: 'seperti "a" dalam "ayah"' },
      { char: 'い', romaji: 'i', englishComparison: 'seperti "i" dalam "ikan"' },
      { char: 'う', romaji: 'u', englishComparison: 'seperti "u" dalam "ujung"' },
      { char: 'え', romaji: 'e', englishComparison: 'seperti "e" dalam "enak"' },
      { char: 'お', romaji: 'o', englishComparison: 'seperti "o" dalam "obat"' },
    ],
    closingText: 'Hafalkan lima vokal ini terlebih dahulu — semuanya digunakan bersama konsonan untuk membentuk suku kata lainnya.',
  },
  {
    slug: 'hiragana-ya-combo',
    title: 'Hiragana Combo (ya)',
    explanation: 'Kamu bisa menambahkan ゃ kecil untuk mengubah bunyi huruf sebelumnya. Ini membentuk satu suku kata — bukan dua!',
    cards: [
      { char: 'しゃ', romaji: 'sha', englishComparison: 'seperti "sha" dalam "share"' },
      { char: 'ちゃ', romaji: 'cha', englishComparison: 'seperti "cha" dalam "champion"' },
      { char: 'にゃ', romaji: 'nya', englishComparison: 'seperti "nya" dalam "nyata"' },
      { char: 'きゃ', romaji: 'kya', englishComparison: 'seperti "kya" dalam "kyak"' },
    ],
    closingText: 'Ingat: しゃ dengan ゃ kecil diucapkan "sha" (satu suku kata), berbeda dengan しや dengan ゃ besar yang diucapkan "shi-ya" (dua suku kata).',
  },
  {
    slug: 'hiragana-small-tsu-1',
    title: 'っ Kecil — Konsonan Ganda',
    explanation: 'っ kecil menggandakan konsonan yang mengikutinya. Ada jedaan singkat sebelum konsonan tersebut diucapkan.',
    cards: [
      { char: 'きって', romaji: 'kitte', englishComparison: 'perangko — perhatikan jeda sebelum "t"' },
      { char: 'ざっし', romaji: 'zasshi', englishComparison: 'majalah — perhatikan jeda sebelum "sh"' },
      { char: 'きっぷ', romaji: 'kippu', englishComparison: 'tiket — perhatikan jeda sebelum "p"' },
    ],
    closingText: 'Bayangkan seperti menahan napas sejenak sebelum mengucapkan konsonan ganda tersebut.',
  },
  {
    slug: 'hiragana-long-vowels',
    title: 'Vokal Panjang',
    explanation: 'Dalam hiragana, vokal panjang dibentuk dengan menambahkan vokal yang sesuai. Perhatikan perbedaannya karena bisa mengubah makna kata!',
    cards: [
      { char: 'ああ', romaji: 'aa', englishComparison: 'vokal "a" yang dipanjangkan' },
      { char: 'えい', romaji: 'ei', englishComparison: 'seperti "ay" dalam "say"' },
      { char: 'おう', romaji: 'ou', englishComparison: 'seperti "oh" yang dipanjangkan' },
    ],
    closingText: 'おかあさん (okaasan - ibu) vs おかさん (bukan kata) — panjang vokal sangat penting!',
  },
];
