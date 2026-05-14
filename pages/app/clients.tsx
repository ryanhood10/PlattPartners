import Head from 'next/head';
import { Users, Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { Button } from '@/components/ui/button';
import { requireAuth } from '@/lib/auth';

export default function ClientsPage() {
  return (
    <>
      <Head>
        <title>Clients — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Clients"
        description="HR contacts and active client relationships. Your Friday-call list lives here."
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Once Peter&apos;s client sheet is imported, contacts will appear here grouped by tier
            and last-contact date.
          </p>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Add client
          </Button>
        </div>

        <EmptyState
          icon={Users}
          title="No clients yet"
          description="Import Peter's existing client Excel sheet (or add manually) to populate this view. The Friday-call list will be flagged and sortable by last-contact date."
        />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
