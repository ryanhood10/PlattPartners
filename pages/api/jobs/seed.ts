import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '@/lib/db';
import { Client, Candidate, Contact } from '@/models';
import { MOCK_CLIENTS, MOCK_CANDIDATES } from '@/lib/mock';
import { logger } from '@/lib/logger';

// One-shot seed endpoint. Populates the dashboard mock fixtures into
// real Mongo collections so the new Atlas cluster comes online with
// realistic-looking data immediately.
//
// Usage:
//   curl -X POST -H "X-Job-Secret: <JOB_RUNNER_SECRET>" \
//     https://platt-partners-3b59df8c6202.herokuapp.com/api/jobs/seed
//
// By default it refuses to seed if any collection already has data.
// Pass `?reset=true` to wipe + re-seed (destructive).

type Response =
  | {
      ok: true;
      data: {
        action: 'seeded' | 'reset+seeded' | 'noop';
        counts: { clients: number; candidates: number; contacts: number };
        message: string;
      };
    }
  | { ok: false; error: { code: string; message: string } };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  // Auth: shared-secret header check
  const secret = req.headers['x-job-secret'];
  if (!process.env.JOB_RUNNER_SECRET || secret !== process.env.JOB_RUNNER_SECRET) {
    return res.status(401).json({
      ok: false,
      error: { code: 'UNAUTHORIZED', message: 'Missing or invalid X-Job-Secret header.' },
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Use POST.' },
    });
  }

  if (!process.env.MONGODB_URI) {
    return res.status(412).json({
      ok: false,
      error: {
        code: 'MONGO_NOT_CONFIGURED',
        message: 'MONGODB_URI is not set — connect Atlas before seeding.',
      },
    });
  }

  const reset = req.query.reset === 'true';

  try {
    await connectMongo();

    const existing = {
      clients: await Client.countDocuments(),
      candidates: await Candidate.countDocuments(),
      contacts: await Contact.countDocuments(),
    };

    const anyExisting = existing.clients + existing.candidates + existing.contacts > 0;

    if (anyExisting && !reset) {
      logger.info({ existing }, 'Seed refused — collections already have data, no ?reset=true');
      return res.status(200).json({
        ok: true,
        data: {
          action: 'noop',
          counts: existing,
          message:
            'Existing data detected. Pass ?reset=true to wipe + re-seed (destructive).',
        },
      });
    }

    if (reset) {
      await Promise.all([
        Client.deleteMany({}),
        Candidate.deleteMany({}),
        Contact.deleteMany({}),
      ]);
      logger.warn('Seed: wiped clients, candidates, contacts collections');
    }

    // Insert clients
    const clientDocs = MOCK_CLIENTS.map((c) => ({
      company: c.company,
      contact_name: c.contactName,
      contact_email: c.contactEmail,
      contact_phone: c.contactPhone,
      tier: c.tier,
      vertical: c.vertical,
      is_friday_call_list: c.isFridayCallList,
      last_contact_at: new Date(Date.now() - c.lastContactDays * 24 * 60 * 60 * 1000),
    }));
    await Client.insertMany(clientDocs);

    // Insert candidates. Generate a synthetic LinkedIn URL (the natural key).
    const candidateDocs = MOCK_CANDIDATES.map((c) => {
      const [first, ...rest] = c.name.split(' ');
      const last = rest.join(' ');
      const slug = c.name.toLowerCase().replace(/[^a-z]+/g, '-');
      return {
        linkedin_url: `https://www.linkedin.com/in/${slug}-seed`,
        name: { first, last },
        current_title: c.title,
        current_company: c.company,
        tags: c.tags,
        authenticity_score: c.score,
        source: 'manual' as const,
        first_seen_at: new Date(Date.now() - (c.lastTouchedDays + 7) * 24 * 60 * 60 * 1000),
        last_touched_at: new Date(Date.now() - c.lastTouchedDays * 24 * 60 * 60 * 1000),
      };
    });
    await Candidate.insertMany(candidateDocs);

    // Insert a couple sample contact submissions
    await Contact.insertMany([
      {
        name: 'Anne Hardesty',
        email: 'anne.hardesty@example.com',
        phone: '(415) 555-0140',
        message: 'Looking for a senior DevOps engineer for our Series B fintech. Series-C raise next quarter.',
        status: 'new',
      },
      {
        name: 'Jordan Bryce',
        email: 'jordan.bryce@example.com',
        message: 'Got your name from a colleague. We have 3 open ops-leadership roles at our restaurant chain.',
        status: 'new',
      },
    ]);

    const counts = {
      clients: await Client.countDocuments(),
      candidates: await Candidate.countDocuments(),
      contacts: await Contact.countDocuments(),
    };

    logger.info({ counts, reset }, 'Seed complete');

    return res.status(200).json({
      ok: true,
      data: {
        action: reset ? 'reset+seeded' : 'seeded',
        counts,
        message: 'Seed complete. The dashboard will show this data once you swap the mock imports for live queries.',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    logger.error({ err }, 'Seed failed');
    return res.status(500).json({
      ok: false,
      error: { code: 'SEED_FAILED', message },
    });
  }
}
