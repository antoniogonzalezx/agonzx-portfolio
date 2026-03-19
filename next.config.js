/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'awsmp-logos.s3.amazonaws.com' },
    ],
  },
  webpack(config) {
    // Handle GLB 3D model files
    config.module.rules.push({
      test: /\.glb$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
