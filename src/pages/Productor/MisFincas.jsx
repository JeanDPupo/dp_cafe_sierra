import React, { useContext, useEffect, useState, useMemo } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../lib/api';

const initialForm = {
  name: '',
  locationText: '',
  gps: '',
  description: '',
};

export const MisFincas = () => {
  const { setCurrentPage } = useContext(RoleContext);
  const { token, isAuthenticated, openAuth } = useContext(AuthContext);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [formData, setFormData] = useState(initialForm);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadFarms = async () => {
    if (!token) return;
    setLoading(true);
    setLoadError('');
    try {
      const data = await api.getMyFarms(token);
      setFarms(data || []);
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadFarms();
    } else {
      setFarms([]);
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  const activeFarms = useMemo(() => farms.filter((f) => f.active !== false), [farms]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) { openAuth('login'); return; }
    setSubmitError('');
    setSubmitting(true);
    try {
      await api.createFarm(token, formData);
      setFormData(initialForm);
      setSaved(true);
      await loadFarms();
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
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

          {loadError && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {loadError}
            </div>
          )}

          {loading ? (
            <div className="mt-6 rounded-2xl border border-dashed border-soil-200 bg-soil-50 p-6 text-sm text-soil-600 text-center">
              Cargando fincas...
            </div>
          ) : activeFarms.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-soil-200 bg-soil-50 p-6 text-sm text-soil-600">
              Aun no tienes fincas activas. Registra la primera para empezar a publicar lotes.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {activeFarms.map((farm) => (
                <article key={farm.id} className="rounded-[1.5rem] border border-soil-100 bg-soil-50 p-5">
                  <p className="font-display text-2xl text-soil-900">{farm.name}</p>
                  <p className="mt-2 text-sm font-semibold text-leaf-700">{farm.locationText}</p>
                  {farm.gps && (
                    <p className="mt-2 text-sm text-soil-600">GPS: {farm.gps}</p>
                  )}
                  {farm.description && (
                    <p className="mt-3 text-sm leading-7 text-soil-600">{farm.description}</p>
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre de la finca"
            required
          />
          <input
            className="field"
            name="locationText"
            value={formData.locationText}
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
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe esta finca, su altura, enfoque o caracteristicas"
          />

          {submitError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {saved && (
            <div className="rounded-2xl border border-leaf-200 bg-leaf-50 px-4 py-3 text-sm text-leaf-800">
              Finca registrada correctamente.
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Guardando...' : 'Guardar finca'}
          </button>
        </form>
      </div>
    </section>
  );
};
