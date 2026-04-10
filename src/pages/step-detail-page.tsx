import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { StepResourceLink } from '@/components/application/learning-path/step-resource-link';
import { Button } from '@/components/base/buttons/button';
import { Route } from '@/routes/learning/$level.$stepSlug';
import kanaLevel from '@/content/kana';
import n4Level from '@/content/n4';
import n5Level from '@/content/n5';
import type { JLPTLevelId, Level } from '@/types/learning';

const LEVELS: Partial<Record<JLPTLevelId, Level>> = {
  kana: kanaLevel,
  n5: n5Level,
  n4: n4Level,
};

function track(event: string, data: Record<string, unknown>) {
  // Stub — will be wired to analytics in Sprint 09
  console.debug('[track]', event, data);
}

function isStepCompleted(levelId: string, stepSlug: string): boolean {
  try {
    return localStorage.getItem(`ippo_progress_${levelId}_${stepSlug}`) === 'true';
  } catch {
    return false;
  }
}

export function StepDetailPage() {
  const { level: levelParam, stepSlug } = Route.useParams();
  const navigate = useNavigate();

  const levelConfig = LEVELS[levelParam as JLPTLevelId];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        navigate({ to: '/learning/$level', params: { level: levelParam } });
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [levelParam, navigate]);

  if (!levelConfig) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-4 pb-[env(safe-area-inset-bottom)]">
        <p className="text-primary text-xl font-semibold mb-2">Level tidak ditemukan</p>
        <Button color="tertiary" size="sm" href="/learning">
          ← Kembali ke Jalur Belajar
        </Button>
      </div>
    );
  }

  const stepIndex = levelConfig.steps.findIndex((s) => s.slug === stepSlug);
  const step = stepIndex >= 0 ? levelConfig.steps[stepIndex] : undefined;

  if (!step) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-4 pb-[env(safe-area-inset-bottom)]">
        <p className="text-primary text-xl font-semibold mb-2">Step ini belum siap.</p>
        <p className="text-tertiary text-sm mb-6">Coba later atau pilih step lain.</p>
        <Button
          color="tertiary"
          size="sm"
          onClick={() => navigate({ to: '/learning/$level', params: { level: levelParam } })}
        >
          ← Kembali ke Jalur Belajar
        </Button>
      </div>
    );
  }

  const prevStep = stepIndex > 0 ? levelConfig.steps[stepIndex - 1] : undefined;
  const nextStep = stepIndex < levelConfig.steps.length - 1 ? levelConfig.steps[stepIndex + 1] : undefined;
  const isCompleted = isStepCompleted(levelParam, stepSlug);

  void prevStep;

  return (
    <div className="min-h-dvh bg-primary pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Back button */}
        <Button
          color="tertiary"
          size="sm"
          onClick={() => navigate({ to: '/learning/$level', params: { level: levelParam } })}
          className="mb-4"
        >
          ← Kembali
        </Button>

        {/* Step heading */}
        <h1 className="text-primary text-3xl font-bold mb-2">{step.title}</h1>
        <p className="text-tertiary text-base mb-3">{step.description}</p>
        <p className="text-secondary text-sm mb-6">⏱ {step.estimatedMinutes} menit</p>

        {/* Resources section */}
        <h2 className="text-secondary text-xl font-semibold mt-6 mb-3">Sumber Belajar</h2>

        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2 md:flex-row md:flex-wrap"
        >
          {step.resources.map((resource) => (
            <motion.div
              key={resource.url}
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: { opacity: 1, y: 0 },
              }}
              className="md:w-auto md:flex-1 md:min-w-[200px]"
            >
              <StepResourceLink
                resource={resource}
                onTrack={() =>
                  track('resource_clicked', {
                    level: levelParam,
                    step: stepSlug,
                    resource: resource.url,
                  })
                }
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Completion checkbox (disabled — wired in Sprint 05) */}
        <div className="flex items-center gap-2 mt-8">
          <input
            type="checkbox"
            id="mark-complete"
            disabled
            checked={isCompleted}
            readOnly
            className="size-4 cursor-not-allowed opacity-50 accent-[var(--color-bg-brand-solid)]"
          />
          <label htmlFor="mark-complete" className="text-secondary text-sm cursor-not-allowed opacity-50">
            Tandai Selesai
          </label>
        </div>

        {/* Navigation buttons */}
        <div
          className={`mt-8 flex flex-col gap-3 ${nextStep ? 'md:flex-row md:justify-between' : ''}`}
        >
          <Button
            color="tertiary"
            size="sm"
            onClick={() => navigate({ to: '/learning/$level', params: { level: levelParam } })}
          >
            ← Kembali ke Jalur
          </Button>

          {nextStep && (
            <Button
              color="primary"
              size="sm"
              onClick={() =>
                navigate({
                  to: '/learning/$level/$stepSlug',
                  params: { level: levelParam, stepSlug: nextStep.slug },
                })
              }
            >
              Lanjut ke Step Berikutnya →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
