'use client';

import { unstable_rethrow } from 'next/navigation';
import { useState } from 'react';

import { signInWithDiscord, signInWithGoogle } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';

type Provider = 'discord' | 'google';

export function SocialAuthButtons({ disabled }: { disabled?: boolean }) {
  const [busy, setBusy] = useState<Provider | null>(null);
  const [error, setError] = useState<string | null>(null);

  function start(provider: Provider) {
    setError(null);
    setBusy(provider);
    const action = provider === 'google' ? signInWithGoogle : signInWithDiscord;
    void action()
      .then((result) => {
        if (result && !result.ok) {
          setError(result.error);
          setBusy(null);
        }
      })
      .catch((caught: unknown) => {
        unstable_rethrow(caught);
        setError('Não foi possível iniciar o acesso com essa conta.');
        setBusy(null);
      });
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="lg"
        variant="outline"
        className="w-full"
        disabled={disabled || Boolean(busy)}
        onClick={() => start('google')}
      >
        {busy === 'google' ? 'Abrindo Google…' : 'Continuar com Google'}
      </Button>
      <Button
        type="button"
        size="lg"
        variant="outline"
        className="w-full"
        disabled={disabled || Boolean(busy)}
        onClick={() => start('discord')}
      >
        {busy === 'discord' ? 'Abrindo Discord…' : 'Continuar com Discord'}
      </Button>
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
