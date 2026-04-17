import { Globe04, BookOpen01, PlayCircle, Tool01, LinkExternal01 } from '@untitledui/icons';
import type { StepResource, ResourceType } from '@/types/learning';

const typeIcon: Record<ResourceType, typeof Globe04> = {
  article: BookOpen01,
  video: PlayCircle,
  interactive: Globe04,
  tool: Tool01,
};

interface StepResourceLinkProps {
  resource: StepResource;
  onTrack: () => void;
}

export function StepResourceLink({ resource, onTrack }: StepResourceLinkProps) {
  const Icon = typeIcon[resource.type] ?? Globe04;

  function handleClick() {
    onTrack();
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-start gap-3 rounded-xl border border-secondary bg-primary p-3 text-left transition duration-100 ease-linear hover:bg-primary_hover"
    >
      <Icon className="size-5 text-fg-quaternary shrink-0 mt-0.5" aria-hidden="true" />
      <span className="flex-1 text-sm text-secondary font-medium">{resource.title}</span>
      <LinkExternal01 className="size-4 text-fg-quaternary shrink-0 mt-0.5" aria-hidden="true" />
    </button>
  );
}
