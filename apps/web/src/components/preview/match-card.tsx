'use client';

import { MatchDialog } from '@/components/preview/match-detail-dialog';
import { MatchStatusBadge } from '@/components/preview/match-status-badge';
import { PlayerChip, playerHref } from '@/components/preview/player-chip';
import { Button } from '@/components/ui/button';
import { formatPreviewDateTime, formatPreviewScore } from '@/lib/preview/format';
import {
  getMatchTitle,
  getPreviewMatch,
  getPreviewPlayer,
  getRoundLabel,
} from '@/lib/preview/mock-data';
import { cn } from '@/lib/utils';

import type { PreviewMatch } from '@/lib/preview/mock-data';

type MatchCardProps = {
  match: PreviewMatch;
  compact?: boolean;
};

function sideOutcome(match: PreviewMatch, playerId: string | null): 'winner' | 'loser' | 'open' {
  if (match.status !== 'completed' || !playerId || !match.winnerPlayerId) return 'open';
  if (match.winnerPlayerId === playerId) return 'winner';
  return 'loser';
}

export function MatchCard({ match, compact = false }: MatchCardProps) {
  const nextMatch = getPreviewMatch(match.nextMatchId);

  return (
    <article className="cf-glass space-y-3 rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-heading text-foreground text-sm font-semibold">{getMatchTitle(match)}</p>
        <MatchStatusBadge status={match.status} />
      </div>

      <div className="space-y-2">
        <MatchSide
          playerId={match.playerAId}
          score={match.scoreA}
          outcome={sideOutcome(match, match.playerAId)}
        />
        <MatchSide
          playerId={match.playerBId}
          score={match.scoreB}
          outcome={sideOutcome(match, match.playerBId)}
        />
      </div>

      {compact ? null : (
        <p className="text-muted-foreground text-xs">
          {getRoundLabel(match.round)} · {formatPreviewDateTime(match.scheduledAt)}
          {nextMatch ? ` · avança para ${getMatchTitle(nextMatch)}` : null}
        </p>
      )}

      <MatchDialog match={match}>
        <Button type="button" variant="outline" size="sm" className="w-full">
          Ver partida
        </Button>
      </MatchDialog>
    </article>
  );
}

function MatchSide({
  playerId,
  score,
  outcome,
}: {
  playerId: string | null;
  score: number | null;
  outcome: 'winner' | 'loser' | 'open';
}) {
  const player = getPreviewPlayer(playerId);

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-xl px-2 py-1.5',
        outcome === 'winner' && 'bg-primary/10',
      )}
    >
      <PlayerChip
        player={player}
        outcome={outcome}
        size="sm"
        href={player ? playerHref(player.slug) : undefined}
      />
      <span className="font-heading text-foreground text-lg font-semibold tabular-nums">
        {formatPreviewScore(score)}
      </span>
    </div>
  );
}
