import Head from 'next/head';
import { CircleCheck, CircleDot, AlertCircle, Clock, Mail } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { requireAuth } from '@/lib/auth';
import { MOCK_INBOX } from '@/lib/mock';

const CLASSIFICATION_META = {
  positive: { Icon: CircleCheck, color: 'text-emerald-600', label: 'Positive' },
  neutral: { Icon: CircleDot, color: 'text-muted-foreground', label: 'Neutral' },
  negative: { Icon: AlertCircle, color: 'text-rose-600', label: 'Negative' },
  ooo: { Icon: Clock, color: 'text-amber-600', label: 'OOO' },
} as const;

function timeAgo(min: number) {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

export default function InboxPage() {
  return (
    <>
      <Head>
        <title>Inbox — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Inbox"
        description={`${MOCK_INBOX.length} messages • filtered to candidates + clients`}
      >
        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-900">
          <strong>Mock data.</strong> Once Microsoft 365 auth + webhooks are wired, real candidate
          and client replies appear here, classified and summarized by Claude Haiku.
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <ul className="divide-y divide-border">
            {MOCK_INBOX.map((m) => {
              const meta = CLASSIFICATION_META[m.classification];
              return (
                <li
                  key={m.id}
                  className="flex cursor-pointer gap-4 px-5 py-4 transition hover:bg-muted/30"
                >
                  <div className="flex items-start pt-1">
                    <meta.Icon className={`h-5 w-5 ${meta.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate font-medium">{m.from}</p>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {timeAgo(m.receivedMinutesAgo)} ago
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                      {m.subject}
                    </p>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{m.preview}</p>
                    <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {m.candidateOrClient}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
