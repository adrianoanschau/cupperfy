'use client';

import { useMemo, useState, type FormEvent } from 'react';

import { submitAlphaCheckin } from '@/app/actions/alpha-checkin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CHECKIN_EVENT, formatSlotWhen, type CheckinSlot } from '@/lib/checkin/slots';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'submitting' | 'done';

type AlphaCheckinFormProps = {
  token: string;
  name: string | null;
  email: string;
  slots: CheckinSlot[];
  initialSlotIds?: string[];
  submissionsOpen: boolean;
};

export function AlphaCheckinForm({
  token,
  name,
  email,
  slots,
  initialSlotIds = [],
  submissionsOpen,
}: AlphaCheckinFormProps) {
  const openSlots = useMemo(() => slots.filter((slot) => slot.open !== false), [slots]);

  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');
  const [slotIds, setSlotIds] = useState<string[]>(initialSlotIds);
  const [confirmedLabels, setConfirmedLabels] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const busy = status === 'submitting';
  const canSubmit = submissionsOpen && openSlots.length > 0;
  const displayName = name?.trim() || null;

  function toggleSlot(slotId: string) {
    setSlotIds((current) =>
      current.includes(slotId) ? current.filter((id) => id !== slotId) : [...current, slotId],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || slotIds.length === 0) return;

    setError(null);
    setStatus('submitting');

    const result = await submitAlphaCheckin({ token, slotIds, note });

    if (!result.ok) {
      setError(result.error);
      setStatus('idle');
      return;
    }

    setConfirmedLabels(result.slotLabels);
    setStatus('done');
  }

  if (status === 'done' && confirmedLabels.length > 0) {
    return (
      <div className="border-border space-y-3 border-t pt-8">
        <p className="font-heading text-foreground text-xl font-semibold">Check-in confirmado.</p>
        <p className="text-muted-foreground">
          Obrigado{displayName ? `, ${displayName}` : ''}. Registramos sua disponibilidade:
        </p>
        <ul className="text-foreground list-inside list-disc space-y-1 text-sm">
          {confirmedLabels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
        <p className="text-muted-foreground text-sm">
          Para alterar, abra de novo este mesmo link e salve outra combinação — ou fale no WhatsApp
          / Telegram.
        </p>
      </div>
    );
  }

  if (!canSubmit) {
    return (
      <div className="border-border space-y-2 border-t pt-8">
        <p className="font-heading text-foreground text-xl font-semibold">Check-in fechado</p>
        <p className="text-muted-foreground">
          As janelas ainda não estão abertas (ou já encerraram). Use o contato no rodapé da página.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-border space-y-6 border-t pt-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="checkin-name">Nome</Label>
          <Input
            id="checkin-name"
            name="name"
            value={displayName ?? '—'}
            readOnly
            disabled
            className="bg-muted/40"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="checkin-email">E-mail</Label>
          <Input
            id="checkin-email"
            name="email"
            type="email"
            value={email}
            readOnly
            disabled
            className="bg-muted/40"
          />
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="font-heading text-foreground text-sm font-semibold">
          Quais janelas você pode?
        </legend>
        <p className="text-muted-foreground text-sm">
          {CHECKIN_EVENT.timezoneNote} Selecione todas as opções viáveis.
        </p>
        <div className="space-y-2">
          {openSlots.map((slot) => {
            const selected = slotIds.includes(slot.id);
            return (
              <label
                key={slot.id}
                className={cn(
                  'lf-glass flex cursor-pointer gap-3 rounded-2xl px-4 py-3 transition-colors',
                  selected && 'border-primary ring-primary/30 ring-2',
                )}
              >
                <input
                  type="checkbox"
                  name="slots"
                  value={slot.id}
                  checked={selected}
                  onChange={() => toggleSlot(slot.id)}
                  disabled={busy}
                  className="mt-1 accent-[var(--primary)]"
                />
                <span className="space-y-0.5">
                  <span className="text-foreground block font-medium">{slot.label}</span>
                  <span className="text-muted-foreground block text-sm capitalize">
                    {formatSlotWhen(slot)}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="checkin-note">Observação (opcional)</Label>
        <Input
          id="checkin-note"
          name="note"
          placeholder="Ex.: chego 15 min depois / só até 21h"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          disabled={busy}
        />
      </div>

      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={busy || slotIds.length === 0}>
          {busy ? 'Confirmando…' : 'Confirmar disponibilidade'}
        </Button>
        <p className="text-muted-foreground text-sm">
          {slotIds.length === 0
            ? 'Marque ao menos uma janela'
            : `${slotIds.length} janela${slotIds.length > 1 ? 's' : ''} selecionada${slotIds.length > 1 ? 's' : ''}`}
        </p>
      </div>
    </form>
  );
}
