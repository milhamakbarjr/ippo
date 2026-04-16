import { cx } from '@/utils/cx';

interface MascotTooltipProps {
  tooltipText: string;
  imageSrc?: string;
  size?: 'sm' | 'lg';
  placement?: 'top' | 'right' | 'bottom';
}

/**
 * Mascot image with an in-flow speech bubble.
 * Placement "top": bubble above the mascot (used on illustration steps).
 * Placement "right": mascot on left, bubble on right (used on survey/quiz steps).
 */
export function MascotTooltip({
  tooltipText,
  imageSrc = '/images/onboarding-mascot.png',
  size = 'sm',
  placement = 'top',
}: MascotTooltipProps) {
  const imgSizeClass = size === 'lg' ? 'size-[min(80vw,400px)]' : 'size-32';

  if (placement === 'top' || placement === 'bottom') {
    const isTop = placement === 'top';
    return (
      <div className="flex flex-col items-center gap-4">
        {isTop && (
          <div className="relative max-w-sm rounded-2xl bg-primary-solid px-4 py-3">
            <p className="text-sm font-medium text-white">{tooltipText}</p>
            {/* Down-pointing arrow */}
            <div
              aria-hidden="true"
              className="absolute -bottom-[7px] left-1/2 size-3.5 -translate-x-1/2 rotate-45 bg-primary-solid"
            />
          </div>
        )}
        <img src={imageSrc} alt="" aria-hidden="true" className={imgSizeClass} />
        {!isTop && (
          <div className="relative max-w-sm rounded-2xl bg-primary-solid px-4 py-3">
            {/* Up-pointing arrow */}
            <div
              aria-hidden="true"
              className="absolute -top-[7px] left-1/2 size-3.5 -translate-x-1/2 rotate-45 bg-primary-solid"
            />
            <p className="text-sm font-medium text-white">{tooltipText}</p>
          </div>
        )}
      </div>
    );
  }

  // placement === 'right': mascot left, bubble right
  return (
    <div className="flex items-start gap-4">
      <img src={imageSrc} alt="" aria-hidden="true" className={cx(imgSizeClass, 'shrink-0')} />
      <div className="relative w-fit max-w-xs rounded-2xl bg-primary-solid px-4 py-3">
        {/* Left-pointing arrow */}
        <div
          aria-hidden="true"
          className="absolute -left-[7px] top-5 size-3.5 rotate-45 bg-primary-solid"
        />
        <p className="text-sm font-medium text-white">{tooltipText}</p>
      </div>
    </div>
  );
}
