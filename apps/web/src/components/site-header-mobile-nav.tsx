'use client';

import { MenuIcon, XIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

export function SiteHeaderMobileNav({ children }: { children: ReactNode }) {
  return (
    <details
      className="group/nav relative md:hidden"
      onClick={(event) => {
        const target = event.target;
        if (!(target instanceof Element) || !target.closest('a')) {
          return;
        }
        event.currentTarget.removeAttribute('open');
      }}
    >
      <summary
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
          'cursor-pointer list-none text-white marker:content-none hover:bg-white/10 hover:text-white [&::-webkit-details-marker]:hidden',
        )}
      >
        <MenuIcon className="group-open/nav:hidden" />
        <XIcon className="hidden group-open/nav:block" />
        <span className="sr-only">Menu</span>
      </summary>
      <nav
        aria-label="Principal"
        className="cf-glass-strong absolute top-[calc(100%+0.5rem)] right-0 z-50 flex min-w-48 flex-col gap-1 rounded-xl p-2"
      >
        {children}
      </nav>
    </details>
  );
}
