import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/lib/toast';
import type { LevelProgressResult } from '@/types/learning';

type CompleteStepArgs = {
  user_id: string;
  level: string;
  step_slug: string;
};

type CompleteStepResponse = {
  success: boolean;
  completed_at: string;
  levelProgress: { completed: number; total: number };
  nextStep?: string;
  xpAwarded: number;
  totalXP: number;
  streak: number;
};

export function useCompleteStep(userId: string | undefined, level: string) {
  const queryClient = useQueryClient();

  return useMutation<CompleteStepResponse, Error, CompleteStepArgs>({
    mutationFn: async (data) => {
      const res = await fetch('/api/progress/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to save progress');
      return res.json() as Promise<CompleteStepResponse>;
    },

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['progress', data.user_id, data.level] });
      const previous = queryClient.getQueryData(['progress', data.user_id, data.level]);
      queryClient.setQueryData(['progress', data.user_id, data.level], (old: LevelProgressResult | undefined) => {
        if (!old) return old;
        return {
          ...old,
          completedSteps: old.completedSteps + 1,
          steps: old.steps.map((s) =>
            s.slug === data.step_slug ? { ...s, completed: true } : s
          ),
        };
      });
      return { previous };
    },

    onError: (_err, data, context) => {
      const ctx = context as { previous: unknown } | undefined;
      queryClient.setQueryData(['progress', data.user_id, data.level], ctx?.previous);
      toast.error('Gagal menyimpan. Coba lagi.');
    },

    onSuccess: (response) => {
      const nextMsg = response.nextStep ? ` Berikutnya: ${response.nextStep}` : '';
      toast.success(`Selamat! +${response.xpAwarded} XP.${nextMsg}`);
      if (response.streak > 1) {
        setTimeout(() => {
          toast.success(`${response.streak}-hari streak! 🔥`);
        }, 800);
      }
    },

    onSettled: (_data, _err, data) => {
      queryClient.invalidateQueries({ queryKey: ['progress', data.user_id, data.level] });
    },
  });
}
