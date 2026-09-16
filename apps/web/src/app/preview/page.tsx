import Link from 'next/link';

import { FeedCard } from '@/components/preview/feed-card';
import { PlayerChip, playerHref } from '@/components/preview/player-chip';
import { PreviewSideNav } from '@/components/preview/preview-side-nav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPreviewDateTime } from '@/lib/preview/format';
import {
  getMatchTitle,
  getPlayerStats,
  getPreviewPlayer,
  getSortedFeedPosts,
  getTopStandings,
  getUpcomingMatches,
  PREVIEW_COMPETITION,
  PREVIEW_SESSION_PLAYER_ID,
} from '@/lib/preview/mock-data';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feed',
};

export default function PreviewDashboardPage() {
  const sessionPlayer = getPreviewPlayer(PREVIEW_SESSION_PLAYER_ID);
  const stats = getPlayerStats(PREVIEW_SESSION_PLAYER_ID);
  const posts = getSortedFeedPosts();
  const upcoming = getUpcomingMatches().slice(0, 3);
  const topPlayers = getTopStandings(3);

  return (
    <section className="relative overflow-hidden px-4 pt-24 pb-12 md:px-8 md:pt-28 md:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,var(--brand-200),transparent_50%),radial-gradient(ellipse_70%_50%_at_90%_100%,var(--brand-100),transparent_45%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,var(--brand-900),transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_100%,var(--brand-950),transparent_50%)]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[16rem_minmax(0,1fr)_18rem] lg:items-start">
        <aside className="order-2 space-y-4 lg:sticky lg:top-24 lg:order-1">
          <div className="cf-glass space-y-4 rounded-2xl p-5">
            {sessionPlayer ? (
              <Link href={playerHref(sessionPlayer.slug)} className="block space-y-3">
                <PlayerChip player={sessionPlayer} size="lg" />
                <p className="text-muted-foreground text-sm">{sessionPlayer.sport} · x1</p>
                <dl className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <dt className="text-muted-foreground text-xs">Jogos</dt>
                    <dd className="font-heading text-foreground font-semibold">{stats.played}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">Vitórias</dt>
                    <dd className="font-heading text-foreground font-semibold">{stats.wins}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">Derrotas</dt>
                    <dd className="font-heading text-foreground font-semibold">{stats.losses}</dd>
                  </div>
                </dl>
              </Link>
            ) : null}
          </div>
          <div className="cf-glass rounded-2xl p-3">
            <PreviewSideNav />
          </div>
        </aside>

        <div className="order-1 space-y-4 lg:order-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-foreground text-2xl font-bold">Feed</h1>
            <Badge variant="secondary">Prévia — Fase 2</Badge>
            <Badge variant="outline">Demonstração</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Atividade da Copa Cupperfy FC. O feed entra depois das chaves da temporada 0 — aqui é a
            vitrine.
          </p>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id}>
                <FeedCard post={post} />
              </li>
            ))}
          </ul>
        </div>

        <aside className="order-3 space-y-4 lg:sticky lg:top-24">
          <div className="cf-glass space-y-3 rounded-2xl p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-heading text-foreground text-sm font-semibold tracking-wide uppercase">
                Próximas partidas
              </h2>
              <Button variant="link" size="xs" asChild>
                <Link href="/preview/agenda">Agenda</Link>
              </Button>
            </div>
            <ul className="space-y-3">
              {upcoming.map((match) => {
                const playerA = getPreviewPlayer(match.playerAId);
                const playerB = getPreviewPlayer(match.playerBId);
                return (
                  <li key={match.id}>
                    <Link href="/preview/agenda" className="hover:text-primary block space-y-1">
                      <p className="font-heading text-foreground text-sm font-semibold">
                        {getMatchTitle(match)}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {playerA?.tag ?? 'A definir'} × {playerB?.tag ?? 'A definir'}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatPreviewDateTime(match.scheduledAt)}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="cf-glass space-y-3 rounded-2xl p-5">
            <h2 className="font-heading text-foreground text-sm font-semibold tracking-wide uppercase">
              Competição em destaque
            </h2>
            <p className="font-heading text-foreground text-lg font-semibold">
              {PREVIEW_COMPETITION.name}
            </p>
            <p className="text-muted-foreground text-sm">
              {PREVIEW_COMPETITION.sport} · eliminação simples · 8 jogadores
            </p>
            <Button size="sm" asChild>
              <Link href="/preview/competicao">Abrir a chave</Link>
            </Button>
          </div>

          <div className="cf-glass space-y-3 rounded-2xl p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-heading text-foreground text-sm font-semibold tracking-wide uppercase">
                Top jogadores
              </h2>
              <Button variant="link" size="xs" asChild>
                <Link href="/preview/classificacao">Tabela</Link>
              </Button>
            </div>
            <ol className="space-y-3">
              {topPlayers.map((row) => {
                const player = getPreviewPlayer(row.playerId);
                return (
                  <li key={row.playerId} className="flex items-center gap-2">
                    <span className="font-heading text-muted-foreground w-4 text-sm">
                      {row.position}
                    </span>
                    <PlayerChip
                      player={player}
                      size="sm"
                      href={player ? playerHref(player.slug) : undefined}
                    />
                    <span className="font-heading text-foreground ml-auto text-sm font-semibold tabular-nums">
                      {row.points}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}
