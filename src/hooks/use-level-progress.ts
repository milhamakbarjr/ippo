// @ts-expect-error — @tanstack/react-query will be installed by UI agent
import { useQuery } from '@tanstack/react-query';
import type { LevelProgressResult } from '@/types/learning';

/**
 * TanStack Query hook for authenticated user's level progress.
 * Falls back gracefully when user is not authenticated.
 */
export function useLevelProgress(level: string, userId: string | undefined) {
  return useQuery<LevelProgressResult>({
    queryKey: ['progress', userId, level],
    queryFn: async () => {
      const res = await fetch(`/api/learning/${level}/progress`);
      if (!res.ok) throw new Error('Failed to fetch progress');
      return res.json() as Promise<LevelProgressResult>;
    },
    staleTime: 1000 * 60 * 5,    // 5 minutes
    gcTime: 1000 * 60 * 30,      // 30 minutes in memory
    enabled: !!userId,             // Only fetch when authenticated
    retry: 1,
  });
}
