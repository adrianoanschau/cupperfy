'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  createOrRefreshCheckinInvite,
  revokeCheckinInvite,
  sendCheckinInviteEmail,
  type WaitlistAdminRow,
} from '@/app/actions/admin-invites';
import { Button } from '@/components/ui/button';

type InviteActionsProps = {
  person: WaitlistAdminRow;
};

export function InviteActions({ person }: InviteActionsProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [linkPath, setLinkPath] = useState<string | null>(
    person.inviteToken ? `/checkin/${person.inviteToken}` : null,
  );

  async function handleInvite(refresh: boolean) {
    setBusy(true);
    setError(null);
    setMessage(null);

    const result = await createOrRefreshCheckinInvite({
      email: person.email,
      name: person.name,
    });

    if (!result.ok) {
      setError(result.error);
      setBusy(false);
      return;
    }

    const absolute = `${window.location.origin}${result.path}`;
    setLinkPath(result.path);
    try {
      await navigator.clipboard.writeText(absolute);
      setMessage(refresh ? 'Novo link gerado e copiado.' : 'Link gerado e copiado.');
    } catch {
      setMessage(`Link: ${absolute}`);
    }

    setBusy(false);
    router.refresh();
  }

  async function handleSendEmail() {
    setBusy(true);
    setError(null);
    setMessage(null);

    const result = await sendCheckinInviteEmail({
      email: person.email,
      name: person.name,
    });

    if (!result.ok) {
      setError(result.error);
      setBusy(false);
      return;
    }

    setLinkPath(result.path);
    setMessage(`E-mail enviado para ${person.email}.`);
    setBusy(false);
    router.refresh();
  }

  async function handleRevoke() {
    setBusy(true);
    setError(null);
    setMessage(null);

    const result = await revokeCheckinInvite(person.email);
    if (!result.ok) {
      setError(result.error);
      setBusy(false);
      return;
    }

    setLinkPath(null);
    setMessage('Convite revogado.');
    setBusy(false);
    router.refresh();
  }

  async function handleCopy() {
    if (!linkPath) return;
    const absolute = `${window.location.origin}${linkPath}`;
    try {
      await navigator.clipboard.writeText(absolute);
      setMessage('Link copiado.');
    } catch {
      setMessage(absolute);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          disabled={busy}
          onClick={() => void handleInvite(Boolean(person.inviteToken))}
        >
          {person.inviteToken ? 'Regenerar link' : 'Gerar convite'}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={busy}
          onClick={() => void handleSendEmail()}
        >
          Enviar por e-mail
        </Button>
        {linkPath ? (
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={busy}
            onClick={() => void handleCopy()}
          >
            Copiar link
          </Button>
        ) : null}
        {person.inviteToken ? (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={busy}
            onClick={() => void handleRevoke()}
          >
            Revogar
          </Button>
        ) : null}
      </div>
      {message ? <p className="text-muted-foreground text-xs">{message}</p> : null}
      {error ? (
        <p className="text-destructive text-xs" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
