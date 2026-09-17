/** Chave de snooze do modal de instalação. */
export const PWA_INSTALL_DISMISSED_AT_KEY = 'pwa-install-dismissed-at';

/** Marcação permanente após o usuário aceitar instalar. */
export const PWA_INSTALL_ACCEPTED_KEY = 'pwa-install-accepted';

/** Reexibe o modal só depois de uma semana se o usuário recusou. */
export const PWA_INSTALL_SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

/** Atraso do prompt heurístico no iOS Safari (não dispara `beforeinstallprompt`). */
export const PWA_IOS_PROMPT_DELAY_MS = 2500;

/** Cache runtime legado — imagens/marca. Mantido para reaproveitar o cache antigo. */
export const PWA_STATIC_CACHE_NAME = 'cupperfy-pwa-v1';

export const PWA_NEXT_STATIC_CACHE_NAME = 'cupperfy-next-static';
