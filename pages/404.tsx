import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SeoHead } from '@/components/marketing/SeoHead';

export default function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Page not found — Platt Partners"
        description="The page you're looking for doesn't exist or has moved."
        path="/404"
        noindex
      />

      <SiteHeader />

      <main className="container py-20 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm uppercase tracking-widest text-platt-primary">
            404 — Page not found
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-platt-secondary md:text-5xl">
            That page isn&apos;t here.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            The page you&apos;re looking for may have moved during our recent site rebuild. If you
            think this is a mistake, give us a call — we&apos;d rather find your candidates than fix
            broken links, but we&apos;ll do both.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/">Back to home</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Let&apos;s Talk</Link>
            </Button>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-left">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Try these instead
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>
                <Link href="/" className="text-platt-primary hover:underline">
                  Homepage
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-platt-primary hover:underline">
                  About Platt Partners
                </Link>
              </li>
              <li>
                <Link href="/technology" className="text-platt-primary hover:underline">
                  Technology recruiting
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-build-a-robust-pipeline-of-qualified-candidates"
                  className="text-platt-primary hover:underline"
                >
                  Free guide: 3 outbound recruiting tips
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-platt-primary hover:underline">
                  Contact us
                </Link>
              </li>
              <li>
                <a
                  href="tel:+18667660188"
                  className="text-platt-primary hover:underline"
                >
                  Call 1 (866) 766-0188
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
