import type { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'node:crypto';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { connectMongo } from '@/lib/db';
import { Contact } from '@/models';

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(150),
  phone: z.string().max(40).optional().or(z.literal('')),
  message: z.string().min(1).max(2000),
});

type ApiResponse =
  | { ok: true; data: { received: true } }
  | { ok: false; error: { code: string; message: string } };

function hashIp(req: NextApiRequest): string | undefined {
  const fwd = req.headers['x-forwarded-for'];
  const raw =
    (Array.isArray(fwd) ? fwd[0] : fwd?.split(',')[0])?.trim() ?? req.socket?.remoteAddress ?? '';
  if (!raw) return undefined;
  return createHash('sha256').update(raw).digest('hex').slice(0, 16);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Use POST.' },
    });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: { code: 'VALIDATION', message: 'Please check the form fields and try again.' },
    });
  }

  const ipHash = hashIp(req);
  const userAgent = req.headers['user-agent'];

  // Persist to Mongo when configured. Otherwise just log — Peter still gets
  // the submission via Heroku logs until Atlas is wired up.
  let stored = false;
  if (process.env.MONGODB_URI) {
    try {
      await connectMongo();
      await Contact.create({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || undefined,
        message: parsed.data.message,
        ip_hash: ipHash,
        user_agent: userAgent,
      });
      stored = true;
    } catch (err) {
      logger.error(
        { err },
        'Failed to write contact submission to Mongo — falling back to log only'
      );
    }
  }

  logger.info(
    {
      stored,
      emailDomain: parsed.data.email.split('@')[1],
      hasPhone: Boolean(parsed.data.phone),
      messageLen: parsed.data.message.length,
      ipHash,
    },
    'Public contact form submission'
  );

  return res.status(200).json({ ok: true, data: { received: true } });
}
