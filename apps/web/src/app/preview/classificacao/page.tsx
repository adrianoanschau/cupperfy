import Link from 'next/link';

import { PlayerChip, playerHref } from '@/components/preview/player-chip';
import { PreviewHero } from '@/components/preview/preview-hero';
import { PreviewSection } from '@/components/preview/preview-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getPreviewPlayer, PREVIEW_STANDINGS } from '@/lib/preview/mock-data';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Classificação (prévia)',
};

export default function PreviewStandingsPage() {
  return (
    <>
      <PreviewHero
        backToFeed
        phase2
        kicker="Circuito"
        title="Classificação geral"
        description="Tabela de pontos corridos — o rumo depois da chave de eliminação da temporada 0."
      />

      <PreviewSection>
        <div className="cf-glass-strong mb-8 space-y-3 rounded-3xl p-6 md:p-8">
          <Badge>Em breve</Badge>
          <h2 className="font-heading text-foreground text-2xl font-bold">Circuito Cupperfy 0</h2>
          <p className="text-muted-foreground max-w-2xl">
            A copa de lançamento é eliminação simples. Este circuito mostra como a classificação
            geral pode aparecer quando o produto crescer.
          </p>
        </div>

        <div className="cf-glass rounded-2xl p-2 md:p-4">
          <Table>
            <TableCaption>3 pontos por vitória, 1 por empate.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>Jogador</TableHead>
                <TableHead className="text-right">J</TableHead>
                <TableHead className="text-right">V</TableHead>
                <TableHead className="text-right">E</TableHead>
                <TableHead className="text-right">D</TableHead>
                <TableHead className="text-right">GP</TableHead>
                <TableHead className="text-right">GC</TableHead>
                <TableHead className="text-right">SG</TableHead>
                <TableHead className="text-right">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PREVIEW_STANDINGS.map((row) => {
                const player = getPreviewPlayer(row.playerId);
                const goalDiff = row.goalsFor - row.goalsAgainst;
                const signedDiff = goalDiff > 0 ? `+${goalDiff}` : String(goalDiff);

                return (
                  <TableRow key={row.playerId}>
                    <TableCell className="font-heading font-semibold">{row.position}</TableCell>
                    <TableCell>
                      <PlayerChip
                        player={player}
                        size="sm"
                        href={player ? playerHref(player.slug) : undefined}
                      />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{row.played}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.wins}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.draws}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.losses}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.goalsFor}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.goalsAgainst}</TableCell>
                    <TableCell className="font-heading text-right tabular-nums">
                      {signedDiff}
                    </TableCell>
                    <TableCell className="font-heading text-right font-semibold tabular-nums">
                      {row.points}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </PreviewSection>

      <PreviewSection tone="end" className="border-b-0">
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/preview/competicao">Ver a chave x1</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/preview">Voltar ao feed</Link>
          </Button>
        </div>
      </PreviewSection>
    </>
  );
}
