import Image from 'next/image';
import Link from 'next/link';

import { AlphaWaitlistForm } from '@/components/landing/alpha-waitlist-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="bg-background flex flex-1 flex-col">
      {/* —— Hero (uma composição) —— */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="lf-kenburns object-cover object-center"
        />
        <div
          aria-hidden
          className="from-ink-950/90 via-ink-950/55 to-brand-900/25 absolute inset-0 bg-gradient-to-r"
        />
        <div
          aria-hidden
          className="from-ink-950 to-ink-950/40 absolute inset-0 bg-gradient-to-t via-transparent"
        />

        <header className="lf-glass-nav relative z-10 mx-4 mt-4 flex items-center justify-between rounded-2xl px-4 py-3 md:mx-8 md:px-6">
          <p className="font-heading text-xl font-bold tracking-tight text-white">
            league<span className="text-primary">fy</span>
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <a href="#alfa">Participar</a>
            </Button>
            <ThemeToggle className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white" />
          </div>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-end px-4 pt-12 pb-10 md:px-8 md:pb-16">
          <div className="lf-glass-hero lf-fade-up max-w-3xl space-y-6 rounded-3xl p-6 md:p-10">
            <p className="lf-brand-mark font-heading text-primary text-sm font-semibold tracking-[0.2em] uppercase">
              Leaguefy
            </p>
            <h1 className="font-heading text-4xl leading-[1.05] font-bold text-white md:text-6xl lg:text-7xl">
              Entre no teste alfa e ajude a moldar a arena.
            </h1>
            <p className="max-w-xl text-lg text-white/80 md:text-xl">
              A plataforma de competições abre as portas em alfa — começando pelo x1 de futebol
              e-sports. Poucas vagas para quem quer jogar, organizar e opinar desde o primeiro
              round.
            </p>
            <div className="lf-fade-up-delay-2 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#alfa">Quero participar do alfa</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/12 hover:text-white"
                asChild
              >
                <a href="#como-funciona">Como funciona</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* —— O que é —— */}
      <section className="border-border relative overflow-hidden border-b px-6 py-20 md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_10%_20%,var(--brand-200),transparent_50%)] dark:bg-[radial-gradient(ellipse_70%_80%_at_10%_20%,var(--brand-900),transparent_55%)]"
        />
        <div className="lf-glass relative mx-auto grid w-full max-w-5xl gap-8 rounded-3xl p-8 md:grid-cols-[1fr_1.2fr] md:items-end md:p-10">
          <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
            Um lugar para competir de ponta a ponta.
          </h2>
          <p className="text-muted-foreground max-w-prose text-lg">
            Leaguefy reúne inscrição, chaveamento, resultados e perfil de jogador. O alfa valida o
            fluxo real do lançamento: um torneio x1, eliminação simples, com você dentro da
            experiência.
          </p>
        </div>
      </section>

      {/* —— Como funciona —— */}
      <section
        id="como-funciona"
        className="border-border relative scroll-mt-8 overflow-hidden border-b px-6 py-20 md:px-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_90%_80%,var(--brand-100),transparent_45%)] dark:bg-[radial-gradient(ellipse_60%_70%_at_90%_80%,var(--brand-950),transparent_50%)]"
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12">
          <h2 className="font-heading text-foreground max-w-xl text-3xl font-bold md:text-4xl">
            Três passos para entrar no alfa.
          </h2>
          <ol className="grid gap-5 md:grid-cols-3">
            <li className="lf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-4xl font-bold">01</p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Lista de interesse
              </h3>
              <p className="text-muted-foreground">
                Deixe seu e-mail. Selecionamos participantes em ondas conforme a capacidade do
                ambiente.
              </p>
            </li>
            <li className="lf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-4xl font-bold">02</p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Convite de acesso
              </h3>
              <p className="text-muted-foreground">
                Você recebe o link para criar conta, montar perfil de jogador e se inscrever no x1
                de futebol e-sports.
              </p>
            </li>
            <li className="lf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-4xl font-bold">03</p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Jogue e responda
              </h3>
              <p className="text-muted-foreground">
                Teste chave, placar e fluxo de inscrição — e nos diga o que trava, o que brilha e o
                que falta.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* —— CTA / waitlist —— */}
      <section id="alfa" className="relative scroll-mt-8 overflow-hidden px-6 py-20 md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--brand-200),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--brand-800),transparent_55%)]"
        />
        <div className="lf-glass-strong relative mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl p-8 md:p-10">
          <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
            Garanta sua vaga no alfa.
          </h2>
          <p className="text-muted-foreground text-lg">
            Sem compromisso. Avisamos só quando houver acesso — e priorizamos quem estiver pronto
            para disputar o primeiro campeonato.
          </p>
          <AlphaWaitlistForm />
        </div>
      </section>

      <footer className="lf-glass border-border mt-auto border-0 border-t px-6 py-8 md:px-10">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4">
          <p className="font-heading text-foreground text-sm font-bold tracking-tight">
            league<span className="text-primary">fy</span>
          </p>
          <nav className="text-muted-foreground flex flex-wrap gap-4 text-sm">
            <Link href="/design-system" className="hover:text-foreground">
              Design system
            </Link>
            <a href="#alfa" className="hover:text-foreground">
              Alfa
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
