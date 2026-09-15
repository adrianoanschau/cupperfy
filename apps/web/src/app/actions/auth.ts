'use server';

import { redirect } from 'next/navigation';

import { getAppOrigin } from '@/lib/app-origin';
import { mapAuthError } from '@/lib/auth/errors';
import { createSupabaseUserClient } from '@/lib/supabase/server';

export type AuthActionResult = { ok: true } | { ok: false; error: string };

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function requestSignupEmail(input: {
  email: string;
  name: string;
}): Promise<AuthActionResult> {
  const email = normalizeEmail(input.email);
  const name = input.name.trim();

  if (!name) {
    return { ok: false, error: 'Informe seu nome.' };
  }

  if (!email) {
    return { ok: false, error: 'Informe um e-mail válido.' };
  }

  const supabase = await createSupabaseUserClient();
  const origin = await getAppOrigin();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      data: {
        display_name: name.slice(0, 80),
        must_set_password: true,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { ok: false, error: mapAuthError(error.message) };
  }

  return { ok: true };
}

export async function setAccountPassword(input: {
  password: string;
  confirmPassword: string;
}): Promise<AuthActionResult> {
  const password = input.password;
  const confirmPassword = input.confirmPassword;

  if (password.length < 6) {
    return { ok: false, error: 'A senha precisa ter pelo menos 6 caracteres.' };
  }

  if (password !== confirmPassword) {
    return { ok: false, error: 'As senhas não coincidem.' };
  }

  const supabase = await createSupabaseUserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?error=session');
  }

  const { error } = await supabase.auth.updateUser({
    password,
    data: {
      ...user.user_metadata,
      must_set_password: false,
    },
  });

  if (error) {
    return { ok: false, error: mapAuthError(error.message) };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!profile) {
    redirect('/onboarding');
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
    redirect('/conta');
  }

  redirect('/onboarding');
}

export async function signInWithPassword(input: {
  email: string;
  password: string;
}): Promise<AuthActionResult> {
  const email = normalizeEmail(input.email);
  const password = input.password;

  if (!email || !password) {
    return { ok: false, error: 'Informe e-mail e senha.' };
  }

  const supabase = await createSupabaseUserClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { ok: false, error: mapAuthError(error.message) };
  }

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    redirect('/login?error=session');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (!profile) {
    redirect('/onboarding');
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
    redirect('/conta');
  }

  redirect('/onboarding');
}

export async function signInWithOAuthProvider(
  provider: 'discord' | 'google',
): Promise<AuthActionResult> {
  const supabase = await createSupabaseUserClient();
  const origin = await getAppOrigin();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { ok: false, error: mapAuthError(error.message) };
  }

  if (!data.url) {
    return { ok: false, error: 'Não foi possível iniciar o acesso com essa conta.' };
  }

  redirect(data.url);
}

export async function signInWithDiscord(): Promise<AuthActionResult> {
  return signInWithOAuthProvider('discord');
}

export async function signInWithGoogle(): Promise<AuthActionResult> {
  return signInWithOAuthProvider('google');
}

export async function signOut() {
  const supabase = await createSupabaseUserClient();
  await supabase.auth.signOut();
  redirect('/');
}
