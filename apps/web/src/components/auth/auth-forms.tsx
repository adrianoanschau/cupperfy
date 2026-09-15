'use client';

import { useState, type FormEvent } from 'react';

import { requestSignupEmail, signInWithPassword } from '@/app/actions/auth';
import { SocialAuthButtons } from '@/components/auth/social-auth-buttons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm({ initialError }: { initialError?: string | null }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const result = await signInWithPassword({ email, password });
    if (result && !result.ok) {
      setError(result.error);
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="login-email">E-mail</Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={busy}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Senha</Label>
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={busy}
          />
        </div>
        {error ? (
          <p className="text-destructive text-sm" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
      <p className="text-muted-foreground text-center text-xs tracking-wide uppercase">ou</p>
      <SocialAuthButtons disabled={busy} />
    </div>
  );
}

export function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const result = await requestSignupEmail({ email, name });
    if (!result.ok) {
      setError(result.error);
      setBusy(false);
      return;
    }
    setSentTo(email.trim().toLowerCase());
    setBusy(false);
  }

  if (sentTo) {
    return (
      <div className="space-y-3">
        <p className="font-heading text-foreground text-xl font-semibold">Confira seu e-mail</p>
        <p className="text-muted-foreground text-sm">
          Enviamos um link para <span className="text-foreground font-medium">{sentTo}</span>. Clique
          nele para criar sua senha. O link vale por um tempo limitado.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Nome</Label>
          <Input
            id="signup-name"
            name="name"
            autoComplete="name"
            required
            placeholder="Como te chamamos"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={busy}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">E-mail</Label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="voce@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={busy}
          />
        </div>
        {error ? (
          <p className="text-destructive text-sm" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? 'Enviando…' : 'Receber link por e-mail'}
        </Button>
      </form>
      <p className="text-muted-foreground text-center text-xs tracking-wide uppercase">ou</p>
      <SocialAuthButtons disabled={busy} />
    </div>
  );
}
