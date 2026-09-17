import { describe, expect, it } from 'vitest';

import manifest from './manifest';

describe('web app manifest', () => {
  it('expõe o mínimo para instalação como PWA', () => {
    const webManifest = manifest();

    expect(webManifest.name).toBe('Cupperfy');
    expect(webManifest.display).toBe('standalone');
    expect(webManifest.start_url).toBe('/');
    expect(webManifest.icons?.some((icon) => icon.sizes === '192x192')).toBe(true);
    expect(webManifest.icons?.some((icon) => icon.sizes === '512x512')).toBe(true);
    expect(webManifest.icons?.some((icon) => icon.purpose === 'maskable')).toBe(true);
  });
});
