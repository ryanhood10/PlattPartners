/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // 301 redirects to preserve SEO during the WP → Next migration.
  // Every URL Yoast had in plattpartners.com/page-sitemap.xml is either
  // served at the same path on our stack, or 301'd here.
  // See docs/build_plan.md Phase 1 + docs/decisions.md.
  async redirects() {
    return [
      // /about-services is now /about. Keep both slash variants explicit.
      { source: '/about-services', destination: '/about', permanent: true },
      { source: '/about-services/', destination: '/about', permanent: true },
      // The Beaver Builder global header template — never user-facing,
      // but Yoast listed it. Send it home.
      { source: '/header', destination: '/', permanent: true },
      { source: '/header/', destination: '/', permanent: true },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'plattpartners.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};

module.exports = nextConfig;
