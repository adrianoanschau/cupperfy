'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        className={className}
        aria-label="Alternar tema"
        disabled
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className={cn('relative', className)}
          aria-label="Alternar tema"
        >
          <SunIcon className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="lf-glass-strong">
        <DropdownMenuItem onClick={() => setTheme('light')}>Claro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Escuro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>Sistema</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
