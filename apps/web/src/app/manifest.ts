import { APP_DESCRIPTION, APP_NAME, APP_THEME_COLOR } from '@/lib/brand';

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const icons = [
    { src: '/brand/cupperfy-icon-192.png', sizes: '192x192' },
    { src: '/brand/cupperfy-icon-512.png', sizes: '512x512' },
  ] as const;

  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    lang: 'pt-BR',
    dir: 'ltr',
    background_color: APP_THEME_COLOR,
    theme_color: APP_THEME_COLOR,
    categories: ['sports', 'social'],
    icons: icons.flatMap((icon) =>
      (['any', 'maskable'] as const).map((purpose) => ({
        ...icon,
        type: 'image/png',
        purpose,
      })),
    ),
  };
}
