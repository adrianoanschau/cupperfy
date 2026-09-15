import Link from 'next/link';

import { BrandMark } from '@/components/brand-mark';
import { SiteFooter } from '@/components/site-footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { COMPETITION_STATUS_LABEL } from '@/lib/auth/labels';
import { createSupabaseAnonClient } from '@/lib/supabase/server';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copas abertas',
};

export default async function CompetitionsPage() {
  const supabase = createSupabaseAnonClient();
  const { data: competitions } = await supabase
    .from('competitions')
    .select('id, name, status')
    .in('status', ['registration', 'in_progress'])
    .order('created_at', { ascending: false });

  const rows = competitions ?? [];

  return (
    <div className="bg-background flex flex-1 flex-col">
      <header className="border-border border-b px-4 py-3 md:px-8">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
          <Link href="/">
            <BrandMark className="text-xl" />
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/conta">Conta</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10 md:px-10">
        <h1 className="font-heading text-foreground text-3xl font-bold">Copas abertas</h1>
        {rows.length === 0 ? (
          <p className="text-muted-foreground">Ainda não há copas com inscrição aberta.</p>
        ) : (
          <ul className="divide-border border-border divide-y rounded-2xl border">
            {rows.map((competition) => (
              <li key={competition.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="text-foreground font-medium">{competition.name}</span>
                <span className="text-muted-foreground text-sm">
                  {COMPETITION_STATUS_LABEL[competition.status] ?? competition.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter
        links={[
          { href: '/', label: 'Início' },
          { href: '/login', label: 'Entrar' },
          { href: '/conta', label: 'Conta' },
        ]}
      />
    </div>
  );
}
