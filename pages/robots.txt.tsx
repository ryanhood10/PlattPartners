import type { GetServerSideProps } from 'next';
import { SITE_URL } from '@/lib/site';

function buildRobots() {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /app/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.write(buildRobots());
  res.end();
  return { props: {} };
};

export default function Robots() {
  return null;
}
