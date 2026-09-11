const ADMIN_SESSION_COOKIE = 'lf_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 dias

export { ADMIN_SESSION_COOKIE };

function requireAdminSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET ausente ou curto demais (mín. 32 chars).');
  }
  return secret;
}

function toBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return toBase64Url(signature);
}

function timingSafeEqualBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left[index]! ^ right[index]!;
  }
  return diff === 0;
}

export async function createAdminSessionValue(now = Date.now()): Promise<string> {
  const secret = requireAdminSecret();
  const exp = Math.floor(now / 1000) + SESSION_TTL_SECONDS;
  const payload = `admin:${exp}`;
  const signature = await signPayload(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifyAdminSessionValue(
  value: string | undefined,
  now = Date.now(),
): Promise<boolean> {
  if (!value) return false;

  try {
    const secret = requireAdminSecret();
    const [payload, signature] = value.split('.');
    if (!payload || !signature || !payload.startsWith('admin:')) return false;

    const expected = await signPayload(payload, secret);
    const left = fromBase64Url(signature);
    const right = fromBase64Url(expected);
    if (!timingSafeEqualBytes(left, right)) return false;

    const exp = Number(payload.slice('admin:'.length));
    if (!Number.isFinite(exp) || exp * 1000 < now) return false;

    return true;
  } catch {
    return false;
  }
}

export function adminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const encoder = new TextEncoder();
  const [leftBuffer, rightBuffer] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(`leaguefy-admin:${password}`)),
    crypto.subtle.digest('SHA-256', encoder.encode(`leaguefy-admin:${expected}`)),
  ]);

  return timingSafeEqualBytes(new Uint8Array(leftBuffer), new Uint8Array(rightBuffer));
}

export function getAdminSessionCookieOptions(maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}
