import { LaptopMinimalIcon, Moon, MoonIcon, Sun, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Theme, useTheme } from '@/providers/theme-provider';

interface ThemeItem {
  label: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  value: Theme;
}

const THEME_ITEMS: ThemeItem[] = [
  {
    label: 'Light',
    icon: SunIcon,
    value: 'light',
  },
  {
    label: 'Dark',
    icon: MoonIcon,
    value: 'dark',
  },
  {
    label: 'System',
    icon: LaptopMinimalIcon,
    value: 'system',
  },
];

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className} variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEME_ITEMS.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className={cn(
              'cursor-pointer',
              item.value === theme && 'font-semibold bg-accent'
            )}
            onSelect={() => setTheme(item.value)}
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
