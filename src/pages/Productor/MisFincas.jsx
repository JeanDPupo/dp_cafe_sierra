import React, { useContext, useMemo, useState } from 'react';
import { RoleContext } from '../../context/RoleContext';

const initialForm = {
  nombre: '',
  ubicacion: '',
  gps: '',
  descripcion: '',
};

export const MisFincas = () => {
  const {
    sellerProfile,
    sellerProfileLoading,
    sellerProfileError,
    createFarm,
    setCurrentPage,
  } = useContext(RoleContext);
  const [formData, setFormData] = useState(initialForm);
  const [submitError, setSubmitError] = useState('');
  const [saved, setSaved] = useState(false);

  const farms = useMemo(() => sellerProfile?.fincas || [], [sellerProfile?.fincas]);
  const activeFarms = useMemo(() => farms.filter((farm) => farm.active !== false), [farms]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    try {
      await createFarm(formData);
      setFormData(initialForm);
      setSaved(true);
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
            Gestion de fincas
          </p>
          <h1 className="mt-2 font-display text-4xl text-soil-900">Tus fincas registradas</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-soil-600">
            Un mismo usuario puede vender desde varias fincas. Cada lote se publica
            indicando a cual finca pertenece.
          </p>
        </div>
        <button type="button" onClick={() => setCurrentPage('publicar')} className="btn-primary">
          Publicar un lote
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Fincas activas</p>
              <p className="mt-2 text-3xl font-bold text-soil-900">{activeFarms.length}</p>
            </div>
            <div className="rounded-2xl bg-soil-50 px-4 py-3 text-sm text-soil-700">
              {farms.length} registradas en total
            </div>
          </div>

          {activeFarms.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-soil-200 bg-soil-50 p-6 text-sm text-soil-600">
              Aun no tienes fincas activas. Registra la primera para empezar a publicar lotes.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {activeFarms.map((farm) => (
                <article key={farm.id} className="rounded-[1.5rem] border border-soil-100 bg-soil-50 p-5">
                  <p className="font-display text-2xl text-soil-900">{farm.nombre}</p>
                  <p className="mt-2 text-sm font-semibold text-leaf-700">{farm.ubicacion}</p>
                  {farm.gps && (
                    <p className="mt-2 text-sm text-soil-600">GPS: {farm.gps}</p>
                  )}
                  {farm.descripcion && (
                    <p className="mt-3 text-sm leading-7 text-soil-600">{farm.descripcion}</p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="surface-card space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Nueva finca
            </p>
            <h2 className="mt-2 font-display text-3xl text-soil-900">Registrar otra finca</h2>
          </div>

          <input
            className="field"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre de la finca"
            required
          />
          <input
            className="field"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            placeholder="Ubicacion de la finca"
            required
          />
          <input
            className="field"
            name="gps"
            value={formData.gps}
            onChange={handleChange}
            placeholder="GPS opcional"
          />
          <textarea
            className="field min-h-[140px]"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe esta finca, su altura, enfoque o caracteristicas"
          />

          {(submitError || sellerProfileError) && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError || sellerProfileError}
            </div>
          )}

          {saved && (
            <div className="rounded-2xl border border-leaf-200 bg-leaf-50 px-4 py-3 text-sm text-leaf-800">
              Finca registrada correctamente.
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={sellerProfileLoading}>
            {sellerProfileLoading ? 'Guardando...' : 'Guardar finca'}
          </button>
        </form>
      </div>
    </section>
  );
};
