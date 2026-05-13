import React, { useContext } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { producerHighlights } from '../../data/mockData';

export const HomeProductor = () => {
  const { setCurrentPage } = useContext(RoleContext);

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="surface-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
          Panel de venta
        </p>
        <h2 className="mt-3 section-title">
          Publica con claridad, muestra tus fincas y vende con una imagen mas confiable.
        </h2>
        <p className="mt-4 section-copy">
          Esta es la zona de venta dentro de la misma cuenta. Desde aqui el usuario
          puede construir su perfil productor, registrar fincas y publicar lotes
          asociados a cada una.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => setCurrentPage('publicar')} className="btn-primary">
            Crear publicacion
          </button>
          <button type="button" onClick={() => setCurrentPage('mis-productos')} className="btn-ghost">
            Ver mis lotes
          </button>
        </div>
      </div>

      <div className="surface-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          Claves de una buena ficha
        </p>
        <div className="mt-4 space-y-4">
          {producerHighlights.map((item) => (
            <div key={item} className="rounded-2xl bg-soil-50 p-4 text-sm leading-7 text-soil-700">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
