import React, { createContext, useState } from 'react';
import { mockProducts, mockSellerProfile } from '../data/mockData';

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [catalogoBase] = useState(mockProducts);
  const [misProductos, setMisProductos] = useState([
    {
      id: 100,
      nombre: 'Lote de origen Los Limos',
      productor: {
        nombre: mockSellerProfile.marca,
        ubicacion: mockSellerProfile.ubicacion,
        telefono: mockSellerProfile.telefono,
        finca: mockSellerProfile.finca,
        historia: mockSellerProfile.historia,
        experiencia: mockSellerProfile.experiencia,
        especialidad: 'Venta directa y procesos visibles',
      },
      precio: 28000,
      cantidad: 15,
      variedad: 'Arabica',
      tipoGrano: 'Lavado tradicional',
      tueste: 'Medio',
      foto:
        'https://images.unsplash.com/photo-1559056199-641a0ac8b8d5?w=900&h=700&fit=crop',
      descripcion:
        'Un lote pensado para compradores que buscan origen claro, productor visible y perfil amable.',
      ubicacionGPS: mockSellerProfile.ubicacion,
      procesos: [
        {
          etapa: 'Siembra',
          obligatorio: true,
          resultado: 'Arabica',
          descripcion: 'Seleccion de semilla y preparacion del terreno.',
        },
        {
          etapa: 'Cultivo',
          obligatorio: true,
          resultado: 'Planta cuidada',
          descripcion: 'Manejo del cultivo con acompanamiento constante.',
        },
        {
          etapa: 'Cosecha',
          obligatorio: true,
          resultado: 'Cereza madura',
          descripcion: 'Cosecha manual y seleccion del fruto.',
        },
        {
          etapa: 'Lavado y secado',
          obligatorio: true,
          resultado: 'Grano limpio',
          descripcion: 'Lavado y secado en tiempos controlados.',
        },
      ],
      createdAt: new Date().toISOString(),
    },
  ]);
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
