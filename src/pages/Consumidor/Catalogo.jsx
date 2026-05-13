import React, { useContext, useState } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { ProductosContext } from '../../context/ProductosContext';
import { Filtros } from '../../components/Filtros';
import { ProductCard } from '../../components/ProductCard';

export const Catalogo = () => {
  const { setCurrentPage } = useContext(RoleContext);
  const { productos, filtrarProductos, setSelectedProducto } = useContext(ProductosContext);
  const [productosFiltrados, setProductosFiltrados] = useState(productos);

  const handleFilter = (filtros) => {
    if (Object.keys(filtros).every((key) => !filtros[key])) {
      setProductosFiltrados(productos);
      return;
    }
    setProductosFiltrados(filtrarProductos(filtros));
  };

  const openProduct = (producto, page) => {
    setSelectedProducto(producto);
    setCurrentPage(page);
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
              onViewDetail={() => openProduct(producto, 'detalle-producto')}
              onViewProducer={() => openProduct(producto, 'perfil-productor')}
            />
          ))}
        </div>
      )}
    </section>
  );
};
