import React from 'react';

export const LoadingOverlay = ({ active = false, message = 'Cargando...' }) => {
  if (!active) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-soil-900/40 backdrop-blur-sm px-4">
      <div className="surface-card flex flex-col items-center gap-4 p-8">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-soil-100 border-t-leaf-600" />
          <div className="absolute inset-1.5 animate-spin rounded-full border-[3px] border-soil-100 border-t-soil-400" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-soil-700">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
