import React, { useContext, useEffect, useState } from 'react';
import { CommerceContext } from '../../context/CommerceContext';
import { AuthContext } from '../../context/AuthContext';

const PAYMENT_OPTIONS = [
  {
    id: 'MERCADO_PAGO',
    label: 'Mercado Pago',
    copy: 'Checkout externo para tarjetas y otros medios habilitados.',
  },
  {
    id: 'NEQUI',
    label: 'Nequi',
    copy: 'Base preparada para flujo con Nequi. Por ahora puede abrir una ruta de confirmacion.',
  },
];

export const Carrito = () => {
  const {
    cart,
    commerceLoading,
    commerceError,
    checkoutResult,
    updateCartItem,
    removeCartItem,
    checkout,
  } = useContext(CommerceContext);
  const { isAuthenticated, openAuth } = useContext(AuthContext);
  const [selectedProvider, setSelectedProvider] = useState('MERCADO_PAGO');
  const [submitError, setSubmitError] = useState('');
  const [quantityDrafts, setQuantityDrafts] = useState({});
  const [paymentUrl, setPaymentUrl] = useState('');

  useEffect(() => {
    const nextDrafts = {};
    cart.items?.forEach((item) => {
      nextDrafts[item.id] = String(item.quantityKg);
    });
    setQuantityDrafts(nextDrafts);
  }, [cart.items]);

  const handleCheckout = async () => {
    setSubmitError('');
    setPaymentUrl('');
    try {
      const result = await checkout(selectedProvider);
      if (result?.payment?.checkoutUrl) {
        const win = window.open(result.payment.checkoutUrl, '_blank', 'noopener,noreferrer');
        if (!win || win.closed) {
          setPaymentUrl(result.payment.checkoutUrl);
        }
      }
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  const commitQuantity = async (item) => {
    setSubmitError('');
    const parsed = Number(quantityDrafts[item.id]);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setSubmitError('La cantidad debe ser mayor que cero.');
      setQuantityDrafts((prev) => ({ ...prev, [item.id]: String(item.quantityKg) }));
      return;
    }
    try {
      await updateCartItem(item.id, parsed);
    } catch (error) {
      setSubmitError(error.message);
      setQuantityDrafts((prev) => ({ ...prev, [item.id]: String(item.quantityKg) }));
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="surface-card">
        <h1 className="font-display text-4xl text-soil-900">Tu carrito espera tu sesion</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-soil-600">
          Puedes explorar los cafes libremente, pero para agregar productos, comprar y pagar
          con Mercado Pago o Nequi necesitas iniciar sesion.
        </p>
        <div className="mt-6 flex gap-3">
          <button type="button" className="btn-primary" onClick={() => openAuth('login')}>
            Ingresar
          </button>
          <button type="button" className="btn-ghost" onClick={() => openAuth('register')}>
            Crear cuenta
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          Carrito y pago
        </p>
        <h1 className="mt-2 font-display text-4xl text-soil-900">Revisa tu compra antes de pagar</h1>
      </div>

      {commerceError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {commerceError}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card">
          {cart.items?.length ? (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <article key={item.id} className="rounded-[1.5rem] border border-soil-100 bg-soil-50 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-display text-2xl text-soil-900">{item.productName}</p>
                      <p className="mt-2 text-sm text-soil-600">
                        ${Number(item.unitPriceSnapshot).toLocaleString()} por kg
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input
                        className="field max-w-[140px]"
                        type="number"
                        min="0.25"
                        step="0.25"
                        value={quantityDrafts[item.id] ?? item.quantityKg}
                        onChange={(event) =>
                          setQuantityDrafts((prev) => ({ ...prev, [item.id]: event.target.value }))
                        }
                        onBlur={() => commitQuantity(item)}
                      />
                      <button type="button" onClick={() => commitQuantity(item)} className="btn-secondary">
                        Actualizar
                      </button>
                      <button
                        type="button"
                        onClick={() => removeCartItem(item.id)}
                        className="btn-ghost"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-soil-900">
                    Subtotal: ${Number(item.subtotal).toLocaleString()}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-soil-200 bg-soil-50 p-6 text-sm text-soil-600">
              Tu carrito esta vacio por ahora.
            </div>
          )}
        </div>

        <aside className="surface-card space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
              Resumen
            </p>
            <h2 className="mt-2 font-display text-3xl text-soil-900">Elige como pagar</h2>
          </div>

          <div className="space-y-3">
            {PAYMENT_OPTIONS.map((option) => {
              const active = selectedProvider === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedProvider(option.id)}
                  className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition ${
                    active
                      ? 'border-leaf-300 bg-leaf-50'
                      : 'border-soil-200 bg-white hover:border-soil-300'
                  }`}
                >
                  <p className="font-semibold text-soil-900">{option.label}</p>
                  <p className="mt-2 text-sm leading-6 text-soil-600">{option.copy}</p>
                </button>
              );
            })}
          </div>

          <div className="rounded-[1.5rem] bg-soil-50 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Total estimado</p>
            <p className="mt-2 font-display text-4xl text-soil-900">
              ${Number(cart.total || 0).toLocaleString()}
            </p>
          </div>

          {(submitError || checkoutResult?.payment?.provider) && (
            <div className={`rounded-2xl px-4 py-3 text-sm ${
              submitError
                ? 'border border-red-200 bg-red-50 text-red-700'
                : 'border border-sky-200 bg-sky-50 text-sky-800'
            }`}>
              {submitError || `Orden #${checkoutResult.order.id} creada. Pago preparado con ${checkoutResult.payment.provider}.`}
            </div>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={!cart.items?.length || commerceLoading}
            className="btn-primary w-full"
          >
            {commerceLoading ? 'Preparando pago...' : `Pagar con ${selectedProvider === 'NEQUI' ? 'Nequi' : 'Mercado Pago'}`}
          </button>

          {paymentUrl && (
            <div className="mt-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-center">
              <p className="text-sm font-semibold text-sky-800">Ventana bloqueada por el navegador</p>
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-sm font-bold text-sky-700 underline hover:text-sky-900"
              >
                Clic aqui para ir a la pagina de pago
              </a>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
};
