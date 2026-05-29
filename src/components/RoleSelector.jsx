import React, { useContext } from 'react';
import { RoleContext } from '../context/RoleContext';

export const RoleSelector = ({ compact = false }) => {
  const { role, setRoleExplicit } = useContext(RoleContext);

  return (
    <div className={`flex ${compact ? 'flex-col items-start gap-3' : 'items-center gap-3'}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-soil-500">
        Vista actual
      </span>
      <div className="flex rounded-full border border-soil-200 bg-soil-50 p-1">
        <button
          type="button"
          onClick={() => setRoleExplicit('consumidor')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            role === 'consumidor'
              ? 'bg-sky-600 text-white'
              : 'text-soil-600 hover:text-soil-900'
          }`}
        >
          Comprar
        </button>
        <button
          type="button"
          onClick={() => setRoleExplicit('productor')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            role === 'productor'
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
