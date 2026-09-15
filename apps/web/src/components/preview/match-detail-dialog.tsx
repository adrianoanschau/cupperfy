'use client';

import { MatchStatusBadge } from '@/components/preview/match-status-badge';
import { PlayerChip, playerHref } from '@/components/preview/player-chip';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatPreviewDateTime, formatPreviewScore } from '@/lib/preview/format';
import { getMatchStats, getMatchTitle, getPreviewPlayer } from '@/lib/preview/mock-data';

import type { PreviewMatch, PreviewMatchSideStats } from '@/lib/preview/mock-data';
import type { ReactNode } from 'react';

type MatchDialogProps = {
  match: PreviewMatch;
  title?: string;
  children: ReactNode;
};

export function MatchDialog({ match, title, children }: MatchDialogProps) {
  const heading = title ?? getMatchTitle(match);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg" showCloseButton>
        <MatchStatsBody match={match} heading={heading} />
      </DialogContent>
    </Dialog>
  );
}

function MatchStatsBody({ match, heading }: { match: PreviewMatch; heading: string }) {
  const playerA = getPreviewPlayer(match.playerAId);
  const playerB = getPreviewPlayer(match.playerBId);
  const stats = getMatchStats(match.id);
  const completed = match.status === 'completed';

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading text-xl">{heading}</DialogTitle>
        <DialogDescription>{formatPreviewDateTime(match.scheduledAt)}</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
        <PlayerChip
          player={playerA}
          size="sm"
          href={playerA ? playerHref(playerA.slug) : undefined}
        />
        <p className="font-heading text-foreground shrink-0 text-2xl font-bold tabular-nums">
          {formatPreviewScore(match.scoreA)}
          <span className="text-muted-foreground mx-1 text-lg font-medium">×</span>
          {formatPreviewScore(match.scoreB)}
        </p>
        <div className="flex justify-end">
          <PlayerChip
            player={playerB}
            size="sm"
            href={playerB ? playerHref(playerB.slug) : undefined}
          />
        </div>
      </div>

      {completed && stats ? <StatsList stats={stats} /> : <UpcomingNote completed={completed} />}

      <DialogFooter showCloseButton />
    </>
  );
}

function UpcomingNote({ completed }: { completed: boolean }) {
  if (completed) {
    return (
      <p className="text-muted-foreground text-sm">
        Placar lançado. Estatísticas detalhadas desta partida não foram registradas.
      </p>
    );
  }

  return (
    <p className="text-muted-foreground text-sm">
      Estatísticas entram depois do apito — posse, finalizações, passes e o VOD da transmissão.
    </p>
  );
}

function StatsList({ stats }: { stats: { a: PreviewMatchSideStats; b: PreviewMatchSideStats } }) {
  return (
    <div className="space-y-3">
      <Separator />
      <StatRow label="Posse" a={stats.a.possession} b={stats.b.possession} suffix="%" />
      <StatRow label="Finalizações" a={stats.a.shots} b={stats.b.shots} />
      <StatRow label="No gol" a={stats.a.shotsOnTarget} b={stats.b.shotsOnTarget} />
      <StatRow label="Passes" a={stats.a.passes} b={stats.b.passes} />
      <StatRow label="Precisão" a={stats.a.passAccuracy} b={stats.b.passAccuracy} suffix="%" />
      <StatRow label="Escanteios" a={stats.a.corners} b={stats.b.corners} />
      <StatRow label="Faltas" a={stats.a.fouls} b={stats.b.fouls} />
      <p className="text-muted-foreground pt-1 text-xs">Transmissão salva no YouTube.</p>
    </div>
  );
}

function StatRow({
  label,
  a,
  b,
  suffix = '',
}: {
  label: string;
  a: number;
  b: number;
  suffix?: string;
}) {
  const total = a + b;
  const aWidth = total === 0 ? 50 : (a / total) * 100;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-heading w-12 tabular-nums">
          {a}
          {suffix}
        </span>
        <span className="text-muted-foreground text-xs tracking-wide uppercase">{label}</span>
        <span className="font-heading w-12 text-right tabular-nums">
          {b}
          {suffix}
        </span>
      </div>
      <div className="bg-muted flex h-1.5 overflow-hidden rounded-full">
        <span className="bg-primary h-full" style={{ width: `${aWidth}%` }} />
      </div>
    </div>
  );
}

type MatchRowDialogProps = {
  match: PreviewMatch;
  playerId: string;
  eyebrow?: string;
};

export function MatchRowDialog({ match, playerId, eyebrow }: MatchRowDialogProps) {
  const isA = match.playerAId === playerId;
  const opponentId = isA ? match.playerBId : match.playerAId;
  const opponent = getPreviewPlayer(opponentId);
  const scoreFor = isA ? match.scoreA : match.scoreB;
  const scoreAgainst = isA ? match.scoreB : match.scoreA;
  const won = match.status === 'completed' && match.winnerPlayerId === playerId;

  return (
    <MatchDialog match={match} title={eyebrow ?? getMatchTitle(match)}>
      <button
        type="button"
        className="cf-glass hover:border-primary/40 flex w-full flex-wrap items-center gap-3 rounded-2xl p-4 text-left transition-colors"
      >
        <div className="min-w-0 flex-1 space-y-1">
          <p className="font-heading text-foreground text-sm font-semibold">
            {eyebrow ?? getMatchTitle(match)}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">vs</span>
            <PlayerChip player={opponent} size="sm" />
          </div>
        </div>
        <p className="font-heading text-foreground text-xl font-semibold tabular-nums">
          {formatPreviewScore(scoreFor)} × {formatPreviewScore(scoreAgainst)}
        </p>
        {match.status === 'completed' ? (
          <Badge variant={won ? 'default' : 'secondary'}>{won ? 'Vitória' : 'Derrota'}</Badge>
        ) : (
          <MatchStatusBadge status={match.status} />
        )}
        <p className="text-muted-foreground w-full text-xs sm:ml-auto sm:w-auto">
          {formatPreviewDateTime(match.scheduledAt)}
        </p>
      </button>
    </MatchDialog>
  );
}
