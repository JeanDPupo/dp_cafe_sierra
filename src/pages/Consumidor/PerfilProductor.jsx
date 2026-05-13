import React, { useContext } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { ProductosContext } from '../../context/ProductosContext';
import { ProductCard } from '../../components/ProductCard';
import { BotonWhatsApp } from '../../components/BotonWhatsApp';

export const PerfilProductor = () => {
  const { setCurrentPage } = useContext(RoleContext);
  const { productos, setSelectedProducto, selectedProducto } = useContext(ProductosContext);

  if (!selectedProducto) {
    return (
      <div className="surface-card text-center">
        <p className="text-soil-600">No hay productor seleccionado.</p>
      </div>
    );
  }

  const productosDelProductor = productos.filter(
    (producto) => producto.productor.nombre === selectedProducto.productor.nombre
  );

  return (
    <section className="space-y-6">
      <button type="button" onClick={() => setCurrentPage('catalogo')} className="btn-ghost">
        Volver al catalogo
      </button>

      <article className="surface-card bg-[linear-gradient(135deg,rgba(33,75,137,0.95),rgba(47,150,87,0.92),rgba(113,80,48,0.92))] text-white">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              Perfil productor
            </p>
            <h1 className="mt-3 font-display text-4xl">
              {selectedProducto.productor.nombre}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85">
              {selectedProducto.productor.historia}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Finca</p>
              <p className="mt-2 font-semibold">{selectedProducto.productor.finca}</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Ubicacion</p>
              <p className="mt-2 font-semibold">{selectedProducto.productor.ubicacion}</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Experiencia</p>
              <p className="mt-2 font-semibold">{selectedProducto.productor.experiencia}</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Especialidad</p>
              <p className="mt-2 font-semibold">{selectedProducto.productor.especialidad}</p>
            </div>
          </div>
        </div>
      </article>

      <article className="surface-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
              Contacto directo
            </p>
            <h2 className="mt-2 font-display text-3xl text-soil-900">
              Conversa con el productor
            </h2>
          </div>
          <a
            href={`tel:${selectedProducto.productor.telefono}`}
            className="text-sm font-semibold text-soil-700 underline decoration-soil-300 underline-offset-4"
          >
            {selectedProducto.productor.telefono}
          </a>
        </div>
        <div className="mt-5">
          <BotonWhatsApp
            telefono={selectedProducto.productor.telefono}
            productName={`los cafes de ${selectedProducto.productor.nombre}`}
          />
        </div>
      </article>

      <article className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-soil-500">
            Otros lotes
          </p>
          <h2 className="mt-2 font-display text-3xl text-soil-900">
            Mas cafes de este productor
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {productosDelProductor.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onViewDetail={() => {
                setSelectedProducto(producto);
                setCurrentPage('detalle-producto');
              }}
              onViewProducer={() => {
                setSelectedProducto(producto);
              }}
            />
          ))}
        </div>
      </article>
    </section>
  );
};
