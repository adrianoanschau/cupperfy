import { createServerClient } from '@supabase/ssr';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import {
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from '@/lib/supabase/env';

const authOff = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
} as const;

/** Client server-side com anon key, sem sessão de usuário (respeita RLS). */
export function createSupabaseAnonClient(): SupabaseClient {
  return createClient(getSupabaseUrl(), getSupabaseAnonKey(), authOff);
}

/** Client server-side com service role — só em Server Actions / Route Handlers. */
export function createSupabaseServiceClient(): SupabaseClient {
  return createClient(getSupabaseUrl(), getSupabaseServiceRoleKey(), authOff);
}

/** Client com cookies da sessão do usuário (@supabase/ssr). */
export async function createSupabaseUserClient() {
  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component não consegue gravar cookie; o proxy já renovou a sessão.
        }
      },
    },
  });
}
