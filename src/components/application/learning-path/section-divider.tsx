interface SectionDividerProps {
  title: string;
}

export function SectionDivider({ title }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-3 my-6 w-full">
      <div className="flex-1 h-px bg-border-secondary" />
      <span className="text-tertiary text-xs font-medium whitespace-nowrap px-2">
        {title}
      </span>
      <div className="flex-1 h-px bg-border-secondary" />
    </div>
  );
}
