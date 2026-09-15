import Link from 'next/link';

import { PlayerChip, playerHref } from '@/components/preview/player-chip';
import { PreviewHero } from '@/components/preview/preview-hero';
import { PreviewSection } from '@/components/preview/preview-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPreviewDateTime } from '@/lib/preview/format';
import {
  getPreviewPlayer,
  PREVIEW_POSTS,
  PREVIEW_SUGGESTED_PLAYER_IDS,
} from '@/lib/preview/mock-data';

import type { PreviewCommunityPost } from '@/lib/preview/mock-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comunidade (prévia)',
};

export default function PreviewCommunityPage() {
  return (
    <>
      <PreviewHero
        phase2
        kicker="Comunidade"
        title="Feed e pessoas"
        description="Conquistas, recados da copa e quem está por perto. Esta área entra depois das chaves da temporada 0."
      />

      <PreviewSection>
        <div className="cf-glass-strong mb-8 space-y-3 rounded-3xl p-6 md:p-8">
          <Badge>Em breve</Badge>
          <h2 className="font-heading text-foreground text-2xl font-bold">
            A comunidade em volta das copas
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            O lançamento é o torneio x1: inscrição, chave e placar. Feed e seguir vêm no caminho —
            aqui você já vê o recorte.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <ul className="space-y-4">
            {PREVIEW_POSTS.map((post) => (
              <li key={post.id}>
                <FeedCard post={post} />
              </li>
            ))}
          </ul>

          <aside className="space-y-4">
            <h2 className="font-heading text-foreground text-sm font-semibold tracking-wide uppercase">
              Perfis sugeridos
            </h2>
            <ul className="cf-glass space-y-4 rounded-2xl p-4">
              {PREVIEW_SUGGESTED_PLAYER_IDS.map((id) => {
                const player = getPreviewPlayer(id);
                if (!player) return null;
                return (
                  <li key={id} className="flex items-center justify-between gap-2">
                    <PlayerChip player={player} size="sm" href={playerHref(player.slug)} />
                    <Button size="xs" variant="outline" disabled>
                      Seguir
                    </Button>
                  </li>
                );
              })}
            </ul>
            <p className="text-muted-foreground text-xs">Disponível em breve.</p>
          </aside>
        </div>
      </PreviewSection>

      <PreviewSection tone="end" className="border-b-0">
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/preview/competicao">Ver a copa</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#alfa">Entrar na leva</Link>
          </Button>
        </div>
      </PreviewSection>
    </>
  );
}

function FeedCard({ post }: { post: PreviewCommunityPost }) {
  const author = getPreviewPlayer(post.authorId);
  const kindLabel = postKindLabel(post.kind);

  return (
    <article className="cf-glass space-y-3 rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <PlayerChip player={author} size="sm" href={author ? playerHref(author.slug) : undefined} />
        <Badge variant="secondary">{kindLabel}</Badge>
      </div>
      <p className="text-foreground">{post.body}</p>
      <Separator />
      <p className="text-muted-foreground text-xs">{formatPreviewDateTime(post.createdAt)}</p>
    </article>
  );
}

function postKindLabel(kind: PreviewCommunityPost['kind']): string {
  if (kind === 'achievement') return 'Conquista';
  if (kind === 'match') return 'Partida';
  return 'Post';
}
