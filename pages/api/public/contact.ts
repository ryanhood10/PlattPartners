import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { logger } from '@/lib/logger';

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(150),
  phone: z.string().max(40).optional().or(z.literal('')),
  message: z.string().min(1).max(2000),
});

type ApiResponse =
  | { ok: true; data: { received: true } }
  | { ok: false; error: { code: string; message: string } };

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

  // Phase 0: log the submission. Phase 1 wires this to a Mongo Contact collection
  // and pings Peter via M365 once auth is up.
  logger.info(
    {
      name: parsed.data.name,
      emailDomain: parsed.data.email.split('@')[1],
      hasPhone: Boolean(parsed.data.phone),
      messageLen: parsed.data.message.length,
    },
    'Public contact form submission'
  );

  return res.status(200).json({ ok: true, data: { received: true } });
}
