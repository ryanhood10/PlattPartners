import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV = [
  { label: 'Services', href: '/#platt-partner-services' },
  { label: 'About', href: '/about' },
  { label: 'Technology', href: '/technology' },
  { label: 'Call Now', href: 'tel:+18667660188', external: true },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Close the menu whenever the route changes (e.g., user taps a link)
  if (typeof window !== 'undefined') {
    router.events?.on('routeChangeStart', () => setOpen(false));
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Platt Partners home">
          <Image
            src="/logo.svg"
            alt="Platt Partners"
            width={180}
            height={36}
            priority
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-platt-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-platt-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <Button asChild className="hidden md:inline-flex">
          <Link href="/contact">Let&apos;s Talk</Link>
        </Button>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col py-4">
            {NAV.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium hover:text-platt-primary"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium hover:text-platt-primary"
                >
                  {item.label}
                </Link>
              )
            )}
            <Button asChild className="mt-2 w-full">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Let&apos;s Talk
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
