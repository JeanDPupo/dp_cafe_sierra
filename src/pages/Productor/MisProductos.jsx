import React, { useContext } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { ProductosContext } from '../../context/ProductosContext';
import { ProductCard } from '../../components/ProductCard';

export const MisProductos = () => {
  const { setCurrentPage } = useContext(RoleContext);
  const { misProductos, deleteProducto, setSelectedProducto } = useContext(ProductosContext);

  const totalKg = misProductos.reduce((sum, producto) => sum + producto.cantidad, 0);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
            Gestion de lotes
          </p>
          <h1 className="mt-2 font-display text-4xl text-soil-900">Mis publicaciones</h1>
        </div>
        <button type="button" onClick={() => setCurrentPage('publicar')} className="btn-primary">
          Nuevo lote
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="surface-card">
          <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Lotes activos</p>
          <p className="mt-2 text-3xl font-bold text-soil-900">{misProductos.length}</p>
        </div>
        <div className="surface-card">
          <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Kilogramos visibles</p>
          <p className="mt-2 text-3xl font-bold text-soil-900">{totalKg}</p>
        </div>
        <div className="surface-card">
          <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Estado visual</p>
          <p className="mt-2 text-3xl font-bold text-soil-900">Pulido</p>
        </div>
      </div>

      {misProductos.length === 0 ? (
        <div className="surface-card text-center">
          <h2 className="font-display text-3xl text-soil-900">Aun no tienes lotes publicados</h2>
          <p className="mt-3 text-sm leading-7 text-soil-600">
            Empieza con una ficha corta y clara. Luego podras enriquecer proceso, fotos e historia.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {misProductos.map((producto) => (
            <div key={producto.id} className="space-y-3">
              <ProductCard
                producto={producto}
                onViewDetail={() => {
                  setSelectedProducto(producto);
                  setCurrentPage('detalle-producto');
                }}
                onViewProducer={() => {
                  setSelectedProducto(producto);
                  setCurrentPage('perfil-productor');
                }}
              />
              <button
                type="button"
                onClick={() => deleteProducto(producto.id)}
                className="w-full rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                Eliminar lote
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
