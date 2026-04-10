import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@/components/base/buttons/button';
import { ProgressBarBase } from '@/components/base/progress-indicators/progress-indicators';
import { RadioButton, RadioGroup } from '@/components/base/radio-buttons/radio-buttons';
import { questions } from '@/content/onboarding-assessment';
import { useAssessmentStore } from '@/stores/assessment-store';
import type { AssessmentDraft } from '@/types/assessment';

type ViewState = 'intro' | 'resume' | 'question';

export function AssessmentPage() {
  const navigate = useNavigate();

  const {
    currentQuestion,
    answers,
    setAnswer,
    advance,
    submit,
    reset,
    restoreFromDraft,
    saveDraft,
  } = useAssessmentStore();

  const [view, setView] = useState<ViewState>('intro');
  const [draft, setDraft] = useState<AssessmentDraft | null>(null);

  // Check for existing draft on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('assessment_answers_draft');
      if (raw) {
        const parsed = JSON.parse(raw) as AssessmentDraft;
        if (parsed && Object.keys(parsed.answers).length > 0) {
          setDraft(parsed);
          setView('resume');
          return;
        }
      }
    } catch {
      // ignore parse errors
    }
    setView('intro');
  }, []);

  // Save draft on page unload
  useEffect(() => {
    const handler = () => saveDraft();
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [saveDraft]);

  const question = questions[currentQuestion];
  const selectedOptionId = answers[question?.id ?? ''] ?? '';
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progressValue = (currentQuestion / questions.length) * 100;

  function handleStart() {
    reset();
    setView('question');
  }

  function handleResume() {
    if (draft) {
      restoreFromDraft(draft);
      setView('question');
    }
  }

  function handleStartFresh() {
    reset();
    setDraft(null);
    setView('intro');
  }

  function handleNext() {
    if (!selectedOptionId) return;

    if (isLastQuestion) {
      const result = submit(questions);
      // Fire-and-forget for authenticated users
      try {
        const authUser = sessionStorage.getItem('auth_user');
        if (authUser) {
          fetch('/api/assessment/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ result }),
          }).catch(() => {
            // non-blocking, ignore errors
          });
        }
      } catch {
        // ignore
      }
      void navigate({ to: '/assessment/result' });
    } else {
      advance();
    }
  }

  if (view === 'intro') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-primary px-4 py-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-primary">Penilaian Level Kamu</h1>
            <p className="text-tertiary">Cepat, gratis, tanpa perlu daftar (5 menit)</p>
            <p className="text-sm text-secondary">Pilih jawaban yang paling tepat untuk setiap pertanyaan.</p>
          </div>

          <div className="space-y-3">
            <Button
              color="primary"
              size="lg"
              className="w-full"
              onClick={handleStart}
            >
              Mulai Penilaian
            </Button>

            <div className="flex justify-center">
              <Button
                color="link-color"
                size="sm"
                href="/learning"
              >
                Jelajahi semua level
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'resume' && draft) {
    const answeredCount = Object.keys(draft.answers).length;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-primary px-4 py-12">
        <div className="w-full max-w-sm space-y-4 rounded-xl border border-secondary bg-primary p-6 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-primary">Lanjutkan penilaian?</h2>
            <p className="text-sm text-tertiary">
              Kamu sudah menjawab {answeredCount} dari {questions.length} pertanyaan.
            </p>
          </div>

          <div className="space-y-2">
            <Button
              color="primary"
              size="md"
              className="w-full"
              onClick={handleResume}
            >
              Lanjutkan
            </Button>

            <div className="flex justify-center">
              <Button
                color="link-color"
                size="sm"
                onClick={handleStartFresh}
              >
                Mulai Baru
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'question' && question) {
    return (
      <div className="flex min-h-screen flex-col bg-primary px-4 py-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <ProgressBarBase value={progressValue} min={0} max={100} />
            <p className="text-right text-sm text-tertiary">
              {currentQuestion + 1} dari {questions.length}
            </p>
          </div>

          {/* Question card with animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              className="rounded-xl border border-secondary bg-primary p-5 shadow-sm"
            >
              <div className="space-y-5">
                <p className="text-lg font-semibold text-primary leading-snug">
                  {question.questionText}
                </p>

                <RadioGroup
                  value={selectedOptionId}
                  onChange={(val) => setAnswer(question.id, val)}
                  aria-label="Pilihan jawaban"
                >
                  {question.options.map((option) => (
                    <div
                      key={option.id}
                      className={[
                        'flex min-h-14 cursor-pointer items-center rounded-lg border px-4 py-3 transition duration-100 ease-linear',
                        selectedOptionId === option.id
                          ? 'border-brand bg-brand-secondary'
                          : 'border-secondary hover:bg-secondary',
                      ].join(' ')}
                    >
                      <RadioButton
                        value={option.id}
                        size="md"
                        label={
                          <span
                            className={[
                              'text-md',
                              selectedOptionId === option.id
                                ? 'font-semibold text-primary'
                                : 'text-secondary',
                            ].join(' ')}
                          >
                            {option.text}
                          </span>
                        }
                        className="w-full"
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next / Submit button */}
          <Button
            color="primary"
            size="lg"
            className="w-full"
            isDisabled={!selectedOptionId}
            onClick={handleNext}
          >
            {isLastQuestion ? 'Lihat Hasil' : 'Lanjut'}
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
