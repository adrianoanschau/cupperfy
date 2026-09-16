/**
 * Janelas do check-in do torneio alfa.
 * Edite estes slots antes de enviar o link `/checkin` aos interessados.
 * `id` estável — não renomeie depois que alguém já confirmou.
 */
export type CheckinSlot = {
  id: string;
  /** Texto exibido na UI e gravado em `slot_label`. */
  label: string;
  /** ISO 8601 com offset (ex.: América/São_Paulo). */
  startsAt: string;
  /** Se false, aparece desabilitado na UI. */
  open?: boolean;
};

export const CHECKIN_EVENT = {
  title: 'Copa Cupperfy FC · EA FC',
  subtitle: 'Convite pessoal. Confirme as janelas em que você consegue jogar o x1.',
  timezoneNote: 'Horários em Brasília (BRT, UTC−3).',
  /** Quando false, o form recusa novos envios (página continua no ar). */
  submissionsOpen: true,
} as const;

/**
 * Placeholders — troque pelas datas reais antes do convite.
 * Prefira potências de 2 na chave (4 / 8 / 16) alinhadas a quem confirmar.
 */
export const CHECKIN_SLOTS: CheckinSlot[] = [
  {
    id: 'alpha-slot-a',
    label: 'Sábado · 14h–17h',
    startsAt: '2026-10-04T14:00:00-03:00',
    open: true,
  },
  {
    id: 'alpha-slot-b',
    label: 'Sábado · 19h–22h',
    startsAt: '2026-10-04T19:00:00-03:00',
    open: true,
  },
  {
    id: 'alpha-slot-c',
    label: 'Domingo · 14h–17h',
    startsAt: '2026-10-05T14:00:00-03:00',
    open: true,
  },
  {
    id: 'alpha-slot-d',
    label: 'Domingo · 19h–22h',
    startsAt: '2026-10-05T19:00:00-03:00',
    open: true,
  },
];

export function getOpenCheckinSlots(): CheckinSlot[] {
  return CHECKIN_SLOTS.filter((slot) => slot.open !== false);
}

export function findCheckinSlot(slotId: string): CheckinSlot | undefined {
  return CHECKIN_SLOTS.find((slot) => slot.id === slotId);
}

export function formatSlotWhen(slot: CheckinSlot): string {
  const date = new Date(slot.startsAt);
  if (Number.isNaN(date.getTime())) return slot.label;

  const weekday = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    timeZone: 'America/Sao_Paulo',
  }).format(date);
  const day = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  }).format(date);
  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  }).format(date);

  return `${weekday}, ${day} · a partir das ${time}`;
}
