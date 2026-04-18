import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/base/buttons/button';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';
import { GraduationHat01, RefreshCcw01 } from '@untitledui/icons';
import { levelInfo } from '@/utils/calculate-level';
import { LEVELS } from '@/content/levels';
import { getLevelProgress } from '@/utils/guest-progress';
import type { AssessmentResult, JLPTLevel } from '@/types/assessment';

export function AssessmentResultCard() {
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('assessment_result');
      if (raw) setResult(JSON.parse(raw) as AssessmentResult);
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  function handleRetake() {
    void navigate({ to: '/onboarding', search: { step: 'welcome' } });
  }

  if (!loaded) return null;

  // User never took the quiz (skipped or never completed)
  if (!result) {
    return (
      <div className="rounded-xl border border-secondary bg-primary p-4">
        <div className="flex items-start gap-3">
          <FeaturedIcon icon={GraduationHat01} color="gray" theme="modern" size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-primary font-semibold text-sm">Belum ada hasil assessment</p>
            <p className="text-tertiary text-xs mt-0.5 leading-relaxed">
              Ikuti assessment untuk mengetahui level Jepangmu dan mendapatkan jalur belajar yang tepat.
            </p>
          </div>
        </div>
        <Button
          color="primary"
          size="sm"
          className="w-full mt-3"
          onClick={handleRetake}
        >
          Ambil Assessment
        </Button>
      </div>
    );
  }

  const info = levelInfo[result.assessedLevel];
  const scorePercent = Math.round((result.score / result.totalQuestions) * 100);

  return (
    <div className="rounded-xl border border-secondary bg-primary p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <FeaturedIcon icon={GraduationHat01} color="brand" theme="modern" size="md" />
        <div className="flex-1 min-w-0">
          <p className="text-secondary text-xs font-medium">Hasil Assessment</p>
          <p className="text-primary font-bold text-base leading-tight">
            {info.emoji} Level {info.label}
          </p>
        </div>
      </div>

      <p className="text-tertiary text-xs leading-relaxed mb-3">
        {info.description}
      </p>

      {/* Score row */}
      <div className="flex items-center justify-between text-xs mb-3">
        <span className="text-secondary">Skor</span>
        <span className="text-primary font-semibold">{result.score}/{result.totalQuestions} ({scorePercent}%)</span>
      </div>

      {/* Journey indicator */}
      <JourneyIndicator current={result.assessedLevel} />

      <Button
        color="tertiary"
        size="sm"
        iconLeading={RefreshCcw01}
        className="mt-3 w-full"
        onClick={handleRetake}
      >
        Ambil Assessment Ulang
      </Button>
    </div>
  );
}

const JOURNEY: JLPTLevel[] = ['kana', 'n5', 'n4', 'n3', 'n2', 'n1'];
const JOURNEY_LABELS: Record<JLPTLevel, string> = {
  kana: 'Kana', n5: 'N5', n4: 'N4', n3: 'N3', n2: 'N2', n1: 'N1',
};

function JourneyIndicator({ current }: { current: JLPTLevel }) {
  const currentIdx = JOURNEY.indexOf(current);

  // Compute actual completion % per level from localStorage (guest)
  const progressByLevel = useMemo(() => {
    const result: Record<JLPTLevel, number> = {} as Record<JLPTLevel, number>;
    for (const lvl of JOURNEY) {
      const levelData = LEVELS[lvl];
      result[lvl] = levelData ? getLevelProgress(levelData).progressPercent : 0;
    }
    return result;
  }, []);

  return (
    <div className="flex items-center gap-1">
      {JOURNEY.map((level, i) => {
        const isCurrent = i === currentIdx;
        const pct = progressByLevel[level];
        const isComplete = pct === 100;
        const hasProgress = pct > 0;

        return (
          <div key={level} className="flex items-center gap-1 flex-1">
            <div className="flex flex-col items-center gap-0.5 flex-1">
              {/* Track with proportional fill */}
              <div className="relative w-full h-1.5 rounded-full bg-tertiary overflow-hidden">
                {pct > 0 && (
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full ${
                      isComplete
                        ? 'bg-success-primary'
                        : isCurrent || hasProgress
                        ? 'bg-brand-solid'
                        : 'bg-tertiary'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isComplete ? 'text-success-primary' : isCurrent ? 'text-brand-secondary' : 'text-tertiary'
                }`}
              >
                {JOURNEY_LABELS[level]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
