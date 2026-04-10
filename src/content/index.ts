import { level as kanaLevel } from './kana/index';
import { level as n5Level } from './n5/index';
import { level as n4Level } from './n4/index';
import { level as n3Level } from './n3/index';
import { level as n2Level } from './n2/index';
import { level as n1Level } from './n1/index';
import type { Step } from '@/types/learning';

const LEVEL_MAP: Record<string, { steps: Step[] }> = {
  kana: kanaLevel,
  n5: n5Level,
  n4: n4Level,
  n3: n3Level,
  n2: n2Level,
  n1: n1Level,
};

export function getStepsForLevel(levelId: string): Step[] {
  return LEVEL_MAP[levelId]?.steps ?? [];
}
