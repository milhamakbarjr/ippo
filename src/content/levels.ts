import kanaLevel from '@/content/kana';
import n5Level from '@/content/n5';
import n4Level from '@/content/n4';
import n3Level from '@/content/n3';
import n2Level from '@/content/n2';
import n1Level from '@/content/n1';
import type { JLPTLevelId, Level } from '@/types/learning';

export const LEVELS: Partial<Record<JLPTLevelId, Level>> = {
  kana: kanaLevel,
  n5: n5Level,
  n4: n4Level,
  n3: n3Level,
  n2: n2Level,
  n1: n1Level,
};

export const LEVEL_ORDER: JLPTLevelId[] = ['kana', 'n5', 'n4', 'n3', 'n2', 'n1'];

export const LEVEL_LABELS: Record<JLPTLevelId, string> = {
  kana: 'Kana',
  n5: 'N5',
  n4: 'N4',
  n3: 'N3',
  n2: 'N2',
  n1: 'N1',
};
