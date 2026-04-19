import { useQuery } from '@tanstack/react-query';

export type QuizSetListItem = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  level: string;
  set_type: string;
  categories: string[];
  is_published: boolean;
  created_at: string | null;
  question_count: number;
  isNew: boolean;
  isCompleted: boolean;
};

export type PoolStats = {
  level: string;
  pool: Record<string, number>;
  needed: Record<string, number>;
  total_needed: number;
  ready: boolean;
  shortage: number;
};

export function useQuizCatalog(level?: string) {
  const params = new URLSearchParams();
  if (level) params.set('level', level);
  const qs = params.toString();

  return useQuery<{ quizSets: QuizSetListItem[] }>({
    queryKey: ['quiz-catalog', level],
    queryFn: async () => {
      const res = await fetch(`/api/quiz-sets${qs ? `?${qs}` : ''}`);
      if (!res.ok) throw new Error('Gagal memuat katalog kuis');
      return res.json() as Promise<{ quizSets: QuizSetListItem[] }>;
    },
    staleTime: 1000 * 60,
  });
}

export function usePoolStats(level: string) {
  return useQuery<PoolStats>({
    queryKey: ['pool-stats', level],
    queryFn: async () => {
      const res = await fetch(`/api/quiz-sets/pool-stats?level=${level}`);
      if (!res.ok) throw new Error('Gagal memuat pool stats');
      return res.json() as Promise<PoolStats>;
    },
    staleTime: 1000 * 60 * 5,
  });
}
