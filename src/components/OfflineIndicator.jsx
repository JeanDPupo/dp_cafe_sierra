import React, { useEffect, useState } from 'react';

export const OfflineIndicator = () => {
  const [offline, setOffline] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const goOffline = () => {
      setOffline(true);
      setDismissed(false);
    };
    const goOnline = () => {
      setOffline(false);
      setDismissed(false);
    };

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      goOffline();
    }

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!offline || dismissed) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[90] flex items-center justify-between gap-3 bg-soil-800 px-4 py-2.5 text-xs font-semibold text-white sm:justify-center sm:text-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          </span>
        </span>
        Sin conexion a internet. Algunas funciones pueden no estar disponibles.
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="flex-shrink-0 rounded-full bg-soil-700 px-2 py-0.5 text-xs text-soil-300 hover:bg-soil-600 hover:text-white sm:ml-4"
      >
        Cerrar
      </button>
    </div>
  );
};

export default OfflineIndicator;
