import { useQuery } from '@tanstack/react-query';

type AchievementsResponse = {
  xp: number;
  streak: number;
  achievements: Array<{
    slug: string;
    unlocked_at: string | null;
  }>;
};

export function useAchievements(enabled: boolean) {
  return useQuery<AchievementsResponse>({
    queryKey: ['achievements'],
    queryFn: () =>
      fetch('/api/achievements').then((r) => {
        if (!r.ok) throw new Error('Failed to fetch achievements');
        return r.json() as Promise<AchievementsResponse>;
      }),
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 10,
    enabled,
  });
}
