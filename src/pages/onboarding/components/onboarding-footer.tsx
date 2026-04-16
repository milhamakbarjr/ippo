import { Button } from '@/components/base/buttons/button';

interface OnboardingFooterProps {
  onContinue: () => void;
  onBack?: () => void;
  continueLabel?: string;
  isDisabled?: boolean;
  showBack?: boolean;
}

export function OnboardingFooter({
  onContinue,
  onBack,
  continueLabel = 'Continue',
  isDisabled = false,
  showBack = true,
}: OnboardingFooterProps) {
  return (
    <div className="sticky bottom-0 flex h-[88px] items-center justify-between border-t border-secondary bg-primary px-6 lg:px-16">
      {showBack ? (
        <Button color="secondary" size="md" onClick={onBack}>
          Back
        </Button>
      ) : (
        <div aria-hidden="true" />
      )}
      <Button color="primary" size="lg" isDisabled={isDisabled} onClick={onContinue}>
        {continueLabel}
      </Button>
    </div>
  );
}
