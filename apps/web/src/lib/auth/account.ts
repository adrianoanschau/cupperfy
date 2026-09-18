import { redirect } from 'next/navigation';

import { createSupabaseServiceClient, createSupabaseUserClient } from '@/lib/supabase/server';

import type { User } from '@supabase/supabase-js';

export type AccountProfile = {
  id: string;
  displayName: string;
  avatarUrl: string | null;
};

export type AccountRoles = {
  isPlayer: boolean;
  isOrganizer: boolean;
  playerIds: string[];
  organizerId: string | null;
};

export function needsPasswordSetup(user: User | null | undefined): boolean {
  return user?.user_metadata?.must_set_password === true;
}

function metaString(user: User, key: string): string {
  const value = user.user_metadata?.[key];
  return typeof value === 'string' ? value.trim() : '';
}

export function displayNameFromUser(user: User): string {
  const fromMeta =
    metaString(user, 'display_name') || metaString(user, 'full_name') || metaString(user, 'name');
  const fromEmail = user.email?.split('@')[0]?.trim() ?? '';
  return (fromMeta || fromEmail || 'Jogador').slice(0, 80);
}

type AuthQueryClient = Awaited<ReturnType<typeof createSupabaseUserClient>>;

/** Cria o `profiles` se o trigger de signup não rodou (usuário antigo / OTP). */
export async function ensureAccountProfile(
  supabase: AuthQueryClient,
  user: User,
): Promise<{ id: string } | { error: string }> {
  const existing = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();
  if (existing.data?.id) {
    return { id: existing.data.id };
  }

  const admin = createSupabaseServiceClient();
  const { data, error } = await admin
    .from('profiles')
    .upsert(
      {
        user_id: user.id,
        display_name: displayNameFromUser(user),
        avatar_url:
          metaString(user, 'avatar_url') ||
          metaString(user, 'picture') ||
          metaString(user, 'avatar') ||
          null,
      },
      { onConflict: 'user_id' },
    )
    .select('id')
    .single();

  if (error || !data) {
    console.error('ensureAccountProfile', error ?? existing.error);
    return { error: 'Não encontramos seu perfil. Atualize a página e tente de novo.' };
  }

  return { id: data.id };
}

/** Destino depois de sessão válida (magic link, OAuth ou senha). */
export async function resolvePostAuthPath(supabase: AuthQueryClient, user: User): Promise<string> {
  if (needsPasswordSetup(user)) {
    return '/definir-senha';
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!profile) {
    return '/onboarding';
  }

  const [{ count: playerCount }, { count: organizerCount }] = await Promise.all([
    supabase
      .from('player_profiles')
      .select('id', { count: 'exact', head: true })
      .eq('profile_id', profile.id),
    supabase
      .from('organizer_profiles')
      .select('id', { count: 'exact', head: true })
      .eq('profile_id', profile.id),
  ]);

  if ((playerCount ?? 0) > 0 || (organizerCount ?? 0) > 0) {
    return '/conta';
  }

  return '/onboarding';
}

export async function getSessionUser() {
  const supabase = await createSupabaseUserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

export async function getAccountSnapshot() {
  const { supabase, user } = await getSessionUser();
  if (!user) {
    return { supabase, user: null, profile: null, roles: null };
  }

  const { data: profileRow } = await supabase
    .from('profiles')
    .select('id, display_name, avatar_url')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!profileRow) {
    return { supabase, user, profile: null, roles: null };
  }

  const profile: AccountProfile = {
    id: profileRow.id,
    displayName: profileRow.display_name,
    avatarUrl: profileRow.avatar_url,
  };

  const [{ data: players }, { data: organizer }] = await Promise.all([
    supabase.from('player_profiles').select('id').eq('profile_id', profile.id),
    supabase.from('organizer_profiles').select('id').eq('profile_id', profile.id).maybeSingle(),
  ]);

  const roles: AccountRoles = {
    isPlayer: (players ?? []).length > 0,
    isOrganizer: Boolean(organizer?.id),
    playerIds: (players ?? []).map((row) => row.id),
    organizerId: organizer?.id ?? null,
  };

  return { supabase, user, profile, roles };
}

export type HeaderAccount = {
  displayName: string;
  email: string;
  avatarUrl: string | null;
  roleLabels: string[];
  primaryHref: '/conta' | '/onboarding' | '/definir-senha';
  primaryLabel: string;
};

export async function getHeaderAccount(): Promise<HeaderAccount | null> {
  const snapshot = await getAccountSnapshot();
  if (!snapshot.user) {
    return null;
  }

  const metaName =
    typeof snapshot.user.user_metadata?.display_name === 'string'
      ? snapshot.user.user_metadata.display_name.trim()
      : '';
  const displayName =
    snapshot.profile?.displayName || metaName || snapshot.user.email?.split('@')[0] || 'Conta';

  const hasRoles = Boolean(snapshot.roles?.isPlayer || snapshot.roles?.isOrganizer);
  const needsPassword = needsPasswordSetup(snapshot.user);

  let primaryHref: HeaderAccount['primaryHref'] = '/onboarding';
  let primaryLabel = 'Continuar cadastro';
  if (needsPassword) {
    primaryHref = '/definir-senha';
    primaryLabel = 'Criar senha';
  } else if (hasRoles) {
    primaryHref = '/conta';
    primaryLabel = 'Minha conta';
  }

  return {
    displayName,
    email: snapshot.user.email ?? '',
    avatarUrl: snapshot.profile?.avatarUrl ?? null,
    roleLabels: [
      snapshot.roles?.isPlayer ? 'Jogador' : null,
      snapshot.roles?.isOrganizer ? 'Organizador' : null,
    ].filter((label): label is string => Boolean(label)),
    primaryHref,
    primaryLabel,
  };
}

export async function requireAccount() {
  const snapshot = await getAccountSnapshot();
  if (!snapshot.user) {
    redirect('/login');
  }
  if (needsPasswordSetup(snapshot.user)) {
    redirect('/definir-senha');
  }
  if (
    !snapshot.profile ||
    !snapshot.roles ||
    (!snapshot.roles.isPlayer && !snapshot.roles.isOrganizer)
  ) {
    redirect('/onboarding');
  }
  return {
    supabase: snapshot.supabase,
    user: snapshot.user,
    profile: snapshot.profile,
    roles: snapshot.roles,
  };
}

export async function requireOnboardingUser() {
  const snapshot = await getAccountSnapshot();
  if (!snapshot.user) {
    redirect('/login');
  }
  if (needsPasswordSetup(snapshot.user)) {
    redirect('/definir-senha');
  }
  if (snapshot.roles && (snapshot.roles.isPlayer || snapshot.roles.isOrganizer)) {
    redirect('/conta');
  }
  return snapshot;
}

export async function requirePasswordSetupUser() {
  const snapshot = await getAccountSnapshot();
  if (!snapshot.user) {
    redirect('/login');
  }
  if (!needsPasswordSetup(snapshot.user)) {
    if (snapshot.roles && (snapshot.roles.isPlayer || snapshot.roles.isOrganizer)) {
      redirect('/conta');
    }
    redirect('/onboarding');
  }
  return snapshot;
}

export async function redirectIfAuthenticated() {
  const snapshot = await getAccountSnapshot();
  if (!snapshot.user) return;
  if (needsPasswordSetup(snapshot.user)) {
    redirect('/definir-senha');
  }
  if (snapshot.roles && (snapshot.roles.isPlayer || snapshot.roles.isOrganizer)) {
    redirect('/conta');
  }
  redirect('/onboarding');
}
