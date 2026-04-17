import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { ArrowLeft } from '@untitledui/icons';
import { authClient } from '@/lib/auth-client';
import { toast } from '@/lib/toast';
import { Button } from '@/components/base/buttons/button';
import { Badge } from '@/components/base/badges/badges';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { StepResourceLink } from '@/components/application/learning-path/step-resource-link';
import { ConfettiBurst } from '@/components/application/learning-path/confetti-burst';
import { CharacterGrid } from '@/pages/letters/components/character-grid';
import { LEVEL_PATH_CONFIGS } from '@/content/sections';
import { LEVELS } from '@/content/levels';
import { UNIT_CHARACTER_SECTIONS } from '@/content/kana/unit-content';
import { Route } from '@/routes/learning/$level.unit.$sectionSlug.$unitSlug';
import { useCompleteStep } from '@/hooks/use-complete-step';
import { isStepComplete, markStepComplete } from '@/utils/guest-progress';
import type { JLPTLevelId, LevelProgressResult, StepResource } from '@/types/learning';

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
      return parsed.searchParams.get('v');
    }
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1) || null;
    }
  } catch { /* invalid URL */ }
  return null;
}

function YouTubeEmbed({ resource }: { resource: StepResource }) {
  const videoId = getYouTubeVideoId(resource.url);
  if (!videoId) return null;
  return (
    <div className="mb-4">
      <p className="text-secondary text-sm font-medium mb-2">{resource.title}</p>
      <div className="relative w-full overflow-hidden rounded-xl border border-secondary" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={resource.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export function UnitLearningPage() {
  const { level, sectionSlug, unitSlug } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [showConfetti, setShowConfetti] = useState(false);
  const [showXP, setShowXP] = useState(false);

  const levelConfig = LEVEL_PATH_CONFIGS[level as JLPTLevelId];
  const section = levelConfig?.sections.find((s) => s.slug === sectionSlug);
  const unit = section?.units.find((u) => u.slug === unitSlug);
  const characterSections = UNIT_CHARACTER_SECTIONS[unit?.slug ?? ''] ?? [];

  // Step data for resources + completion
  const levelData = LEVELS[level as JLPTLevelId];
  const stepSlug = unit?.stepSlugs[0];
  const step = stepSlug ? levelData?.steps.find((s) => s.slug === stepSlug) : undefined;

  const mutation = useCompleteStep(user?.id, level);

  if (!unit) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-4 pb-[env(safe-area-inset-bottom)]">
        <p className="text-primary text-xl font-semibold mb-2">Unit tidak ditemukan</p>
        <p className="text-tertiary text-sm mb-6">Unit ini belum tersedia.</p>
        <Button
          color="tertiary"
          size="sm"
          iconLeading={ArrowLeft}
          onClick={() => navigate({ to: '/' })}
        >
          Kembali ke Dashboard
        </Button>
      </div>
    );
  }

  const unitContent = unit.content;

  // Completion state
  const cachedProgress = queryClient.getQueryData<LevelProgressResult>(['progress', user?.id, level]);
  const isCompleted = stepSlug
    ? user
      ? (cachedProgress?.steps.find((s) => s.slug === stepSlug)?.completed ?? false)
      : isStepComplete(stepSlug)
    : false;

  function handleComplete() {
    if (isCompleted || !stepSlug) return;

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 800);

    if (user) {
      setShowXP(true);
      mutation.mutate({ user_id: user.id, level, step_slug: stepSlug });
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

  // Find next unit for navigation
  const allUnits = levelConfig?.sections.flatMap((s) =>
    s.units.map((u) => ({ ...u, sectionSlug: s.slug })),
  ) ?? [];
  const currentIdx = allUnits.findIndex((u) => u.slug === unitSlug);
  const nextUnit = currentIdx >= 0 && currentIdx < allUnits.length - 1
    ? allUnits[currentIdx + 1]
    : undefined;

  return (
    <div className="pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">
        {/* Back button */}
        <Button
          color="link-gray"
          size="sm"
          iconLeading={ArrowLeft}
          onClick={() => navigate({ to: '/' })}
          className="mb-6"
        >
          Kembali ke Dashboard
        </Button>

        {/* Hero: mascot + title */}
        <div className="flex items-start gap-4 mb-8">
          <img
            src="/images/onboarding-mascot.png"
            alt=""
            aria-hidden="true"
            className="w-20 h-24 object-contain shrink-0"
          />
          <div>
            <h1 className="text-primary font-bold text-xl">{unit.title}</h1>
            <p className="text-tertiary text-sm mt-1">
              Pelajari {unit.title}
            </p>
            {step && (
              <p className="text-secondary text-xs mt-2">
                {step.estimatedMinutes} menit
              </p>
            )}
          </div>
        </div>

        <hr className="border-secondary mb-8" />

        {/* KARAKTER section */}
        {characterSections.length > 0 && (
          <section className="mb-8">
            <p className="text-brand-secondary text-xs font-semibold uppercase tracking-widest mb-3">
              KARAKTER
            </p>
            <h2 className="text-primary font-bold text-lg mb-4">{unit.title}</h2>

            <div className="flex flex-col gap-6">
              {characterSections.map((charSection) => (
                <CharacterGrid key={charSection.title} section={charSection} />
              ))}
            </div>
          </section>
        )}

        {/* PANDUAN PENGUCAPAN section */}
        {unitContent?.pronunciationCards && unitContent.pronunciationCards.length > 0 && (
          <section className="mb-8">
            <p className="text-brand-secondary text-xs font-semibold uppercase tracking-widest mb-3">
              PANDUAN PENGUCAPAN
            </p>

            <div className="flex flex-col gap-3">
              {unitContent.pronunciationCards.map((card, i) => (
                <div key={i} className="rounded-xl border border-secondary bg-primary p-4 flex items-center gap-4">
                  <div className="min-w-14 min-h-14 px-2 py-2 rounded-xl bg-brand-section flex items-center justify-center shrink-0">
                    <span className="text-2xl text-fg-white font-bold leading-tight text-center">{card.char}</span>
                  </div>
                  <div>
                    <p className="text-brand-secondary text-sm font-semibold">{card.romaji}</p>
                    <p className="text-tertiary text-sm">{card.comparison}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TIPS MENGHAFAL section */}
        {unitContent?.mnemonics && unitContent.mnemonics.length > 0 && (
          <section className="mb-8">
            <p className="text-brand-secondary text-xs font-semibold uppercase tracking-widest mb-3">
              TIPS MENGHAFAL
            </p>

            {unitContent.mnemonics.map((mnemonic, i) => (
              <div key={i} className="rounded-xl bg-secondary border border-secondary p-4 mb-4">
                <p className="text-primary font-bold text-base mb-2">{mnemonic.title}</p>
                <p className="text-tertiary text-sm leading-relaxed">{mnemonic.body}</p>
              </div>
            ))}
          </section>
        )}

        {/* LATIHAN section */}
        {unitContent?.practicePrompts && unitContent.practicePrompts.length > 0 && (
          <section className="mb-8">
            <p className="text-brand-secondary text-xs font-semibold uppercase tracking-widest mb-3">
              LATIHAN
            </p>

            <ol className="space-y-3">
              {unitContent.practicePrompts.map((prompt, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-solid text-fg-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-secondary text-sm">{prompt}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* SUMBER BELAJAR section */}
        {step && step.resources.length > 0 && (
          <section className="mb-8">
            <p className="text-brand-secondary text-xs font-semibold uppercase tracking-widest mb-3">
              SUMBER BELAJAR
            </p>

            {/* Embeddable YouTube videos */}
            {step.resources
              .filter((r) => r.type === 'video' && getYouTubeVideoId(r.url))
              .map((resource) => (
                <YouTubeEmbed key={resource.url} resource={resource} />
              ))}

            {/* External resource links */}
            <motion.div
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
              }}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-2"
            >
              {step.resources
                .filter((r) => !(r.type === 'video' && getYouTubeVideoId(r.url)))
                .map((resource) => (
                  <motion.div
                    key={resource.url}
                    variants={{
                      hidden: { opacity: 0, y: 6 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <StepResourceLink resource={resource} onTrack={() => {}} />
                  </motion.div>
                ))}
            </motion.div>
          </section>
        )}

        {/* Completion section */}
        {stepSlug && (
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
        )}

        {/* Navigation buttons */}
        <div className={`mt-8 flex flex-col gap-3 ${nextUnit ? 'md:flex-row md:justify-between' : ''}`}>
          <Button
            color="tertiary"
            size="sm"
            onClick={() => navigate({ to: '/' })}
          >
            ← Kembali
          </Button>

          {nextUnit && (
            <Button
              color="primary"
              size="sm"
              onClick={() =>
                navigate({
                  to: '/learning/$level/unit/$sectionSlug/$unitSlug',
                  params: { level, sectionSlug: nextUnit.sectionSlug, unitSlug: nextUnit.slug },
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
