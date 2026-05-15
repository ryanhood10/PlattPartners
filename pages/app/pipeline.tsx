import Head from 'next/head';
import { Upload } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
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
  const byStage = new Map<PipelineStage, typeof MOCK_CANDIDATES>();
  for (const s of STAGES) byStage.set(s.key, []);
  for (const c of MOCK_CANDIDATES) {
    byStage.get(c.stage)?.push(c);
  }

  return (
    <>
      <Head>
        <title>Pipeline — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Pipeline"
        description="Candidates across every stage of every active search."
      >
        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-900">
          <strong>Mock data.</strong> Connect MongoDB Atlas to see real candidates here.
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Drop a LinkedIn Recruiter CSV in your OneDrive folder to start the pipeline.
          </p>
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
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {candidates.length}
                  </span>
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
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
