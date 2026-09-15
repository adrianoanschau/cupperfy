'use client';

import { useState, type FormEvent } from 'react';

import { completeOnboarding } from '@/app/actions/onboarding';
import { Button } from '@/components/ui/button';

type SportOption = {
  id: string;
  name: string;
};

export function OnboardingForm({ sports }: { sports: SportOption[] }) {
  const [asPlayer, setAsPlayer] = useState(true);
  const [asOrganizer, setAsOrganizer] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const sportLabel = sports[0]?.name ?? 'Futebol e-sports';

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const result = await completeOnboarding({ asPlayer, asOrganizer });
    if (result && !result.ok) {
      setError(result.error);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <fieldset className="space-y-3">
        <legend className="font-heading text-foreground text-sm font-semibold">Papéis</legend>
        <p className="text-muted-foreground text-sm">Pode marcar os dois.</p>
        <label className="border-border flex cursor-pointer items-start gap-3 rounded-xl border p-3">
          <input
            type="checkbox"
            className="accent-primary mt-1 size-4"
            checked={asPlayer}
            onChange={(event) => setAsPlayer(event.target.checked)}
            disabled={busy}
          />
          <span>
            <span className="text-foreground block font-medium">Jogador</span>
            <span className="text-muted-foreground text-sm">
              Começa um histórico competitivo na modalidade {sportLabel}.
            </span>
          </span>
        </label>
        <label className="border-border flex cursor-pointer items-start gap-3 rounded-xl border p-3">
          <input
            type="checkbox"
            className="accent-primary mt-1 size-4"
            checked={asOrganizer}
            onChange={(event) => setAsOrganizer(event.target.checked)}
            disabled={busy}
          />
          <span>
            <span className="text-foreground block font-medium">Organizador</span>
            <span className="text-muted-foreground text-sm">
              Poderá criar copas. A verificação de organizador não entra nesta etapa.
            </span>
          </span>
        </label>
      </fieldset>

      {asPlayer ? (
        <div className="border-border space-y-1 rounded-xl border p-3">
          <p className="font-heading text-foreground text-sm font-semibold">Modalidade</p>
          <p className="text-muted-foreground text-sm">
            No lançamento há uma opção: <span className="text-foreground font-medium">{sportLabel}</span>
            .
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={busy || (!asPlayer && !asOrganizer)}>
        {busy ? 'Salvando…' : 'Continuar para a conta'}
      </Button>
    </form>
  );
}
