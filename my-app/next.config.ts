import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: ['http://192.168.1.3', 'http://localhost:3000'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dhvmomrjqsoccuaxhwhv.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/avatars/**',
      },
    ],
  },
};

export default nextConfig;
