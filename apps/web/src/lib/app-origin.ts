import { headers } from 'next/headers';

import { APP_PRODUCTION_ORIGIN } from '@/lib/brand';

function originFromHost(hostHeader: string, protoHeader: string | null): string {
  const host = hostHeader.split(',')[0]?.trim();
  if (!host) {
    return APP_PRODUCTION_ORIGIN;
  }

  const proto =
    protoHeader?.split(',')[0]?.trim() ??
    (host.includes('localhost') || host.endsWith('.local') ? 'http' : 'https');

  return `${proto}://${host}`;
}

/** Origem canônica (e-mails, links absolutos). Prefere `NEXT_PUBLIC_APP_URL`. */
export async function getAppOrigin(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, '');
  if (configured) return configured;

  if (process.env.VERCEL_ENV === 'production') {
    return APP_PRODUCTION_ORIGIN;
  }

  const headerStore = await headers();
  const host = headerStore.get('x-forwarded-host') ?? headerStore.get('host');
  if (!host) return 'http://cupperfy.localhost';

  return originFromHost(host, headerStore.get('x-forwarded-proto'));
}

/**
 * Origem do request atual — usar em OAuth/magic link para o cookie PKCE
 * e o `redirectTo` bateram no mesmo host.
 */
export async function getRequestOrigin(): Promise<string> {
  const headerStore = await headers();
  const host = headerStore.get('x-forwarded-host') ?? headerStore.get('host');
  if (!host) {
    return getAppOrigin();
  }

  return originFromHost(host, headerStore.get('x-forwarded-proto'));
}
