'use client';

import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

type UpdateToastProps = {
  onUpdate: () => void;
  updating?: boolean;
};

export function UpdateToast({ onUpdate, updating = false }: UpdateToastProps) {
  return (
    <div
      className="cf-glass-strong text-foreground fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-[60] flex max-w-[min(24rem,calc(100vw-2rem))] items-center gap-3 rounded-2xl px-4 py-3 shadow-lg"
      role="status"
      aria-live="polite"
    >
      <p className="font-heading text-sm font-semibold">Nova versão disponível</p>
      <Button type="button" size="sm" onClick={onUpdate} disabled={updating}>
        <RefreshCw className={updating ? 'animate-spin' : undefined} />
        Atualizar agora
      </Button>
    </div>
  );
}
