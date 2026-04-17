import { authClient } from '@/lib/auth-client';
import { useAchievements } from '@/hooks/use-achievements';
import { AchievementGallery } from '@/components/application/achievement-gallery';
import { BadgeWithDot } from '@/components/base/badges/badges';
import { Button } from '@/components/base/buttons/button';

function getXPLabel(xp: number): string {
  if (xp < 50) return 'Pemula';
  if (xp < 100) return 'Pelajar';
  if (xp < 250) return 'Mahir';
  if (xp < 500) return 'Ahli';
  if (xp < 1000) return 'Master';
  return 'Legenda';
}

export function ProfilePage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  const { data, isPending: achievementsPending } = useAchievements(isAuthenticated);

  if (sessionPending) {
    return (
      <div className="pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <div className="h-8 w-48 rounded-lg bg-secondary animate-pulse mb-4" />
          <div className="h-4 w-32 rounded-lg bg-secondary animate-pulse mb-8" />
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="size-12 rounded-full bg-secondary animate-pulse" />
                <div className="h-3 w-16 rounded bg-secondary animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-2xl mx-auto px-4 pt-6 flex flex-col items-center justify-center gap-4 text-center py-20">
          <p className="text-primary text-xl font-semibold">Lihat koleksimu</p>
          <p className="text-tertiary text-sm">
            Login untuk melihat achievement dan progres XP kamu.
          </p>
          <Button color="primary" size="md" href="/auth/login">
            Login sekarang
          </Button>
        </div>
      </div>
    );
  }

  const xp = data?.xp ?? 0;
  const streak = data?.streak ?? 0;
  const xpLabel = getXPLabel(xp);

  const unlockedSlugs = new Set(
    (data?.achievements ?? [])
      .filter((a) => a.unlocked_at !== null)
      .map((a) => a.slug),
  );

  const unlockDates = new Map(
    (data?.achievements ?? [])
      .filter((a) => a.unlocked_at !== null)
      .map((a) => [a.slug, a.unlocked_at as string]),
  );

  return (
    <div className="pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-primary text-xl font-semibold mb-1">
            Koleksi Achievementmu
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-secondary text-sm font-medium">
              {xp} XP — {xpLabel}
            </span>
            {streak >= 2 && (
              <BadgeWithDot
                color={streak >= 30 ? 'error' : 'warning'}
              >
                {streak >= 30 ? `30+ day streak 🔥🔥🔥` : `${streak}-day streak 🔥`}
              </BadgeWithDot>
            )}
          </div>
        </div>

        {/* Achievement gallery */}
        {achievementsPending ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="size-12 rounded-full bg-secondary animate-pulse" />
                <div className="h-3 w-16 rounded bg-secondary animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <AchievementGallery
            unlockedSlugs={unlockedSlugs}
            unlockDates={unlockDates}
          />
        )}
      </div>
    </div>
  );
}
