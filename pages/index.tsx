import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { ContactForm } from '@/components/marketing/ContactForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Recruiting for Fast Growing Companies — Platt Partners</title>
        <meta
          name="description"
          content="Build a robust pipeline of qualified candidates for hard-to-fill positions. Serving the tech, finance, and fast casual dining industries."
        />
        <meta property="og:title" content="Platt Partners — Quality Candidate Flow" />
        <meta
          property="og:description"
          content="We won't find one great candidate. We'll find several."
        />
        <meta property="og:url" content="https://plattpartners.com/" />
        <meta property="og:type" content="website" />
      </Head>

      <SiteHeader />

      <main>
        {/* ─── Hero ──────────────────────────────────────────────────────── */}
        <section id="hero" className="container py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 font-display text-sm uppercase tracking-widest text-platt-primary">
              Multiple Hard-to-fill positions?
            </p>
            <h1 className="font-display text-4xl tracking-tight text-platt-secondary md:text-6xl">
              Give us your biggest recruiting challenges!
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Quality Candidate Flow — access a robust pipeline of qualified candidates today.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="#contact-platt-partners">Let&apos;s Talk</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#platt-partner-services">See what we do</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Trusted By ────────────────────────────────────────────────── */}
        <section className="border-y border-border bg-muted/30 py-12">
          <div className="container">
            <p className="mb-8 text-center font-display text-sm uppercase tracking-widest text-muted-foreground">
              Trusted By
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 opacity-80">
              <Image src="/clients/jitb.png" alt="Jack in the Box" width={120} height={48} className="h-10 w-auto md:h-12" />
              <Image src="/clients/del-taco.png" alt="Del Taco" width={120} height={48} className="h-10 w-auto md:h-12" />
              <Image src="/clients/el-pollo-loco.png" alt="El Pollo Loco" width={120} height={48} className="h-10 w-auto md:h-12" />
              <Image src="/clients/petco.png" alt="Petco" width={120} height={48} className="h-10 w-auto md:h-12" />
            </div>
          </div>
        </section>

        {/* ─── Problem statement ─────────────────────────────────────────── */}
        <section className="container py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
              Recruiting for multiple hard-to-fill positions is hard.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              How many evenings have you worked late trying to find great candidates?
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-xl text-platt-secondary">Not enough candidates</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                With dozens of open positions, multiple stakeholders and highly specialized job
                requirements, it&apos;s tough to find enough great candidates to fill the pipeline.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-xl text-platt-secondary">Disgruntled hiring managers</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Meeting the needs of multiple hiring managers feels like a no-win situation. When
                you find 1 or 2 qualified candidates, they still want more.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-xl text-platt-secondary">Managing too many vendors</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                How many job posting accounts have you set up recently? Getting tangled up in
                multiple vendor relationships is costly, time consuming and inefficient.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Solution statement ────────────────────────────────────────── */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
              It&apos;s time for a series of wins with a full pipeline of qualified candidates.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Give us your biggest recruiting challenges. We won&apos;t find one great candidate.
              We&apos;ll find several. Your hiring managers will be confident they have the options
              they need to make the best choice.
            </p>
          </div>
        </section>

        {/* ─── Services ──────────────────────────────────────────────────── */}
        <section id="platt-partner-services" className="container py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
              What do you need to fill?
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="rounded-lg border-2 border-platt-primary bg-card p-8">
              <p className="font-display text-sm uppercase tracking-wider text-platt-primary">
                Subscription-based service
              </p>
              <h3 className="mt-2 font-display text-2xl text-platt-secondary">Multiple Positions</h3>
              <p className="mt-4 text-muted-foreground">
                For one monthly fee we get to work finding exceptional candidates for a group of
                open positions. Ideal for fast-growing companies who have a host of jobs that need
                to be filled ASAP.
              </p>
              <Button asChild className="mt-6">
                <Link href="#contact-platt-partners">Let&apos;s Talk</Link>
              </Button>
            </div>
            <div className="rounded-lg border border-border bg-card p-8">
              <p className="font-display text-sm uppercase tracking-wider text-muted-foreground">
                Fee per placement
              </p>
              <h3 className="mt-2 font-display text-2xl text-platt-secondary">One Position</h3>
              <p className="mt-4 text-muted-foreground">
                When you have one position you can&apos;t seem to find traction on, we&apos;ll take
                that on. We know this field inside and out and can find the best candidates so you
                can cross this one off your list.
              </p>
              <Button variant="outline" asChild className="mt-6">
                <Link href="#contact-platt-partners">Let&apos;s Talk</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Verticals + recently placed ───────────────────────────────── */}
        <section className="bg-muted/30 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
                When it comes to finding top talent, you deserve choices.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                We specialize in finding exceptional candidates for mid to senior-level positions
                in tech, financial services and fast casual dining industries.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-3xl">
              <p className="text-center text-sm font-medium uppercase tracking-wider text-platt-secondary">
                Recently placed positions
              </p>
              <ul className="mt-6 grid gap-3 text-center text-muted-foreground sm:grid-cols-2">
                <li>Director of Customer Success</li>
                <li>Account Executives</li>
                <li>Regional Director of Sales</li>
                <li>Director of Dev Ops</li>
                <li>Director, AWS Cloud</li>
                <li>Chief Information Officer</li>
                <li>Solutions Architect</li>
                <li>Senior Integration Architect</li>
              </ul>
              <p className="mt-8 text-center text-muted-foreground">
                Don&apos;t see the position you need to fill?{' '}
                <Link href="#contact-platt-partners" className="text-platt-primary underline">
                  Give us a call
                </Link>{' '}
                and we&apos;ll find great candidates.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Process — 4 steps ─────────────────────────────────────────── */}
        <section id="about-peter-platt-partners" className="container py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
              We know you&apos;re busy. So we&apos;ll take on all the heavy lifting.
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              {
                step: '1',
                title: 'Meet Your Team',
                body: 'Your team will consist of a Researcher, a Recruiter, a Marketer, an Account Manager, and a Data Analyst. These people use the powerful combination of technology and real relationship building to deliver qualified candidates to you.',
              },
              {
                step: '2',
                title: 'Receive ongoing communication',
                body: 'On a weekly basis we provide candidate submissions, progress reports and meetings with hiring managers for clear direction on candidate searches. Nothing is done in the dark.',
              },
              {
                step: '3',
                title: 'Robust pipeline of qualified candidates',
                body: 'When it comes to hiring, delays are the last thing you need. We give you great candidates within days, not weeks.',
              },
              {
                step: '4',
                title: 'High-five your hiring manager',
                body: 'Hiring managers want to talk to enough of the right candidates. Every time they make a successful hire, they will be thrilled that they had plenty of excellent options to choose from — thanks to you.',
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl text-platt-primary">{step}.</span>
                  <h3 className="font-display text-xl text-platt-secondary">{title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Strategic value ───────────────────────────────────────────── */}
        <section className="bg-platt-secondary py-20 text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              Make your team indispensable.
            </h2>
            <p className="mt-4 text-lg text-white/80">
              We understand that when fast-growing companies need to fill positions, time is of the
              essence.
            </p>
            <ul className="mt-8 grid gap-4 text-left text-white/90 sm:grid-cols-3">
              <li className="rounded-md bg-white/10 p-4">Reduce time-to-hire</li>
              <li className="rounded-md bg-white/10 p-4">Save time &amp; money recruiting</li>
              <li className="rounded-md bg-white/10 p-4">Increase employee retention</li>
            </ul>
            <p className="mt-10 text-lg">
              Give us your hardest-to-fill position and let us work on that for{' '}
              <span className="font-semibold">free</span>.
            </p>
            <Button size="lg" variant="secondary" asChild className="mt-6 bg-white text-platt-secondary hover:bg-white/90">
              <Link href="#contact-platt-partners">Let&apos;s Talk</Link>
            </Button>
          </div>
        </section>

        {/* ─── Testimonial ───────────────────────────────────────────────── */}
        <section className="container py-20">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="font-display text-2xl text-platt-secondary md:text-3xl">
              &ldquo;Able to quickly integrate with our team and deliver quality candidates! They
              adapted rapidly with our organization, managing our staffing needs with strong
              applicant quality. They helped us identify ideal fits; additionally, they furnished us
              relevant market insights supporting our efforts to address comparable roles.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold text-foreground">Todd Merz</span>
              <span className="text-muted-foreground"> — Head of Talent Acquisition, ODK Media</span>
            </figcaption>
          </figure>
        </section>

        {/* ─── Contact ───────────────────────────────────────────────────── */}
        <section
          id="contact-platt-partners"
          className="border-t border-border bg-muted/30 py-20"
        >
          <div className="container mx-auto max-w-2xl">
            <div className="text-center">
              <p className="font-display text-sm uppercase tracking-widest text-platt-primary">
                Quality Candidate Flow
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-platt-secondary md:text-4xl">
                Let&apos;s Work Together
              </h2>
              <p className="mt-4 text-muted-foreground">
                Tell us what you&apos;re looking for and we&apos;ll call you to get started.
              </p>
            </div>

            <div id="Schedule-a-call" className="mt-10">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
