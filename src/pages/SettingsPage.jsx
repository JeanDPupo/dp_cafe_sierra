import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RoleContext } from '../context/RoleContext';

export const SettingsPage = () => {
  const { user, logout } = useContext(AuthContext);
  const { setCurrentPage } = useContext(RoleContext);
  const [themeOpen, setThemeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState('es');
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleExportData = () => {
    const data = {
      user,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cafedirecto-datos-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  return (
    <section className="surface-card max-w-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
        Configuracion
      </p>
      <h2 className="mt-3 section-title">Tu cuenta y preferencias</h2>
      <p className="mt-3 section-copy">
        Gestiona tu perfil, la apariencia de la plataforma y la privacidad de tus datos.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-2xl bg-soil-50 p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Cuenta</p>
          <div className="mt-3 space-y-2">
            <p className="text-sm text-soil-800">
              <span className="font-semibold">Nombre:</span>{' '}
              {user?.fullName || 'Invitado'}
            </p>
            <p className="text-sm text-soil-800">
              <span className="font-semibold">Correo:</span>{' '}
              {user?.email || 'No disponible'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-soil-50 p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Apariencia</p>
          <div className="mt-3 space-y-3">
            <div>
              <button
                type="button"
                onClick={() => { setThemeOpen((prev) => !prev); setLangOpen(false); }}
                className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm text-soil-800 shadow-sm hover:bg-soil-100"
              >
                <span className="font-semibold">Tema</span>
                <span className="text-soil-500">Claro</span>
              </button>
              {themeOpen && (
                <div className="mt-2 rounded-xl border border-soil-200 bg-white p-3 space-y-2">
                  {['Claro', 'Oscuro'].map((t) => (
                    <label key={t} className="flex items-center gap-3 text-sm text-soil-800 cursor-pointer hover:bg-soil-50 rounded-lg px-3 py-2">
                      <input type="radio" name="theme" defaultChecked={t === 'Claro'} disabled={t === 'Oscuro'} className="accent-leaf-600" />
                      <span>{t} {t === 'Oscuro' && '(proximamente)'}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => { setLangOpen((prev) => !prev); setThemeOpen(false); }}
                className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm text-soil-800 shadow-sm hover:bg-soil-100"
              >
                <span className="font-semibold">Idioma</span>
                <span className="text-soil-500">{language === 'es' ? 'Espanol' : 'English'}</span>
              </button>
              {langOpen && (
                <div className="mt-2 rounded-xl border border-soil-200 bg-white p-3 space-y-2">
                  {[
                    { code: 'es', label: 'Espanol' },
                    { code: 'en', label: 'English' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={`block w-full rounded-lg px-4 py-2 text-left text-sm ${
                        language === l.code
                          ? 'bg-leaf-100 text-leaf-800 font-semibold'
                          : 'text-soil-700 hover:bg-soil-50'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-soil-50 p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Datos</p>
          <div className="mt-3 space-y-3">
            <button
              type="button"
              onClick={handleExportData}
              className="btn-ghost w-full justify-center"
            >
              Exportar mis datos
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-soil-50 p-5">
          <div className="mt-1">
            {!confirmLogout ? (
              <button
                type="button"
                onClick={() => setConfirmLogout(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-red-300 bg-red-50 px-6 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100"
              >
                Cerrar sesion
              </button>
            ) : (
              <div className="space-y-3 text-center">
                <p className="text-sm text-red-700 font-semibold">Estas seguro de cerrar sesion?</p>
                <div className="flex gap-3 justify-center">
                  <button type="button" onClick={handleLogout} className="btn-primary bg-red-600 hover:bg-red-700">
                    Si, cerrar sesion
                  </button>
                  <button type="button" onClick={() => setConfirmLogout(false)} className="btn-ghost">
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
