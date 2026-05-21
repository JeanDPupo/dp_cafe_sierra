import React, { useContext } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { ProductosContext } from '../../context/ProductosContext';
import { BotonWhatsApp } from '../../components/BotonWhatsApp';

export const DetalleProducto = () => {
  const { setCurrentPage } = useContext(RoleContext);
  const { selectedProducto, detailLoading } = useContext(ProductosContext);

  if (detailLoading) {
    return (
      <div className="surface-card text-center">
        <p className="text-soil-600">Cargando detalle del lote...</p>
      </div>
    );
  }

  if (!selectedProducto) {
    return (
      <div className="surface-card text-center">
        <p className="text-soil-600">No hay producto seleccionado.</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <button type="button" onClick={() => setCurrentPage('catalogo')} className="btn-ghost">
        Volver al catalogo
      </button>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="surface-card overflow-hidden p-0">
          <img
            src={selectedProducto.foto}
            alt={selectedProducto.nombre}
            className="h-[360px] w-full object-cover sm:h-[440px]"
          />
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-leaf-800">
                  {selectedProducto.variedad}
                </span>
                <h1 className="mt-4 font-display text-4xl text-soil-900">
                  {selectedProducto.nombre}
                </h1>
              </div>
              <div className="rounded-[1.5rem] bg-soil-50 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Precio por kg</p>
                <p className="mt-1 text-2xl font-bold text-soil-900">
                  ${selectedProducto.precio.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="mt-6 text-base leading-8 text-soil-600">
              {selectedProducto.descripcion}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-soft">
                <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Disponibilidad</p>
                <p className="mt-2 font-semibold text-soil-900">{selectedProducto.cantidad} kg</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-soft">
                <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Tipo de grano</p>
                <p className="mt-2 font-semibold text-soil-900">{selectedProducto.tipoGrano}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-soft">
                <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Tueste</p>
                <p className="mt-2 font-semibold text-soil-900">{selectedProducto.tueste}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-soft">
                <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Calificacion</p>
                <p className="mt-2 font-semibold text-soil-900">
                  {selectedProducto.promedioCalificacion?.toFixed?.(1) || '0.0'} / 5
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-soft">
                <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Finca</p>
                <p className="mt-2 font-semibold text-soil-900">{selectedProducto.farmName}</p>
              </div>
            </div>
          </div>
        </article>

        <div className="space-y-6">
          <article className="surface-card">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Productor
            </p>
            <h2 className="mt-3 font-display text-3xl text-soil-900">
              {selectedProducto.productor.nombre}
            </h2>
            <p className="mt-3 text-sm leading-7 text-soil-600">
              {selectedProducto.productor.historia}
            </p>
            <div className="mt-5 space-y-3 text-sm text-soil-700">
              <p><span className="font-semibold">Finca:</span> {selectedProducto.productor.finca}</p>
              <p><span className="font-semibold">Ubicacion:</span> {selectedProducto.productor.ubicacion}</p>
              <p><span className="font-semibold">Experiencia:</span> {selectedProducto.productor.experiencia}</p>
            </div>
            <div className="mt-5">
              <BotonWhatsApp
                telefono={selectedProducto.productor.telefono}
                productName={selectedProducto.nombre}
              />
            </div>
          </article>

          <article className="surface-card">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
              Proceso del cafe
            </p>
            <div className="mt-5 space-y-4">
              {selectedProducto.procesos.map((proceso) => (
                <div key={proceso.etapa} className="rounded-2xl border border-soil-100 bg-soil-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-soil-900">{proceso.etapa}</h3>
                    {proceso.obligatorio && (
                      <span className="rounded-full bg-sky-100 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-800">
                        Obligatorio
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-soil-600">{proceso.descripcion}</p>
                  <p className="mt-3 text-sm font-semibold text-leaf-800">
                    Resultado: {proceso.resultado}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
