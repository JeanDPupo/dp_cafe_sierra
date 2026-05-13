import React, { useContext } from 'react';
import './App.css';
import { RoleProvider, RoleContext } from './context/RoleContext';
import { ProductosProvider } from './context/ProductosContext';
import { Header } from './components/Header';
import { RoleSelector } from './components/RoleSelector';
import { HomeConsumidor } from './pages/Consumidor/HomeConsumidor';
import { Catalogo } from './pages/Consumidor/Catalogo';
import { DetalleProducto } from './pages/Consumidor/DetalleProducto';
import { PerfilProductor } from './pages/Consumidor/PerfilProductor';
import { HomeProductor } from './pages/Productor/HomeProductor';
import { CompletarPerfilProductor } from './pages/Productor/CompletarPerfilProductor';
import { PublicacionProductos } from './pages/Productor/PublicacionProductos';
import { MisProductos } from './pages/Productor/MisProductos';

function LogoPlaceholder() {
  return (
    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-soil-300 bg-white/80 text-[11px] font-semibold uppercase tracking-[0.18em] text-soil-500 shadow-soft">
      Logo
    </div>
  );
}

function LandingHero() {
  const { setCurrentPage, setRoleExplicit, goToSellerSection } = useContext(RoleContext);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-hero px-6 py-10 shadow-soft sm:px-8 lg:px-12 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
            Comercializacion directa de cafe
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-soil-900 sm:text-5xl lg:text-6xl">
            Una vitrina amable para mostrar el origen del cafe y comprar con confianza.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-soil-700 sm:text-lg">
            Productores de Sacramento y consumidores finales se encuentran en una
            experiencia clara, humana y sencilla. El proceso, la finca y la
            historia del cafe tambien cuentan.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                setRoleExplicit('comprar');
                setCurrentPage('catalogo');
              }}
              className="btn-primary"
            >
              Explorar cafes
            </button>
            <button
              onClick={() => {
                goToSellerSection('publicar');
              }}
              className="btn-ghost"
            >
              Publicar un lote
            </button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="stat-card">
              <span className="stat-value">Origen claro</span>
              <p className="stat-copy">Historia, finca y proceso visibles desde la primera vista.</p>
            </div>
            <div className="stat-card">
              <span className="stat-value">Contacto directo</span>
              <p className="stat-copy">WhatsApp como puente natural para cerrar la compra.</p>
            </div>
            <div className="stat-card">
              <span className="stat-value">PWA lista</span>
              <p className="stat-copy">Base instalable y cache de shell para crecer sin rehacer.</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="panel-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                  Espacio para marca
                </p>
                <h2 className="mt-2 font-display text-2xl text-soil-900">
                  Aqui ira tu logo
                </h2>
              </div>
              <LogoPlaceholder />
            </div>
            <p className="mt-4 text-sm leading-7 text-soil-600">
              Por ahora dejamos un placeholder limpio para que luego entren tu
              logo, favicon e iconos del manifiesto sin romper el diseno.
            </p>
          </div>

          <div className="panel-card">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
              Modo de vista
            </p>
            <div className="mt-4">
              <RoleSelector compact />
            </div>
            <p className="mt-4 text-sm leading-7 text-soil-600">
              No son tipos de usuario distintos: es la misma cuenta entrando a la
              seccion de comprar o a la de vender.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppContent() {
  const { role, currentPage, sellerProfile } = useContext(RoleContext);

  const renderPage = () => {
    if (role === 'vender') {
      if (!sellerProfile.activeSeller && currentPage !== 'activar-productor') {
        return <CompletarPerfilProductor />;
      }
      switch (currentPage) {
        case 'activar-productor':
          return <CompletarPerfilProductor />;
        case 'panel-vender':
          return <HomeProductor />;
        case 'publicar':
          return <PublicacionProductos />;
        case 'mis-productos':
          return <MisProductos />;
        default:
          return <HomeProductor />;
      }
    }

    switch (currentPage) {
      case 'catalogo':
        return <Catalogo />;
      case 'detalle-producto':
        return <DetalleProducto />;
      case 'perfil-productor':
        return <PerfilProductor />;
      default:
        return <HomeConsumidor />;
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f9f7f2_0%,#eefbf3_48%,#eef7ff_100%)] text-soil-900">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <LandingHero />
        {renderPage()}
      </main>
      <footer className="border-t border-soil-200/80 bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-soil-600 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="font-semibold text-soil-800">CafeDirecto Sacramento</p>
            <p>
              Plataforma de comercializacion de cafe con enfoque en trazabilidad,
              confianza, compra y venta desde una sola cuenta.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-soil-500">
            <span>PWA ready</span>
            <span className="h-1 w-1 rounded-full bg-soil-300" />
            <span>Responsive</span>
            <span className="h-1 w-1 rounded-full bg-soil-300" />
            <span>Demo 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <RoleProvider>
      <ProductosProvider>
        <AppContent />
      </ProductosProvider>
    </RoleProvider>
  );
}

export default App;
