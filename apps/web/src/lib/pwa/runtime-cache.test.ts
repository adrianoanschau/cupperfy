import { describe, expect, it } from 'vitest';

import { isNextStaticAsset, isStaticMediaAsset } from './runtime-cache';

function request(init?: { method?: string; mode?: string; rsc?: string }) {
  return {
    method: init?.method ?? 'GET',
    mode: init?.mode ?? 'cors',
    headers: {
      get: (name: string) => (name.toUpperCase() === 'RSC' ? (init?.rsc ?? null) : null),
    },
  };
}

describe('runtime cache matchers', () => {
  it('cacheia /_next/static e /brand, como o SW legado', () => {
    expect(
      isNextStaticAsset({
        request: request(),
        url: { pathname: '/_next/static/chunks/app.js' },
        sameOrigin: true,
      }),
    ).toBe(true);
    expect(
      isStaticMediaAsset({
        request: request(),
        url: { pathname: '/brand/cupperfy-icon-192.png' },
        sameOrigin: true,
      }),
    ).toBe(true);
    expect(
      isStaticMediaAsset({
        request: request(),
        url: { pathname: '/favicon.ico' },
        sameOrigin: true,
      }),
    ).toBe(true);
  });

  it('não cacheia HTML, API, RSC, POST ou cross-origin', () => {
    const staticPath = { pathname: '/brand/cupperfy-icon.png' };

    expect(
      isStaticMediaAsset({
        request: request({ mode: 'navigate' }),
        url: staticPath,
        sameOrigin: true,
      }),
    ).toBe(false);
    expect(
      isStaticMediaAsset({
        request: request(),
        url: { pathname: '/api/chat' },
        sameOrigin: true,
      }),
    ).toBe(false);
    expect(
      isNextStaticAsset({
        request: request({ rsc: '1' }),
        url: { pathname: '/_next/static/chunks/app.js' },
        sameOrigin: true,
      }),
    ).toBe(false);
    expect(
      isStaticMediaAsset({
        request: request({ method: 'POST' }),
        url: staticPath,
        sameOrigin: true,
      }),
    ).toBe(false);
    expect(
      isStaticMediaAsset({
        request: request(),
        url: staticPath,
        sameOrigin: false,
      }),
    ).toBe(false);
  });
});
