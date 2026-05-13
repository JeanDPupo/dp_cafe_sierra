import React, { useState } from 'react';

export const Filtros = ({ onFilter }) => {
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [variedad, setVariedad] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const handleFilter = () => {
    onFilter({
      precioMin: precioMin ? parseInt(precioMin, 10) : null,
      precioMax: precioMax ? parseInt(precioMax, 10) : null,
      variedad: variedad || null,
      ubicacion: ubicacion || null,
    });
  };

  const handleReset = () => {
    setPrecioMin('');
    setPrecioMax('');
    setVariedad('');
    setUbicacion('');
    onFilter({});
  };

  return (
    <section className="surface-card">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
            Buscar con calma
          </p>
          <h2 className="mt-2 font-display text-3xl text-soil-900">
            Filtra por perfil, precio y territorio
          </h2>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={handleFilter} className="btn-primary">
            Aplicar filtros
          </button>
          <button type="button" onClick={handleReset} className="btn-ghost">
            Limpiar
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-soil-700">
            Precio minimo
          </label>
          <input
            className="field"
            type="number"
            placeholder="20000"
            value={precioMin}
            onChange={(event) => setPrecioMin(event.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-soil-700">
            Precio maximo
          </label>
          <input
            className="field"
            type="number"
            placeholder="35000"
            value={precioMax}
            onChange={(event) => setPrecioMax(event.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-soil-700">
            Variedad
          </label>
          <select
            className="field"
            value={variedad}
            onChange={(event) => setVariedad(event.target.value)}
          >
            <option value="">Todas</option>
            <option value="Arabica">Arabica</option>
            <option value="Geisha">Geisha</option>
            <option value="Bourbon">Bourbon</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-soil-700">
            Ubicacion
          </label>
          <input
            className="field"
            type="text"
            placeholder="Sacramento"
            value={ubicacion}
            onChange={(event) => setUbicacion(event.target.value)}
          />
        </div>
      </div>
    </section>
  );
};
