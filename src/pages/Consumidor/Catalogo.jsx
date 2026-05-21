import React, { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { ProductosContext } from '../../context/ProductosContext';
import { CommerceContext } from '../../context/CommerceContext';
import { Filtros } from '../../components/Filtros';
import { ProductCard } from '../../components/ProductCard';

export const Catalogo = () => {
  const { setCurrentPage } = useContext(RoleContext);
  const { addToCart } = useContext(CommerceContext);
  const {
    productos,
    refreshCatalog,
    openProduct,
    openProducerProfile,
    catalogLoading,
    productosError,
  } = useContext(ProductosContext);
  const [productosFiltrados, setProductosFiltrados] = useState(productos);

  useEffect(() => {
    setProductosFiltrados(productos);
  }, [productos]);

  const handleFilter = async (filtros) => {
    if (Object.keys(filtros).every((key) => !filtros[key])) {
      await refreshCatalog();
      return;
    }
    const result = await refreshCatalog(filtros);
    setProductosFiltrados(result);
  };

  const handleOpenProduct = async (producto) => {
    await openProduct(producto.id);
    setCurrentPage('detalle-producto');
  };

  const handleOpenProducer = async (producto) => {
    await openProducerProfile(producto.producerProfileId);
    setCurrentPage('perfil-productor');
  };

  return (
    <section className="space-y-6">
      <Filtros onFilter={handleFilter} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-soil-500">
            Catalogo activo
          </p>
          <h2 className="section-title mt-2">Cafes disponibles</h2>
        </div>
        <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-soil-600 shadow-soft">
          <span className="font-semibold text-soil-900">{productosFiltrados.length}</span>{' '}
          resultados visibles
        </div>
      </div>

      {catalogLoading && (
        <div className="surface-card text-sm text-soil-600">
          Cargando cafes disponibles...
        </div>
      )}

      {productosError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {productosError}
        </div>
      )}

      {productosFiltrados.length === 0 ? (
        <div className="surface-card text-center">
          <h3 className="font-display text-2xl text-soil-900">
            No encontramos cafes con esos filtros
          </h3>
          <p className="mt-3 text-sm leading-7 text-soil-600">
            Prueba otra variedad, cambia el rango de precio o vuelve a una busqueda mas abierta.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onViewDetail={() => handleOpenProduct(producto)}
              onViewProducer={() => handleOpenProducer(producto)}
              onAddToCart={() => addToCart(producto.id, 1)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
