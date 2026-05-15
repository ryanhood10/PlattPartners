import { ReactNode, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import {
  LayoutGrid,
  Users,
  Inbox as InboxIcon,
  Send,
  Target,
  BarChart3,
  Sparkles,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { href: '/app/pipeline', label: 'Pipeline', icon: LayoutGrid },
  { href: '/app/clients', label: 'Clients', icon: Users },
  { href: '/app/inbox', label: 'Inbox', icon: InboxIcon },
  { href: '/app/outreach', label: 'Outreach Queue', icon: Send },
  { href: '/app/bd', label: 'BD Queue', icon: Target },
  { href: '/app/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/app/assistant', label: 'Assistant', icon: Sparkles },
  { href: '/app/settings', label: 'Settings', icon: Settings },
] as const;

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function DashboardLayout({ title, description, children }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  function navLinkClass(href: string) {
    const active = router.pathname === href || router.pathname.startsWith(href + '/');
    return cn(
      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
      active
        ? 'bg-platt-primary text-white'
        : 'text-foreground hover:bg-muted hover:text-platt-primary'
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* ─── Desktop sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-muted/30 md:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/app/pipeline" className="flex items-center">
            <Image src="/logo.svg" alt="Platt Partners" width={140} height={28} className="h-7 w-auto" />
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={navLinkClass(href)}>
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ─── Main column ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-muted md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex flex-col">
              <h1 className="font-display text-lg text-platt-secondary">{title}</h1>
              {description && (
                <p className="hidden text-xs text-muted-foreground sm:block">{description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {session?.user?.email && (
              <span className="hidden text-sm text-muted-foreground md:inline">
                {session.user.email}
              </span>
            )}
          </div>
        </header>

        <main className="flex-1 bg-background p-4 md:p-8">{children}</main>
      </div>

      {/* ─── Mobile drawer ───────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-background shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <Link href="/app/pipeline" className="flex items-center" onClick={() => setMobileOpen(false)}>
                <Image src="/logo.svg" alt="Platt Partners" width={140} height={28} className="h-7 w-auto" />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {session?.user?.email && (
              <p className="border-b border-border px-4 py-3 text-sm text-muted-foreground">
                {session.user.email}
              </p>
            )}

            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={navLinkClass(href)}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-border p-3">
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
