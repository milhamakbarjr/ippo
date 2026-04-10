import { Globe04 } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import type { StepResource } from '@/types/learning';

interface StepResourceLinkProps {
  resource: StepResource;
  onTrack: () => void;
}

export function StepResourceLink({ resource, onTrack }: StepResourceLinkProps) {
  function handleClick() {
    onTrack();
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  }

  return (
    <Button
      color="secondary"
      size="sm"
      className="w-full justify-start"
      iconLeading={Globe04}
      onClick={handleClick}
    >
      {resource.title}
    </Button>
  );
}
