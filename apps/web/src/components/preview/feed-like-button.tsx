'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function FeedLikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <Button
      type="button"
      variant="ghost"
      size="xs"
      className={cn(liked && 'text-primary')}
      aria-pressed={liked}
      aria-label={liked ? 'Remover curtida' : 'Curtir'}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setLiked((current) => !current);
      }}
    >
      <Heart className={cn('size-3.5', liked && 'fill-current')} />
      {liked ? 'Curtiu' : 'Curtir'}
    </Button>
  );
}
