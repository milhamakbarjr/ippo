import { RadioGroup } from '@/components/base/radio-buttons/radio-buttons';
import { MascotTooltip } from '../components/mascot-tooltip';
import { OptionCard } from '../components/option-card';
import type { SurveyOption } from '../content/survey-options';

interface SurveyStepProps {
  tooltipText: string;
  options: SurveyOption[];
  layout?: '1-col' | '2-col';
  value: string;
  onChange: (value: string) => void;
}

export function SurveyStep({ tooltipText, options, layout = '1-col', value, onChange }: SurveyStepProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-6 max-w-lg mx-auto w-full">
      {/* Mascot + Untitled UI Tooltip */}
      <MascotTooltip tooltipText={tooltipText} size="sm" placement="right" />

      {/* Radio option cards */}
      <RadioGroup
        value={value}
        onChange={onChange}
        aria-label={tooltipText}
        className="w-full gap-0"
      >
        {layout === '2-col' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map((opt) => (
              <OptionCard
                key={opt.id}
                value={opt.id}
                label={opt.label}
                description={opt.description}
                iconSrc={opt.iconSrc}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {options.map((opt) => (
              <OptionCard
                key={opt.id}
                value={opt.id}
                label={opt.label}
                description={opt.description}
                iconSrc={opt.iconSrc}
              />
            ))}
          </div>
        )}
      </RadioGroup>
    </div>
  );
}
