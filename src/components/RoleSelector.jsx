import React, { useContext } from 'react';
import { RoleContext } from '../context/RoleContext';

export const RoleSelector = ({ compact = false }) => {
  const { role, setRoleExplicit, goToSellerSection } = useContext(RoleContext);

  return (
    <div className={`flex ${compact ? 'flex-col items-start gap-3' : 'items-center gap-3'}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-soil-500">
        Ir a
      </span>
      <div className="flex rounded-full border border-soil-200 bg-soil-50 p-1">
        <button
          type="button"
          onClick={() => setRoleExplicit('comprar')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            role === 'comprar'
              ? 'bg-sky-600 text-white'
              : 'text-soil-600 hover:text-soil-900'
          }`}
        >
          Comprar
        </button>
        <button
          type="button"
          onClick={() => goToSellerSection()}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            role === 'vender'
              ? 'bg-leaf-600 text-white'
              : 'text-soil-600 hover:text-soil-900'
          }`}
        >
          Vender
        </button>
      </div>
    </div>
  );
};
