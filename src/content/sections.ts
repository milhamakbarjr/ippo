import { kanaSections } from '@/content/kana/sections';
import type { LevelPathConfig } from '@/types/learning';
import type { JLPTLevelId } from '@/types/learning';

export const LEVEL_PATH_CONFIGS: Partial<Record<JLPTLevelId, LevelPathConfig>> = {
  kana: kanaSections,
};
