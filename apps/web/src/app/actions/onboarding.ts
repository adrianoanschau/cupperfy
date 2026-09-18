'use server';

import { redirect } from 'next/navigation';

import { ensureAccountProfile } from '@/lib/auth/account';
import { FOOTBALL_ESPORTS_SLUG } from '@/lib/auth/labels';
import { createSupabaseUserClient } from '@/lib/supabase/server';

export type OnboardingResult = { ok: true } | { ok: false; error: string };

export async function completeOnboarding(input: {
  asPlayer: boolean;
  asOrganizer: boolean;
}): Promise<OnboardingResult> {
  if (!input.asPlayer && !input.asOrganizer) {
    return { ok: false, error: 'Escolha pelo menos um papel: jogador ou organizador.' };
  }

  const supabase = await createSupabaseUserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await ensureAccountProfile(supabase, user);
  if ('error' in profile) {
    return { ok: false, error: profile.error };
  }

  if (input.asPlayer) {
    const { data: sport, error: sportError } = await supabase
      .from('sports')
      .select('id')
      .eq('slug', FOOTBALL_ESPORTS_SLUG)
      .maybeSingle();

    if (sportError || !sport) {
      return {
        ok: false,
        error: 'A modalidade ainda não está disponível. Tente de novo em instantes.',
      };
    }

    const { error: playerError } = await supabase.from('player_profiles').insert({
      profile_id: profile.id,
      sport_id: sport.id,
      stats: { preferred_platform: null, fifa_id: null, record: { wins: 0, losses: 0 } },
    });

    if (playerError && playerError.code !== '23505') {
      console.error('player_profiles insert', playerError);
      return { ok: false, error: 'Não foi possível criar o perfil de jogador.' };
    }
  }

  if (input.asOrganizer) {
    const { error: organizerError } = await supabase.from('organizer_profiles').insert({
      profile_id: profile.id,
      verified: false,
    });

    if (organizerError && organizerError.code !== '23505') {
      console.error('organizer_profiles insert', organizerError);
      return { ok: false, error: 'Não foi possível criar o perfil de organizador.' };
    }
  }

  redirect('/conta');
}
