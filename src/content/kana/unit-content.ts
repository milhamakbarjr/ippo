import { HIRAGANA_SECTIONS } from '@/content/letters/hiragana';
import { KATAKANA_SECTIONS } from '@/content/letters/katakana';
import type { CharacterSection } from '@/types/letters';

export const UNIT_CHARACTER_SECTIONS: Record<string, CharacterSection[]> = {
  'hiragana-gojuuon': [HIRAGANA_SECTIONS[0]],
  'hiragana-dakuten-youon': [HIRAGANA_SECTIONS[1], HIRAGANA_SECTIONS[2]],
  'katakana-gojuuon': [KATAKANA_SECTIONS[0]],
  'katakana-dakuten-youon': [KATAKANA_SECTIONS[1], KATAKANA_SECTIONS[2]],
};
