import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { CheckCircle } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';
import { levelInfo } from '@/utils/calculate-level';
import { useAssessmentStore } from '@/stores/assessment-store';
import type { AssessmentResult } from '@/types/assessment';

export function AssessmentResultPage() {
  const navigate = useNavigate();
  const { reset } = useAssessmentStore();

  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem('assessment_result');
      if (raw) {
        setResult(JSON.parse(raw) as AssessmentResult);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Redirect if no result after mount
  useEffect(() => {
    if (mounted && !result) {
      void navigate({ to: '/assessment' });
    }
  }, [mounted, result, navigate]);

  function handleStartLearning() {
    if (!result) return;
    try {
      sessionStorage.setItem('user_level', result.assessedLevel);
    } catch {
      // ignore storage errors
    }
    void navigate({ to: '/learning' });
  }

  function handleRetry() {
    reset();
    void navigate({ to: '/assessment' });
  }

  if (!mounted || !result) return null;

  const info = levelInfo[result.assessedLevel];
  const showEncouragement = result.score <= 2;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-sm space-y-6"
      >
        {/* Icon */}
        <div className="flex justify-center">
          <FeaturedIcon
            color="success"
            theme="light"
            size="xl"
            icon={CheckCircle}
          />
        </div>

        {/* Heading */}
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-bold text-brand-primary">
            Kamu level {info.label}! {info.emoji}
          </h1>
          <p className="text-tertiary">
            {result.score} dari {result.totalQuestions} pertanyaan benar
          </p>

          {showEncouragement && (
            <p className="pt-1 text-sm text-brand-secondary">
              Jangan khawatir! Setiap perjalanan dimulai dari satu langkah. Kamu pasti bisa! 💪
            </p>
          )}
        </div>

        {/* Result card */}
        <div className="space-y-4 rounded-xl border border-secondary bg-primary p-6 shadow-sm">
          <p className="text-sm text-tertiary">{info.description}</p>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-sm font-medium text-secondary">⏱</span>
              <div>
                <p className="text-xs text-tertiary">Estimasi waktu ke N2</p>
                <p className="text-sm font-semibold text-primary">{info.estimateToN2}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-sm font-medium text-secondary">👣</span>
              <div>
                <p className="text-xs text-tertiary">Step berikutnya</p>
                <p className="text-sm font-semibold text-primary">{info.firstStep}</p>
              </div>
            </div>
          </div>

          <Button
            color="primary"
            size="lg"
            className="w-full"
            onClick={handleStartLearning}
          >
            Lihat Jalur Belajarmu
          </Button>
        </div>

        {/* Secondary actions */}
        <div className="flex flex-col items-center gap-2">
          <Button
            color="link-color"
            size="sm"
            href="/learning"
          >
            Jelajahi semua level
          </Button>

          <Button
            color="link-color"
            size="sm"
            onClick={handleRetry}
          >
            Coba lagi penilaian?
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
