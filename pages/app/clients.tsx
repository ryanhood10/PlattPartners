import Head from 'next/head';
import { Plus, Phone, Mail, PhoneCall } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { requireAuth } from '@/lib/auth';
import { MOCK_CLIENTS } from '@/lib/mock';

function tierLabel(tier: 1 | 2 | 3) {
  if (tier === 1) return { label: 'Tier 1', cls: 'bg-platt-primary/15 text-platt-primary' };
  if (tier === 2) return { label: 'Tier 2', cls: 'bg-amber-100 text-amber-700' };
  return { label: 'Tier 3', cls: 'bg-muted text-muted-foreground' };
}

function lastContactColor(days: number) {
  if (days <= 7) return 'text-emerald-700';
  if (days <= 21) return 'text-amber-700';
  return 'text-rose-700';
}

export default function ClientsPage() {
  const fridayCount = MOCK_CLIENTS.filter((c) => c.isFridayCallList).length;

  return (
    <>
      <Head>
        <title>Clients — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Clients"
        description={`${MOCK_CLIENTS.length} HR contacts • ${fridayCount} on Friday-call list`}
      >
        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-900">
          <strong>Mock data.</strong> Connect MongoDB Atlas to see real clients here.
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Tier 1 = highest-value accounts. Friday-call list flag pulls into the weekly call queue.
          </p>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Add client
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-display">Company</th>
                <th className="px-4 py-3 text-left font-display">Contact</th>
                <th className="px-4 py-3 text-left font-display">Vertical</th>
                <th className="px-4 py-3 text-left font-display">Tier</th>
                <th className="px-4 py-3 text-left font-display">Last contact</th>
                <th className="px-4 py-3 text-left font-display">Friday call</th>
                <th className="px-4 py-3 text-right font-display">Reach out</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_CLIENTS.map((c) => {
                const tier = tierLabel(c.tier);
                return (
                  <tr key={c.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{c.company}</td>
                    <td className="px-4 py-3">
                      <div>{c.contactName}</div>
                      <div className="text-xs text-muted-foreground">{c.contactEmail}</div>
                    </td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{c.vertical}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tier.cls}`}>
                        {tier.label}
                      </span>
                    </td>
                    <td className={`px-4 py-3 ${lastContactColor(c.lastContactDays)}`}>
                      {c.lastContactDays}d ago
                    </td>
                    <td className="px-4 py-3">
                      {c.isFridayCallList ? (
                        <span className="inline-flex items-center gap-1 rounded bg-platt-primary/10 px-2 py-0.5 text-xs font-medium text-platt-primary">
                          <PhoneCall className="h-3 w-3" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
