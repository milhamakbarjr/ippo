import { describe, it, expect } from 'vitest';
import { inferLevelFromSlug } from '@/lib/level-inference';

describe('inferLevelFromSlug', () => {
  it('returns kana for hiragana slugs', () => {
    expect(inferLevelFromSlug('hiragana-gojuuon')).toBe('kana');
    expect(inferLevelFromSlug('hiragana-dakuon')).toBe('kana');
    expect(inferLevelFromSlug('hiragana-basic')).toBe('kana');
  });

  it('returns kana for katakana slugs', () => {
    expect(inferLevelFromSlug('katakana-basic')).toBe('kana');
    expect(inferLevelFromSlug('katakana-advanced')).toBe('kana');
  });

  it('returns n5 for n5 slugs', () => {
    expect(inferLevelFromSlug('n5-vocab-01')).toBe('n5');
    expect(inferLevelFromSlug('n5-grammar-basic')).toBe('n5');
  });

  it('returns n4 for n4 slugs', () => {
    expect(inferLevelFromSlug('n4-grammar-basic')).toBe('n4');
    expect(inferLevelFromSlug('n4-vocab')).toBe('n4');
  });

  it('returns n3 for n3 slugs', () => {
    expect(inferLevelFromSlug('n3-kanji-01')).toBe('n3');
    expect(inferLevelFromSlug('n3-reading')).toBe('n3');
  });

  it('returns n2 for n2 slugs', () => {
    expect(inferLevelFromSlug('n2-reading-advanced')).toBe('n2');
    expect(inferLevelFromSlug('n2-grammar')).toBe('n2');
  });

  it('returns n1 for n1 slugs', () => {
    expect(inferLevelFromSlug('n1-comprehension')).toBe('n1');
    expect(inferLevelFromSlug('n1-advanced')).toBe('n1');
  });

  it('returns kana for unknown slugs', () => {
    expect(inferLevelFromSlug('unknown-slug')).toBe('kana');
    expect(inferLevelFromSlug('random-content')).toBe('kana');
  });

  it('returns kana for empty string', () => {
    expect(inferLevelFromSlug('')).toBe('kana');
  });
});
