/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Migration redirects from the old WP site live here once Peter confirms canonical URLs.
  // See docs/build_plan.md Phase 1.
  async redirects() {
    return [
      // Example shape — fill in during Phase 1 cutover:
      // { source: '/old-wp-path', destination: '/new-path', permanent: true },
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
