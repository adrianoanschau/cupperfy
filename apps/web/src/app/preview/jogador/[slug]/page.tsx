import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MatchRowDialog } from '@/components/preview/match-detail-dialog';
import { PreviewHero } from '@/components/preview/preview-hero';
import { PreviewSection } from '@/components/preview/preview-section';
import { Button } from '@/components/ui/button';
import {
  careerToPreviewMatch,
  getPlayerBracketMatches,
  getPlayerCareerMatches,
  getPlayerStats,
  getPreviewPlayerBySlug,
  PREVIEW_COMPETITION,
  PREVIEW_PLAYERS,
} from '@/lib/preview/mock-data';

import type { Metadata } from 'next';

type PlayerPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PREVIEW_PLAYERS.map((player) => ({ slug: player.slug }));
}

export async function generateMetadata({ params }: PlayerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = getPreviewPlayerBySlug(slug);
  if (!player) return { title: 'Jogador' };
  return { title: `${player.tag} · ${player.displayName}` };
}

export default async function PreviewPlayerPage({ params }: PlayerPageProps) {
  const { slug } = await params;
  const player = getPreviewPlayerBySlug(slug);
  if (!player) notFound();

  const stats = getPlayerStats(player.id);
  const bracketMatches = getPlayerBracketMatches(player.id);
  const careerMatches = getPlayerCareerMatches(player.id);

  return (
    <>
      <PreviewHero
        backToFeed
        kicker={player.sport}
        title={player.tag}
        description={`${player.displayName} · perfil público.`}
      />

      <PreviewSection>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Jogos" value={String(stats.played)} />
          <StatCard label="Vitórias" value={String(stats.wins)} />
          <StatCard label="Derrotas" value={String(stats.losses)} />
        </div>
        <p className="text-muted-foreground mt-6 max-w-2xl">{player.bio}</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Saldo de gols:{' '}
          <span className="font-heading text-foreground font-semibold">
            {stats.goalsFor}–{stats.goalsAgainst}
          </span>
        </p>
      </PreviewSection>

      <PreviewSection tone="end">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <h2 className="font-heading text-foreground text-2xl font-bold">
              {PREVIEW_COMPETITION.name}
            </h2>
            <p className="text-muted-foreground text-sm">
              Confrontos desta chave. Toque para ver o detalhe.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link href="/preview">Feed</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/preview/competicao">Ver chave</Link>
            </Button>
          </div>
        </div>
        <ul className="space-y-3">
          {bracketMatches.map((match) => (
            <li key={match.id}>
              <MatchRowDialog match={match} playerId={player.id} />
            </li>
          ))}
        </ul>
      </PreviewSection>

      <PreviewSection className="border-b-0">
        <h2 className="font-heading text-foreground mb-4 text-2xl font-bold">Histórico</h2>
        {careerMatches.length === 0 ? (
          <p className="text-muted-foreground text-sm">Sem amistosos neste perfil.</p>
        ) : (
          <ul className="space-y-3">
            {careerMatches.map((match) => (
              <li key={match.id}>
                <MatchRowDialog
                  match={careerToPreviewMatch(match)}
                  playerId={player.id}
                  eyebrow={match.competitionName}
                />
              </li>
            ))}
          </ul>
        )}
      </PreviewSection>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="cf-glass space-y-1 rounded-2xl p-5">
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="font-heading text-foreground text-3xl font-bold">{value}</p>
    </div>
  );
}
