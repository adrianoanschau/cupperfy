import { Badge } from '@/components/ui/badge';
import { MATCH_STATUS_LABEL } from '@/lib/preview/mock-data';

import type { PreviewMatchStatus } from '@/lib/preview/mock-data';

type MatchStatusBadgeProps = {
  status: PreviewMatchStatus;
};

export function MatchStatusBadge({ status }: MatchStatusBadgeProps) {
  if (status === 'ready') {
    return <Badge>{MATCH_STATUS_LABEL.ready}</Badge>;
  }

  if (status === 'completed') {
    return <Badge variant="secondary">{MATCH_STATUS_LABEL.completed}</Badge>;
  }

  return <Badge variant="outline">{MATCH_STATUS_LABEL.pending}</Badge>;
}
