import Link from 'next/link';

import { BrandMark } from '@/components/brand-mark';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { getSupportContacts } from '@/lib/support/config';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Check-in · Copa EA FC',
  description: 'Use o link pessoal enviado pelo time Cupperfy para confirmar sua disponibilidade.',
  robots: { index: false, follow: false },
};

export default function CheckinIndexPage() {
  const contacts = getSupportContacts();

  return (
    <div className="bg-background flex flex-1 flex-col">
      <section className="relative overflow-hidden px-6 pt-6 pb-16 md:px-10 md:pt-8 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,color-mix(in_oklch,var(--brand-400)_35%,transparent),transparent_60%)] dark:bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,color-mix(in_oklch,var(--brand-800)_40%,transparent),transparent_60%)]"
        />

        <header className="cf-glass-nav relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between rounded-2xl px-4 py-3 md:px-6">
          <Link href="/">
            <BrandMark className="text-foreground text-xl" />
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">Início</Link>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        <div className="cf-glass-strong relative z-10 mx-auto mt-10 w-full max-w-3xl space-y-4 rounded-3xl p-6 md:mt-14 md:p-10">
          <h1 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
            Link pessoal necessário
          </h1>
          <p className="text-muted-foreground text-lg">
            O check-in abre só pelo convite pessoal (com token). Se você está na lista de interesse,
            use o link que enviamos — ou peça um novo no WhatsApp, Telegram ou e-mail.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <a href={contacts.whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={contacts.telegramUrl} target="_blank" rel="noreferrer">
                Telegram
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
