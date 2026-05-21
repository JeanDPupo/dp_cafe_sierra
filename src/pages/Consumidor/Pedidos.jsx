import React, { useContext } from 'react';
import { CommerceContext } from '../../context/CommerceContext';
import { AuthContext } from '../../context/AuthContext';

export const Pedidos = () => {
  const { purchases, sales, commerceLoading } = useContext(CommerceContext);
  const { isAuthenticated, openAuth } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <section className="surface-card">
        <h1 className="font-display text-4xl text-soil-900">Tus pedidos apareceran aqui</h1>
        <p className="mt-4 text-sm leading-7 text-soil-600">
          Inicia sesion para ver lo que has comprado y, si ya vendes, lo que has vendido.
        </p>
        <div className="mt-6 flex gap-3">
          <button type="button" className="btn-primary" onClick={() => openAuth('login')}>
            Ingresar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          Compras y ventas
        </p>
        <h1 className="mt-2 font-display text-4xl text-soil-900">Historial de pedidos</h1>
      </div>

      {commerceLoading && (
        <div className="surface-card text-sm text-soil-600">Cargando historial...</div>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <article className="surface-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
            Lo que has comprado
          </p>
          <div className="mt-5 space-y-4">
            {purchases.length === 0 ? (
              <p className="text-sm text-soil-600">Aun no hay compras registradas.</p>
            ) : (
              purchases.map((order) => (
                <div key={order.id} className="rounded-2xl bg-soil-50 p-4">
                  <p className="font-semibold text-soil-900">Pedido #{order.id}</p>
                  <p className="mt-2 text-sm text-soil-600">{order.sellerBrandName}</p>
                  <p className="mt-2 text-sm text-soil-600">
                    {order.items.length} item(s) · ${Number(order.totalAmount).toLocaleString()}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-soil-500">
                    {order.status} · {order.paymentStatus}
                  </p>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="surface-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-soil-500">
            Lo que has vendido
          </p>
          <div className="mt-5 space-y-4">
            {sales.length === 0 ? (
              <p className="text-sm text-soil-600">Aun no hay ventas registradas.</p>
            ) : (
              sales.map((order) => (
                <div key={order.id} className="rounded-2xl bg-soil-50 p-4">
                  <p className="font-semibold text-soil-900">Venta #{order.id}</p>
                  <p className="mt-2 text-sm text-soil-600">{order.items.length} item(s)</p>
                  <p className="mt-2 text-sm text-soil-600">
                    Total: ${Number(order.totalAmount).toLocaleString()}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-soil-500">
                    {order.status} · {order.paymentStatus}
                  </p>
                </div>
              ))
            )}
          </div>
        </article>
      </div>
    </section>
  );
};
