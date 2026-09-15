import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['cupperfy.localhost'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
