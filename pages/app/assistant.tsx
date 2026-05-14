import Head from 'next/head';
import { Sparkles, Send } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { requireAuth } from '@/lib/auth';

export default function AssistantPage() {
  return (
    <>
      <Head>
        <title>Assistant — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Assistant"
        description="Your AI expert on Platt Partners — clients, candidates, placements, voice, strategy."
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <div className="rounded-lg border border-dashed border-border bg-muted/10 p-8 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-platt-primary" />
            <h3 className="mt-4 font-display text-lg text-platt-secondary">
              Assistant activates in Phase 4
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Once the knowledge base is indexed (wiki, placements, voice corpus), Peter can ask
              questions like &ldquo;What did we charge Jack in the Box for the last VP placement?&rdquo;
              and get answers with source citations.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-end gap-3">
              <textarea
                disabled
                rows={2}
                placeholder="Ask the assistant…"
                className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              />
              <Button disabled>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Disabled — needs Phase 4 (knowledge-base indexing) to be wired up.
            </p>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
