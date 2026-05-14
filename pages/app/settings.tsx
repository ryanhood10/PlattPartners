import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { CheckCircle2, Circle } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { requireAuth } from '@/lib/auth';

const INTEGRATIONS = [
  { name: 'Microsoft 365 (Entra)', envHint: 'MS_CLIENT_ID', phase: 0 },
  { name: 'MongoDB Atlas', envHint: 'MONGODB_URI', phase: 0 },
  { name: 'Apollo.io', envHint: 'APOLLO_API_KEY', phase: 2 },
  { name: 'Anthropic (Claude)', envHint: 'ANTHROPIC_API_KEY', phase: 3 },
  { name: 'Voyage (embeddings)', envHint: 'VOYAGE_API_KEY', phase: 4 },
  { name: 'Google Gemini', envHint: 'GEMINI_API_KEY', phase: 4 },
  { name: 'Vector store (Pinecone or Atlas)', envHint: 'PINECONE_API_KEY', phase: 4 },
  { name: 'Slack approvals', envHint: 'SLACK_WEBHOOK_URL', phase: 3 },
  { name: 'Upstash rate limiter', envHint: 'UPSTASH_REDIS_REST_URL', phase: 4 },
  { name: 'Cloudinary', envHint: 'CLOUDINARY_CLOUD_NAME', phase: 1 },
  { name: 'Backblaze B2 (backups)', envHint: 'B2_APPLICATION_KEY_ID', phase: 6 },
];

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Settings — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Settings"
        description="Your account, brand defaults, and integration status."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Account */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg text-platt-secondary">Account</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Signed in as</dt>
                <dd className="font-medium">{session?.user?.email ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">User ID</dt>
                <dd className="font-mono text-xs">{session?.user?.id ?? '—'}</dd>
              </div>
            </dl>
          </section>

          {/* Brand */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg text-platt-secondary">Brand</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Primary color</dt>
                <dd className="flex items-center gap-2 font-mono text-xs">
                  <span className="inline-block h-4 w-4 rounded border border-border" style={{ background: '#428bca' }} />
                  #428bca
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Secondary color</dt>
                <dd className="flex items-center gap-2 font-mono text-xs">
                  <span className="inline-block h-4 w-4 rounded border border-border" style={{ background: '#215273' }} />
                  #215273
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Display font</dt>
                <dd className="font-mono text-xs">Work Sans 800</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Body font</dt>
                <dd className="font-mono text-xs">Roboto</dd>
              </div>
            </dl>
          </section>
        </div>

        {/* Integrations */}
        <section className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg text-platt-secondary">Integrations</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Each integration activates when its env var is set. Phase column indicates when it
            comes online per the build plan.
          </p>
          <ul className="mt-4 divide-y divide-border">
            {INTEGRATIONS.map((it) => {
              const connected = Boolean(process.env[it.envHint as keyof NodeJS.ProcessEnv]);
              const Icon = connected ? CheckCircle2 : Circle;
              return (
                <li key={it.name} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Icon
                      className={connected ? 'h-5 w-5 text-platt-primary' : 'h-5 w-5 text-muted-foreground'}
                    />
                    <div>
                      <p className="text-sm font-medium">{it.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">{it.envHint}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    Phase {it.phase}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
