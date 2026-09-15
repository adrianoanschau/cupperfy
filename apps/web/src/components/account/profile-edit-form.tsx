'use client';

import { useState, type FormEvent } from 'react';

import { updateBasicProfile } from '@/app/actions/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ProfileEditForm({
  displayName,
  avatarUrl,
}: {
  displayName: string;
  avatarUrl: string;
}) {
  const [name, setName] = useState(displayName);
  const [avatar, setAvatar] = useState(avatarUrl);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setSaved(false);
    const result = await updateBasicProfile({ displayName: name, avatarUrl: avatar });
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSaved(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="profile-name">Nome</Label>
        <Input
          id="profile-name"
          name="displayName"
          autoComplete="nickname"
          required
          maxLength={80}
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={busy}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile-avatar">URL da foto (opcional)</Label>
        <Input
          id="profile-avatar"
          name="avatarUrl"
          type="url"
          placeholder="https://"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
          disabled={busy}
        />
      </div>
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
      {saved ? <p className="text-muted-foreground text-sm">Perfil salvo.</p> : null}
      <Button type="submit" size="lg" disabled={busy}>
        {busy ? 'Salvando…' : 'Salvar'}
      </Button>
    </form>
  );
}
