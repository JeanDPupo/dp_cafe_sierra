import React, { useContext } from 'react';
import { RoleContext } from '../../context/RoleContext';

export const HomeConsumidor = () => {
  const { setCurrentPage } = useContext(RoleContext);

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="surface-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          Para quien compra
        </p>
        <h2 className="mt-3 section-title">
          Descubre cafes con origen visible y una historia que genera confianza.
        </h2>
        <p className="mt-4 section-copy">
          Este espacio esta pensado para explorar sin friccion: ves el productor,
          entiendes el proceso, comparas perfiles y contactas sin perder tiempo.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => setCurrentPage('catalogo')} className="btn-primary">
            Ir al catalogo
          </button>
          <button type="button" onClick={() => setCurrentPage('home')} className="btn-ghost">
            Ver portada
          </button>
        </div>
      </div>

      <div className="surface-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
          Lo que importa
        </p>
        <div className="mt-4 space-y-4">
          {[
            ['Origen transparente', 'Finca, productor y ubicacion visibles.'],
            ['Proceso explicado', 'El camino del cafe queda claro desde la siembra hasta el secado.'],
            ['Contacto natural', 'WhatsApp como salida rapida y familiar para cerrar la compra.'],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl bg-soil-50 p-4">
              <p className="font-semibold text-soil-900">{title}</p>
              <p className="mt-2 text-sm leading-6 text-soil-600">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
