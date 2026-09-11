'use client';

import { useState, type FormEvent } from 'react';

import { joinAlphaWaitlist } from '@/app/actions/alpha-waitlist';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Status = 'idle' | 'submitting' | 'done';

export function AlphaWaitlistForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setError(null);
    setStatus('submitting');

    const result = await joinAlphaWaitlist({ email, name });

    if (!result.ok) {
      setError(result.error);
      setStatus('idle');
      return;
    }

    setStatus('done');
  }

  if (status === 'done') {
    return (
      <div className="border-border space-y-2 border-t pt-8">
        <p className="font-heading text-foreground text-xl font-semibold">Você está na lista.</p>
        <p className="text-muted-foreground">
          Obrigado{name.trim() ? `, ${name.trim()}` : ''}. Avisamos em{' '}
          <span className="text-foreground">{email}</span> quando o acesso alfa abrir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-border space-y-5 border-t pt-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="alpha-name">Nome</Label>
          <Input
            id="alpha-name"
            name="name"
            autoComplete="name"
            placeholder="Como te chamamos"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={status === 'submitting'}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="alpha-email">E-mail</Label>
          <Input
            id="alpha-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="voce@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === 'submitting'}
          />
        </div>
      </div>
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Enviando…' : 'Quero participar do alfa'}
        </Button>
        <p className="text-muted-foreground text-sm">Vagas limitadas · sem spam</p>
      </div>
    </form>
  );
}
