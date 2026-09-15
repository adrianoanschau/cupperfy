import Link from 'next/link';

import { MatchCard } from '@/components/preview/match-card';
import { PreviewHero } from '@/components/preview/preview-hero';
import { PreviewSection } from '@/components/preview/preview-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPreviewDay } from '@/lib/preview/format';
import {
  getUpcomingMatches,
  PREVIEW_COMPETITION,
  PREVIEW_INDEX_LINKS,
  PREVIEW_MATCHES,
  PREVIEW_PLAYERS,
} from '@/lib/preview/mock-data';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel',
};

export default function PreviewIndexPage() {
  const completed = PREVIEW_MATCHES.filter((match) => match.status === 'completed').length;
  const upcoming = getUpcomingMatches();
  const nextMatch = upcoming[0];
  const spotlight = upcoming.slice(0, 2);

  return (
    <>
      <PreviewHero
        kicker="Painel"
        title={PREVIEW_COMPETITION.name}
        description="Eliminação simples · x1 · 8 jogadores. Quartas em andamento, semis e final na fila."
      />

      <PreviewSection>
        <div className="grid gap-4 sm:grid-cols-3">
          <DashStat
            label="Inscritos"
            value={String(PREVIEW_PLAYERS.length)}
            hint="Jogadores na chave"
          />
          <DashStat
            label="Encerradas"
            value={`${completed}/${PREVIEW_MATCHES.length}`}
            hint="Partidas da copa"
          />
          <DashStat
            label="Próxima"
            value={nextMatch ? formatPreviewDay(nextMatch.scheduledAt) : '—'}
            hint="Na agenda"
          />
        </div>
      </PreviewSection>

      <PreviewSection tone="end">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <h2 className="font-heading text-foreground text-2xl font-bold">Próximas partidas</h2>
            <p className="text-muted-foreground text-sm">Toque numa partida para ver o detalhe.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/preview/agenda">Agenda completa</Link>
          </Button>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {spotlight.map((match) => (
            <li key={match.id}>
              <MatchCard match={match} />
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button asChild>
            <Link href="/preview/competicao">Abrir a chave</Link>
          </Button>
        </div>
      </PreviewSection>

      <PreviewSection>
        <h2 className="font-heading text-foreground mb-4 text-2xl font-bold">Mais no painel</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {PREVIEW_INDEX_LINKS.map((item) => (
            <article key={item.href} className="cf-glass flex flex-col gap-4 rounded-2xl p-6">
              <div className="flex flex-wrap items-center gap-2">
                {item.phase2 ? <Badge>Em breve</Badge> : <Badge variant="secondary">Copa</Badge>}
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-foreground text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.summary}</p>
              </div>
              <div className="mt-auto">
                <Button asChild>
                  <Link href={item.href}>Abrir</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection tone="end" className="border-b-0">
        <div className="cf-glass-strong max-w-2xl space-y-4 rounded-3xl p-6 md:p-8">
          <h2 className="font-heading text-foreground text-2xl font-bold">
            Quer jogar de verdade?
          </h2>
          <p className="text-muted-foreground">
            Esta é uma demonstração da temporada 0. Entre na leva fundadora para disputar a copa
            quando o acesso abrir.
          </p>
          <Button size="lg" asChild>
            <Link href="/#alfa">Entrar na leva fundadora</Link>
          </Button>
        </div>
      </PreviewSection>
    </>
  );
}

function DashStat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="cf-glass space-y-1 rounded-2xl p-5">
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="font-heading text-foreground text-2xl font-bold md:text-3xl">{value}</p>
      <p className="text-muted-foreground text-xs">{hint}</p>
    </div>
  );
}
