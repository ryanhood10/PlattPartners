import Head from 'next/head';
import { Target } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { requireAuth } from '@/lib/auth';

export default function BDPage() {
  return (
    <>
      <Head>
        <title>BD Queue — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="BD Queue"
        description="New-business briefs — companies hiring, why they fit, and which Platt candidates we could lead with."
      >
        <EmptyState
          icon={Target}
          title="BD engine activates in Phase 5"
          description="Once the candidate database is populated, the BD engine scans Crunchbase, Greenhouse, Lever, and news mentions for companies hiring against Peter's ICPs. Each brief includes 3 specific candidates from his pipeline as leverage."
        />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
