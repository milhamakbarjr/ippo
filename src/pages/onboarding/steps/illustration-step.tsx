import { MascotTooltip } from '../components/mascot-tooltip';

interface IllustrationStepProps {
  imageSrc: string;
  tooltipText: string;
}

export function IllustrationStep({ imageSrc, tooltipText }: IllustrationStepProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <MascotTooltip
        tooltipText={tooltipText}
        imageSrc={imageSrc}
        size="lg"
        placement="top"
      />
    </div>
  );
}
