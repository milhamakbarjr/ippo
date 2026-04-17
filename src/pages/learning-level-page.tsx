import { motion } from 'motion/react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import { LevelCompleteCard } from '@/components/application/learning-path/level-complete-card';
import { NoAssessmentBanner } from '@/components/application/learning-path/no-assessment-banner';
import { StepItem } from '@/components/application/learning-path/step-item';
import { YouAreHereCard } from '@/components/application/learning-path/you-are-here-card';
import { Badge } from '@/components/base/badges/badges';
import { Button } from '@/components/base/buttons/button';
import { Tab, TabList, TabPanel, Tabs } from '@/components/application/tabs/tabs';
import { Route } from '@/routes/_app/learning/$level.index';
import { useAchievements } from '@/hooks/use-achievements';
import { getLevelProgress } from '@/utils/guest-progress';
import { LEVELS, LEVEL_ORDER, LEVEL_LABELS } from '@/content/levels';
import type { JLPTLevelId, LevelProgressResult } from '@/types/learning';

export function LearningLevelPage() {
  const { level: levelParam } = Route.useParams();
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;
  const { data: achievementsData } = useAchievements(isAuthenticated);
  const streak = achievementsData?.streak;

  const levelConfig = LEVELS[levelParam as JLPTLevelId];

  // Fetch DB progress for authenticated users
  const { data: authProgress } = useQuery<LevelProgressResult | null>({
    queryKey: ['progress', session?.user?.id, levelParam],
    queryFn: async () => {
      const res = await fetch(`/api/learning/${levelParam}/progress`);
      if (!res.ok) return null;
      return res.json() as Promise<LevelProgressResult>;
    },
    enabled: isAuthenticated,
  });

  if (!levelConfig) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-4 pb-[env(safe-area-inset-bottom)]">
        <p className="text-primary text-xl font-semibold mb-2">Level tidak ditemukan</p>
        <p className="text-tertiary text-sm mb-6">Level "{levelParam}" belum tersedia.</p>
        <Button color="primary" size="sm" href="/learning">
          Kembali ke Jalur Belajar
        </Button>
      </div>
    );
  }

  const userLevel = (() => {
    try {
      return sessionStorage.getItem('user_level');
    } catch {
      return null;
    }
  })();

  const guestProgress = getLevelProgress(levelConfig);
  const completedSlugs = isAuthenticated
    ? (authProgress?.steps.filter((s) => s.completed).map((s) => s.slug) ?? [])
    : guestProgress.completedSlugs;
  const completedCount = isAuthenticated ? (authProgress?.completedSteps ?? 0) : guestProgress.completedCount;
  const totalCount = isAuthenticated ? (authProgress?.totalSteps ?? levelConfig.steps.length) : guestProgress.totalCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const recommendedNextSlug = isAuthenticated ? authProgress?.recommendedNextStep : guestProgress.recommendedNextSlug;
  const allComplete = completedCount === totalCount && totalCount > 0;

  const currentLevelIndex = LEVEL_ORDER.indexOf(levelParam as JLPTLevelId);
  const nextLevelId = currentLevelIndex >= 0 && currentLevelIndex < LEVEL_ORDER.length - 1
    ? LEVEL_ORDER[currentLevelIndex + 1]
    : undefined;


  return (
    <div className="pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Level Navigation Tabs */}
        <div className="mb-6 overflow-x-auto">
          <Tabs
            selectedKey={levelParam}
            onSelectionChange={(key) => navigate({ to: '/learning/$level', params: { level: String(key) } })}
          >
            <TabList type="underline" size="sm">
              {LEVEL_ORDER.map((levelId) => (
                <Tab key={levelId} id={levelId} label={LEVEL_LABELS[levelId]} />
              ))}
            </TabList>
            {LEVEL_ORDER.map((levelId) => (
              <TabPanel key={levelId} id={levelId} />
            ))}
          </Tabs>
        </div>

        {/* Page Heading */}
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-secondary text-lg font-semibold">
            Jalan Belajarmu ke N2
          </h1>
          <Badge type="pill-color" color="brand" size="sm">
            {levelConfig.label}
          </Badge>
        </div>

        <div className="space-y-3 mb-6">
          {/* Assessment status cards */}
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

          {/* Level complete card */}
          {allComplete && (
            <LevelCompleteCard
              currentLevelId={levelConfig.id}
              nextLevelId={nextLevelId}
            />
          )}
        </div>

        {/* Step list with stagger animation */}
        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {levelConfig.steps.map((step) => (
            <motion.div
              key={step.slug}
              variants={{
                hidden: { opacity: 0, y: 10 },
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
    </div>
  );
}
