import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { resolvePostAuthPath } from '@/lib/auth/account';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env';

import type { EmailOtpType } from '@supabase/supabase-js';

const EMAIL_OTP_TYPES = new Set<EmailOtpType>([
  'signup',
  'invite',
  'magiclink',
  'recovery',
  'email_change',
  'email',
]);

function asEmailOtpType(value: string | null): EmailOtpType {
  if (value && EMAIL_OTP_TYPES.has(value as EmailOtpType)) {
    return value as EmailOtpType;
  }
  return 'email';
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

  let response = NextResponse.next({ request });
  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(new URL('/login?error=oauth', origin));
    }
  } else if (tokenHash) {
    const { error } = await supabase.auth.verifyOtp({
      type: asEmailOtpType(otpType),
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
    const failed = NextResponse.redirect(new URL('/login?error=session', origin));
    return copyCookies(response, failed);
  }

  const path = await resolvePostAuthPath(supabase, user);
  const destination = NextResponse.redirect(new URL(path, origin));
  return copyCookies(response, destination);
}
