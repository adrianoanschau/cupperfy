'use server';

import { getCheckinInviteByToken } from '@/lib/checkin/invites';
import {
  CHECKIN_EVENT,
  findCheckinSlot,
  formatSlotWhen,
  getOpenCheckinSlots,
} from '@/lib/checkin/slots';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export type SubmitAlphaCheckinResult =
  | { ok: true; slotLabels: string[] }
  | {
      ok: false;
      error: string;
      code?: 'closed' | 'invalid_token' | 'validation' | 'config' | 'unknown';
    };

function normalizeNote(note: string): string | null {
  const trimmed = note.trim();
  return trimmed.length > 0 ? trimmed.slice(0, 500) : null;
}

export async function submitAlphaCheckin(input: {
  token: string;
  slotIds: string[];
  note?: string;
}): Promise<SubmitAlphaCheckinResult> {
  if (!CHECKIN_EVENT.submissionsOpen || getOpenCheckinSlots().length === 0) {
    return {
      ok: false,
      error: 'O check-in está fechado no momento. Fale conosco no WhatsApp ou Telegram.',
      code: 'closed',
    };
  }

  const invite = await getCheckinInviteByToken(input.token ?? '');
  if (!invite) {
    return {
      ok: false,
      error: 'Link inválido ou expirado. Peça um novo convite ao time.',
      code: 'invalid_token',
    };
  }

  const uniqueIds = [...new Set((input.slotIds ?? []).map((id) => id.trim()).filter(Boolean))];
  if (uniqueIds.length === 0) {
    return {
      ok: false,
      error: 'Selecione pelo menos uma janela de horário.',
      code: 'validation',
    };
  }

  const slots = uniqueIds.map((id) => findCheckinSlot(id));
  if (slots.some((slot) => !slot || slot.open === false)) {
    return {
      ok: false,
      error: 'Uma ou mais janelas selecionadas não estão disponíveis.',
      code: 'validation',
    };
  }

  const note = normalizeNote(input.note ?? '');
  const rows = slots.map((slot) => {
    const safe = slot!;
    return {
      invite_id: invite.id,
      email: invite.email,
      name: invite.name,
      slot_id: safe.id,
      slot_label: `${safe.label} · ${formatSlotWhen(safe)}`,
      note,
    };
  });

  try {
    const supabase = createSupabaseServiceClient();

    const { error: deleteError } = await supabase
      .from('alpha_checkins')
      .delete()
      .eq('invite_id', invite.id);

    if (deleteError) {
      console.error('alpha_checkins delete failed', deleteError);
      return {
        ok: false,
        error: 'Não foi possível atualizar sua disponibilidade. Tente de novo.',
        code: 'unknown',
      };
    }

    const { error: insertError } = await supabase.from('alpha_checkins').insert(rows);

    if (insertError) {
      console.error('alpha_checkins insert failed', insertError);
      return {
        ok: false,
        error: 'Não foi possível salvar agora. Tente de novo em instantes.',
        code: 'unknown',
      };
    }

    return { ok: true, slotLabels: rows.map((row) => row.slot_label) };
  } catch (error) {
    console.error('alpha_checkins config/runtime', error);
    return {
      ok: false,
      error: 'Serviço de check-in indisponível. Confira o Supabase e o .env.',
      code: 'config',
    };
  }
}
