'use server';

import { requireAdminSession } from '@/app/actions/admin-auth';
import { getAppOrigin } from '@/lib/app-origin';
import { generateCheckinToken } from '@/lib/checkin/invites';
import { buildCheckinInviteEmail } from '@/lib/email/checkin-invite';
import { sendEmail } from '@/lib/email/resend';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export type WaitlistAdminRow = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  inviteToken: string | null;
  inviteCreatedAt: string | null;
  inviteRevoked: boolean;
  selectedSlots: string[];
};

export type AdminInviteResult =
  { ok: true; token: string; path: string } | { ok: false; error: string };

export type SendInviteEmailResult =
  { ok: true; token: string; path: string } | { ok: false; error: string };

export async function listWaitlistWithInvites(): Promise<WaitlistAdminRow[]> {
  await requireAdminSession();
  const supabase = createSupabaseServiceClient();

  const [
    { data: waitlist, error: waitlistError },
    { data: invites, error: invitesError },
    { data: checkins, error: checkinsError },
  ] = await Promise.all([
    supabase
      .from('alpha_waitlist')
      .select('id, email, name, created_at')
      .order('created_at', { ascending: false }),
    supabase.from('alpha_checkin_invites').select('email, token, created_at, revoked_at, name'),
    supabase.from('alpha_checkins').select('email, slot_label'),
  ]);

  if (waitlistError) {
    console.error('admin waitlist', waitlistError);
    throw new Error('Não foi possível carregar a lista de interessados.');
  }
  if (invitesError) {
    console.error('admin invites', invitesError);
    throw new Error('Não foi possível carregar os convites.');
  }
  if (checkinsError) {
    console.error('admin checkins', checkinsError);
    throw new Error('Não foi possível carregar os check-ins.');
  }

  const inviteByEmail = new Map(
    (invites ?? []).map((invite) => [invite.email.toLowerCase(), invite] as const),
  );
  const slotsByEmail = new Map<string, string[]>();
  for (const row of checkins ?? []) {
    const key = row.email.toLowerCase();
    const list = slotsByEmail.get(key) ?? [];
    list.push(row.slot_label);
    slotsByEmail.set(key, list);
  }

  return (waitlist ?? []).map((person) => {
    const email = person.email.toLowerCase();
    const invite = inviteByEmail.get(email);
    return {
      id: person.id,
      email: person.email,
      name: person.name,
      createdAt: person.created_at,
      inviteToken: invite && !invite.revoked_at ? invite.token : null,
      inviteCreatedAt: invite?.created_at ?? null,
      inviteRevoked: Boolean(invite?.revoked_at),
      selectedSlots: slotsByEmail.get(email) ?? [],
    };
  });
}

export async function createOrRefreshCheckinInvite(input: {
  email: string;
  name?: string | null;
}): Promise<AdminInviteResult> {
  await requireAdminSession();

  const email = input.email.trim().toLowerCase();
  if (!email) {
    return { ok: false, error: 'E-mail inválido.' };
  }

  const name = input.name?.trim() || null;
  const token = generateCheckinToken();
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase.from('alpha_checkin_invites').upsert(
    {
      email,
      name,
      token,
      revoked_at: null,
    },
    { onConflict: 'email' },
  );

  if (error) {
    console.error('admin create invite', error);
    return { ok: false, error: 'Falha ao gerar o convite.' };
  }

  return { ok: true, token, path: `/checkin/${token}` };
}

/** Reusa convite ativo; só cria/regenera se não existir. */
export async function ensureCheckinInvite(input: {
  email: string;
  name?: string | null;
}): Promise<AdminInviteResult> {
  await requireAdminSession();

  const email = input.email.trim().toLowerCase();
  if (!email) {
    return { ok: false, error: 'E-mail inválido.' };
  }

  const supabase = createSupabaseServiceClient();
  const { data: existing, error: lookupError } = await supabase
    .from('alpha_checkin_invites')
    .select('token, revoked_at')
    .eq('email', email)
    .maybeSingle();

  if (lookupError) {
    console.error('admin ensure invite lookup', lookupError);
    return { ok: false, error: 'Falha ao consultar convite.' };
  }

  if (existing?.token && !existing.revoked_at) {
    return { ok: true, token: existing.token, path: `/checkin/${existing.token}` };
  }

  return createOrRefreshCheckinInvite(input);
}

export async function sendCheckinInviteEmail(input: {
  email: string;
  name?: string | null;
}): Promise<SendInviteEmailResult> {
  await requireAdminSession();

  const ensured = await ensureCheckinInvite(input);
  if (!ensured.ok) return ensured;

  const origin = await getAppOrigin();
  const checkinUrl = `${origin}${ensured.path}`;
  const content = buildCheckinInviteEmail({
    name: input.name ?? null,
    checkinUrl,
    iconUrl: `${origin}/brand/cupperfy-icon.png`,
  });

  const sent = await sendEmail({
    to: input.email.trim().toLowerCase(),
    subject: content.subject,
    html: content.html,
    text: content.text,
  });

  if (!sent.ok) {
    return { ok: false, error: sent.error };
  }

  return { ok: true, token: ensured.token, path: ensured.path };
}

export async function revokeCheckinInvite(email: string): Promise<AdminInviteResult> {
  await requireAdminSession();

  const normalized = email.trim().toLowerCase();
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from('alpha_checkin_invites')
    .update({ revoked_at: new Date().toISOString() })
    .eq('email', normalized)
    .select('token')
    .maybeSingle();

  if (error || !data) {
    console.error('admin revoke invite', error);
    return { ok: false, error: 'Não foi possível revogar o convite.' };
  }

  return { ok: true, token: data.token, path: `/checkin/${data.token}` };
}
