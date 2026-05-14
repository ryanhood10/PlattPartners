import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Platt Partners"
            width={180}
            height={36}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#platt-partner-services" className="text-sm font-medium hover:text-platt-primary">
            Services
          </Link>
          <Link href="/#about-peter-platt-partners" className="text-sm font-medium hover:text-platt-primary">
            About
          </Link>
          <Link href="/technology" className="text-sm font-medium hover:text-platt-primary">
            Technology
          </Link>
          <a
            href="tel:+18667660188"
            className="text-sm font-medium hover:text-platt-primary"
          >
            Call Now
          </a>
        </nav>
        <Button asChild>
          <Link href="/#contact-platt-partners">Let&apos;s Talk</Link>
        </Button>
      </div>
    </header>
  );
}
