import { Monitor01, Moon01, Sun } from '@untitledui/icons';
import { ButtonGroup, ButtonGroupItem } from '@/components/base/button-group/button-group';
import { useTheme } from '@/providers/theme-provider';

type Theme = 'light' | 'dark' | 'system';

const THEMES: { value: Theme; Icon: React.FC<{ className?: string }>; label: string }[] = [
  { value: 'light',  Icon: Sun,       label: 'Light'  },
  { value: 'dark',   Icon: Moon01,    label: 'Dark'   },
  { value: 'system', Icon: Monitor01, label: 'System' },
];

interface ThemeSelectorProps {
  className?: string;
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();

  return (
    <ButtonGroup
      size="sm"
      selectedKeys={new Set([theme])}
      onSelectionChange={(keys) => {
        const next = [...keys][0] as Theme | undefined;
        if (next) setTheme(next);
      }}
      className={className}
    >
      {THEMES.map(({ value, Icon, label }) => (
        <ButtonGroupItem
          key={value}
          id={value}
          iconLeading={Icon}
          aria-label={label}
        />
      ))}
    </ButtonGroup>
  );
}
