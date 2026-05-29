import React, { useContext, useState } from 'react';
import { RoleContext } from '../context/RoleContext';
import { AuthContext } from '../context/AuthContext';
import { RoleSelector } from './RoleSelector';

export const Header = () => {
  const { role, currentPage, setCurrentPage } = useContext(RoleContext);
  const { isAuthenticated, openAuth, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems =
    role === 'productor'
      ? [
          { id: 'home', label: 'Panel' },
          { id: 'publicar', label: 'Publicar' },
          { id: 'mis-productos', label: 'Mis lotes' },
          { id: 'mis-fincas', label: 'Fincas' },
          { id: 'mis-ventas', label: 'Ventas' },
          { id: 'configurar-pagos', label: 'Pagos' },
        ]
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
          <img src="/logo-brand.jpeg" alt="CafeDirecto Sacramento" className="h-11 w-11 rounded-2xl object-cover shadow-soft" />
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

        <div className="hidden flex items-center gap-2 lg:flex">
          {isAuthenticated ? (
            <>
              <button
                type="button"
                onClick={() => setCurrentPage('carrito')}
                className="rounded-full px-4 py-2 text-sm font-semibold text-soil-600 hover:bg-soil-100 hover:text-soil-900"
              >
                Carrito
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('pedidos')}
                className="rounded-full px-4 py-2 text-sm font-semibold text-soil-600 hover:bg-soil-100 hover:text-soil-900"
              >
                Pedidos
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-soil-600 hover:bg-soil-100 hover:text-soil-900"
                >
                  Cuenta
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-2xl border border-soil-200 bg-white p-2 shadow-soft">
                    <button
                      type="button"
                      onClick={() => { setCurrentPage('settings'); setUserMenuOpen(false); }}
                      className="block w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-soil-800 hover:bg-soil-50"
                    >
                      Configuracion
                    </button>
                    <button
                      type="button"
                      onClick={() => { logout(); setCurrentPage('home'); setUserMenuOpen(false); }}
                      className="block w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-red-700 hover:bg-red-50"
                    >
                      Cerrar sesion
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setCurrentPage('onboarding')}
                className="rounded-full px-4 py-2 text-sm font-semibold text-soil-600 hover:bg-soil-100 hover:text-soil-900"
              >
                Como funciona
              </button>
              <button
                type="button"
                onClick={() => openAuth('login')}
                className="btn-primary"
              >
                Ingresar
              </button>
            </>
          )}
          <RoleSelector compact />
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
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => { setCurrentPage('carrito'); setMenuOpen(false); }}
                  className="block w-full rounded-2xl bg-soil-50 px-4 py-3 text-left text-sm font-semibold text-soil-800"
                >
                  Carrito
                </button>
                <button
                  type="button"
                  onClick={() => { setCurrentPage('pedidos'); setMenuOpen(false); }}
                  className="block w-full rounded-2xl bg-soil-50 px-4 py-3 text-left text-sm font-semibold text-soil-800"
                >
                  Pedidos
                </button>
                <button
                  type="button"
                  onClick={() => { setCurrentPage('settings'); setMenuOpen(false); }}
                  className="block w-full rounded-2xl bg-soil-50 px-4 py-3 text-left text-sm font-semibold text-soil-800"
                >
                  Configuracion
                </button>
                <button
                  type="button"
                  onClick={() => { setCurrentPage('configurar-pagos'); setMenuOpen(false); }}
                  className="block w-full rounded-2xl bg-soil-50 px-4 py-3 text-left text-sm font-semibold text-soil-800"
                >
                  Configurar pagos
                </button>
                <button
                  type="button"
                  onClick={() => { setCurrentPage('mis-ventas'); setMenuOpen(false); }}
                  className="block w-full rounded-2xl bg-soil-50 px-4 py-3 text-left text-sm font-semibold text-soil-800"
                >
                  Mis ventas
                </button>
                <button
                  type="button"
                  onClick={() => { logout(); setCurrentPage('home'); setMenuOpen(false); }}
                  className="block w-full rounded-2xl bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-700"
                >
                  Cerrar sesion
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => { setCurrentPage('onboarding'); setMenuOpen(false); }}
                  className="block w-full rounded-2xl bg-soil-50 px-4 py-3 text-left text-sm font-semibold text-soil-800"
                >
                  Como funciona
                </button>
                <button
                  type="button"
                  onClick={() => { openAuth('login'); setMenuOpen(false); }}
                  className="block w-full rounded-2xl bg-leaf-600 px-4 py-3 text-left text-sm font-bold text-white"
                >
                  Ingresar
                </button>
              </>
            )}
          </div>
          <div className="mt-4">
            <RoleSelector compact />
          </div>
        </div>
      )}
    </header>
  );
};
