import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CommerceContext } from '../../context/CommerceContext';

const STATUS_FLOW = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];

export const MisVentas = () => {
  const { token } = useContext(AuthContext);
  const { sales, commerceLoading, refreshOrders } = useContext(CommerceContext);
  const [updating, setUpdating] = useState(null);
  const [updateError, setUpdateError] = useState('');
  const [extendedSales, setExtendedSales] = useState([]);

  useEffect(() => {
    if (token && refreshOrders) {
      refreshOrders().catch(() => {});
    }
  }, [token]);

  useEffect(() => {
    setExtendedSales(sales || []);
  }, [sales]);

  const advanceStatus = async (orderId) => {
    if (!token) return;
    setUpdating(orderId);
    setUpdateError('');
    try {
      const order = extendedSales.find((o) => o.id === orderId);
      if (!order) return;
      const currentIdx = STATUS_FLOW.indexOf(order.status);
      if (currentIdx < STATUS_FLOW.length - 1) {
        const nextStatus = STATUS_FLOW[currentIdx + 1];
        // Simular actualizacion -- en produccion se llamaria a un endpoint PATCH /orders/{id}
        setExtendedSales((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
        );
      }
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setUpdating(null);
    }
  };

  if (!token) {
    return (
      <section className="surface-card text-center py-12">
        <p className="text-soil-600">Inicia sesion como productor para ver tus ventas.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
          Gestion de ventas
        </p>
        <h1 className="mt-2 font-display text-4xl text-soil-900">Pedidos de tus clientes</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-soil-600">
          Aca ves los pedidos que te hicieron. Podes avanzar el estado de cada uno
          para que el comprador sepa como va su orden.
        </p>
      </div>

      {commerceLoading ? (
        <div className="surface-card text-sm text-soil-600 text-center py-8">Cargando ventas...</div>
      ) : extendedSales.length === 0 ? (
        <div className="surface-card text-center py-12">
          <h3 className="font-display text-2xl text-soil-900">Sin ventas aun</h3>
          <p className="mt-3 text-sm text-soil-600">
            Cuando un comprador haga un pedido de tus productos, aparecera aca.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {updateError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {updateError}
            </div>
          )}

          {extendedSales.map((order) => {
            const currentIdx = STATUS_FLOW.indexOf(order.status);
            const canAdvance = currentIdx < STATUS_FLOW.length - 1;
            return (
              <article key={order.id} className="surface-card">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-leaf-800">
                        Venta #{order.id}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                        order.paymentStatus === 'APPROVED'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-soil-100 text-soil-700'
                      }`}>
                        Pago: {order.paymentStatus}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-xl bg-soil-50 p-3">
                        <p className="text-xs uppercase tracking-[0.14em] text-soil-500">Productos</p>
                        <p className="mt-1 font-semibold text-soil-900">
                          {order.items ? order.items.length : 1} item(s)
                        </p>
                      </div>
                      <div className="rounded-xl bg-soil-50 p-3">
                        <p className="text-xs uppercase tracking-[0.14em] text-soil-500">Total</p>
                        <p className="mt-1 font-semibold text-soil-900">
                          ${Number(order.totalAmount || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-xl bg-soil-50 p-3">
                        <p className="text-xs uppercase tracking-[0.14em] text-soil-500">Estado</p>
                        <p className="mt-1 font-semibold text-soil-900">{order.status}</p>
                      </div>
                      <div className="rounded-xl bg-soil-50 p-3">
                        <p className="text-xs uppercase tracking-[0.14em] text-soil-500">Progreso</p>
                        <div className="mt-2 flex gap-1">
                          {STATUS_FLOW.map((s, idx) => (
                            <div
                              key={s}
                              className={`h-2 flex-1 rounded-full ${
                                idx <= currentIdx ? 'bg-leaf-500' : 'bg-soil-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {canAdvance && (
                    <button
                      type="button"
                      onClick={() => advanceStatus(order.id)}
                      disabled={updating === order.id}
                      className="btn-primary flex-shrink-0"
                    >
                      {updating === order.id
                        ? 'Actualizando...'
                        : `Marcar como ${STATUS_FLOW[currentIdx + 1]}`}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MisVentas;
