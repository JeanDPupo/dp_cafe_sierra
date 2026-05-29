import React, { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { CommerceContext } from '../../context/CommerceContext';

const PAYMENT_STATES = {
  success: {
    title: 'Pago aprobado',
    tone: 'bg-leaf-50 text-leaf-800 border-leaf-200',
    copy: 'La orden quedo registrada y el pago fue confirmado. El productor recibira la notificacion.',
  },
  pending: {
    title: 'Pago pendiente',
    tone: 'bg-sky-50 text-sky-800 border-sky-200',
    copy: 'El pago fue iniciado y esta esperando confirmacion del proveedor. Podes consultar el estado en tus pedidos.',
  },
  failure: {
    title: 'Pago no completado',
    tone: 'bg-red-50 text-red-700 border-red-200',
    copy: 'El proveedor no confirmo el pago. Podes volver al carrito e intentar de nuevo.',
  },
  mock: {
    title: 'Checkout de desarrollo',
    tone: 'bg-soil-50 text-soil-800 border-soil-200',
    copy: 'Modo desarrollo: las credenciales de MercadoPago no estan configuradas para produccion.',
  },
  nequi: {
    title: 'Pago con Nequi iniciado',
    tone: 'bg-leaf-50 text-leaf-800 border-leaf-200',
    copy: 'El pedido quedo registrado. Para que el pago se complete, el productor debe confirmar la recepcion via Nequi en su celular.',
  },
};

export const PagoResultado = () => {
  const { setCurrentPage } = useContext(RoleContext);
  const { checkoutResult } = useContext(CommerceContext);
  const [resultInfo, setResultInfo] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentParam = params.get('payment');
    const state = PAYMENT_STATES[paymentParam] ? paymentParam : (checkoutResult ? 'pending' : null);

    if (!state) {
      setCurrentPage('pedidos');
      return;
    }

    setResultInfo({
      state,
      orderId: params.get('orderId') || checkoutResult?.order?.id,
      reference: params.get('reference') || checkoutResult?.payment?.externalReference,
      provider: checkoutResult?.payment?.provider || (paymentParam === 'nequi' ? 'NEQUI' : 'MERCADO_PAGO'),
    });
  }, []);

  if (!resultInfo) {
    return (
      <section className="surface-card text-center py-12">
        <p className="text-soil-600">Cargando resultado del pago...</p>
      </section>
    );
  }

  const config = PAYMENT_STATES[resultInfo.state];

  return (
    <section className="mx-auto w-full max-w-2xl py-10">
      <div className={`rounded-[1.75rem] border p-8 ${config.tone}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-75">
          Estado de pago
        </p>
        <h1 className="mt-3 font-display text-4xl text-soil-900">{config.title}</h1>
        <p className="mt-4 text-sm leading-7">{config.copy}</p>

        {resultInfo.orderId && (
          <div className="mt-5 rounded-2xl bg-white/70 px-4 py-3">
            <p className="text-sm font-semibold text-soil-800">
              Pedido #{resultInfo.orderId}
            </p>
            {resultInfo.reference && (
              <p className="mt-1 text-xs text-soil-500">
                Referencia: {resultInfo.reference}
              </p>
            )}
            {resultInfo.provider && (
              <p className="mt-1 text-xs text-soil-500">
                Proveedor: {resultInfo.provider}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => setCurrentPage('catalogo')} className="btn-primary">
            Seguir comprando
          </button>
          <button type="button" onClick={() => setCurrentPage('pedidos')} className="btn-ghost">
            Ver mis pedidos
          </button>
        </div>
      </div>
    </section>
  );
};

export default PagoResultado;
