import Link from 'next/link';
import { Clock, Users, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { ContactForm } from '@/components/marketing/ContactForm';
import { SeoHead } from '@/components/marketing/SeoHead';
import {
  graph,
  organizationNode,
  websiteNode,
  webPageNode,
  professionalServiceNode,
} from '@/lib/schema';

const TITLE = 'Technology Recruiting — Platt Partners';
const DESCRIPTION =
  'Quality candidate flow for hard-to-fill tech positions. Quick integration, high-touch engagement, and recruiting automation that delivers.';

export default function TechnologyPage() {
  return (
    <>
      <SeoHead
        title={TITLE}
        description={DESCRIPTION}
        path="/technology"
        schema={graph(
          organizationNode(),
          websiteNode(),
          professionalServiceNode(),
          webPageNode({ path: '/technology', title: TITLE, description: DESCRIPTION })
        )}
      />

      <SiteHeader />

      <main>
        {/* ─── Hero ──────────────────────────────────────────────────────── */}
        <section className="container py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 font-display text-sm uppercase tracking-widest text-platt-primary">
              Technology recruiting
            </p>
            <h1 className="font-display text-4xl tracking-tight text-platt-secondary md:text-6xl">
              Calling all recruiting managers and heads of talent acquisition.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              We understand that tech recruiting today is highly competitive and time intensive. Our
              aim is to help you breathe a sigh of relief by creating quality candidate flow for
              those hard-to-fill tech positions.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="#contact">Let&apos;s Talk</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── How We Get You There ──────────────────────────────────────── */}
        <section className="bg-muted/30 py-20">
          <div className="container">
            <h2 className="text-center font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
              How we get you there
            </h2>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <Clock className="mx-auto h-10 w-10 text-platt-primary" />
                <h3 className="mt-4 font-display text-xl text-platt-secondary">Acceleration</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Quick integration that provides candidates in days, not weeks.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <Users className="mx-auto h-10 w-10 text-platt-primary" />
                <h3 className="mt-4 font-display text-xl text-platt-secondary">Engagement</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Provide a good candidate experience that boosts client ratings.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <Cpu className="mx-auto h-10 w-10 text-platt-primary" />
                <h3 className="mt-4 font-display text-xl text-platt-secondary">Technology</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Leverage the latest recruiting automation for better outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Case Study ────────────────────────────────────────────────── */}
        <section className="container py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-center font-display text-sm uppercase tracking-widest text-platt-primary">
              Case Study
            </p>
            <h2 className="mt-3 text-center font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
              30 senior tech hires in 4 months
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="font-display text-lg text-platt-secondary">Situation</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    DevOps software company with $100M+ in recent funding through Iconiq Capital
                  </li>
                  <li>Time-sensitive need for software sales and client-success engineer hires</li>
                  <li>Highly competitive employment market for technology talent</li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg text-platt-secondary">Implementation</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Candidate Drive process and highly trained staff to identify, engage, and hire</li>
                  <li>Leveraged market data, reporting and AI-driven technology to deliver talent quickly</li>
                  <li>Delivered high-touch candidate experience to support employment brand</li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg text-platt-secondary">Results</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Successfully filled 30 senior-level positions in 4 months</li>
                  <li>Built dashboard for real-time recruiting status updates, driving higher overall project ROI</li>
                  <li>Created market data and hiring plan for diversity hiring; increased diverse hires by 13%</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ───────────────────────────────────────────────────────── */}
        <section className="bg-platt-secondary py-16 text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              Let&apos;s accelerate your hiring process
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Tell us what you&apos;re looking for and we&apos;ll call you to get started.
            </p>
            <Button size="lg" variant="secondary" asChild className="mt-8 bg-white text-platt-secondary hover:bg-white/90">
              <Link href="#contact">Let&apos;s Talk</Link>
            </Button>
          </div>
        </section>

        {/* ─── Contact ───────────────────────────────────────────────────── */}
        <section id="contact" className="border-t border-border bg-muted/30 py-20">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center">
              <h2 className="font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
                Let&apos;s Work Together
              </h2>
            </div>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
