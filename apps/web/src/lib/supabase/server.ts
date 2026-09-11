import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env ${name}`);
  }
  return value;
}

const authOff = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
} as const;

/** Client server-side com anon key (respeita RLS). */
export function createSupabaseServerClient(): SupabaseClient {
  return createClient(
    requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    authOff,
  );
}

/** Client server-side com service role — só em Server Actions / Route Handlers. */
export function createSupabaseServiceClient(): SupabaseClient {
  return createClient(
    requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    authOff,
  );
}
