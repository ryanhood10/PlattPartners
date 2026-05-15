import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SeoHead } from '@/components/marketing/SeoHead';
import { graph, organizationNode, websiteNode, webPageNode } from '@/lib/schema';

const TITLE = 'Privacy Policy — Platt Partners';
const DESCRIPTION = 'How Platt Partners handles your personal information.';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SeoHead
        title={TITLE}
        description={DESCRIPTION}
        path="/privacy-policy"
        noindex
        schema={graph(
          organizationNode(),
          websiteNode(),
          webPageNode({ path: '/privacy-policy', title: TITLE, description: DESCRIPTION })
        )}
      />

      <SiteHeader />

      <main className="container py-16 md:py-20">
        <article className="prose prose-slate mx-auto max-w-3xl">
          <h1 className="font-display text-4xl text-platt-secondary md:text-5xl">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: May 14, 2026</p>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl text-platt-secondary">Regarding your privacy</h2>
            <p>
              This website functions without requiring personal information submission, though
              interactive features allow voluntary data entry. The collection process does not
              intentionally target minors.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="font-display text-2xl text-platt-secondary">Information we collect</h2>
            <p>
              You may voluntarily provide an email, phone number, and name through our contact
              forms. We do not collect credit card data. The browser &quot;Do Not Track&quot; option
              produces no difference in data collection.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="font-display text-2xl text-platt-secondary">How we use information</h2>
            <p>
              Voluntarily submitted information helps us better serve the customer experience —
              specifically, to follow up about hiring needs you&apos;ve described.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="font-display text-2xl text-platt-secondary">Data protection</h2>
            <p>
              We treat personal data protection as a priority. We follow generally accepted
              standards for data protection and maintain best-practice safeguards. Submitted data
              triggers additional protective measures, continuously monitored by security
              professionals.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="font-display text-2xl text-platt-secondary">Web accessibility</h2>
            <p>
              Platt Partners prioritizes digital inclusion for all visitors, including those with
              disabilities. We commit to the Level AA success criteria of the W3C WCAG 2.0
              standards. Report accessibility issues or improvements to{' '}
              <a href="mailto:info@plattpartners.com" className="text-platt-primary underline">
                info@plattpartners.com
              </a>
              .
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="font-display text-2xl text-platt-secondary">Contact</h2>
            <p>
              Questions about this policy or your data? Email{' '}
              <a href="mailto:info@plattpartners.com" className="text-platt-primary underline">
                info@plattpartners.com
              </a>{' '}
              or call 1 (866) 766-0188.
            </p>
          </section>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
