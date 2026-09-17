import {
  PWA_INSTALL_ACCEPTED_KEY,
  PWA_INSTALL_DISMISSED_AT_KEY,
  PWA_INSTALL_SNOOZE_MS,
} from '@/lib/pwa/constants';

export type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[];
  prompt(): Promise<void>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
};

export type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

export function isIosDevice(userAgent: string, maxTouchPoints: number, platform: string): boolean {
  if (/iP(?:hone|ad|od)/i.test(userAgent)) {
    return true;
  }

  return platform === 'MacIntel' && maxTouchPoints > 1;
}

export function isStandaloneDisplay(
  matchesMedia: (query: string) => boolean,
  navigatorStandalone: boolean | undefined,
): boolean {
  return (
    matchesMedia('(display-mode: standalone)') ||
    matchesMedia('(display-mode: fullscreen)') ||
    matchesMedia('(display-mode: minimal-ui)') ||
    matchesMedia('(display-mode: window-controls-overlay)') ||
    navigatorStandalone === true
  );
}

export function shouldPromptInstall({
  accepted,
  dismissedAt,
  now,
  snoozeMs = PWA_INSTALL_SNOOZE_MS,
}: {
  accepted: string | null;
  dismissedAt: string | null;
  now: number;
  snoozeMs?: number;
}): boolean {
  if (accepted) {
    return false;
  }

  if (!dismissedAt) {
    return true;
  }

  const dismissedTs = Number(dismissedAt);
  if (!Number.isFinite(dismissedTs)) {
    return true;
  }

  return now - dismissedTs >= snoozeMs;
}

export function readInstallPromptState(storage: Pick<Storage, 'getItem'>): {
  accepted: string | null;
  dismissedAt: string | null;
} {
  return {
    accepted: storage.getItem(PWA_INSTALL_ACCEPTED_KEY),
    dismissedAt: storage.getItem(PWA_INSTALL_DISMISSED_AT_KEY),
  };
}

export function persistInstallDismissed(storage: Pick<Storage, 'setItem'>, at = Date.now()): void {
  storage.setItem(PWA_INSTALL_DISMISSED_AT_KEY, String(at));
}

export function persistInstallAccepted(storage: Pick<Storage, 'setItem' | 'removeItem'>): void {
  storage.setItem(PWA_INSTALL_ACCEPTED_KEY, '1');
  storage.removeItem(PWA_INSTALL_DISMISSED_AT_KEY);
}
