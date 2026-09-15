import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import type { PreviewPlayer } from '@/lib/preview/mock-data';

type PlayerOutcome = 'winner' | 'loser' | 'open';

type PlayerChipProps = {
  player: PreviewPlayer | undefined;
  outcome?: PlayerOutcome;
  size?: 'sm' | 'default' | 'lg';
  href?: string;
};

function nameClass(outcome: PlayerOutcome, size: 'sm' | 'default' | 'lg') {
  if (outcome === 'winner') {
    return cn('font-heading text-foreground font-semibold', size === 'lg' && 'text-lg');
  }
  if (outcome === 'loser') {
    return cn('text-muted-foreground', size === 'lg' ? 'text-lg' : 'text-sm');
  }
  return cn('text-foreground font-medium', size === 'lg' ? 'font-heading text-lg' : 'text-sm');
}

function ChipBody({
  player,
  outcome = 'open',
  size = 'default',
}: Pick<PlayerChipProps, 'player' | 'outcome' | 'size'>) {
  if (!player) {
    return (
      <span className="flex min-w-0 items-center gap-2">
        <Avatar size={size === 'lg' ? 'lg' : 'sm'}>
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground truncate text-sm">A definir</span>
      </span>
    );
  }

  return (
    <span className="flex min-w-0 items-center gap-2">
      <Avatar size={size}>
        <AvatarFallback>{player.initials}</AvatarFallback>
      </Avatar>
      <span className="min-w-0">
        <span className={cn('block truncate', nameClass(outcome, size))}>{player.tag}</span>
        <span className="text-muted-foreground block truncate text-xs">{player.displayName}</span>
      </span>
    </span>
  );
}

export function PlayerChip({ player, outcome = 'open', size = 'default', href }: PlayerChipProps) {
  if (player && href) {
    return (
      <Link href={href} className="min-w-0 rounded-lg focus-visible:outline-none">
        <ChipBody player={player} outcome={outcome} size={size} />
      </Link>
    );
  }

  return <ChipBody player={player} outcome={outcome} size={size} />;
}

export function playerHref(slug: string): string {
  return `/preview/jogador/${slug}`;
}
