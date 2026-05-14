import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About — Platt Partners</title>
        <meta
          name="description"
          content="Peter Platt has 25+ years of recruiting experience, delivering top-tier talent for hard-to-fill positions across tech, finance, and fast casual dining."
        />
      </Head>

      <SiteHeader />

      <main>
        {/* ─── Hero ──────────────────────────────────────────────────────── */}
        <section className="container py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 font-display text-sm uppercase tracking-widest text-platt-primary">
              About Platt Partners
            </p>
            <h1 className="font-display text-4xl tracking-tight text-platt-secondary md:text-6xl">
              Delivering top-tier talent
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              With 25 years of experience in the recruiting industry, I take great pride in making
              talent acquisition leaders&apos; jobs easier. I&apos;ve been known for digging deeper
              and engaging candidates on a more personal level — ultimately delivering top talent
              for the HR and recruiting departments I work with.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">— Peter Platt, Founder</p>
          </div>
        </section>

        {/* ─── Services ──────────────────────────────────────────────────── */}
        <section className="bg-muted/30 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
                How we work with you
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Three ways to engage, matched to the kind of hiring problem you&apos;re trying to solve.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="font-display text-sm uppercase tracking-wider text-platt-primary">RPO</p>
                <h3 className="mt-2 font-display text-xl text-platt-secondary">
                  Recruitment Process Outsourcing
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  We deliver immediate and short-term staffing needs for small to mid-cap companies.
                  Ideal for companies who need flexible solutions for ever-changing hiring demands.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <p className="font-display text-sm uppercase tracking-wider text-platt-primary">Search</p>
                <h3 className="mt-2 font-display text-xl text-platt-secondary">Executive search</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Provide unique leaders for executive-level positions. Candidates selectively
                  chosen to align perfectly with your company&apos;s culture.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <p className="font-display text-sm uppercase tracking-wider text-platt-primary">Staffing</p>
                <h3 className="mt-2 font-display text-xl text-platt-secondary">Temp + temp-to-hire</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Leverage highly-skilled professionals on a temporary and temporary-to-hire basis.
                  We source, onboard, and manage talent, reducing costs and increasing efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Testimonials ──────────────────────────────────────────────── */}
        <section className="container py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
              What people say about working with Peter
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  'Truly a wonderful experience from start to finish. With Platt Partners support and coaching, I felt prepared every step of the way.',
                name: 'Frank Garcia',
                role: 'Sr. Director, Encore Capital Group',
              },
              {
                quote:
                  'Platt Partners did a wonderful job of matching my desired role. Their understanding of my skill set and what it takes to succeed were perfectly aligned.',
                name: 'Sharif Bennett',
                role: 'Account Executive, GitLab',
              },
              {
                quote:
                  'Platt Partners is a top-notch search firm. They are very knowledgeable, well-connected and have the highest integrity.',
                name: 'Rafiq Hanna',
                role: 'Candidate',
              },
            ].map(({ quote, name, role }) => (
              <figure key={name} className="rounded-lg border border-border bg-card p-6">
                <blockquote className="text-sm text-muted-foreground">&ldquo;{quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm">
                  <div className="font-semibold text-foreground">{name}</div>
                  <div className="text-muted-foreground">{role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ─── CTA ───────────────────────────────────────────────────────── */}
        <section className="bg-platt-secondary py-16 text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              Let&apos;s talk about your hiring challenges
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Tell us what you&apos;re trying to fill. We&apos;ll come back with great candidates —
              not just one or two.
            </p>
            <Button size="lg" variant="secondary" asChild className="mt-8 bg-white text-platt-secondary hover:bg-white/90">
              <Link href="/contact">Let&apos;s Talk</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
