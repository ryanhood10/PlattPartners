import Head from 'next/head';
import { SITE, SITE_URL } from '@/lib/site';
import { JsonLd } from './JsonLd';

type Props = {
  title: string;
  description: string;
  path: string; // e.g. '/', '/about'
  ogImage?: string;
  noindex?: boolean;
  schema?: unknown; // Schema.org @graph object
};

// Single source of truth for marketing-page <head>: canonical URL,
// description, Open Graph, Twitter Card, and JSON-LD.
export function SeoHead({ title, description, path, ogImage, noindex, schema }: Props) {
  const canonical = `${SITE_URL}${path}`;
  const image = ogImage ?? SITE.ogImage;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schema ? <JsonLd data={schema} /> : null}
    </Head>
  );
}
