import React, { useContext, useState } from 'react';
import { RoleContext } from '../context/RoleContext';
import { AuthContext } from '../context/AuthContext';
import { RoleSelector } from './RoleSelector';

export const Header = () => {
  const { role, currentPage, setCurrentPage, sellerProfile, goToSellerSection } = useContext(RoleContext);
  const { isAuthenticated, user, openAuth, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems =
    role === 'vender' && sellerProfile?.activeSeller
      ? [
          { id: 'panel-vender', label: 'Panel' },
          { id: 'publicar', label: 'Publicar' },
          { id: 'mis-productos', label: 'Mis lotes' },
        ]
      : role === 'vender'
        ? [{ id: 'activar-productor', label: 'Completar perfil' }]
      : [
          { id: 'home', label: 'Inicio' },
          { id: 'catalogo', label: 'Catalogo' },
        ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-3 text-left"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-dashed border-soil-300 bg-soil-50 text-[10px] font-bold uppercase tracking-[0.16em] text-soil-500">
            Logo
          </div>
          <div>
            <p className="font-display text-2xl leading-none text-soil-900">
              CafeDirecto
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-soil-500">
              Sacramento
            </p>
          </div>
        </button>

        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentPage(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'bg-leaf-100 text-leaf-800'
                    : 'text-soil-600 hover:bg-soil-100 hover:text-soil-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <RoleSelector />
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <div className="rounded-full bg-soil-50 px-4 py-2 text-sm text-soil-700">
                <span className="font-semibold text-soil-900">{user.fullName}</span>
              </div>
              <button type="button" className="btn-ghost px-4 py-2" onClick={() => goToSellerSection()}>
                Vender
              </button>
              <button type="button" className="btn-secondary px-4 py-2" onClick={logout}>
                Cerrar sesion
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn-ghost px-4 py-2" onClick={() => openAuth('login')}>
                Ingresar
              </button>
              <button type="button" className="btn-secondary px-4 py-2" onClick={() => openAuth('register')}>
                Crear cuenta
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="ml-auto rounded-full border border-soil-200 bg-white p-3 text-soil-700 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Abrir menu"
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-soil-100 bg-white px-4 py-4 lg:hidden">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCurrentPage(item.id);
                  setMenuOpen(false);
                }}
                className="block w-full rounded-2xl bg-soil-50 px-4 py-3 text-left text-sm font-semibold text-soil-800"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <RoleSelector compact />
          </div>
          <div className="mt-4 grid gap-2">
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    goToSellerSection();
                    setMenuOpen(false);
                  }}
                  className="block w-full rounded-2xl bg-leaf-50 px-4 py-3 text-left text-sm font-semibold text-leaf-800"
                >
                  Ir a vender
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="block w-full rounded-2xl bg-soil-50 px-4 py-3 text-left text-sm font-semibold text-soil-800"
                >
                  Cerrar sesion
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    openAuth('login');
                    setMenuOpen(false);
                  }}
                  className="block w-full rounded-2xl bg-soil-50 px-4 py-3 text-left text-sm font-semibold text-soil-800"
                >
                  Ingresar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openAuth('register');
                    setMenuOpen(false);
                  }}
                  className="block w-full rounded-2xl bg-sky-50 px-4 py-3 text-left text-sm font-semibold text-sky-800"
                >
                  Crear cuenta
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
