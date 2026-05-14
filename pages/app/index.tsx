import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { useSession, signOut } from 'next-auth/react';
import { authOptions } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Dashboard — Platt Partners</title>
      </Head>

      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="font-display text-lg text-platt-secondary">Platt Partners</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{session?.user?.email}</span>
            <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <h2 className="mb-2 font-display text-3xl text-platt-secondary">Pipeline</h2>
        <p className="text-muted-foreground">
          Empty state. Once Peter exports his first LinkedIn CSV, candidates will appear here.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {['Sourced', 'Outreach', 'Replied', 'Screened', 'Submitted', 'Placed'].map((stage) => (
            <div key={stage} className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-display text-sm uppercase tracking-wide text-muted-foreground">
                {stage}
              </h3>
              <p className="mt-2 text-2xl font-semibold text-foreground">0</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/app',
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
