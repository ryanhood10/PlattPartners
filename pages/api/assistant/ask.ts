import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { askAssistant, type ChatMessage } from '@/lib/services/claude';
import { buildAssistantSystemPrompt } from '@/lib/knowledge';
import { logger } from '@/lib/logger';

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(8000),
});

const bodySchema = z.object({
  question: z.string().min(1).max(2000),
  history: z.array(messageSchema).max(20).optional(),
});

type Response =
  | {
      ok: true;
      data: {
        answer: string;
        usage: {
          inputTokens: number;
          outputTokens: number;
          cacheRead?: number;
          cacheCreation?: number;
          costUsd: number;
        };
      };
    }
  | { ok: false; error: { code: string; message: string } };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  // Auth
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({
      ok: false,
      error: { code: 'UNAUTHORIZED', message: 'Sign in to use the assistant.' },
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Use POST.' },
    });
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: { code: 'VALIDATION', message: 'Invalid question or history.' },
    });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(412).json({
      ok: false,
      error: {
        code: 'ANTHROPIC_NOT_CONFIGURED',
        message: 'ANTHROPIC_API_KEY is not set — the assistant is dormant until it is.',
      },
    });
  }

  try {
    const systemPrompt = buildAssistantSystemPrompt();
    const history: ChatMessage[] = parsed.data.history ?? [];
    const result = await askAssistant({
      systemPrompt,
      history,
      question: parsed.data.question,
    });

    return res.status(200).json({
      ok: true,
      data: {
        answer: result.answer,
        usage: {
          inputTokens: result.inputTokens,
          outputTokens: result.outputTokens,
          cacheRead: result.cacheReadInputTokens,
          cacheCreation: result.cacheCreationInputTokens,
          costUsd: Number(result.costUsd.toFixed(6)),
        },
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Assistant call failed';
    logger.error({ err }, 'Assistant call failed');
    return res.status(500).json({
      ok: false,
      error: { code: 'ASSISTANT_FAILED', message },
    });
  }
}
