import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client';
import { useAchievements } from '@/hooks/use-achievements';
import { Tab, TabList, TabPanel, Tabs } from '@/components/application/tabs/tabs';
import { SidebarIppo, SIDEBAR_WIDTH } from './components/sidebar-ippo';
import { StatPills } from './components/stat-pills';
import { StreakCard } from './components/streak-card';
import { XpProgressCard } from './components/xp-progress-card';
import { AchievementsSummaryCard } from './components/achievements-summary-card';
import { GuestSignupCard } from './components/guest-signup-card';
import { LevelStepsBlock } from './components/level-steps-block';
import { dashboardNavItems, dashboardFooterItems } from './components/dashboard-nav-items';
import { LEVEL_ORDER, LEVEL_LABELS } from '@/content/levels';
import type { JLPTLevelId } from '@/types/learning';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = !!session?.user;
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

  // Sync selected level from session once loaded
  useEffect(() => {
    if (!session?.user) return;
    try {
      const stored = sessionStorage.getItem('user_level') as JLPTLevelId | null;
      if (!stored || !LEVEL_ORDER.includes(stored)) {
        const dbLevel = (session.user as { assessed_level?: string }).assessed_level as JLPTLevelId | undefined;
        if (dbLevel && LEVEL_ORDER.includes(dbLevel)) {
          setSelectedLevel(dbLevel);
        }
      }
    } catch { /* ignore */ }
  }, [session?.user]);

  // Gate: guest with no localStorage level, or authenticated with no level → onboarding
  useEffect(() => {
    if (isPending) return; // still loading
    const localLevel = (() => { try { return localStorage.getItem('assessment_level'); } catch { return null; } })();
    if (!localLevel) {
      if (!isAuthenticated) {
        void navigate({ to: '/onboarding', search: { step: 'welcome' } });
      } else {
        const dbLevel = (session?.user as { assessed_level?: string } | undefined)?.assessed_level;
        if (!dbLevel) {
          void navigate({ to: '/onboarding', search: { step: 'welcome' } });
        } else {
          // Write DB level to localStorage so future loads skip this check
          try { localStorage.setItem('assessment_level', dbLevel); } catch { /* ignore */ }
        }
      }
    }
  }, [isPending, isAuthenticated, session, navigate]);
  const streak = achievementsData?.streak;

  return (
    <div className="min-h-dvh bg-primary">
      <SidebarIppo
        activeUrl="/"
        items={dashboardNavItems}
        footerItems={dashboardFooterItems}
        showAccountCard
      />

      <main className="lg:pl-(--sidebar-w)" style={{ '--sidebar-w': `${SIDEBAR_WIDTH}px` } as React.CSSProperties}>
        <div className="mx-auto max-w-5xl px-4 py-6">
          {/* Mobile stat pills */}
          <div className="mb-4 lg:hidden">
            <StatPills isAuthenticated={isAuthenticated} />
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
    </div>
  );
}
