import Image from 'next/image';
import Link from 'next/link';
import { Download, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { TrustedBy } from '@/components/marketing/TrustedBy';
import { SeoHead } from '@/components/marketing/SeoHead';
import { graph, organizationNode, websiteNode, webPageNode, articleNode } from '@/lib/schema';

// Faithful rebuild of the landing page at the EXACT same URL as the current WP site
// (/how-to-build-a-robust-pipeline-of-qualified-candidates) so we preserve any
// Google ranking for that long-tail informational query. URL stays verbatim
// intentionally — do not "clean it up" without a 301.

const PATH = '/how-to-build-a-robust-pipeline-of-qualified-candidates';
const TITLE = 'How to build a robust pipeline of qualified candidates — Platt Partners';
const DESCRIPTION =
  'Free guide: 3 Outbound Recruiting Pro Tips That Can Save You Time And Money. Stop combing through LinkedIn — let us deliver a full pipeline in days, not weeks.';

export default function PipelineGuidePage() {
  return (
    <>
      <SeoHead
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        schema={graph(
          organizationNode(),
          websiteNode(),
          webPageNode({ path: PATH, title: TITLE, description: DESCRIPTION }),
          articleNode({
            path: PATH,
            headline: 'How to build a robust pipeline of qualified candidates',
            description: DESCRIPTION,
            datePublished: '2021-04-01',
          })
        )}
      />

      <SiteHeader />

      <main>
        {/* ─── Hero ──────────────────────────────────────────────────────── */}
        <section className="container py-20 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 font-display text-sm uppercase tracking-widest text-platt-primary">
              Multiple Hard-to-fill positions?
            </p>
            <h1 className="font-display text-4xl tracking-tight text-platt-secondary md:text-5xl">
              Give us your biggest recruiting challenges!
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              When it comes to finding top talent, you deserve to find quality candidates without
              breaking the bank.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/contact">Let&apos;s Talk</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── PDF lead magnet ────────────────────────────────────────────── */}
        <section className="border-y border-border bg-muted/30 py-16">
          <div className="container">
            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
              <div className="order-2 md:order-1">
                <p className="font-display text-sm uppercase tracking-wider text-platt-primary">
                  Free download
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
                  3 Outbound Recruiting Pro Tips That Can Save You Time And Money
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We know building a robust pipeline of quality candidates takes a lot of time. And
                  time is money. That&apos;s why we&apos;re sharing this free downloadable guide on
                  how to source smarter — not harder.
                </p>
                <Button size="lg" asChild className="mt-6">
                  <a
                    href="/downloads/outbound-recruiting-pro-tips.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </a>
                </Button>
              </div>
              <div className="order-1 flex justify-center md:order-2">
                <a
                  href="/downloads/outbound-recruiting-pro-tips.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:opacity-90"
                >
                  <Image
                    src="/downloads/download-pdf-cover.jpg"
                    alt="3 Outbound Recruiting Pro Tips PDF cover"
                    width={400}
                    height={520}
                    className="h-auto w-full max-w-xs rounded-lg shadow-lg"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Pain statement ────────────────────────────────────────────── */}
        <section className="container py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
              Recruiting for multiple hard-to-fill positions is hard.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              How many evenings have you worked late trying to find great candidates?
            </p>
            <h3 className="mt-10 font-display text-2xl tracking-tight text-platt-secondary md:text-3xl">
              Give us your hardest-to-fill position and let us work on that for free.
            </h3>
            <div className="mt-8">
              <Button size="lg" asChild>
                <a href="tel:+18667660188">
                  <Phone className="mr-2 h-5 w-5" />
                  Call now
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Testimonial ───────────────────────────────────────────────── */}
        <section className="bg-muted/30 py-20">
          <div className="container">
            <p className="text-center font-display text-sm uppercase tracking-wider text-platt-primary">
              What our customers are saying
            </p>
            <figure className="mx-auto mt-6 max-w-3xl text-center">
              <blockquote className="font-display text-2xl text-platt-secondary md:text-3xl">
                &ldquo;Able to quickly integrate with our team and deliver quality candidates!
                Platt Partners was able to quickly integrate with our team and deliver quality
                candidates. In the end, they helped us identify the perfect candidates; not to
                mention Platt Partners sent us all relevant market data to help us as we try to
                fill similar roles!&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold text-foreground">Todd Merz</span>
                <span className="text-muted-foreground"> — Head of Talent Acquisition, ODK Media</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ─── Trusted By ────────────────────────────────────────────────── */}
        <TrustedBy background="transparent" />

        {/* ─── Benefits + final CTA ──────────────────────────────────────── */}
        <section className="border-t border-border bg-platt-secondary py-20 text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              Platt Partners will build a robust pipeline of qualified candidates for your
              hard-to-fill positions
            </h2>
            <ul className="mt-8 grid gap-3 text-left text-white/90 sm:grid-cols-2">
              <li className="rounded-md bg-white/10 p-4">Increase your candidate-to-hire ratio</li>
              <li className="rounded-md bg-white/10 p-4">Fill open positions</li>
              <li className="rounded-md bg-white/10 p-4">Report confidently to hiring managers</li>
              <li className="rounded-md bg-white/10 p-4">Reduce your vendor load</li>
            </ul>
            <p className="mt-10 text-lg">Avoid those extra hours combing through LinkedIn.</p>
            <p className="text-white/80">
              Let us take on the heavy lifting and deliver a full pipeline of qualified candidates in
              days, not weeks.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild className="bg-white text-platt-secondary hover:bg-white/90">
                <a href="tel:+18667660188">
                  <Phone className="mr-2 h-5 w-5" />
                  Call us
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 hover:text-white">
                <Link href="/contact">Let&apos;s Talk</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
