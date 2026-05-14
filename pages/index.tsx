import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
      </Head>

      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Platt Partners" width={160} height={32} priority />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="#services" className="text-sm hover:text-platt-primary">
              Services
            </Link>
            <Link href="#about" className="text-sm hover:text-platt-primary">
              About
            </Link>
            <Button asChild>
              <Link href="#contact">Let&apos;s Talk</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="container py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 font-display text-sm uppercase tracking-widest text-platt-primary">
              Multiple Hard-to-fill positions?
            </p>
            <h1 className="font-display text-5xl tracking-tight text-platt-secondary md:text-6xl">
              Quality Candidate Flow
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Access a robust pipeline of qualified candidates today. We won&apos;t find one great
              candidate. We&apos;ll find several.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="#contact">Let&apos;s Talk</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#services">See what we do</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/30 py-12">
          <div className="container">
            <p className="mb-8 text-center font-display text-sm uppercase tracking-widest text-muted-foreground">
              Trusted By
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
              <Image src="/clients/jitb.png" alt="Jack in the Box" width={120} height={48} />
              <Image src="/clients/del-taco.png" alt="Del Taco" width={120} height={48} />
              <Image src="/clients/el-pollo-loco.png" alt="El Pollo Loco" width={120} height={48} />
              <Image src="/clients/petco.png" alt="Petco" width={120} height={48} />
            </div>
          </div>
        </section>

        <section className="container py-20 text-center text-muted-foreground">
          <p className="text-sm">
            Marketing pages and dashboard scaffolded — see{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">docs/build_plan.md</code> for
            what lands when. Phase 0 in progress.
          </p>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="container">
          © {new Date().getFullYear()} Platt Partners. All rights reserved.
        </div>
      </footer>
    </>
  );
}
