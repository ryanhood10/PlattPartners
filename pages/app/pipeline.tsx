import Head from 'next/head';
import { Upload } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { requireAuth } from '@/lib/auth';

const STAGES = [
  { key: 'sourced', label: 'Sourced' },
  { key: 'outreach', label: 'Outreach' },
  { key: 'replied', label: 'Replied' },
  { key: 'screened', label: 'Screened' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'placed', label: 'Placed' },
] as const;

export default function PipelinePage() {
  return (
    <>
      <Head>
        <title>Pipeline — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Pipeline"
        description="Candidates across every stage. Empty until your first LinkedIn export lands."
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Drop a LinkedIn Recruiter CSV in your watched OneDrive folder to start the pipeline.
          </p>
          <Button disabled>
            <Upload className="mr-2 h-4 w-4" />
            Connect OneDrive
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {STAGES.map((stage) => (
            <div key={stage.key} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground">
                  {stage.label}
                </h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  0
                </span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">No candidates yet.</p>
            </div>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
