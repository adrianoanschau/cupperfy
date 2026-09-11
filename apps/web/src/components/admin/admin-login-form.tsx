'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import { loginAdmin } from '@/app/actions/admin-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const result = await loginAdmin({ password });
    if (!result.ok) {
      setError(result.error);
      setBusy(false);
      return;
    }

    router.replace(nextPath.startsWith('/admin') ? nextPath : '/admin/interessados');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="admin-password">Senha</Label>
        <Input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
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
      <Button type="submit" size="lg" disabled={busy || !password}>
        {busy ? 'Entrando…' : 'Entrar'}
      </Button>
    </form>
  );
}
