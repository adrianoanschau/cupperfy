import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="bg-background relative flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--brand-200),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--brand-900),transparent_55%)]"
      />
      <div
        aria-hidden
        className="from-ink-950/10 pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent dark:from-black/40"
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <p className="font-heading text-foreground text-xl font-bold tracking-tight">
          league<span className="text-primary">fy</span>
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/design-system">Design system</Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-8 px-6 pb-24 md:px-10">
        <p className="font-heading text-primary text-sm font-semibold tracking-[0.2em] uppercase">
          Leaguefy
        </p>
        <h1 className="font-heading text-foreground max-w-xl text-4xl leading-[1.05] font-bold md:text-6xl">
          Competições com identidade de arena.
        </h1>
        <p className="text-muted-foreground max-w-md text-lg">
          Laranja e preto como base — energia de jogo, contraste limpo, UI pronta para o x1 de
          futebol e-sports.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" size="lg">
            Entrar no torneio
          </Button>
          <Button type="button" size="lg" variant="secondary">
            Ver chaveamento
          </Button>
        </div>
      </main>
    </div>
  );
}
