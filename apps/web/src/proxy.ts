import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from '@/lib/admin/session';

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => {
    to.cookies.set(cookie);
  });
  return to;
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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

    await supabase.auth.getUser();
  }

  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return response;
  }

  if (pathname === '/admin/login') {
    const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (await verifyAdminSessionValue(session)) {
      const redirect = NextResponse.redirect(new URL('/admin/interessados', request.url));
      return copyCookies(response, redirect);
    }
    return response;
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifyAdminSessionValue(session))) {
    const login = new URL('/admin/login', request.url);
    login.searchParams.set('next', pathname);
    const redirect = NextResponse.redirect(login);
    return copyCookies(response, redirect);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|brand/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
