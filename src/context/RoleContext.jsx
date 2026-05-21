import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { api } from '../lib/api';
import { mapSellerProfile } from '../lib/mappers';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const { isAuthenticated, token, openAuth } = useContext(AuthContext);
  const [role, setRole] = useState('comprar');
  const [currentPage, setCurrentPage] = useState('home');
  const [sellerProfile, setSellerProfile] = useState(null);
  const [sellerProfileLoading, setSellerProfileLoading] = useState(false);
  const [sellerProfileError, setSellerProfileError] = useState('');

  const refreshSellerProfile = useCallback(async () => {
    if (!token) {
      setSellerProfile(null);
      setSellerProfileError('');
      return null;
    }

    setSellerProfileLoading(true);
    setSellerProfileError('');
    try {
      const response = await api.getMyProducerProfile(token);
      const normalized = mapSellerProfile(response);
      setSellerProfile(normalized);
      return normalized;
    } catch (error) {
      if (error.status === 404) {
        setSellerProfile(null);
        return null;
      }
      setSellerProfileError(error.message);
      throw error;
    } finally {
      setSellerProfileLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshSellerProfile();
  }, [refreshSellerProfile]);

  useEffect(() => {
    if (!isAuthenticated) {
      setRole('comprar');
      setCurrentPage('home');
      setSellerProfile(null);
    }
  }, [isAuthenticated]);

  const setRoleExplicit = useCallback((newRole) => {
    setRole(newRole);
    setCurrentPage('home');
  }, []);

  const goToSellerSection = useCallback((page = 'panel-vender') => {
    setRole('vender');
    if (!isAuthenticated) {
      setCurrentPage('activar-productor');
      openAuth('register');
      return;
    }
    setCurrentPage(sellerProfile?.activeSeller ? page : 'activar-productor');
  }, [isAuthenticated, openAuth, sellerProfile?.activeSeller]);

  const saveSellerProfile = useCallback(async (formData) => {
    if (!token) {
      openAuth('register');
      throw new Error('Primero necesitas iniciar sesion.');
    }

    setSellerProfileLoading(true);
    setSellerProfileError('');
    try {
      await api.upsertMyProducerProfile(token, {
        activeSeller: true,
        brandName: formData.marca,
        bio: formData.bio || '',
        story: formData.historia,
        locationText: formData.ubicacion,
        gps: formData.gps || '',
        yearsExperience: formData.experiencia,
        coverImageUrl: formData.coverImageUrl || '',
      });

      const hasFarms = sellerProfile?.fincas?.length > 0;
      if (!hasFarms && formData.firstFarm) {
        await api.createFarm(token, {
          name: formData.firstFarm.nombre,
          locationText: formData.firstFarm.ubicacion,
          gps: formData.firstFarm.gps || '',
          description: formData.firstFarm.descripcion || '',
          active: true,
        });
      }

      const normalized = await refreshSellerProfile();
      setRole('vender');
      setCurrentPage('panel-vender');
      return normalized;
    } catch (error) {
      setSellerProfileError(error.message);
      throw error;
    } finally {
      setSellerProfileLoading(false);
    }
  }, [token, openAuth, sellerProfile?.fincas?.length, refreshSellerProfile]);

  const value = useMemo(
    () => ({
      role,
      setRoleExplicit,
      goToSellerSection,
      currentPage,
      setCurrentPage,
      sellerProfile,
      sellerProfileLoading,
      sellerProfileError,
      saveSellerProfile,
      refreshSellerProfile,
    }),
    [
      role,
      currentPage,
      sellerProfile,
      sellerProfileLoading,
      sellerProfileError,
      setRoleExplicit,
      goToSellerSection,
      saveSellerProfile,
      refreshSellerProfile,
    ]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
