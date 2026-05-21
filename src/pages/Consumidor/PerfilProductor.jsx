import React, { useContext } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { ProductosContext } from '../../context/ProductosContext';
import { ProductCard } from '../../components/ProductCard';
import { BotonWhatsApp } from '../../components/BotonWhatsApp';

export const PerfilProductor = () => {
  const { setCurrentPage } = useContext(RoleContext);
  const {
    setSelectedProducto,
    openProduct,
    openProducerProfile,
    selectedProducerProfile,
    producerLoading,
  } = useContext(ProductosContext);

  if (producerLoading) {
    return (
      <div className="surface-card text-center">
        <p className="text-soil-600">Cargando perfil del productor...</p>
      </div>
    );
  }

  if (!selectedProducerProfile) {
    return (
      <div className="surface-card text-center">
        <p className="text-soil-600">No hay productor seleccionado.</p>
      </div>
    );
  }

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
              {selectedProducerProfile.brandName}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85">
              {selectedProducerProfile.story || selectedProducerProfile.bio}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Propietario</p>
              <p className="mt-2 font-semibold">{selectedProducerProfile.ownerName}</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Ubicacion</p>
              <p className="mt-2 font-semibold">{selectedProducerProfile.locationText}</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Experiencia</p>
              <p className="mt-2 font-semibold">{selectedProducerProfile.yearsExperience || 'Sin registro'}</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Fincas</p>
              <p className="mt-2 font-semibold">{selectedProducerProfile.farms.length}</p>
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
            href={`tel:${selectedProducerProfile.whatsappNumber || selectedProducerProfile.phone}`}
            className="text-sm font-semibold text-soil-700 underline decoration-soil-300 underline-offset-4"
          >
            {selectedProducerProfile.whatsappNumber || selectedProducerProfile.phone}
          </a>
        </div>
        <div className="mt-5">
          <BotonWhatsApp
            telefono={selectedProducerProfile.whatsappNumber || selectedProducerProfile.phone}
            productName={`los cafes de ${selectedProducerProfile.brandName}`}
          />
        </div>
      </article>

      <article className="surface-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
          Fincas registradas
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {selectedProducerProfile.farms.map((farm) => (
            <div key={farm.id} className="rounded-2xl border border-soil-100 bg-soil-50 p-4">
              <p className="font-semibold text-soil-900">{farm.nombre}</p>
              <p className="mt-2 text-sm text-soil-600">{farm.ubicacion}</p>
              {farm.descripcion && (
                <p className="mt-2 text-sm leading-6 text-soil-600">{farm.descripcion}</p>
              )}
            </div>
          ))}
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
          {selectedProducerProfile.products.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onViewDetail={async () => {
                const detail = await openProduct(producto.id);
                setSelectedProducto(detail);
                setCurrentPage('detalle-producto');
              }}
              onViewProducer={async () => {
                await openProducerProfile(producto.producerProfileId);
              }}
            />
          ))}
        </div>
      </article>
    </section>
  );
};
