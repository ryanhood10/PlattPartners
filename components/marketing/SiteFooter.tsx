import Link from 'next/link';
import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Image
              src="/logo.svg"
              alt="Platt Partners"
              width={180}
              height={36}
              className="h-9 w-auto"
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Quality candidate flow for hard-to-fill positions.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-platt-secondary">
              Let&apos;s Work Together
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="mailto:info@plattpartners.com" className="hover:text-platt-primary">
                  info@plattpartners.com
                </a>
              </li>
              <li>
                <a href="tel:+18667660188" className="hover:text-platt-primary">
                  1 (866) 766-0188
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/peterplatt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-platt-primary"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-platt-secondary">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/#platt-partner-services" className="hover:text-platt-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-platt-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-platt-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-platt-primary">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-platt-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Platt Partners. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
