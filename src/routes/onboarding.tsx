import { createFileRoute } from '@tanstack/react-router';
import { OnboardingPage } from '@/pages/onboarding/onboarding-page';
import { isValidStepId, type StepId } from '@/pages/onboarding/steps/registry';

export const Route = createFileRoute('/onboarding')({
  validateSearch: (search: Record<string, unknown>): { step: StepId } => {
    const raw = typeof search.step === 'string' ? search.step : 'welcome';
    return { step: isValidStepId(raw) ? raw : 'welcome' };
  },
  component: OnboardingPage,
});
