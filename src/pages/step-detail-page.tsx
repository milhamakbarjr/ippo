import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { authClient } from '@/lib/auth-client';
import { toast } from '@/lib/toast';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Badge } from '@/components/base/badges/badges';
import { StepResourceLink } from '@/components/application/learning-path/step-resource-link';
import { ConfettiBurst } from '@/components/application/learning-path/confetti-burst';
import { Button } from '@/components/base/buttons/button';
import { QuizPrompt } from '@/components/application/quiz-prompt';
import { Route } from '@/routes/learning/$level.$stepSlug';
import { useCompleteStep } from '@/hooks/use-complete-step';
import { isStepComplete, markStepComplete } from '@/utils/guest-progress';
import kanaLevel from '@/content/kana';
import n5Level from '@/content/n5';
import n4Level from '@/content/n4';
import n3Level from '@/content/n3';
import n2Level from '@/content/n2';
import n1Level from '@/content/n1';
import type { JLPTLevelId, Level, LevelProgressResult } from '@/types/learning';

const LEVELS: Partial<Record<JLPTLevelId, Level>> = {
  kana: kanaLevel,
  n5: n5Level,
  n4: n4Level,
  n3: n3Level,
  n2: n2Level,
  n1: n1Level,
};

const LEVEL_QUIZ_SLUGS: Partial<Record<string, string>> = {
  n5: 'n5-vocab',
  n4: 'n4-vocab',
  n3: 'n3-vocab',
  n2: 'n2-grammar',
  n1: 'n1-grammar',
  // kana has no quiz
};

function track(event: string, data: Record<string, unknown>) {
  // Stub — will be wired to analytics in Sprint 09
  console.debug('[track]', event, data);
}

export function StepDetailPage() {
  const { level: levelParam, stepSlug } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [showConfetti, setShowConfetti] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [showQuizPrompt, setShowQuizPrompt] = useState(false);

  const mutation = useCompleteStep(user?.id, levelParam);

  const levelConfig = LEVELS[levelParam as JLPTLevelId];

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

  void prevStep;

  // Determine completion state: authenticated users read from TanStack Query cache,
  // guest users read from localStorage via guest-progress utility.
  const cachedProgress = queryClient.getQueryData<LevelProgressResult>(['progress', user?.id, levelParam]);
  const isCompleted = user
    ? (cachedProgress?.steps.find((s) => s.slug === stepSlug)?.completed ?? false)
    : isStepComplete(stepSlug);

  function handleComplete() {
    if (isCompleted) return;

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 800);
    setShowQuizPrompt(true);

    if (user) {
      setShowXP(true);
      mutation.mutate({ user_id: user.id, level: levelParam, step_slug: stepSlug });
    } else {
      markStepComplete(stepSlug);
      toast.success('Selamat! Progres disimpan di browser ini. Buat akun untuk sinkronisasi.', {
        duration: 6000,
        action: {
          label: 'Daftar Gratis',
          onClick: () => void navigate({ to: '/auth/register' }),
        },
      });
    }
  }

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

        {/* Completion section */}
        <div className="relative mt-8 flex items-center gap-3">
          <ConfettiBurst show={showConfetti} />
          <motion.div
            animate={showConfetti ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Checkbox
              isSelected={isCompleted}
              isDisabled={isCompleted || mutation.isPending}
              onChange={handleComplete}
              label="Tandai Selesai"
              aria-label="Tandai langkah ini selesai"
            />
          </motion.div>

          {/* XP flash badge — only for authenticated users */}
          {user && showXP && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: [0, 1, 1, 0], y: [-8, 0, 0, -8] }}
              transition={{ duration: 1, times: [0, 0.2, 0.8, 1] }}
              onAnimationComplete={() => setShowXP(false)}
            >
              <Badge color="brand">+10 XP</Badge>
            </motion.div>
          )}
        </div>

        {/* Quiz prompt — shown after step completion */}
        {showQuizPrompt && LEVEL_QUIZ_SLUGS[levelParam] && (
          <QuizPrompt
            quizSlug={LEVEL_QUIZ_SLUGS[levelParam]!}
            onDismiss={() => setShowQuizPrompt(false)}
          />
        )}

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
