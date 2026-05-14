import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    };

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!body.ok) {
        setStatus('error');
        setErrorMessage(body.error?.message ?? 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
      e.currentTarget.reset();
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again or call us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <h3 className="font-display text-2xl text-platt-secondary">Thanks — we&apos;ll be in touch.</h3>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll reach out within one business day to get started.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="First Last"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Tell us what you&apos;re looking for
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
      {errorMessage && (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}
      <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full md:w-auto">
        {status === 'submitting' ? 'Sending…' : 'Send'}
      </Button>
    </form>
  );
}
