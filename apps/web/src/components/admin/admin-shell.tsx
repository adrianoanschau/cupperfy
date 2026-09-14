import Link from 'next/link';

import { logoutAdmin } from '@/app/actions/admin-auth';
import { BrandMark } from '@/components/brand-mark';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

import type { ReactNode } from 'react';

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-background flex min-h-full flex-1 flex-col">
      <header className="border-border relative z-10 border-b px-6 py-4 md:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <Link href="/admin/interessados" className="inline-flex items-baseline gap-1">
              <BrandMark className="text-lg" />
              <span className="text-muted-foreground font-sans text-sm font-normal"> · admin</span>
            </Link>
            <p className="text-muted-foreground text-sm">{title}</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <form action={logoutAdmin}>
              <Button type="submit" variant="outline" size="sm">
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 md:px-10">
        {children}
      </main>
    </div>
  );
}
