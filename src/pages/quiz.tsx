import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle, XCircle, AlertCircle, Star01 } from '@untitledui/icons';
import { Route } from '@/routes/quizzes/$slug';
import { useQuiz } from '@/hooks/use-quiz';
import { useQuizStore } from '@/stores/quiz-store';
import { authClient } from '@/lib/auth-client';
import { toast } from '@/lib/toast';
import { Button } from '@/components/base/buttons/button';
import { ProgressBarBase } from '@/components/base/progress-indicators/progress-indicators';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';

export function QuizPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const { isLoading, error, isOnline } = useQuiz(slug);

  const {
    questions,
    currentQuestion,
    answers,
    showFeedback,
    lastAnswerCorrect,
    isSubmitting,
    submitError,
    scoreResult,
    setAnswer,
    advance,
    submit,
    reset,
  } = useQuizStore();

  // --- Loading state ---
  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-tertiary">Memuat kuis...</p>
      </div>
    );
  }

  // --- Error / empty state ---
  if (error || questions.length === 0) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4">
        <p className="text-secondary text-center">Kuis sedang disiapkan. Coba nanti.</p>
        <Button color="tertiary" onClick={() => void navigate({ to: '/' })}>
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  // --- Score results view ---
  if (scoreResult) {
    const { score, total, percentage } = scoreResult as { score: number; total: number; percentage: number };

    let ResultIcon: typeof CheckCircle;
    let iconColor: 'success' | 'warning' | 'error';

    if (percentage >= 70) {
      ResultIcon = CheckCircle;
      iconColor = 'success';
    } else if (percentage >= 50) {
      ResultIcon = Star01;
      iconColor = 'warning';
    } else {
      ResultIcon = AlertCircle;
      iconColor = 'error';
    }

    return (
      <div className="min-h-dvh bg-primary pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-lg mx-auto px-4 pt-12 flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4 w-full"
            aria-live="polite"
          >
            <FeaturedIcon
              icon={ResultIcon}
              color={iconColor}
              theme="light"
              size="xl"
            />

            <h1 className="text-primary text-2xl font-bold text-center">
              Hasilmu: {score} dari {total} benar
            </h1>

            <ProgressBarBase
              value={percentage}
              className="w-full"
            />

            <p className="text-tertiary text-sm tabular-nums">{percentage.toFixed(0)}%</p>

            {percentage < 50 && (
              <p className="text-tertiary text-center text-sm">
                Jangan menyerah! Coba lagi untuk memperkuat pemahamanmu.
              </p>
            )}
            {percentage >= 50 && percentage < 70 && (
              <p className="text-tertiary text-center text-sm">
                Hampir! Latihan sedikit lagi dan kamu pasti bisa.
              </p>
            )}
            {percentage >= 70 && (
              <p className="text-tertiary text-center text-sm">
                Kerja bagus! Kamu siap lanjut ke step berikutnya.
              </p>
            )}

            <div className="flex flex-col gap-3 w-full mt-4">
              <div className="flex flex-col md:flex-row gap-3 w-full">
                <Button
                  color="secondary"
                  className="w-full md:w-auto"
                  onClick={() => reset()}
                >
                  Coba Lagi
                </Button>
                <Button
                  color="primary"
                  className="w-full md:w-auto"
                  onClick={() => void navigate({ to: '/' })}
                >
                  Lanjut ke Step Berikutnya
                </Button>
              </div>
              <Button
                color="tertiary"
                className="w-full"
                onClick={() => void navigate({ to: '/quizzes' })}
              >
                Kembali ke Katalog Kuis
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // --- Question view ---
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const selectedOptionId = answers[question.id];

  async function handleAdvance() {
    if (isLastQuestion) {
      await submit(session?.user?.id as string | undefined);
      if (!session?.user) {
        toast.success('Buat akun untuk menyimpan hasilmu!', { duration: 5000 });
      }
    } else {
      advance();
    }
  }

  return (
    <div className="min-h-dvh bg-primary pb-[env(safe-area-inset-bottom)]">
      {/* Offline banner */}
      {!isOnline && (
        <div
          role="status"
          aria-live="assertive"
          className="bg-warning-primary text-white px-4 py-2 text-sm text-center"
        >
          Offline Mode — jawaban akan disimpan saat online
        </div>
      )}

      <div className="max-w-lg mx-auto px-4 pt-6">
        {/* Back button */}
        <Button
          color="tertiary"
          size="sm"
          onClick={() => void navigate({ to: '/' })}
          className="mb-4"
        >
          ← Keluar
        </Button>

        {/* Progress */}
        <div className="mb-6">
          <ProgressBarBase
            value={((currentQuestion + 1) / questions.length) * 100}
            className="w-full"
          />
          <p className="text-tertiary text-sm mt-1">
            {currentQuestion + 1} dari {questions.length}
          </p>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <fieldset className="border-none p-0 m-0">
              <legend className="text-primary text-lg font-semibold mb-4">
                {question.questionText}
              </legend>

              <div className="flex flex-col gap-3" role="radiogroup">
                {question.options.map((option: { id: string; text: string; isCorrect: boolean }) => {
                  const isSelected = selectedOptionId === option.id;
                  const isCorrectOption = option.isCorrect;
                  const showResult = showFeedback;

                  let optionClass =
                    'border border-primary rounded-lg p-4 cursor-pointer transition duration-100 ease-linear text-left w-full';
                  if (showResult && isCorrectOption)
                    optionClass += ' bg-success-primary border-success-primary';
                  else if (showResult && isSelected && !isCorrectOption)
                    optionClass += ' bg-error-primary border-error-primary';
                  else if (isSelected && !showResult)
                    optionClass += ' border-brand bg-brand-section';

                  return (
                    <motion.button
                      key={option.id}
                      animate={isSelected && !showResult ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={optionClass}
                      onClick={() => {
                        if (showFeedback || !isOnline) return;
                        setAnswer(question.id, option.id, option.isCorrect);
                      }}
                      disabled={showFeedback || !isOnline}
                      aria-pressed={isSelected}
                      type="button"
                    >
                      <span className="text-primary text-sm">{option.text}</span>
                    </motion.button>
                  );
                })}
              </div>
            </fieldset>

            {/* Inline feedback */}
            {showFeedback && (
              <div
                aria-live="polite"
                className="mt-4 p-4 rounded-lg border border-secondary"
              >
                {lastAnswerCorrect ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle
                      className="size-4 text-success-primary shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-success-primary font-medium text-sm">Benar!</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <XCircle
                        className="size-4 text-error-primary shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-error-primary font-medium text-sm">Salah.</p>
                    </div>
                    <p className="text-success-primary text-sm">
                      Jawaban yang benar:{' '}
                      {question.options.find((o: { id: string; text: string; isCorrect: boolean }) => o.isCorrect)?.text}
                    </p>
                  </div>
                )}
                <p className="text-tertiary text-sm mt-2">{question.explanation}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Advance button */}
        <div className="mt-6">
          <Button
            color="primary"
            className="w-full"
            isDisabled={!showFeedback || isSubmitting}
            onClick={() => void handleAdvance()}
          >
            {isSubmitting ? 'Menyimpan...' : isLastQuestion ? 'Lihat Hasil' : 'Lanjut'}
          </Button>
        </div>

        {/* Submit error handling */}
        {submitError && (
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-error-primary text-sm text-center">
              {submitError === 'NETWORK_TIMEOUT'
                ? 'Koneksi terputus. Cek internet kamu.'
                : 'Gagal menyimpan hasil. Coba lagi.'}
            </p>
            <Button
              color="primary"
              size="sm"
              onClick={() => void submit(session?.user?.id as string | undefined)}
            >
              Coba Lagi
            </Button>
            <Button
              color="secondary"
              size="sm"
              onClick={() => void navigate({ to: '/' })}
            >
              Kembali ke Beranda
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
