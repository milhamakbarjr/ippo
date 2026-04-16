import { useNavigate } from '@tanstack/react-router';
import { Route } from '@/routes/onboarding';
import { useAssessmentStore } from '@/stores/assessment-store';
import { questions } from '@/content/onboarding-assessment';
import { OnboardingProgress } from './components/onboarding-progress';
import { OnboardingFooter } from './components/onboarding-footer';
import { IllustrationStep } from './steps/illustration-step';
import { SurveyStep } from './steps/survey-step';
import { QuizStep } from './steps/quiz-step';
import {
  STEPS,
  getProgressValue,
  getQuizIndex,
  getPrevStepId,
  isQuizStep,
  type StepId,
} from './steps/registry';
import {
  sourceOptions,
  motivationOptions,
  knowledgeOptions,
  pathOptions,
} from './content/survey-options';
import { useSurveyState } from './use-survey-state';
import { ThemeSelector } from '@/components/shared/theme-selector';

export function OnboardingPage() {
  const { step } = Route.useSearch();
  const navigate = useNavigate();
  const { answers, submit, reset } = useAssessmentStore();
  const survey = useSurveyState();

  const currentStep = (step ?? 'welcome') as StepId;
  const stepMeta = STEPS.find((s) => s.id === currentStep);
  const progressValue = getProgressValue(currentStep);
  const prevStep = getPrevStepId(currentStep);

  function goToStep(id: StepId) {
    void navigate({ to: '/onboarding', search: { step: id } });
  }

  function handleBack() {
    if (prevStep) goToStep(prevStep);
  }

  // Determine whether Continue is disabled for the current step
  function isContinueDisabled(): boolean {
    if (currentStep === 'source') return !survey.source;
    if (currentStep === 'motivation') return !survey.motivation;
    if (currentStep === 'knowledge') return !survey.knowledge;
    if (currentStep === 'path') return !survey.path;
    if (isQuizStep(currentStep)) {
      const idx = getQuizIndex(currentStep);
      const q = questions[idx];
      return !q || !answers[q.id];
    }
    return false; // illustration steps always enabled
  }

  function handleContinue() {
    if (currentStep === 'welcome') { goToStep('intro2'); return; }
    if (currentStep === 'intro2') { goToStep('source'); return; }
    if (currentStep === 'source') { goToStep('motivation'); return; }
    if (currentStep === 'motivation') { goToStep('knowledge'); return; }
    if (currentStep === 'knowledge') { goToStep('path'); return; }

    if (currentStep === 'path') {
      // Persist survey answers
      survey.persist();
      if (survey.path === 'from-scratch') {
        try {
          localStorage.setItem('assessment_level', 'kana');
          sessionStorage.setItem('user_level', 'kana');
        } catch { /* ignore */ }
        void navigate({ to: '/', replace: true });
      } else {
        // find-my-level → start quiz
        reset();
        goToStep('quiz/1');
      }
      return;
    }

    if (isQuizStep(currentStep)) {
      const idx = getQuizIndex(currentStep);
      const isLast = idx === questions.length - 1;

      if (isLast) {
        const result = submit(questions);
        // Fire-and-forget for authenticated users
        try {
          const onboardingRaw = localStorage.getItem('onboarding_responses');
          const onboardingResponses = onboardingRaw
            ? (JSON.parse(onboardingRaw) as Record<string, string>)
            : undefined;
          fetch('/api/assessment/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              assessed_level: result.assessedLevel,
              score: result.score,
              total_questions: questions.length,
              ...(onboardingResponses ? { onboarding_responses: onboardingResponses } : {}),
            }),
          }).catch(() => { /* non-blocking */ });
        } catch { /* ignore */ }
        void navigate({ to: '/', replace: true });
      } else {
        const nextQuizNum = idx + 2;
        goToStep(`quiz/${nextQuizNum}` as StepId);
      }
      return;
    }
  }

  const continueLabel = (() => {
    if (currentStep === 'path' && survey.path === 'from-scratch') return 'Mulai Belajar';
    if (currentStep === 'path' && survey.path === 'find-my-level') return 'Mulai Penilaian';
    const idx = isQuizStep(currentStep) ? getQuizIndex(currentStep) : -1;
    if (idx === questions.length - 1) return 'Lihat Hasil';
    return 'Continue';
  })();

  return (
    <div className="flex min-h-dvh flex-col bg-primary pb-[env(safe-area-inset-bottom)]">
      {/* Theme toggle — fixed top-right on all steps */}
      <div className="fixed top-3 right-3 z-10">
        <ThemeSelector />
      </div>

      {/* Top chrome: back + progress bar */}
      {stepMeta?.showChrome && (
        <OnboardingProgress value={progressValue} onBack={handleBack} />
      )}

      {/* Step content */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {currentStep === 'welcome' && (
          <IllustrationStep
            imageSrc="/images/onboarding-welcome.png"
            tooltipText="Hi there, let's get started"
          />
        )}

        {currentStep === 'intro2' && (
          <IllustrationStep
            imageSrc="/images/onboarding-intro2.png"
            tooltipText="We'll build on what you know!"
          />
        )}

        {currentStep === 'source' && (
          <SurveyStep
            tooltipText="How did you know about us?"
            options={sourceOptions}
            layout="2-col"
            value={survey.source}
            onChange={survey.setSource}
          />
        )}

        {currentStep === 'motivation' && (
          <SurveyStep
            tooltipText="Why are you learning japanese?"
            options={motivationOptions}
            layout="2-col"
            value={survey.motivation}
            onChange={survey.setMotivation}
          />
        )}

        {currentStep === 'knowledge' && (
          <SurveyStep
            tooltipText="How much japanese do you know?"
            options={knowledgeOptions}
            layout="1-col"
            value={survey.knowledge}
            onChange={survey.setKnowledge}
          />
        )}

        {currentStep === 'path' && (
          <SurveyStep
            tooltipText="Now let's find the best place to start"
            options={pathOptions}
            layout="1-col"
            value={survey.path}
            onChange={survey.setPath}
          />
        )}

        {isQuizStep(currentStep) && (
          <QuizStep questionIndex={getQuizIndex(currentStep)} />
        )}
      </div>

      {/* Sticky footer */}
      <OnboardingFooter
        onContinue={handleContinue}
        onBack={handleBack}
        continueLabel={continueLabel}
        isDisabled={isContinueDisabled()}
        showBack={!!stepMeta?.showChrome}
      />
    </div>
  );
}
