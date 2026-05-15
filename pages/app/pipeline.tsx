import { useState, useMemo } from 'react';
import Head from 'next/head';
import { Upload, Search } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { requireAuth } from '@/lib/auth';
import { MOCK_CANDIDATES } from '@/lib/mock';
import type { PipelineStage } from '@/models/PipelineState';

const STAGES: { key: PipelineStage; label: string }[] = [
  { key: 'sourced', label: 'Sourced' },
  { key: 'outreach_queued', label: 'Queued' },
  { key: 'outreach_sent', label: 'Outreach' },
  { key: 'replied', label: 'Replied' },
  { key: 'prescreened', label: 'Screened' },
  { key: 'submitted_to_client', label: 'Submitted' },
  { key: 'client_interview', label: 'Interview' },
  { key: 'placed', label: 'Placed' },
];

function scoreColor(score: number) {
  if (score >= 80) return 'bg-emerald-100 text-emerald-700';
  if (score >= 65) return 'bg-amber-100 text-amber-700';
  return 'bg-rose-100 text-rose-700';
}

export default function PipelinePage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return MOCK_CANDIDATES;
    const q = query.toLowerCase();
    return MOCK_CANDIDATES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const byStage = new Map<PipelineStage, typeof MOCK_CANDIDATES>();
  for (const s of STAGES) byStage.set(s.key, []);
  for (const c of filtered) {
    byStage.get(c.stage)?.push(c);
  }

  return (
    <>
      <Head>
        <title>Pipeline — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Pipeline"
        description={`${filtered.length} of ${MOCK_CANDIDATES.length} candidates across every stage`}
      >
        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-900">
          <strong>Mock data.</strong> Connect MongoDB Atlas to see real candidates here.
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, title, company, or tag…"
              className="pl-9"
            />
          </div>
          <Button disabled>
            <Upload className="mr-2 h-4 w-4" />
            Connect OneDrive
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          {STAGES.map((stage) => {
            const candidates = byStage.get(stage.key) ?? [];
            return (
              <div key={stage.key} className="rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <h3 className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                    {stage.label}
                  </h3>
                  <Badge variant="secondary" className="text-[10px]">
                    {candidates.length}
                  </Badge>
                </div>
                <div className="space-y-2 p-2">
                  {candidates.length === 0 ? (
                    <p className="px-1 py-3 text-xs text-muted-foreground">—</p>
                  ) : (
                    candidates.map((c) => (
                      <div
                        key={c.id}
                        className="cursor-pointer rounded-md border border-border bg-background p-3 transition hover:border-platt-primary hover:shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-medium">{c.name}</p>
                          <span
                            className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${scoreColor(c.score)}`}
                          >
                            {c.score}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-xs text-muted-foreground">{c.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{c.company}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {c.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {c.lastTouchedDays === 0 ? 'today' : `${c.lastTouchedDays}d ago`}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/10 p-12 text-center">
            <p className="text-sm text-muted-foreground">
              No candidates match &ldquo;{query}&rdquo;. Clear the search to see all{' '}
              {MOCK_CANDIDATES.length}.
            </p>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
