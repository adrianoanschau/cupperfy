import withSerwistInit from '@serwist/next';

import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const withSerwist = withSerwistInit({
  swSrc: 'src/sw.ts',
  swDest: 'public/sw.js',
  swUrl: '/sw.js',
  // Turbopack (next dev) não executa o plugin webpack do Serwist.
  disable: isDev,
  // O reload após update é controlado pelo PwaShell, não pelo "online".
  reloadOnOnline: false,
});

const nextConfig: NextConfig = {
  allowedDevOrigins: ['cupperfy.localhost'],
  // Silencia o aviso do Next 16 ao coexistir hook webpack (Serwist) com Turbopack no dev.
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        source: '/swe-worker-:file(.*)',
        headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }],
      },
    ];
  },
};

export default withSerwist(nextConfig);
