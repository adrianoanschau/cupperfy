import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { originFromRequest } from '@/lib/app-origin';
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

type CookieToSet = {
  name: string;
  value: string;
  options?: Parameters<NextResponse['cookies']['set']>[2];
};

export async function GET(request: NextRequest) {
  const origin = originFromRequest(request);
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const otpType = searchParams.get('type');
  const oauthError = searchParams.get('error');

  const cookiesToSetOut: CookieToSet[] = [];

  function redirectTo(path: string) {
    const destination = NextResponse.redirect(new URL(path, origin));
    cookiesToSetOut.forEach(({ name, value, options }) => {
      destination.cookies.set(name, value, options);
    });
    return destination;
  }

  if (oauthError === 'access_denied') {
    return redirectTo('/login?error=oauth_cancelado');
  }

  if (oauthError) {
    return redirectTo('/login?error=oauth');
  }

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          cookiesToSetOut.push({ name, value, options });
        });
      },
    },
  });

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return redirectTo('/login?error=oauth');
    }
  } else if (tokenHash) {
    const { error } = await supabase.auth.verifyOtp({
      type: asEmailOtpType(otpType),
      token_hash: tokenHash,
    });
    if (error) {
      return redirectTo('/login?error=session');
    }
  } else {
    return redirectTo('/login?error=oauth');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirectTo('/login?error=session');
  }

  const path = await resolvePostAuthPath(supabase, user);
  return redirectTo(path);
}
