/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* @resvg/resvg-js ships native .node binaries — webpack can't bundle
   * those, so we tell Next.js to leave the package external on the
   * server (used by /app/marketing/[asset]/route.ts to rasterise the
   * marketing SVGs to PNG on demand). */
  experimental: {
    serverComponentsExternalPackages: ['@resvg/resvg-js'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'awsmp-logos.s3.amazonaws.com' },
    ],
  },
  async redirects() {
    return [
      // Old /servicios path → new /lab home for the studio sub-brand
      { source: '/servicios',          destination: '/lab',          permanent: true },
      { source: '/servicios/:path*',   destination: '/lab/:path*',   permanent: true },

      // Legacy agonzx.dev/lab now belongs at axlab.es. The redirect is
      // host-scoped to agonzx.dev so it does NOT trigger when axlab.es
      // serves /lab via the rewrite below (would loop otherwise).
      {
        source: '/lab',
        has: [{ type: 'host', value: 'agonzx.dev' }],
        destination: 'https://axlab.es',
        permanent: true,
      },
      {
        source: '/lab/:path*',
        has: [{ type: 'host', value: 'agonzx.dev' }],
        destination: 'https://axlab.es/:path*',
        permanent: true,
      },
      // Same redirect for the www. variant of agonzx
      {
        source: '/lab',
        has: [{ type: 'host', value: 'www.agonzx.dev' }],
        destination: 'https://axlab.es',
        permanent: true,
      },
      {
        source: '/lab/:path*',
        has: [{ type: 'host', value: 'www.agonzx.dev' }],
        destination: 'https://axlab.es/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // axlab.es serves the /lab content (and its sub-routes) so the
        // studio brand has its own domain without duplicating the
        // codebase. The Next.js project keeps a single deployment and
        // the URL bar shows axlab.es to the visitor.
        //   axlab.es/             → /lab
        //   axlab.es/privacidad   → /privacidad (Spanish privacy lives
        //                           top-level so the same path works)
        {
          has:         [{ type: 'host', value: 'axlab.es' }],
          source:      '/',
          destination: '/lab',
        },
        {
          has:         [{ type: 'host', value: 'axlab.es' }],
          source:      '/lab',
          destination: '/lab',
        },
        // Same handling for the www subdomain
        {
          has:         [{ type: 'host', value: 'www.axlab.es' }],
          source:      '/',
          destination: '/lab',
        },
      ],
    };
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
