'use client';

import { Share2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BrandIcon } from '@/components/brand-mark';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PWA_IOS_PROMPT_DELAY_MS } from '@/lib/pwa/constants';
import {
  isIosDevice,
  isStandaloneDisplay,
  persistInstallAccepted,
  persistInstallDismissed,
  readInstallPromptState,
  shouldPromptInstall,
} from '@/lib/pwa/install';

import type { BeforeInstallPromptEvent, NavigatorWithStandalone } from '@/lib/pwa/install';

function canUseStandaloneDisplay(): boolean {
  return isStandaloneDisplay(
    (query) => window.matchMedia(query).matches,
    (navigator as NavigatorWithStandalone).standalone,
  );
}

function canPromptThisVisit(): boolean {
  return shouldPromptInstall({
    ...readInstallPromptState(window.localStorage),
    now: Date.now(),
  });
}

export function InstallPrompt() {
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const acceptedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [iosManual, setIosManual] = useState(false);
  const [installing, setInstalling] = useState(false);

  const dismiss = useCallback(() => {
    persistInstallDismissed(window.localStorage);
    deferredPromptRef.current = null;
    setOpen(false);
  }, []);

  const accept = useCallback(() => {
    acceptedRef.current = true;
    persistInstallAccepted(window.localStorage);
    deferredPromptRef.current = null;
    setOpen(false);
  }, []);

  useEffect(() => {
    if (canUseStandaloneDisplay() || !canPromptThisVisit()) {
      return undefined;
    }

    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      deferredPromptRef.current = event as BeforeInstallPromptEvent;
      setIosManual(false);
      setOpen(true);
    }

    function onAppInstalled() {
      accept();
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    const ios = isIosDevice(
      window.navigator.userAgent,
      window.navigator.maxTouchPoints,
      window.navigator.platform,
    );

    const iosTimer = ios
      ? window.setTimeout(() => {
          if (deferredPromptRef.current || canUseStandaloneDisplay() || !canPromptThisVisit()) {
            return;
          }
          setIosManual(true);
          setOpen(true);
        }, PWA_IOS_PROMPT_DELAY_MS)
      : undefined;

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
      if (iosTimer) {
        window.clearTimeout(iosTimer);
      }
    };
  }, [accept]);

  async function onInstall() {
    const promptEvent = deferredPromptRef.current;
    if (!promptEvent) {
      return;
    }

    setInstalling(true);
    try {
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === 'accepted') {
        accept();
        return;
      }
      dismiss();
    } catch {
      dismiss();
    } finally {
      setInstalling(false);
    }
  }

  function onOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setOpen(true);
      return;
    }
    if (acceptedRef.current) {
      setOpen(false);
      return;
    }
    dismiss();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="cf-glass-strong sm:max-w-md" showCloseButton>
        <DialogHeader>
          <div className="bg-primary/15 text-primary mb-1 flex size-11 items-center justify-center rounded-2xl">
            <BrandIcon alt="" className="h-6 w-auto" />
          </div>
          <DialogTitle className="font-heading text-xl font-semibold">
            Instalar o app Cupperfy
          </DialogTitle>
          {iosManual ? (
            <DialogDescription className="font-sans">
              No Safari, toque em Compartilhar{' '}
              <Share2 className="text-primary mb-0.5 inline size-3.5 align-text-bottom" /> e depois
              em <strong className="text-foreground font-medium">Adicionar à Tela de Início</strong>
              .
            </DialogDescription>
          ) : (
            <DialogDescription className="font-sans">
              Adicione a Cupperfy à tela inicial para abrir mais rápido, como um aplicativo.
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="bg-transparent">
          <Button type="button" variant="outline" onClick={dismiss}>
            Agora não
          </Button>
          {iosManual ? null : (
            <Button type="button" onClick={() => void onInstall()} disabled={installing}>
              Instalar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
