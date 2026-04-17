import { kanaSections } from '@/content/kana/sections';
import { n5Sections } from '@/content/n5/sections';
import { n4Sections } from '@/content/n4/sections';
import { n3Sections } from '@/content/n3/sections';
import { n2Sections } from '@/content/n2/sections';
import { n1Sections } from '@/content/n1/sections';
import type { LevelPathConfig } from '@/types/learning';
import type { JLPTLevelId } from '@/types/learning';

export const LEVEL_PATH_CONFIGS: Partial<Record<JLPTLevelId, LevelPathConfig>> = {
  kana: kanaSections,
  n5: n5Sections,
  n4: n4Sections,
  n3: n3Sections,
  n2: n2Sections,
  n1: n1Sections,
};
