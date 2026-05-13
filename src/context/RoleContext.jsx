import React, { createContext, useState } from 'react';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('consumidor');
  const [currentPage, setCurrentPage] = useState('home');

  const setRoleExplicit = (newRole) => {
    setRole(newRole);
    setCurrentPage('home');
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRoleExplicit,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
