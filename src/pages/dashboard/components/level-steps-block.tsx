import { motion } from 'motion/react';
import { StepItem } from '@/components/application/learning-path/step-item';
import { YouAreHereCard } from '@/components/application/learning-path/you-are-here-card';
import { NoAssessmentBanner } from '@/components/application/learning-path/no-assessment-banner';
import { LevelCompleteCard } from '@/components/application/learning-path/level-complete-card';
import { useLevelProgress } from '@/hooks/use-level-progress';
import { getLevelProgress } from '@/utils/guest-progress';
import { LEVELS, LEVEL_ORDER } from '@/content/levels';
import type { JLPTLevelId } from '@/types/learning';

interface LevelStepsBlockProps {
  levelId: JLPTLevelId;
  isAuthenticated: boolean;
  userId?: string;
  userLevel?: string | null;
  streak?: number;
}

export function LevelStepsBlock({
  levelId,
  isAuthenticated,
  userId,
  userLevel,
  streak,
}: LevelStepsBlockProps) {
  const levelConfig = LEVELS[levelId];
  const { data: authProgress } = useLevelProgress(levelId, isAuthenticated ? userId : undefined);

  if (!levelConfig) return null;

  const guestProgress = getLevelProgress(levelConfig);
  const completedSlugs = isAuthenticated
    ? (authProgress?.steps.filter((s) => s.completed).map((s) => s.slug) ?? [])
    : guestProgress.completedSlugs;
  const completedCount = isAuthenticated
    ? (authProgress?.completedSteps ?? 0)
    : guestProgress.completedCount;
  const totalCount = isAuthenticated
    ? (authProgress?.totalSteps ?? levelConfig.steps.length)
    : guestProgress.totalCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const recommendedNextSlug = isAuthenticated
    ? authProgress?.recommendedNextStep
    : guestProgress.recommendedNextSlug;
  const allComplete = completedCount === totalCount && totalCount > 0;

  const currentLevelIndex = LEVEL_ORDER.indexOf(levelId);
  const nextLevelId =
    currentLevelIndex >= 0 && currentLevelIndex < LEVEL_ORDER.length - 1
      ? LEVEL_ORDER[currentLevelIndex + 1]
      : undefined;

  return (
    <div className="space-y-3">
      {userLevel ? (
        <YouAreHereCard
          level={levelConfig}
          completedCount={completedCount}
          totalCount={totalCount}
          progressPercent={progressPercent}
          streak={streak}
        />
      ) : (
        <NoAssessmentBanner />
      )}

      {allComplete && (
        <LevelCompleteCard currentLevelId={levelConfig.id} nextLevelId={nextLevelId} />
      )}

      <motion.div
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
        initial="hidden"
        animate="show"
        className="space-y-2"
      >
        {levelConfig.steps.map((step) => (
          <motion.div
            key={step.slug}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <StepItem
              step={step}
              isCompleted={completedSlugs.includes(step.slug)}
              isRecommended={step.slug === recommendedNextSlug}
              levelId={levelConfig.id}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
