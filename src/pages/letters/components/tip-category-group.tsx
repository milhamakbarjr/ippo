import { Link } from '@tanstack/react-router';
import { ChevronRight } from '@untitledui/icons';
import type { TipCategory } from '@/types/letters';

interface TipCategoryGroupProps {
  category: TipCategory;
  type: string;
}

export function TipCategoryGroup({ category, type }: TipCategoryGroupProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-secondary bg-primary">
      <div className="border-b border-secondary bg-secondary px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">{category.label}</p>
      </div>
      <ul className="divide-y divide-secondary">
        {category.items.map((item) => (
          <li key={item.slug}>
            <Link
              to="/letters/tips/$type/$tipSlug"
              params={{ type, tipSlug: item.slug }}
              className="flex items-center justify-between px-4 py-3.5 outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover focus-visible:outline-2 focus-visible:-outline-offset-2"
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="truncate text-sm font-medium text-primary">{item.characters}</span>
                <span className="text-xs text-tertiary">{item.romaji}</span>
              </div>
              <ChevronRight className="size-4 shrink-0 text-fg-quaternary" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
