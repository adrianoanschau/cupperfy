import { createSupabaseServiceClient } from '@/lib/supabase/server';

export type CheckinInvite = {
  id: string;
  token: string;
  email: string;
  name: string | null;
};

export async function getCheckinInviteByToken(token: string): Promise<CheckinInvite | null> {
  const normalized = token.trim();
  if (normalized.length < 20) return null;

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from('alpha_checkin_invites')
    .select('id, token, email, name, revoked_at')
    .eq('token', normalized)
    .maybeSingle();

  if (error || !data || data.revoked_at) {
    if (error) console.error('checkin invite lookup', error);
    return null;
  }

  return {
    id: data.id,
    token: data.token,
    email: data.email,
    name: data.name,
  };
}

export async function getCheckinSlotIdsForInvite(inviteId: string): Promise<string[]> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from('alpha_checkins')
    .select('slot_id')
    .eq('invite_id', inviteId);

  if (error) {
    console.error('checkin slots lookup', error);
    return [];
  }

  return (data ?? []).map((row) => row.slot_id);
}

/** Gera token opaco para novos convites (use no Studio/SQL ou script). */
export function generateCheckinToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
