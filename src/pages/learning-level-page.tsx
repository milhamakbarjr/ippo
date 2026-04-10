import { motion } from 'motion/react';
import { useNavigate } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client';
import { LevelCompleteCard } from '@/components/application/learning-path/level-complete-card';
import { NoAssessmentBanner } from '@/components/application/learning-path/no-assessment-banner';
import { StepItem } from '@/components/application/learning-path/step-item';
import { YouAreHereCard } from '@/components/application/learning-path/you-are-here-card';
import { Badge } from '@/components/base/badges/badges';
import { Button } from '@/components/base/buttons/button';
import { Tab, TabList, TabPanel, Tabs } from '@/components/application/tabs/tabs';
import { Route } from '@/routes/learning/$level';
import { useAchievements } from '@/hooks/use-achievements';
import { getLevelProgress } from '@/utils/guest-progress';
import kanaLevel from '@/content/kana';
import n4Level from '@/content/n4';
import n5Level from '@/content/n5';
import type { JLPTLevelId, Level } from '@/types/learning';

const LEVELS: Partial<Record<JLPTLevelId, Level>> = {
  kana: kanaLevel,
  n5: n5Level,
  n4: n4Level,
};

const LEVEL_ORDER: JLPTLevelId[] = ['kana', 'n5', 'n4', 'n3', 'n2', 'n1'];

const LEVEL_LABELS: Record<JLPTLevelId, string> = {
  kana: 'Kana',
  n5: 'N5',
  n4: 'N4',
  n3: 'N3',
  n2: 'N2',
  n1: 'N1',
};

export function LearningLevelPage() {
  const { level: levelParam } = Route.useParams();
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;
  const { data: achievementsData } = useAchievements(isAuthenticated);
  const streak = achievementsData?.streak;

  const levelConfig = LEVELS[levelParam as JLPTLevelId];

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
  const { completedSlugs, completedCount, totalCount, progressPercent, recommendedNextSlug } = guestProgress;
  const allComplete = completedCount === totalCount && totalCount > 0;

  const currentLevelIndex = LEVEL_ORDER.indexOf(levelParam as JLPTLevelId);
  const nextLevelId = currentLevelIndex >= 0 && currentLevelIndex < LEVEL_ORDER.length - 1
    ? LEVEL_ORDER[currentLevelIndex + 1]
    : undefined;


  return (
    <div className="min-h-dvh bg-primary pb-[env(safe-area-inset-bottom)]">
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
