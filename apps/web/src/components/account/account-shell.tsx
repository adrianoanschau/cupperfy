import Link from 'next/link';

import { signOut } from '@/app/actions/auth';
import { BrandMark } from '@/components/brand-mark';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

import type { ReactNode } from 'react';

export function AccountShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background flex flex-1 flex-col">
      <header className="border-border border-b px-4 py-3 md:px-8">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
          <Link href="/">
            <BrandMark className="text-xl" />
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/conta">Conta</Link>
            </Button>
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="sm">
                Sair
              </Button>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10 md:px-10">
        {children}
      </main>
    </div>
  );
}
