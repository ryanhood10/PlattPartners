import Head from 'next/head';
import { Inbox as InboxIcon } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { requireAuth } from '@/lib/auth';

export default function InboxPage() {
  return (
    <>
      <Head>
        <title>Inbox — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Inbox"
        description="Candidate + client emails from your Microsoft 365 inbox, filtered to what's relevant."
      >
        <EmptyState
          icon={InboxIcon}
          title="Inbox connects after Microsoft 365 auth"
          description="Once Peter grants the Entra app permissions, this view shows inbound candidate and client emails — classified, summarized, and attached to the right contact automatically."
        />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
