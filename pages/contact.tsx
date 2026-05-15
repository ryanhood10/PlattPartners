import { Mail, Phone, Linkedin } from 'lucide-react';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { ContactForm } from '@/components/marketing/ContactForm';
import { SeoHead } from '@/components/marketing/SeoHead';
import { graph, organizationNode, websiteNode, webPageNode } from '@/lib/schema';

const TITLE = 'Contact — Platt Partners';
const DESCRIPTION =
  "Tell us what you're looking for and we'll call you to get started building your candidate pipeline.";

export default function ContactPage() {
  return (
    <>
      <SeoHead
        title={TITLE}
        description={DESCRIPTION}
        path="/contact"
        schema={graph(
          organizationNode(),
          websiteNode(),
          webPageNode({ path: '/contact', title: TITLE, description: DESCRIPTION })
        )}
      />

      <SiteHeader />

      <main>
        {/* ─── Hero ──────────────────────────────────────────────────────── */}
        <section className="container py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 font-display text-sm uppercase tracking-widest text-platt-primary">
              Quality Candidate Flow
            </p>
            <h1 className="font-display text-4xl tracking-tight text-platt-secondary md:text-5xl">
              Let&apos;s work together
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Tell us what you&apos;re looking for and we&apos;ll call you to get started.
            </p>
          </div>
        </section>

        {/* ─── Form + Contact info ───────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container">
            <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[2fr,1fr]">
              <div>
                <h2 className="font-display text-2xl text-platt-secondary">Tell us about the role</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Give us a few details and we&apos;ll be in touch within one business day.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>

              <aside className="space-y-6">
                <div>
                  <h3 className="font-display text-sm uppercase tracking-wider text-platt-secondary">
                    Or reach us directly
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-platt-primary" />
                      <a href="mailto:info@plattpartners.com" className="hover:text-platt-primary">
                        info@plattpartners.com
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-platt-primary" />
                      <a href="tel:+18667660188" className="hover:text-platt-primary">
                        1 (866) 766-0188
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-platt-primary" />
                      <a
                        href="https://www.linkedin.com/in/peterplatt/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-platt-primary"
                      >
                        Peter Platt on LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">
                    Prefer a quick call? Use the phone above and ask for Peter. We typically respond
                    within one business day.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
