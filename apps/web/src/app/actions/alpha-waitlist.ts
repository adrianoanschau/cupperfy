'use server';

import { createSupabaseAnonClient } from '@/lib/supabase/server';

export type JoinAlphaWaitlistResult =
  | { ok: true }
  | { ok: false; error: string; code?: 'duplicate' | 'validation' | 'config' | 'unknown' };

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizeName(name: string): string | null {
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed.slice(0, 120) : null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 320;
}

export async function joinAlphaWaitlist(input: {
  email: string;
  name?: string;
}): Promise<JoinAlphaWaitlistResult> {
  const email = normalizeEmail(input.email ?? '');
  const name = normalizeName(input.name ?? '');

  if (!email || !isValidEmail(email)) {
    return { ok: false, error: 'Informe um e-mail válido.', code: 'validation' };
  }

  try {
    const supabase = createSupabaseAnonClient();
    const { error } = await supabase.from('alpha_waitlist').insert({ email, name });

    if (error) {
      if (error.code === '23505') {
        return {
          ok: false,
          error: 'Este e-mail já está na leva fundadora.',
          code: 'duplicate',
        };
      }

      console.error('alpha_waitlist insert failed', error);
      return {
        ok: false,
        error: 'Não foi possível salvar agora. Tente de novo em instantes.',
        code: 'unknown',
      };
    }

    return { ok: true };
  } catch (error) {
    console.error('alpha_waitlist config/runtime', error);
    return {
      ok: false,
      error: 'Serviço de lista indisponível. Confira o Supabase local e o .env.',
      code: 'config',
    };
  }
}
