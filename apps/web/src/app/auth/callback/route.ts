import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { needsPasswordSetup } from '@/lib/auth/account';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env';

import type { EmailOtpType } from '@supabase/supabase-js';

function nextPath(hasRoles: boolean) {
  return hasRoles ? '/conta' : '/onboarding';
}

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => {
    to.cookies.set(cookie);
  });
  return to;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const otpType = searchParams.get('type');
  const oauthError = searchParams.get('error');

  if (oauthError === 'access_denied') {
    return NextResponse.redirect(new URL('/login?error=oauth_cancelado', origin));
  }

  if (oauthError) {
    return NextResponse.redirect(new URL('/login?error=oauth', origin));
  }

  const pending = NextResponse.redirect(new URL('/onboarding', origin));
  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          pending.cookies.set(name, value, options);
        });
      },
    },
  });

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(new URL('/login?error=oauth', origin));
    }
  } else if (tokenHash && otpType) {
    const { error } = await supabase.auth.verifyOtp({
      type: otpType as EmailOtpType,
      token_hash: tokenHash,
    });
    if (error) {
      return NextResponse.redirect(new URL('/login?error=session', origin));
    }
  } else {
    return NextResponse.redirect(new URL('/login?error=oauth', origin));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/login?error=session', origin));
  }

  if (needsPasswordSetup(user)) {
    const destination = NextResponse.redirect(new URL('/definir-senha', origin));
    return copyCookies(pending, destination);
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!profile) {
    return pending;
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

  const hasRoles = (playerCount ?? 0) > 0 || (organizerCount ?? 0) > 0;
  const destination = NextResponse.redirect(new URL(nextPath(hasRoles), origin));
  return copyCookies(pending, destination);
}
