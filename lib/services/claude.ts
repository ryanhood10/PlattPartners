import Anthropic from '@anthropic-ai/sdk';
import { logger } from '@/lib/logger';

let cachedClient: Anthropic | null = null;

function getClient(): Anthropic {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }
  cachedClient = new Anthropic({ apiKey });
  return cachedClient;
}

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

export type AssistantResponse = {
  answer: string;
  inputTokens: number;
  outputTokens: number;
  cacheCreationInputTokens?: number;
  cacheReadInputTokens?: number;
  costUsd: number;
};

// Sonnet 4.6 pricing per 1M tokens (Anthropic public list as of 2026-05)
const PRICE_PER_M_INPUT_USD = 3;
const PRICE_PER_M_OUTPUT_USD = 15;
// Cached input tokens read are 10% of regular input cost.
const PRICE_PER_M_CACHE_READ_USD = 0.3;
// Cache writes are 1.25x regular input cost.
const PRICE_PER_M_CACHE_WRITE_USD = 3.75;

const MODEL =
  process.env.ANTHROPIC_MODEL_DRAFTING ?? 'claude-sonnet-4-6';

/**
 * Ask the assistant a question with the full knowledge corpus as system context.
 * The system prompt is marked for prompt caching so repeated calls are cheap.
 */
export async function askAssistant(args: {
  systemPrompt: string;
  history: ChatMessage[];
  question: string;
  maxOutputTokens?: number;
}): Promise<AssistantResponse> {
  const client = getClient();

  const messages = [
    ...args.history,
    { role: 'user' as const, content: args.question },
  ];

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: args.maxOutputTokens ?? 1024,
    system: [
      {
        type: 'text',
        text: args.systemPrompt,
        // Cache the system prompt — it's stable across calls and constitutes
        // the bulk of input tokens. 90%+ discount on cached reads.
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages,
  });

  const inputTokens = response.usage.input_tokens;
  const outputTokens = response.usage.output_tokens;
  const cacheCreationInputTokens =
    (response.usage as { cache_creation_input_tokens?: number }).cache_creation_input_tokens;
  const cacheReadInputTokens =
    (response.usage as { cache_read_input_tokens?: number }).cache_read_input_tokens;

  const costUsd =
    (inputTokens / 1_000_000) * PRICE_PER_M_INPUT_USD +
    (outputTokens / 1_000_000) * PRICE_PER_M_OUTPUT_USD +
    ((cacheCreationInputTokens ?? 0) / 1_000_000) * PRICE_PER_M_CACHE_WRITE_USD +
    ((cacheReadInputTokens ?? 0) / 1_000_000) * PRICE_PER_M_CACHE_READ_USD;

  // Extract the answer text. Claude returns content blocks; for a non-tool call
  // we expect one text block.
  const answer = response.content
    .filter((block) => block.type === 'text')
    .map((block) => (block as { type: 'text'; text: string }).text)
    .join('\n')
    .trim();

  logger.info(
    {
      inputTokens,
      outputTokens,
      cacheCreationInputTokens,
      cacheReadInputTokens,
      costUsd: Number(costUsd.toFixed(6)),
    },
    'Assistant response'
  );

  return {
    answer,
    inputTokens,
    outputTokens,
    cacheCreationInputTokens,
    cacheReadInputTokens,
    costUsd,
  };
}
