import React from 'react';

const PAYMENT_STATES = {
  success: {
    title: 'Pago aprobado',
    tone: 'bg-leaf-50 text-leaf-800 border-leaf-200',
    copy: 'La orden quedo registrada y el pago aparece como aprobado cuando el proveedor confirme el evento.',
  },
  pending: {
    title: 'Pago pendiente',
    tone: 'bg-sky-50 text-sky-800 border-sky-200',
    copy: 'El pago fue iniciado y esta esperando confirmacion del proveedor.',
  },
  failure: {
    title: 'Pago no completado',
    tone: 'bg-red-50 text-red-700 border-red-200',
    copy: 'El proveedor no confirmo el pago. Puedes volver al carrito e intentar con otro medio.',
  },
  mock: {
    title: 'Checkout de desarrollo',
    tone: 'bg-soil-50 text-soil-800 border-soil-200',
    copy: 'Esta ruta se usa cuando no hay credenciales reales del proveedor configuradas.',
  },
  nequi: {
    title: 'Pago con Nequi preparado',
    tone: 'bg-leaf-50 text-leaf-800 border-leaf-200',
    copy: 'El flujo quedo creado. Para produccion falta habilitar credenciales y confirmacion real con Nequi.',
  },
};

export const PagoResultado = ({ state = 'pending' }) => {
  const config = PAYMENT_STATES[state] || PAYMENT_STATES.pending;
  const params = new URLSearchParams(window.location.search);
  const reference = params.get('reference');

  return (
    <section className="mx-auto w-full max-w-3xl py-10">
      <div className={`rounded-[1.75rem] border p-8 ${config.tone}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-75">
          Estado de pago
        </p>
        <h1 className="mt-3 font-display text-4xl text-soil-900">{config.title}</h1>
        <p className="mt-4 text-sm leading-7">{config.copy}</p>
        {reference && (
          <p className="mt-5 rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-soil-800">
            Referencia: {reference}
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="/" className="btn-primary">
            Volver al catalogo
          </a>
          <a href="/?page=pedidos" className="btn-ghost">
            Ver pedidos
          </a>
        </div>
      </div>
    </section>
  );
};
