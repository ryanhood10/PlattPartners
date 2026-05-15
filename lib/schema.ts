// Schema.org JSON-LD builders. Each marketing page composes its own @graph.
// Pattern follows Yoast's output on the current WP site (Organization +
// WebSite + WebPage, linked by @id).

import { SITE, SITE_URL } from './site';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: SITE.logo,
    description: SITE.description,
    telephone: SITE.telephone,
    email: SITE.email,
    sameAs: SITE.sameAs,
    founder: {
      '@type': 'Person',
      name: SITE.founder.name,
      jobTitle: SITE.founder.title,
      sameAs: SITE.founder.linkedin,
    },
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  };
}

export function webPageNode(args: { path: string; title: string; description: string }) {
  const url = `${SITE_URL}${args.path}`;
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: args.title,
    description: args.description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-US',
    primaryImageOfPage: SITE.ogImage,
  };
}

export function professionalServiceNode() {
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: SITE.name,
    serviceType: 'Recruiting and executive search',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'United States' },
    description:
      'Recruiting services for mid to senior-level positions in tech, finance, and fast casual dining.',
  };
}

export function personNode(args: { name: string; title: string; linkedin?: string }) {
  return {
    '@type': 'Person',
    name: args.name,
    jobTitle: args.title,
    ...(args.linkedin ? { sameAs: args.linkedin } : {}),
    worksFor: { '@id': ORG_ID },
  };
}

export function articleNode(args: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
}) {
  const url = `${SITE_URL}${args.path}`;
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    headline: args.headline,
    description: args.description,
    datePublished: args.datePublished,
    image: SITE.ogImage,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  };
}

// Compose a `@graph` document for a page from a list of nodes.
export function graph(...nodes: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
