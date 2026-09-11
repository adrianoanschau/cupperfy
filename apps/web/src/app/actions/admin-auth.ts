'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  ADMIN_SESSION_COOKIE,
  adminPasswordConfigured,
  createAdminSessionValue,
  getAdminSessionCookieOptions,
  verifyAdminPassword,
  verifyAdminSessionValue,
} from '@/lib/admin/session';

export type AdminLoginResult = { ok: true } | { ok: false; error: string };

export async function requireAdminSession(): Promise<void> {
  const jar = await cookies();
  const session = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifyAdminSessionValue(session))) {
    redirect('/admin/login');
  }
}

export async function loginAdmin(input: { password: string }): Promise<AdminLoginResult> {
  if (!adminPasswordConfigured()) {
    return {
      ok: false,
      error: 'Admin não configurado. Defina ADMIN_PASSWORD e ADMIN_SESSION_SECRET no .env.',
    };
  }

  if (!(await verifyAdminPassword(input.password ?? ''))) {
    return { ok: false, error: 'Senha incorreta.' };
  }

  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, await createAdminSessionValue(), getAdminSessionCookieOptions());
  return { ok: true };
}

export async function logoutAdmin(): Promise<void> {
  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, '', { ...getAdminSessionCookieOptions(0), maxAge: 0 });
  redirect('/admin/login');
}
