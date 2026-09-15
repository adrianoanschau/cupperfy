'use client';

import { useState } from 'react';

import { signInWithDiscord } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';

export function DiscordButton({ disabled }: { disabled?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="lg"
        variant="outline"
        className="w-full"
        disabled={disabled || busy}
        onClick={() => {
          setError(null);
          setBusy(true);
          void signInWithDiscord().then((result) => {
            if (result && !result.ok) {
              setError(result.error);
              setBusy(false);
            }
          });
        }}
      >
        {busy ? 'Abrindo Discord…' : 'Continuar com Discord'}
      </Button>
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
