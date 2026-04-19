import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import { useAchievements } from '@/hooks/use-achievements';
import { Tab, TabList, TabPanel, Tabs } from '@/components/application/tabs/tabs';
import { StatPills } from './components/stat-pills';
import { StreakCard } from './components/streak-card';
import { XpProgressCard } from './components/xp-progress-card';
import { AchievementsSummaryCard } from './components/achievements-summary-card';
import { GuestSignupCard } from './components/guest-signup-card';
import { AssessmentResultCard } from './components/assessment-result-card';
import { LevelStepsBlock } from './components/level-steps-block';
import { LEVEL_ORDER, LEVEL_LABELS } from '@/content/levels';
import type { JLPTLevelId } from '@/types/learning';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  // Fetch custom session to get assessed_level + onboarding_completed — authClient.useSession() only has Better Auth fields
  const { data: customSession, isLoading: isCustomSessionLoading } = useQuery({
    queryKey: ['session-role'],
    queryFn: async () => {
      const res = await fetch('/api/auth/session');
      return res.json() as Promise<{ user: { role?: string; assessed_level?: string; onboarding_completed?: boolean } | null }>;
    },
    staleTime: 1000 * 30,
    enabled: isAuthenticated,
  });

  const { data: achievementsData } = useAchievements(isAuthenticated);

  // Initialize stable; hydrate from sessionStorage after mount (SSR-safe)
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevelId>('kana');
  const [userLevel, setUserLevel] = useState<string | null>(null);

  useEffect(() => {
    try {
      const sl = sessionStorage.getItem('user_level') as JLPTLevelId | null;
      if (sl && LEVEL_ORDER.includes(sl)) {
        setSelectedLevel(sl);
        setUserLevel(sl);
      }
    } catch { /* ignore */ }
  }, []);

  // Sync selected level from custom session once loaded (authClient.useSession doesn't have assessed_level)
  useEffect(() => {
    if (!customSession?.user) return;
    try {
      const stored = sessionStorage.getItem('user_level') as JLPTLevelId | null;
      if (!stored || !LEVEL_ORDER.includes(stored)) {
        const dbLevel = customSession.user.assessed_level as JLPTLevelId | undefined;
        if (dbLevel && LEVEL_ORDER.includes(dbLevel)) {
          setSelectedLevel(dbLevel);
          setUserLevel(dbLevel);
        }
      }
    } catch { /* ignore */ }
  }, [customSession?.user]);

  // Scroll to top when switching level tabs
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [selectedLevel]);

  // Gate: guest with no localStorage level, or authenticated who hasn't completed onboarding → onboarding
  useEffect(() => {
    if (isPending) return; // Better Auth session still loading
    if (isAuthenticated && isCustomSessionLoading) return; // wait for DB session before deciding

    const localLevel = (() => { try { return localStorage.getItem('assessment_level'); } catch { return null; } })();

    if (!isAuthenticated) {
      // Guest: must have assessment_level in localStorage
      if (!localLevel) void navigate({ to: '/onboarding', search: { step: 'welcome' } });
      return;
    }

    // Authenticated: check onboarding_completed flag (source of truth)
    const onboardingDone = customSession?.user?.onboarding_completed;
    if (!onboardingDone) {
      void navigate({ to: '/onboarding', search: { step: 'welcome' } });
      return;
    }

    // Sync assessed_level to localStorage if missing (new device / cleared storage)
    if (!localLevel) {
      const dbLevel = customSession?.user?.assessed_level;
      if (dbLevel) {
        try { localStorage.setItem('assessment_level', dbLevel); } catch { /* ignore */ }
      }
    }
  }, [isPending, isAuthenticated, isCustomSessionLoading, customSession, navigate]);
  const streak = achievementsData?.streak;

  return (
    <main>
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Mobile stat pills */}
        <div className="mb-4 lg:hidden">
          <StatPills isAuthenticated={isAuthenticated} />
        </div>

        {/* Mobile assessment result */}
        <div className="mb-4 lg:hidden">
          <AssessmentResultCard />
        </div>

        {/* Mobile guest signup */}
        {!isAuthenticated && (
          <div className="mb-4 lg:hidden">
            <GuestSignupCard />
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6">
          {/* Left column: level tabs + steps */}
          <div className="space-y-4">
            <Tabs
              selectedKey={selectedLevel}
              onSelectionChange={(key) => setSelectedLevel(key as JLPTLevelId)}
            >
              <div className="overflow-x-auto">
                <TabList type="underline" size="sm">
                  {LEVEL_ORDER.map((lvl) => (
                    <Tab key={lvl} id={lvl} label={LEVEL_LABELS[lvl]} />
                  ))}
                </TabList>
              </div>

              {LEVEL_ORDER.map((lvl) => (
                <TabPanel key={lvl} id={lvl}>
                  <div className="pt-4">
                    <LevelStepsBlock
                      levelId={lvl}
                      isAuthenticated={isAuthenticated}
                      userId={session?.user?.id}
                      userLevel={userLevel}
                      streak={streak}
                    />
                  </div>
                </TabPanel>
              ))}
            </Tabs>
          </div>

          {/* Right column: stats + cards (desktop only) */}
          <aside className="hidden lg:flex lg:flex-col lg:gap-3">
            <StatPills isAuthenticated={isAuthenticated} />
            <AssessmentResultCard />
            <StreakCard streak={streak} />
            {isAuthenticated && achievementsData && (
              <>
                <XpProgressCard xp={achievementsData.xp} />
                <AchievementsSummaryCard
                  count={achievementsData.achievements.filter((a) => a.unlocked_at).length}
                />
              </>
            )}
            {!isAuthenticated && <GuestSignupCard />}
          </aside>
        </div>
      </div>
    </main>
  );
}
