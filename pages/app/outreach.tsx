import Head from 'next/head';
import { Check, Pencil, X, Sparkles } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { requireAuth } from '@/lib/auth';
import { MOCK_OUTREACH } from '@/lib/mock';

function timeAgo(min: number) {
  if (min < 60) return `${min} min ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function OutreachPage() {
  return (
    <>
      <Head>
        <title>Outreach Queue — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Outreach Queue"
        description={`${MOCK_OUTREACH.length} drafts awaiting your approval`}
      >
        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-900">
          <strong>Mock data.</strong> Once Apollo + Claude Sonnet are wired, drafts will appear here
          in real time when CSV exports land.
        </div>

        <div className="space-y-4">
          {MOCK_OUTREACH.map((d) => (
            <article key={d.id} className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <header className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {d.forClient} → {d.forRole}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-platt-secondary">
                    To: {d.candidateName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {d.candidateTitle} · {d.candidateCompany}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-platt-primary" />
                  Drafted {timeAgo(d.draftedAtMinutesAgo)}
                </div>
              </header>

              <div className="rounded-md border border-border bg-muted/20 p-4">
                <p className="text-sm font-semibold">Subject: {d.subject}</p>
                <pre className="mt-3 whitespace-pre-wrap font-sans text-sm text-foreground">
                  {d.body}
                </pre>
              </div>

              <footer className="mt-4 flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" disabled>
                  <X className="mr-1.5 h-4 w-4" />
                  Reject
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <Pencil className="mr-1.5 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm" disabled>
                  <Check className="mr-1.5 h-4 w-4" />
                  Approve &amp; send
                </Button>
              </footer>
            </article>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
