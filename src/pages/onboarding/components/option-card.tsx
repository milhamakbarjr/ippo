import { AriaRadio, RadioButtonBase } from '@/components/base/radio-buttons/radio-buttons';
import { cx } from '@/utils/cx';

interface OptionCardProps {
  value: string;
  label: string;
  description?: string;
  /** Path to a brand/social icon SVG in /images/ */
  iconSrc?: string;
}

/**
 * A full-width radio card for onboarding survey + quiz options.
 * Layout: [icon?] [label/description] [radio circle]
 * Uses Untitled UI RadioButtonBase for the selection indicator.
 */
export function OptionCard({ value, label, description, iconSrc }: OptionCardProps) {
  return (
    <AriaRadio
      value={value}
      className={(state) =>
        cx(
          'flex min-h-14 w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3',
          'transition duration-100 ease-linear',
          state.isSelected
            ? 'border-brand bg-brand-secondary'
            : 'border-secondary bg-primary hover:bg-secondary',
          state.isDisabled && 'cursor-not-allowed opacity-50',
        )
      }
    >
      {({ isSelected, isDisabled, isFocusVisible }) => (
        <>
          {iconSrc && (
            <img src={iconSrc} alt="" aria-hidden="true" className="size-6 shrink-0 object-contain" />
          )}

          <div className="flex flex-1 flex-col gap-0.5 min-w-0">
            <span
              className={cx(
                'text-sm font-medium select-none',
                isSelected ? 'text-primary' : 'text-secondary',
              )}
            >
              {label}
            </span>
            {description && (
              <span
                className={cx(
                  'text-xs select-none',
                  isSelected ? 'text-secondary' : 'text-tertiary',
                )}
              >
                {description}
              </span>
            )}
          </div>

          <RadioButtonBase
            size="md"
            isSelected={isSelected}
            isDisabled={isDisabled}
            isFocusVisible={isFocusVisible}
            className="shrink-0"
          />
        </>
      )}
    </AriaRadio>
  );
}
