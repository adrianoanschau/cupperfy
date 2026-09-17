import { describe, expect, it } from 'vitest';

import { PWA_INSTALL_SNOOZE_MS } from './constants';
import {
  isIosDevice,
  isStandaloneDisplay,
  persistInstallAccepted,
  persistInstallDismissed,
  readInstallPromptState,
  shouldPromptInstall,
} from './install';

describe('isIosDevice', () => {
  it('reconhece iPhone pelo user agent', () => {
    expect(isIosDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 5, 'iPhone')).toBe(
      true,
    );
  });

  it('reconhece iPadOS 13+ disfarçado de Macintosh', () => {
    expect(isIosDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 5, 'MacIntel')).toBe(
      true,
    );
  });

  it('não marca desktop Mac', () => {
    expect(isIosDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 0, 'MacIntel')).toBe(
      false,
    );
  });
});

describe('isStandaloneDisplay', () => {
  it('detecta display-mode standalone', () => {
    expect(isStandaloneDisplay((query) => query.includes('standalone'), undefined)).toBe(true);
  });

  it('detecta navigator.standalone do iOS', () => {
    expect(isStandaloneDisplay(() => false, true)).toBe(true);
  });

  it('é false no browser comum', () => {
    expect(isStandaloneDisplay(() => false, undefined)).toBe(false);
  });
});

describe('shouldPromptInstall', () => {
  const now = 1_000_000;

  it('mostra quando nunca interagiu', () => {
    expect(shouldPromptInstall({ accepted: null, dismissedAt: null, now })).toBe(true);
  });

  it('nunca mostra depois de instalar', () => {
    expect(
      shouldPromptInstall({
        accepted: '1',
        dismissedAt: String(now - PWA_INSTALL_SNOOZE_MS * 4),
        now,
      }),
    ).toBe(false);
  });

  it('respeita o snooze de alguns dias', () => {
    expect(
      shouldPromptInstall({
        accepted: null,
        dismissedAt: String(now - 60_000),
        now,
      }),
    ).toBe(false);
    expect(
      shouldPromptInstall({
        accepted: null,
        dismissedAt: String(now - PWA_INSTALL_SNOOZE_MS),
        now,
      }),
    ).toBe(true);
  });
});

describe('persistência do prompt', () => {
  it('grava dismissed-at e accepted no storage', () => {
    const store = new Map<string, string>();
    const storage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    };

    persistInstallDismissed(storage, 42);
    expect(readInstallPromptState(storage).dismissedAt).toBe('42');

    persistInstallAccepted(storage);
    expect(readInstallPromptState(storage)).toEqual({ accepted: '1', dismissedAt: null });
  });
});
