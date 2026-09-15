import Link from 'next/link';

import { BrandMark } from '@/components/brand-mark';
import { ThemeToggle } from '@/components/theme-toggle';

import type { ReactNode } from 'react';

export function AuthPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-background flex flex-1 flex-col">
      <section className="relative mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-6 py-10">
        <div className="flex items-center justify-between">
          <Link href="/">
            <BrandMark className="text-xl" />
          </Link>
          <ThemeToggle />
        </div>
        <div className="cf-glass-strong space-y-6 rounded-3xl p-6 md:p-8">
          <div className="space-y-2">
            <h1 className="font-heading text-foreground text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}
