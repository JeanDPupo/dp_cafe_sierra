import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { api } from '../lib/api';

export const CommerceContext = createContext();

export const CommerceProvider = ({ children }) => {
  const { token, isAuthenticated, openAuth } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [commerceLoading, setCommerceLoading] = useState(false);
  const [commerceError, setCommerceError] = useState('');
  const [checkoutResult, setCheckoutResult] = useState(null);

  const refreshCart = useCallback(async () => {
    if (!token) {
      setCart({ items: [], total: 0 });
      return null;
    }
    setCommerceLoading(true);
    setCommerceError('');
    try {
      const response = await api.getCart(token);
      setCart(response);
      return response;
    } catch (error) {
      setCommerceError(error.message);
      throw error;
    } finally {
      setCommerceLoading(false);
    }
  }, [token]);

  const refreshOrders = useCallback(async () => {
    if (!token) {
      setPurchases([]);
      setSales([]);
      return;
    }
    setCommerceLoading(true);
    setCommerceError('');
    try {
      const [purchaseResponse, salesResponse] = await Promise.all([
        api.getPurchases(token),
        api.getSales(token).catch((error) => {
          if (error.status === 404) {
            return [];
          }
          throw error;
        }),
      ]);
      setPurchases(purchaseResponse);
      setSales(salesResponse);
    } catch (error) {
      setCommerceError(error.message);
      throw error;
    } finally {
      setCommerceLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
      refreshOrders();
      return;
    }
    setCart({ items: [], total: 0 });
    setPurchases([]);
    setSales([]);
    setCheckoutResult(null);
  }, [isAuthenticated, refreshCart, refreshOrders]);

  const addToCart = useCallback(async (productId, quantityKg = 1) => {
    if (!token) {
      openAuth('login');
      throw new Error('Necesitas iniciar sesion para agregar al carrito.');
    }
    setCommerceLoading(true);
    setCommerceError('');
    try {
      const response = await api.addCartItem(token, { productId, quantityKg });
      setCart(response);
      return response;
    } catch (error) {
      setCommerceError(error.message);
      throw error;
    } finally {
      setCommerceLoading(false);
    }
  }, [token, openAuth]);

  const updateCartItem = useCallback(async (cartItemId, quantityKg) => {
    if (!token) {
      openAuth('login');
      throw new Error('Necesitas iniciar sesion para editar el carrito.');
    }
    setCommerceLoading(true);
    setCommerceError('');
    try {
      const response = await api.updateCartItem(token, cartItemId, { quantityKg });
      setCart(response);
      return response;
    } catch (error) {
      setCommerceError(error.message);
      throw error;
    } finally {
      setCommerceLoading(false);
    }
  }, [token, openAuth]);

  const removeCartItem = useCallback(async (cartItemId) => {
    if (!token) {
      openAuth('login');
      throw new Error('Necesitas iniciar sesion para editar el carrito.');
    }
    setCommerceLoading(true);
    setCommerceError('');
    try {
      await api.deleteCartItem(token, cartItemId);
      await refreshCart();
    } catch (error) {
      setCommerceError(error.message);
      throw error;
    } finally {
      setCommerceLoading(false);
    }
  }, [token, openAuth, refreshCart]);

  const checkout = useCallback(async (provider) => {
    if (!token) {
      openAuth('login');
      throw new Error('Necesitas iniciar sesion para pagar.');
    }
    setCommerceLoading(true);
    setCommerceError('');
    try {
      const order = await api.checkout(token);
      const payment = await api.createPaymentPreference(token, order.id, provider);
      const result = { order, payment, provider };
      setCheckoutResult(result);
      await Promise.all([refreshCart(), refreshOrders()]);
      return result;
    } catch (error) {
      setCommerceError(error.message);
      throw error;
    } finally {
      setCommerceLoading(false);
    }
  }, [token, openAuth, refreshCart, refreshOrders]);

  const value = useMemo(() => ({
    cart,
    purchases,
    sales,
    commerceLoading,
    commerceError,
    checkoutResult,
    refreshCart,
    refreshOrders,
    addToCart,
    updateCartItem,
    removeCartItem,
    checkout,
  }), [
    cart,
    purchases,
    sales,
    commerceLoading,
    commerceError,
    checkoutResult,
    refreshCart,
    refreshOrders,
    addToCart,
    updateCartItem,
    removeCartItem,
    checkout,
  ]);

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
};
