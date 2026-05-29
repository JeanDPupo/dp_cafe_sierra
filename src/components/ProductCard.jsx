import React, { useContext, useState } from 'react';
import { CommerceContext } from '../context/CommerceContext';
import { AuthContext } from '../context/AuthContext';

export const ProductCard = ({ producto, onViewDetail, onViewProducer }) => {
  const { addToCart } = useContext(CommerceContext);
  const { isAuthenticated, openAuth } = useContext(AuthContext);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      openAuth('login');
      return;
    }
    setAdding(true);
    try {
      await addToCart(producto.id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      // error handled by CommerceContext
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/85 shadow-soft transition duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={producto.foto || producto.mainImageUrl}
          alt={producto.nombre || producto.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-soil-900/75 via-soil-900/20 to-transparent p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-leaf-800">
                {producto.variedad || producto.variety}
              </span>
              <h3 className="mt-3 font-display text-2xl text-white">
                {producto.nombre || producto.name}
              </h3>
            </div>
            <div className="rounded-2xl bg-white/90 px-3 py-2 text-right text-soil-900">
              <p className="text-xs uppercase tracking-[0.14em] text-soil-500">
                Precio
              </p>
              <p className="text-lg font-bold">
                ${(producto.precio || producto.pricePerKg || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <p className="line-clamp-2 text-sm leading-7 text-soil-600">
          {producto.descripcion || producto.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-soil-50 p-3">
            <p className="text-xs uppercase tracking-[0.16em] text-soil-500">
              Disponible
            </p>
            <p className="mt-1 font-semibold text-soil-900">
              {producto.cantidad || producto.availableKg} kg
            </p>
          </div>
          <div className="rounded-2xl bg-sky-50 p-3">
            <p className="text-xs uppercase tracking-[0.16em] text-sky-700">
              Ubicacion
            </p>
            <p className="mt-1 font-semibold text-soil-900">
              {producto.ubicacionGPS || producto.producerProfile?.locationText || 'Sacramento'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-soil-100 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-soil-500">
            Productor
          </p>
          <p className="mt-1 font-semibold text-soil-900">
            {producto.productor?.nombre || producto.producerBrandName}
          </p>
          <p className="mt-1 text-sm text-soil-600">
            {producto.productor?.finca || producto.farmName}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding}
            className={`w-full rounded-full px-6 py-3 text-sm font-bold transition ${
              added
                ? 'bg-leaf-100 text-leaf-800'
                : 'bg-leaf-600 text-white shadow-soft hover:bg-leaf-700'
            }`}
          >
            {adding ? 'Agregando...' : added ? 'Agregado' : 'Agregar al carrito'}
          </button>
          <div className="flex gap-3">
            <button type="button" onClick={onViewDetail} className="btn-primary flex-1">
              Ver detalle
            </button>
            <button type="button" onClick={onViewProducer} className="btn-ghost flex-1">
              Ver productor
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
