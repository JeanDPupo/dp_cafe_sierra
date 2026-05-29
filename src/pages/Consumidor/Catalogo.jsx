import React, { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { AuthContext } from '../../context/AuthContext';
import { CommerceContext } from '../../context/CommerceContext';
import { api } from '../../lib/api';
import { Filtros } from '../../components/Filtros';
import { ProductCard } from '../../components/ProductCard';

export const Catalogo = () => {
  const { setCurrentPage } = useContext(RoleContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getProducts();
      setProductos(data || []);
    } catch (err) {
      setError(err.message);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openProduct = (producto, page) => {
    setCurrentPage(page);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-soil-500">
            Catalogo activo
          </p>
          <h2 className="section-title mt-2">Cafes disponibles</h2>
        </div>
        <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-soil-600 shadow-soft">
          <span className="font-semibold text-soil-900">{productos.length}</span>{' '}
          resultados
        </div>
      </div>

      {loading ? (
        <div className="surface-card text-center py-12">
          <p className="text-soil-600">Cargando catalogo...</p>
        </div>
      ) : error ? (
        <div className="surface-card text-center py-12">
          <h3 className="font-display text-2xl text-soil-900">
            No se pudo cargar el catalogo
          </h3>
          <p className="mt-3 text-sm leading-7 text-soil-600">{error}</p>
          <button type="button" onClick={loadProducts} className="btn-primary mt-4">
            Reintentar
          </button>
        </div>
      ) : productos.length === 0 ? (
        <div className="surface-card text-center py-12">
          <h3 className="font-display text-2xl text-soil-900">
            No hay cafes disponibles
          </h3>
          <p className="mt-3 text-sm leading-7 text-soil-600">
            Aun no se han publicado productos. Vuelve pronto.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onViewDetail={() => {
                setCurrentPage('detalle-producto');
                // Pass product ID via localStorage for detail page
                window.localStorage.setItem('selectedProductId', producto.id);
              }}
              onViewProducer={() => {
                setCurrentPage('perfil-productor');
                window.localStorage.setItem('selectedProducerId', producto.producerProfileId);
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};
