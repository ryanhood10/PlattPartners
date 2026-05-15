import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import Head from 'next/head';
import { Sparkles, Send, Loader2, User, RefreshCw } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { requireAuth } from '@/lib/auth';

type Message = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'What service lines do we offer?',
  'Who are our biggest restaurant clients?',
  'What is our brand voice — what should I never say?',
  'What prescreen questions do we use for tech leadership roles?',
  'Why don\'t we automate LinkedIn?',
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send(question: string) {
    setError(null);
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          question: trimmed,
          history: messages, // everything BEFORE this turn
        }),
      });
      const body = await res.json();
      if (!body.ok) {
        setError(body.error?.message ?? 'Assistant failed to respond.');
        // Roll back the user message so they can retry
        setMessages(messages);
        return;
      }
      setMessages([...nextMessages, { role: 'assistant', content: body.data.answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error.');
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter to submit, Shift+Enter for newline
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function reset() {
    setMessages([]);
    setError(null);
    setInput('');
    textareaRef.current?.focus();
  }

  return (
    <>
      <Head>
        <title>Assistant — Platt Partners</title>
      </Head>
      <DashboardLayout
        title="Assistant"
        description="Your AI expert on Platt Partners — clients, candidates, voice, strategy."
      >
        <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-3xl flex-col">
          {/* Conversation */}
          <div className="flex-1 space-y-6 overflow-y-auto pb-4">
            {messages.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-muted/10 p-8">
                <Sparkles className="h-8 w-8 text-platt-primary" />
                <h3 className="mt-3 font-display text-xl text-platt-secondary">
                  Ask me anything about Platt Partners
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  I have your wiki, brand voice, pricing, prescreen questions, and strategy
                  notes loaded as context. I cite sources so you can verify.
                </p>
                <div className="mt-6 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Try one of these
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        disabled={loading}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition hover:border-platt-primary hover:text-platt-primary disabled:opacity-50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className={
                      m.role === 'user'
                        ? 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground'
                        : 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-platt-primary text-white'
                    }
                    aria-hidden
                  >
                    {m.role === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      {m.role === 'user' ? 'You' : 'Assistant'}
                    </p>
                    <div className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">
                      {m.content}
                    </div>
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-platt-primary text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking…
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border bg-card p-3 shadow-sm"
          >
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about clients, voice, pricing, anything in the knowledge base…"
              rows={2}
              className="resize-none border-0 bg-transparent p-2 focus-visible:ring-0"
              disabled={loading}
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={reset}
                    disabled={loading}
                  >
                    <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                    New chat
                  </Button>
                )}
                <p className="text-xs text-muted-foreground">
                  Enter to send · Shift+Enter for newline
                </p>
              </div>
              <Button type="submit" size="sm" disabled={loading || !input.trim()}>
                <Send className="mr-1.5 h-3.5 w-3.5" />
                Send
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = requireAuth();
