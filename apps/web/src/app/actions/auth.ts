'use server';

import { redirect } from 'next/navigation';

import { getAppOrigin } from '@/lib/app-origin';
import { mapAuthError } from '@/lib/auth/errors';
import { createSupabaseUserClient } from '@/lib/supabase/server';

export type AuthActionResult = { ok: true } | { ok: false; error: string };

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function signUpWithPassword(input: {
  email: string;
  password: string;
  name: string;
}): Promise<AuthActionResult> {
  const email = normalizeEmail(input.email);
  const password = input.password;
  const name = input.name.trim();

  if (!email || !password) {
    return { ok: false, error: 'Informe e-mail e senha.' };
  }

  if (password.length < 6) {
    return { ok: false, error: 'A senha precisa ter pelo menos 6 caracteres.' };
  }

  const supabase = await createSupabaseUserClient();
  const origin = await getAppOrigin();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: name ? { display_name: name.slice(0, 80) } : undefined,
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { ok: false, error: mapAuthError(error.message) };
  }

  if (!data.session) {
    return {
      ok: false,
      error: 'Conta criada. Confirme o e-mail e depois entre.',
    };
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

export async function signInWithDiscord(): Promise<AuthActionResult> {
  const supabase = await createSupabaseUserClient();
  const origin = await getAppOrigin();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { ok: false, error: mapAuthError(error.message) };
  }

  if (!data.url) {
    return { ok: false, error: 'Não foi possível iniciar o acesso com Discord.' };
  }

  redirect(data.url);
}

export async function signOut() {
  const supabase = await createSupabaseUserClient();
  await supabase.auth.signOut();
  redirect('/');
}
