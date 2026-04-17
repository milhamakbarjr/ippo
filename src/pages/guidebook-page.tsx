import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import { AlertFloating } from '@/components/application/alerts/alerts';
import { LEVEL_PATH_CONFIGS } from '@/content/sections';
import { Route } from '@/routes/learning/$level.guidebook.$sectionSlug.$unitSlug';
import type { JLPTLevelId } from '@/types/learning';

export function GuidebookPage() {
  const { level, sectionSlug } = Route.useParams();
  const navigate = useNavigate();

  const levelConfig = LEVEL_PATH_CONFIGS[level as JLPTLevelId];
  const section = levelConfig?.sections.find((s) => s.slug === sectionSlug);

  if (!section) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-4 pb-[env(safe-area-inset-bottom)]">
        <p className="text-primary text-xl font-semibold mb-2">Panduan tidak ditemukan</p>
        <p className="text-tertiary text-sm mb-6">Seksi ini belum tersedia.</p>
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

  const guide = section.guide;

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
          Kembali
        </Button>

        {/* Hero: mascot + title + description */}
        <div className="flex items-start gap-4 mb-8">
          <img
            src="/images/onboarding-mascot.png"
            alt=""
            aria-hidden="true"
            className="w-20 h-24 object-contain shrink-0"
          />
          <div>
            <h1 className="text-primary font-bold text-xl">{guide.title}</h1>
            <p className="text-tertiary text-sm mt-1">{guide.description}</p>
          </div>
        </div>

        <hr className="border-secondary mb-8" />

        {/* TUJUAN PEMBELAJARAN */}
        <section className="mb-8">
          <p className="text-brand-secondary text-xs font-semibold uppercase tracking-widest mb-4">
            TUJUAN PEMBELAJARAN
          </p>
          <ol className="space-y-3">
            {guide.objectives.map((obj, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-solid text-fg-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-secondary text-sm">{obj}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* STRATEGI BELAJAR */}
        <section className="mb-8">
          <p className="text-brand-secondary text-xs font-semibold uppercase tracking-widest mb-4">
            STRATEGI BELAJAR
          </p>
          {guide.strategies.map((strategy, i) => (
            <div key={i} className="rounded-xl bg-secondary border border-secondary p-4 mb-3">
              <p className="text-primary font-bold text-sm mb-1">{strategy.title}</p>
              <p className="text-tertiary text-sm leading-relaxed">{strategy.body}</p>
            </div>
          ))}
        </section>

        {/* KESALAHAN UMUM */}
        <section className="mb-8">
          <p className="text-brand-secondary text-xs font-semibold uppercase tracking-widest mb-4">
            KESALAHAN UMUM
          </p>
          {guide.commonMistakes.map((mistake, i) => (
            <div key={i} className="mb-3">
              <AlertFloating
                color="warning"
                title={mistake.title}
                description={mistake.body}
                confirmLabel=""
              />
            </div>
          ))}
        </section>

        {/* Bottom back button */}
        <Button
          color="tertiary"
          size="sm"
          onClick={() => navigate({ to: '/' })}
        >
          ← Kembali ke Jalur
        </Button>
      </div>
    </div>
  );
}
