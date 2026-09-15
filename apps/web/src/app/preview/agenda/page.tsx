import Link from 'next/link';

import { MatchCard } from '@/components/preview/match-card';
import { PreviewHero } from '@/components/preview/preview-hero';
import { PreviewSection } from '@/components/preview/preview-section';
import { Button } from '@/components/ui/button';
import { formatPreviewDay } from '@/lib/preview/format';
import { getUpcomingMatches, PREVIEW_COMPETITION } from '@/lib/preview/mock-data';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenda',
};

export default function PreviewAgendaPage() {
  const upcoming = getUpcomingMatches();
  const groups = groupByDay(upcoming);

  return (
    <>
      <PreviewHero
        kicker={PREVIEW_COMPETITION.name}
        title="Próximas partidas"
        description="Confrontos da Copa Cupperfy FC, em ordem de horário. Quartas em aberto, semis e final na fila."
      />

      <PreviewSection className="border-b-0">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <p className="text-muted-foreground max-w-xl text-sm">
            {upcoming.length} partidas pela frente. Toque numa partida para ver o detalhe.
          </p>
          <Button variant="outline" asChild>
            <Link href="/preview/competicao">Ver chave completa</Link>
          </Button>
        </div>

        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.day} className="space-y-4">
              <h2 className="font-heading text-foreground text-lg font-semibold capitalize">
                {group.label}
              </h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {group.matches.map((match) => (
                  <li key={match.id}>
                    <MatchCard match={match} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PreviewSection>
    </>
  );
}

function groupByDay(matches: ReturnType<typeof getUpcomingMatches>) {
  const buckets = new Map<string, typeof matches>();

  matches.forEach((match) => {
    const day = match.scheduledAt.slice(0, 10);
    const list = buckets.get(day);
    if (list) {
      list.push(match);
      return;
    }
    buckets.set(day, [match]);
  });

  return Array.from(buckets.entries()).map(([day, dayMatches]) => ({
    day,
    label: formatPreviewDay(dayMatches[0].scheduledAt),
    matches: dayMatches,
  }));
}
