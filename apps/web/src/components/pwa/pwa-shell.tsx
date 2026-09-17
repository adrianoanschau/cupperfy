'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { InstallPrompt } from '@/components/pwa/install-prompt';
import { UpdateToast } from '@/components/pwa/update-toast';

function unregisterAllWorkers() {
  return navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      void registration.unregister();
    }
  });
}

export function PwaShell() {
  const [updateReady, setUpdateReady] = useState(false);
  const [updating, setUpdating] = useState(false);
  const reloadingRef = useRef(false);

  const onWaiting = useCallback(() => {
    setUpdateReady(true);
  }, []);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return undefined;
    }

    if (process.env.NODE_ENV !== 'production') {
      void unregisterAllWorkers();
      return undefined;
    }

    const serwist = window.serwist;
    if (!serwist) {
      return undefined;
    }

    serwist.addEventListener('waiting', onWaiting);

    void navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration?.waiting) {
        onWaiting();
      }
    });

    return () => {
      serwist.removeEventListener('waiting', onWaiting);
    };
  }, [onWaiting]);

  function onUpdate() {
    const serwist = window.serwist;
    if (!serwist) {
      return;
    }

    setUpdating(true);

    serwist.addEventListener('controlling', () => {
      if (reloadingRef.current) {
        return;
      }
      reloadingRef.current = true;
      window.location.reload();
    });

    serwist.messageSkipWaiting();
  }

  return (
    <>
      <InstallPrompt />
      {updateReady ? <UpdateToast onUpdate={onUpdate} updating={updating} /> : null}
    </>
  );
}
