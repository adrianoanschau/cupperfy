import Link from 'next/link';

import { FeedLikeButton } from '@/components/preview/feed-like-button';
import { PlayerChip, playerHref } from '@/components/preview/player-chip';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatPreviewDateTime } from '@/lib/preview/format';
import { getPreviewPlayer } from '@/lib/preview/mock-data';

import type { PreviewCommunityPost } from '@/lib/preview/mock-data';

export function FeedCard({ post }: { post: PreviewCommunityPost }) {
  const author = getPreviewPlayer(post.authorId);

  return (
    <article className="cf-glass space-y-3 rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <PlayerChip player={author} size="sm" href={author ? playerHref(author.slug) : undefined} />
        <Badge variant="secondary">{postKindLabel(post.kind)}</Badge>
      </div>
      <Link href={post.href} className="text-foreground hover:text-primary block">
        {post.body}
      </Link>
      <Separator />
      <div className="flex items-center justify-between gap-2">
        <p className="text-muted-foreground text-xs">{formatPreviewDateTime(post.createdAt)}</p>
        <FeedLikeButton />
      </div>
    </article>
  );
}

function postKindLabel(kind: PreviewCommunityPost['kind']): string {
  if (kind === 'achievement') return 'Conquista';
  if (kind === 'match') return 'Partida';
  if (kind === 'competition') return 'Copa';
  return 'Post';
}
