import { useState, useMemo } from 'react';
import Head from 'next/head';
import { Plus, Phone, Mail, PhoneCall, Search } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { requireAuth } from '@/lib/auth';
import { MOCK_CLIENTS } from '@/lib/mock';

function tierVariant(tier: 1 | 2 | 3): 'default' | 'secondary' | 'outline' {
  if (tier === 1) return 'default';
  if (tier === 2) return 'secondary';
  return 'outline';
}

function lastContactColor(days: number) {
  if (days <= 7) return 'text-emerald-700';
  if (days <= 21) return 'text-amber-700';
  return 'text-rose-700';
}

export default function ClientsPage() {
  const [query, setQuery] = useState('');
  const [fridayOnly, setFridayOnly] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_CLIENTS.filter((c) => {
      if (fridayOnly && !c.isFridayCallList) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        c.company.toLowerCase().includes(q) ||
        c.contactName.toLowerCase().includes(q) ||
        c.contactEmail.toLowerCase().includes(q) ||
        c.vertical.toLowerCase().includes(q)
      );
    });
  }, [query, fridayOnly]);

  const fridayCount = MOCK_CLIENTS.filter((c) => c.isFridayCallList).length;

  return (
    <>
      <Head>
        <title>Clients — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Clients"
        description={`${filtered.length} of ${MOCK_CLIENTS.length} contacts • ${fridayCount} on Friday-call list`}
      >
        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-900">
          <strong>Mock data.</strong> Connect MongoDB Atlas to see real clients here.
        </div>

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by company, contact, email, or vertical…"
                className="pl-9"
              />
            </div>
            <Button
              variant={fridayOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFridayOnly((v) => !v)}
            >
              <PhoneCall className="mr-1.5 h-4 w-4" />
              Friday list
            </Button>
          </div>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Add client
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-display">Company</TableHead>
                <TableHead className="font-display">Contact</TableHead>
                <TableHead className="font-display">Vertical</TableHead>
                <TableHead className="font-display">Tier</TableHead>
                <TableHead className="font-display">Last contact</TableHead>
                <TableHead className="font-display">Friday call</TableHead>
                <TableHead className="text-right font-display">Reach out</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.company}</TableCell>
                  <TableCell>
                    <div>{c.contactName}</div>
                    <div className="text-xs text-muted-foreground">{c.contactEmail}</div>
                  </TableCell>
                  <TableCell className="capitalize text-muted-foreground">{c.vertical}</TableCell>
                  <TableCell>
                    <Badge variant={tierVariant(c.tier)}>Tier {c.tier}</Badge>
                  </TableCell>
                  <TableCell className={lastContactColor(c.lastContactDays)}>
                    {c.lastContactDays}d ago
                  </TableCell>
                  <TableCell>
                    {c.isFridayCallList ? (
                      <Badge variant="secondary" className="gap-1">
                        <PhoneCall className="h-3 w-3" />
                        Yes
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-1">
                      <a
                        href={`mailto:${c.contactEmail}`}
                        className="rounded p-1.5 hover:bg-muted"
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </a>
                      {c.contactPhone && (
                        <a
                          href={`tel:${c.contactPhone.replace(/[^\d+]/g, '')}`}
                          className="rounded p-1.5 hover:bg-muted"
                          aria-label="Phone"
                        >
                          <Phone className="h-4 w-4 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No clients match. Try a different search{' '}
                {fridayOnly && (
                  <>
                    or{' '}
                    <button
                      type="button"
                      onClick={() => setFridayOnly(false)}
                      className="text-platt-primary underline"
                    >
                      remove the Friday filter
                    </button>
                  </>
                )}
                .
              </p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
