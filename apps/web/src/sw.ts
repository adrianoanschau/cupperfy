/// <reference lib="webworker" />

import { CacheFirst, ExpirationPlugin, Serwist, StaleWhileRevalidate } from 'serwist';

import { PWA_NEXT_STATIC_CACHE_NAME, PWA_STATIC_CACHE_NAME } from './lib/pwa/constants';
import { isNextStaticAsset, isStaticMediaAsset } from './lib/pwa/runtime-cache';

import type { PrecacheEntry, RuntimeCaching, SerwistGlobalConfig } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const DAY = 24 * 60 * 60;

const runtimeCaching: RuntimeCaching[] = [
  {
    matcher: isNextStaticAsset,
    handler: new CacheFirst({
      cacheName: PWA_NEXT_STATIC_CACHE_NAME,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 64,
          maxAgeSeconds: 90 * DAY,
        }),
      ],
    }),
  },
  {
    matcher: isStaticMediaAsset,
    handler: new StaleWhileRevalidate({
      cacheName: PWA_STATIC_CACHE_NAME,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 64,
          maxAgeSeconds: 30 * DAY,
        }),
      ],
    }),
  },
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  // false: o SW novo fica em `waiting` até o cliente enviar SKIP_WAITING (toast de update).
  skipWaiting: false,
  clientsClaim: true,
  navigationPreload: false,
  disableDevLogs: true,
  runtimeCaching,
  precacheOptions: {
    cleanupOutdatedCaches: true,
  },
});

serwist.addEventListeners();
