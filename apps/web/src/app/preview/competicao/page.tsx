import Link from 'next/link';

import { PreviewBracket } from '@/components/preview/preview-bracket';
import { PreviewHero } from '@/components/preview/preview-hero';
import { PreviewSection } from '@/components/preview/preview-section';
import { Badge } from '@/components/ui/badge';
import { PREVIEW_COMPETITION, PREVIEW_PLAYERS } from '@/lib/preview/mock-data';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copa Cupperfy FC',
};

export default function PreviewCompetitionPage() {
  return (
    <>
      <PreviewHero
        kicker={PREVIEW_COMPETITION.sport}
        title={PREVIEW_COMPETITION.name}
        description="Eliminação simples, 8 jogadores, inscrição individual. Placar e avanço na chave."
      />

      <PreviewSection>
        <dl className="cf-glass grid gap-6 rounded-3xl p-6 md:grid-cols-2 md:p-8">
          <div className="space-y-1">
            <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
              Formato
            </dt>
            <dd className="text-foreground font-medium">Eliminação simples · melhor de 1</dd>
            <p className="text-muted-foreground text-sm">
              {PREVIEW_COMPETITION.format.participantCount} jogadores · chave definida pela
              organização
            </p>
          </div>
          <div className="space-y-1">
            <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
              Organização
            </dt>
            <dd className="text-foreground font-medium">{PREVIEW_COMPETITION.organizerName}</dd>
            <p className="text-muted-foreground text-sm">Um organizador por competição</p>
          </div>
          <div className="space-y-1">
            <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
              Status
            </dt>
            <dd>
              <Badge>Em andamento</Badge>
            </dd>
            <p className="text-muted-foreground text-sm">
              Quartas em curso · semis e final na fila
            </p>
          </div>
          <div className="space-y-1">
            <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
              Modalidade
            </dt>
            <dd className="text-foreground font-medium">{PREVIEW_COMPETITION.sport} · x1</dd>
            <p className="text-muted-foreground text-sm">Inscrição por jogador, não por time</p>
          </div>
        </dl>
      </PreviewSection>

      <PreviewSection tone="end">
        <div className="mb-6 space-y-2">
          <h2 className="font-heading text-foreground text-2xl font-bold">Chave</h2>
          <p className="text-muted-foreground max-w-2xl text-sm">
            Cada confronto decide em uma partida. Toque para abrir o detalhe — placar, status e
            estatísticas. Em telas estreitas, deslize a chave para o lado.
          </p>
        </div>
        <PreviewBracket />
      </PreviewSection>

      <PreviewSection className="border-b-0">
        <h2 className="font-heading text-foreground mb-4 text-2xl font-bold">Inscritos</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {PREVIEW_PLAYERS.map((player) => (
            <li key={player.id}>
              <Link
                href={`/preview/jogador/${player.slug}`}
                className="cf-glass hover:border-primary/40 flex items-center gap-3 rounded-2xl p-4 transition-colors"
              >
                <span className="bg-muted text-muted-foreground inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold">
                  {player.initials}
                </span>
                <span className="min-w-0">
                  <span className="font-heading text-foreground block font-semibold">
                    {player.tag}
                  </span>
                  <span className="text-muted-foreground block truncate text-sm">
                    {player.displayName}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PreviewSection>
    </>
  );
}
