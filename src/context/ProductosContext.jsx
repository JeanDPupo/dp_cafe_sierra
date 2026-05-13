import React, { createContext, useState } from 'react';
import { mockProducts } from '../data/mockData';

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [catalogoBase] = useState(mockProducts);
  const [misProductos, setMisProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(mockProducts[0]);

  const productos = [...misProductos, ...catalogoBase];

  const addProducto = (producto) => {
    const newProducto = {
      ...producto,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setMisProductos((prev) => [newProducto, ...prev]);
    setSelectedProducto(newProducto);
  };

  const deleteProducto = (id) => {
    setMisProductos((prev) => prev.filter((producto) => producto.id !== id));
  };

  const updateProducto = (id, updatedData) => {
    setMisProductos((prev) =>
      prev.map((producto) =>
        producto.id === id ? { ...producto, ...updatedData } : producto
      )
    );
  };

  const filtrarProductos = (filtros) => {
    return productos.filter((producto) => {
      if (filtros.precioMin && producto.precio < filtros.precioMin) return false;
      if (filtros.precioMax && producto.precio > filtros.precioMax) return false;
      if (
        filtros.ubicacion &&
        !producto.ubicacionGPS.toLowerCase().includes(filtros.ubicacion.toLowerCase())
      ) {
        return false;
      }
      if (
        filtros.variedad &&
        !producto.variedad.toLowerCase().includes(filtros.variedad.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        misProductos,
        selectedProducto,
        setSelectedProducto,
        addProducto,
        deleteProducto,
        updateProducto,
        filtrarProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
