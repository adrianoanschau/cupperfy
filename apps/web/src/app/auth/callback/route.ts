import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env';

function nextPath(hasRoles: boolean) {
  return hasRoles ? '/conta' : '/onboarding';
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const oauthError = searchParams.get('error');

  if (oauthError === 'access_denied') {
    return NextResponse.redirect(new URL('/login?error=oauth_cancelado', origin));
  }

  if (oauthError || !code) {
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

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL('/login?error=oauth', origin));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/login?error=session', origin));
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
  pending.cookies.getAll().forEach((cookie) => {
    destination.cookies.set(cookie);
  });
  return destination;
}
