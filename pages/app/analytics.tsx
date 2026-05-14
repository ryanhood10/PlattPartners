import Head from 'next/head';
import { BarChart3 } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { requireAuth } from '@/lib/auth';

const CARDS = [
  { label: 'Sessions (7d)', value: '—', sub: 'GA4 not connected' },
  { label: 'Clicks (7d)', value: '—', sub: 'Search Console not connected' },
  { label: 'Top page', value: '—', sub: 'GA4 not connected' },
  { label: 'Top query', value: '—', sub: 'Search Console not connected' },
];

export default function AnalyticsPage() {
  return (
    <>
      <Head>
        <title>Analytics — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Analytics"
        description="Site traffic, search visibility, and weekly summaries — once GA4 + Search Console connect."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <div key={card.label} className="rounded-lg border border-border bg-card p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {card.label}
              </p>
              <p className="mt-2 font-display text-3xl text-platt-secondary">{card.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/10 p-8 text-center">
          <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 font-display text-lg text-platt-secondary">
            Analytics ingestion lands in Phase 6
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Daily snapshots from GA4 + Search Console will populate these cards. Weekly client
            reports get generated from the same data source.
          </p>
        </div>
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
