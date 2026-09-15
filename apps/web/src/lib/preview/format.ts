/**
 * DADOS FICTÍCIOS — helpers de formatação do preview de marketing.
 * Não conecta ao Supabase.
 */

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'America/Sao_Paulo',
};

const DAY_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  timeZone: 'America/Sao_Paulo',
};

export function formatPreviewDateTime(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', DATE_FORMAT).format(new Date(iso));
}

export function formatPreviewDay(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', DAY_FORMAT).format(new Date(iso));
}

export function formatPreviewScore(score: number | null): string {
  if (score === null) return '—';
  return String(score);
}
