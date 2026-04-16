import { ArrowNarrowLeft } from '@untitledui/icons';
import { Button as AriaButton } from 'react-aria-components';
import { ProgressBarBase } from '@/components/base/progress-indicators/progress-indicators';

interface OnboardingProgressProps {
  value: number;
  onBack: () => void;
}

export function OnboardingProgress({ value, onBack }: OnboardingProgressProps) {
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-2">
      <AriaButton
        aria-label="Go back"
        onPress={onBack}
        className="flex items-center justify-center rounded-lg border border-secondary bg-primary p-2 text-fg-secondary outline-focus-ring hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2 shrink-0"
      >
        <ArrowNarrowLeft className="size-5" aria-hidden="true" />
      </AriaButton>
      <div className="flex-1">
        <ProgressBarBase value={value} min={0} max={100} />
      </div>
    </div>
  );
}
