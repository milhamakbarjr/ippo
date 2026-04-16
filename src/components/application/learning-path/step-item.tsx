import type { MouseEvent } from 'react';
import { CheckCircle } from '@untitledui/icons';
import { motion } from 'motion/react';
import { useNavigate } from '@tanstack/react-router';
import { Badge } from '@/components/base/badges/badges';
import { Button } from '@/components/base/buttons/button';
import type { Step } from '@/types/learning';

interface StepItemProps {
  step: Step;
  isCompleted: boolean;
  isRecommended: boolean;
  levelId: string;
}

export function StepItem({ step, isCompleted, isRecommended, levelId }: StepItemProps) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate({ to: '/learning/$level/$stepSlug', params: { level: levelId, stepSlug: step.slug } });
  }

  if (isRecommended) {
    return (
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0 0px rgba(105, 65, 198, 0)',
            '0 0 0 4px rgba(105, 65, 198, 0.1)',
            '0 0 0 0px rgba(105, 65, 198, 0)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-xl border border-secondary bg-primary p-4 border-l-4 border-l-[var(--color-bg-brand-solid)] min-h-[64px] cursor-pointer transition duration-100 ease-linear hover:bg-primary_hover"
        onClick={handleNavigate}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleNavigate();
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge type="pill-color" color="brand" size="sm">
                Berikutnya
              </Badge>
            </div>
            <p className="text-primary font-semibold text-sm">{step.title}</p>
            <p className="text-tertiary text-xs mt-0.5">{step.estimatedMinutes} menit</p>
          </div>
          <Button
            color="primary"
            size="sm"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              handleNavigate();
            }}
            className="shrink-0"
          >
            Mulai Step Ini
          </Button>
        </div>
      </motion.div>
    );
  }

  if (isCompleted) {
    return (
      <div
        className="rounded-xl border border-secondary bg-primary p-4 border-l-4 border-l-[var(--color-fg-success-secondary)] min-h-[64px] cursor-pointer transition duration-100 ease-linear hover:bg-primary_hover"
        onClick={handleNavigate}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleNavigate();
        }}
      >
        <div className="flex items-center gap-3">
          <CheckCircle
            className="size-5 text-fg-success-secondary shrink-0"
            aria-hidden="true"
          />
          <div className="flex-1 min-w-0">
            <p className="text-secondary text-sm font-medium line-through">{step.title}</p>
            <p className="text-tertiary text-xs mt-0.5">{step.estimatedMinutes} menit</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-secondary bg-primary p-4 border-l-4 border-l-[var(--color-border-secondary)] min-h-[64px] cursor-pointer transition duration-100 ease-linear hover:bg-primary_hover"
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleNavigate();
      }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-primary text-sm font-medium">{step.title}</p>
        <p className="text-tertiary text-xs mt-0.5">{step.estimatedMinutes} menit</p>
      </div>
    </div>
  );
}
