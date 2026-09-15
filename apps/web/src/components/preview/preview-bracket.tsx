import { MatchCard } from '@/components/preview/match-card';
import { getMatchesByRound } from '@/lib/preview/mock-data';

export function PreviewBracket() {
  const rounds = getMatchesByRound();

  return (
    <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
      <div className="flex min-w-[46rem] gap-4 md:min-w-0 md:gap-6">
        {rounds.map((round) => (
          <div key={round.round} className="flex min-w-0 flex-1 flex-col gap-3">
            <h3 className="font-heading text-foreground text-sm font-semibold tracking-wide uppercase">
              {round.label}
            </h3>
            <div className="flex flex-1 flex-col justify-around gap-3">
              {round.matches.map((match) => (
                <MatchCard key={match.id} match={match} compact />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
