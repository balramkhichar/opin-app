import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: `$primary-color: #3b82f6; $secondary-color: #6366f1;`,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/cdn-cgi/:path*',
        destination: 'https://app.getopin.com/cdn-cgi/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
