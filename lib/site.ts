// Canonical site identity. Used by sitemap, robots, OG tags, JSON-LD.
// Override with NEXT_PUBLIC_SITE_URL env var on Heroku once the custom domain is live.
//
// Note: we default to https://plattpartners.com (the eventual production URL)
// even before DNS cutover. That way the sitemap we submit to Search Console
// has the right canonical URLs from day one. The herokuapp.com URL is staging-only.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://plattpartners.com';

export const SITE = {
  name: 'Platt Partners',
  legalName: 'Platt Partners',
  description:
    'Build a robust pipeline of qualified candidates for hard-to-fill positions. Serving the tech, finance, and fast casual dining industries.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  ogImage: `${SITE_URL}/og-image.jpg`,
  telephone: '+1-866-766-0188',
  email: 'info@plattpartners.com',
  sameAs: ['https://www.linkedin.com/in/peterplatt/'],
  founder: {
    name: 'Peter Platt',
    title: 'Founder',
    linkedin: 'https://www.linkedin.com/in/peterplatt/',
  },
};
