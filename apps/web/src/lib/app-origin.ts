import { headers } from 'next/headers';

import { APP_PRODUCTION_ORIGIN } from '@/lib/brand';

function firstHeaderValue(value: string | null | undefined): string {
  return value?.split(',')[0]?.trim() ?? '';
}

function hostnameOf(host: string): string {
  return host.replace(/:\d+$/, '').toLowerCase();
}

function isCustomLocalhost(host: string): boolean {
  const hostname = hostnameOf(host);
  return hostname.endsWith('.localhost') && hostname !== 'localhost';
}

/**
 * Host que o browser usou. O Next reescreve `*.localhost` para `localhost`
 * em `nextUrl.origin` / `x-forwarded-host`, e isso quebra o cookie da sessão.
 */
export function resolveRequestHost(
  hostHeader: string | null | undefined,
  forwardedHost: string | null | undefined,
): string {
  const host = firstHeaderValue(hostHeader);
  const forwarded = firstHeaderValue(forwardedHost);
  const forwardedName = hostnameOf(forwarded);

  if (
    host &&
    isCustomLocalhost(host) &&
    (!forwarded || forwardedName === 'localhost' || forwardedName === '127.0.0.1')
  ) {
    return host;
  }

  return forwarded || host;
}

export function originFromHost(hostHeader: string, protoHeader: string | null): string {
  const host = firstHeaderValue(hostHeader);
  if (!host) {
    return APP_PRODUCTION_ORIGIN;
  }

  const proto =
    firstHeaderValue(protoHeader) ||
    (hostnameOf(host) === 'localhost' ||
    hostnameOf(host).endsWith('.localhost') ||
    host.endsWith('.local')
      ? 'http'
      : 'https');

  return `${proto}://${host}`;
}

export function originFromRequest(request: Request): string {
  return originFromHost(
    resolveRequestHost(request.headers.get('host'), request.headers.get('x-forwarded-host')),
    request.headers.get('x-forwarded-proto'),
  );
}

/** Origem canônica (e-mails, links absolutos). Prefere `NEXT_PUBLIC_APP_URL`. */
export async function getAppOrigin(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, '');
  if (configured) return configured;

  if (process.env.VERCEL_ENV === 'production') {
    return APP_PRODUCTION_ORIGIN;
  }

  const headerStore = await headers();
  const host = resolveRequestHost(headerStore.get('host'), headerStore.get('x-forwarded-host'));
  if (!host) return 'http://cupperfy.localhost';

  return originFromHost(host, headerStore.get('x-forwarded-proto'));
}

/**
 * Origem do request atual — usar em OAuth/magic link para o cookie PKCE
 * e o `redirectTo` bateram no mesmo host.
 */
export async function getRequestOrigin(): Promise<string> {
  const headerStore = await headers();
  const host = resolveRequestHost(headerStore.get('host'), headerStore.get('x-forwarded-host'));
  if (!host) {
    return getAppOrigin();
  }

  return originFromHost(host, headerStore.get('x-forwarded-proto'));
}
