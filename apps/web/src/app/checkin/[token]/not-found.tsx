import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export default function CheckinNotFound() {
  const contacts = {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? 'https://wa.me/adrianoanschau',
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? 'https://t.me/adrianoanschau',
  };

  return (
    <div className="bg-background flex flex-1 flex-col">
      <section className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-10 md:px-10">
        <header className="lf-glass-nav flex items-center justify-between rounded-2xl px-4 py-3 md:px-6">
          <Link href="/" className="font-heading text-foreground text-xl font-bold tracking-tight">
            league<span className="text-primary">fy</span>
          </Link>
          <ThemeToggle />
        </header>
        <div className="lf-glass-strong space-y-4 rounded-3xl p-8">
          <h1 className="font-heading text-foreground text-3xl font-bold">
            Convite não encontrado
          </h1>
          <p className="text-muted-foreground">
            Este token é inválido ou foi revogado. Peça um novo link ao time Leaguefy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={contacts.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Voltar ao início</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
