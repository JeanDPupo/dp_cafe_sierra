import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { api } from '../lib/api';
import {
  mapCatalogProduct,
  mapProductDetail,
  mapProducerProfile,
  stageToApi,
} from '../lib/mappers';

export const ProductosContext = createContext();

function buildProductPayload(producto) {
  return {
    farmId: Number(producto.fincaId),
    name: producto.nombre,
    variety: producto.variedad,
    pricePerKg: Number(producto.precio),
    availableKg: Number(producto.cantidad),
    description: producto.descripcion,
    mainImageUrl: producto.foto,
    processes: producto.procesos.map((proceso, index) => ({
      stage: stageToApi(proceso.etapa),
      description: proceso.descripcion,
      resultType: proceso.resultado,
      orderIndex: index + 1,
      media: [],
    })),
  };
}

export const ProductosProvider = ({ children }) => {
  const { token, isAuthenticated } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [misProductos, setMisProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [selectedProducerProfile, setSelectedProducerProfile] = useState(null);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [mineLoading, setMineLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [producerLoading, setProducerLoading] = useState(false);
  const [productosError, setProductosError] = useState('');

  const refreshCatalog = useCallback(async (filters = {}) => {
    setCatalogLoading(true);
    setProductosError('');
    try {
      const response = await api.getProducts({
        priceMin: filters.precioMin,
        priceMax: filters.precioMax,
        location: filters.ubicacion,
        variety: filters.variedad,
      });
      const mapped = response.map(mapCatalogProduct);
      setProductos(mapped);
      return mapped;
    } catch (error) {
      setProductosError(error.message);
      throw error;
    } finally {
      setCatalogLoading(false);
    }
  }, []);

  const refreshMine = useCallback(async () => {
    if (!token) {
      setMisProductos([]);
      return [];
    }

    setMineLoading(true);
    try {
      const response = await api.getMyProducts(token);
      const mapped = response.map(mapCatalogProduct);
      setMisProductos(mapped);
      return mapped;
    } catch (error) {
      if (error.status === 404) {
        setMisProductos([]);
        return [];
      }
      setProductosError(error.message);
      throw error;
    } finally {
      setMineLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshCatalog();
  }, [refreshCatalog]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshMine();
      return;
    }
    setMisProductos([]);
  }, [isAuthenticated, refreshMine]);

  const openProduct = useCallback(async (productoOrId) => {
    const productId = typeof productoOrId === 'object' ? productoOrId.id : productoOrId;
    setDetailLoading(true);
    setProductosError('');
    try {
      const response = await api.getProduct(productId);
      const mapped = mapProductDetail(response);
      setSelectedProducto(mapped);
      return mapped;
    } catch (error) {
      setProductosError(error.message);
      throw error;
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const openProducerProfile = useCallback(async (producerProfileId) => {
    setProducerLoading(true);
    setProductosError('');
    try {
      const response = await api.getProducer(producerProfileId);
      const mapped = mapProducerProfile(response);
      setSelectedProducerProfile(mapped);
      return mapped;
    } catch (error) {
      setProductosError(error.message);
      throw error;
    } finally {
      setProducerLoading(false);
    }
  }, []);

  const addProducto = useCallback(async (producto) => {
    if (!token) {
      throw new Error('Necesitas iniciar sesion para publicar.');
    }

    const response = await api.createProduct(token, buildProductPayload(producto));
    const mapped = mapProductDetail(response);
    setSelectedProducto(mapped);
    await Promise.all([refreshCatalog(), refreshMine()]);
    return mapped;
  }, [token, refreshCatalog, refreshMine]);

  const deleteProducto = useCallback(async (id) => {
    if (!token) {
      throw new Error('Necesitas iniciar sesion para gestionar tus lotes.');
    }

    await api.deleteProduct(token, id);
    await Promise.all([refreshCatalog(), refreshMine()]);
  }, [token, refreshCatalog, refreshMine]);

  const value = useMemo(
    () => ({
      productos,
      misProductos,
      selectedProducto,
      setSelectedProducto,
      selectedProducerProfile,
      catalogLoading,
      mineLoading,
      detailLoading,
      producerLoading,
      productosError,
      refreshCatalog,
      refreshMine,
      openProduct,
      openProducerProfile,
      addProducto,
      deleteProducto,
    }),
    [
      productos,
      misProductos,
      selectedProducto,
      selectedProducerProfile,
      catalogLoading,
      mineLoading,
      detailLoading,
      producerLoading,
      productosError,
      refreshCatalog,
      refreshMine,
      openProduct,
      openProducerProfile,
      addProducto,
      deleteProducto,
    ]
  );

  return <ProductosContext.Provider value={value}>{children}</ProductosContext.Provider>;
};
