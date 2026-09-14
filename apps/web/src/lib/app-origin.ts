import { headers } from 'next/headers';

import { APP_PRODUCTION_ORIGIN } from '@/lib/brand';

export async function getAppOrigin(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, '');
  if (configured) return configured;

  if (process.env.VERCEL_ENV === 'production') {
    return APP_PRODUCTION_ORIGIN;
  }

  const headerStore = await headers();
  const host = headerStore.get('x-forwarded-host') ?? headerStore.get('host');
  if (!host) return 'http://localhost:3000';

  const proto =
    headerStore.get('x-forwarded-proto') ?? (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}
