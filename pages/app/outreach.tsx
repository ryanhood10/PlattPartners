import Head from 'next/head';
import { Send } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { requireAuth } from '@/lib/auth';

export default function OutreachPage() {
  return (
    <>
      <Head>
        <title>Outreach Queue — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Outreach Queue"
        description="AI-drafted outreach emails waiting for Peter to Approve, Edit, or Reject."
      >
        <EmptyState
          icon={Send}
          title="No drafts in queue"
          description="Drafts appear here once a LinkedIn CSV lands, Apollo enrichment completes, and Claude generates personalized outreach in Peter's voice. Approve to send through outreach.plattpartners.com."
        />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
