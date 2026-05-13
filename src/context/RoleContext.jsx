import React, { createContext, useState } from 'react';
import { mockSellerProfile } from '../data/mockData';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('comprar');
  const [currentPage, setCurrentPage] = useState('home');
  const [sellerProfile, setSellerProfile] = useState(mockSellerProfile);

  const setRoleExplicit = (newRole) => {
    setRole(newRole);
    setCurrentPage('home');
  };

  const goToSellerSection = (page = 'panel-vender') => {
    setRole('vender');
    setCurrentPage(sellerProfile.activeSeller ? page : 'activar-productor');
  };

  const saveSellerProfile = (profile) => {
    setSellerProfile(profile);
    setRole('vender');
    setCurrentPage('panel-vender');
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRoleExplicit,
        goToSellerSection,
        currentPage,
        setCurrentPage,
        sellerProfile,
        saveSellerProfile,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
