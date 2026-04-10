/**
 * Infer JLPT level from a step slug.
 * Slug naming convention: hiragana-... / katakana-... -> kana, n5-... -> n5, etc.
 * Defaults to 'kana' for unknown slugs.
 */
export function inferLevelFromSlug(slug: string): string {
  if (slug.startsWith('hiragana') || slug.startsWith('katakana')) return 'kana';
  if (slug.includes('n5')) return 'n5';
  if (slug.includes('n4')) return 'n4';
  if (slug.includes('n3')) return 'n3';
  if (slug.includes('n2')) return 'n2';
  if (slug.includes('n1')) return 'n1';
  return 'kana';
}
