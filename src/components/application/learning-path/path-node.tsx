import { CheckCircle, Star01, Lock01 } from '@untitledui/icons';
import { motion } from 'motion/react';
import { useNavigate } from '@tanstack/react-router';
import { Badge } from '@/components/base/badges/badges';
import type { Step } from '@/types/learning';

interface PathNodeProps {
  step: Step;
  levelId: string;
  status: 'completed' | 'current' | 'locked';
  isFirst?: boolean;
  hasProgress?: boolean;
  sectionSlug: string;
  unitSlug: string;
}

export function PathNode({ step, levelId, status, isFirst, hasProgress, sectionSlug, unitSlug }: PathNodeProps) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate({
      to: '/learning/$level/unit/$sectionSlug/$unitSlug',
      params: { level: levelId, sectionSlug, unitSlug },
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigate();
    }
  }

  const circleBase =
    'w-16 h-16 rounded-full flex items-center justify-center focus:outline-none transition duration-100 ease-linear';

  return (
    <div className="flex flex-col items-center gap-2">
      {isFirst && !hasProgress && (
        <Badge type="pill-color" color="success" size="sm">
          MULAI
        </Badge>
      )}

      {status === 'current' ? (
        <motion.button
          type="button"
          className={`${circleBase} bg-brand-solid cursor-pointer`}
          animate={{
            boxShadow: [
              '0 0 0 0px rgba(105,65,198,0)',
              '0 0 0 8px rgba(105,65,198,0.25)',
              '0 0 0 0px rgba(105,65,198,0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={handleNavigate}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <Star01 className="size-7 text-fg-white" aria-hidden="true" />
        </motion.button>
      ) : (
        <button
          type="button"
          className={`${circleBase} ${
            status === 'completed'
              ? 'bg-[var(--color-utility-green-600)] cursor-pointer'
              : 'bg-tertiary border border-secondary opacity-60 cursor-default'
          }`}
          onClick={status === 'completed' ? handleNavigate : undefined}
          onKeyDown={status === 'completed' ? handleKeyDown : undefined}
          tabIndex={status === 'completed' ? 0 : -1}
          disabled={status === 'locked'}
          aria-disabled={status === 'locked'}
        >
          {status === 'completed' && (
            <CheckCircle className="size-7 text-fg-white" aria-hidden="true" />
          )}
          {status === 'locked' && (
            <Lock01 className="size-6 text-fg-quaternary" aria-hidden="true" />
          )}
        </button>
      )}

      <p className="text-xs text-secondary text-center w-20 line-clamp-2">
        {step.title}
      </p>
    </div>
  );
}
