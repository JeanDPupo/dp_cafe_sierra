import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../lib/api';

const GUIDE_STEPS = [
  {
    step: 1,
    title: 'Crea tu cuenta de cobro',
    desc: 'Registrate como vendedor en MercadoPago (mercadopago.com.co) o asegurate de tener Nequi activo en tu celular. Sin una cuenta de cobro, no podras recibir pagos de tus compradores.',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  },
  {
    step: 2,
    title: 'Obten tus credenciales',
    desc: 'En MercadoPago, ve al Panel de Desarrollador > Credenciales > crea una aplicacion y copia el Access Token (APP_USR-xxx) y la Public Key. Para Nequi solo necesitas tu numero de celular registrado.',
    icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
  },
  {
    step: 3,
    title: 'Registralas en esta pagina',
    desc: 'Pega tu Access Token y Public Key de MercadoPago en los campos de abajo, o ingresa tu numero Nequi. Podes configurar ambos metodos si queres ofrecer las dos opciones a tus compradores.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    step: 4,
    title: 'Guardar y listo',
    desc: 'Hace clic en Guardar configuracion. Cuando un comprador pague con el metodo que configuraste, el dinero llegara directamente a tu cuenta de MercadoPago o Nequi, sin intermediarios.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

export const ConfiguracionPagos = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const [form, setForm] = useState({
    mercadopagoAccessToken: '',
    mercadopagoPublicKey: '',
    nequiPhone: '',
    activeSeller: true,
  });

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    api.getMyProducerProfile(token)
      .then((profile) => {
        const hasConfig = profile.mercadopagoAccessToken || profile.nequiPhone;
        setShowGuide(!hasConfig);
        setForm({
          mercadopagoAccessToken: profile.mercadopagoAccessToken || '',
          mercadopagoPublicKey: profile.mercadopagoPublicKey || '',
          nequiPhone: profile.nequiPhone || '',
          activeSeller: profile.activeSeller !== false,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError('');
    try {
      const payload = {
        activeSeller: form.activeSeller,
        brandName: '',
        locationText: '',
      };
      if (form.mercadopagoAccessToken) payload.mercadopagoAccessToken = form.mercadopagoAccessToken;
      if (form.mercadopagoPublicKey) payload.mercadopagoPublicKey = form.mercadopagoPublicKey;
      if (form.nequiPhone) payload.nequiPhone = form.nequiPhone;
      await api.upsertMyProducerProfile(token, payload);
      setSaved(true);
      setShowGuide(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="surface-card text-center py-12">
        <p className="text-soil-600">Cargando configuracion...</p>
      </section>
    );
  }

  return (
    <section className="grid gap-6 xl:grid-cols-2 xl:items-start">
      {/* Guia paso a paso */}
      <div className="surface-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Metodos de cobro
            </p>
            <h2 className="mt-3 section-title">Configura tus cuentas de pago</h2>
            <p className="mt-3 section-copy">
              Agrega las credenciales de MercadoPago o tu numero Nequi para recibir pagos directamente.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-leaf-200 bg-leaf-50 p-5">
          <button
            type="button"
            onClick={() => setShowGuide((prev) => !prev)}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf-600 text-white text-lg font-bold">
                ?
              </span>
              <div>
                <p className="text-sm font-semibold text-leaf-900">
                  Como configurar tus pagos en 4 pasos
                </p>
                <p className="text-xs text-leaf-700">
                  Guia para recibir dinero de tus ventas
                </p>
              </div>
            </div>
            <svg
              className={`h-5 w-5 text-leaf-600 transition ${showGuide ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showGuide && (
            <div className="mt-5 space-y-4">
              {GUIDE_STEPS.map((s) => (
                <div key={s.step} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-leaf-100 text-sm font-bold text-leaf-700">
                    {s.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-soil-900">{s.title}</p>
                    <p className="mt-1 text-sm leading-6 text-soil-600">{s.desc}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-dashed border-soil-300 bg-soil-50 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-soil-500">
                  Importante
                </p>
                <p className="mt-2 text-sm leading-6 text-soil-700">
                  Para MercadoPago necesitas una cuenta de vendedor verificada. Los tokens de
                  prueba (TEST-) solo funcionan en entorno sandbox. Cuando tengas los tokens
                  reales de produccion (APP_USR-), reemplazalos aqui para empezar a recibir pagos reales.
                </p>
                <a
                  href="https://www.mercadopago.com.co/developers/es/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-leaf-700 underline hover:text-leaf-900"
                >
                  Documentacion de MercadoPago
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="surface-card space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
            Credenciales
          </p>
          <h3 className="mt-2 font-display text-2xl text-soil-900">Tus datos de cobro</h3>
        </div>

        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
          <p className="text-sm font-semibold text-sky-900">Mercado Pago</p>
          <p className="mt-1 text-xs text-sky-700">
            Pega el Access Token y Public Key de tu aplicacion en MercadoPago. El dinero
            caera directamente en tu cuenta de MercadoPago.
          </p>
          <div className="mt-4 space-y-3">
            <input
              className="field"
              name="mercadopagoAccessToken"
              value={form.mercadopagoAccessToken}
              onChange={handleChange}
              placeholder="Access Token (APP_USR-xxxxxxxxxx)"
              type="text"
            />
            <input
              className="field"
              name="mercadopagoPublicKey"
              value={form.mercadopagoPublicKey}
              onChange={handleChange}
              placeholder="Public Key (APP_USR-xxxxxxxxxx)"
              type="text"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-leaf-200 bg-leaf-50 p-5">
          <p className="text-sm font-semibold text-leaf-900">Nequi</p>
          <p className="mt-1 text-xs text-leaf-700">
            Ingresa tu numero de celular asociado a Nequi. Los pagos via Nequi se enviaran
            a este numero usando la API Push de Nequi.
          </p>
          <div className="mt-4">
            <input
              className="field"
              name="nequiPhone"
              value={form.nequiPhone}
              onChange={handleChange}
              placeholder="Numero Nequi (ej: 3001234567)"
              type="text"
              maxLength={20}
            />
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {saved && (
          <div className="rounded-2xl border border-leaf-200 bg-leaf-50 px-4 py-3 text-sm text-leaf-800 font-semibold">
            Configuracion guardada correctamente. Ya estas listo para recibir pagos.
          </div>
        )}

        <button type="submit" className="btn-primary w-full" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar configuracion'}
        </button>
      </form>
    </section>
  );
};

export default ConfiguracionPagos;
