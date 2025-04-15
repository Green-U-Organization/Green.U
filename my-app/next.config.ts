import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: [
      'http://192.168.0.110:3000',
      'http://192.168.0.122:3000',
      'http://192.168.0.131:3000',
      'http://192.168.228.19:3000',
    ],
  },
};

module.exports = {
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
