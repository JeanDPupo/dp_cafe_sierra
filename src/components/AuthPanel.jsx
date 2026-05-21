import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const loginInitialState = {
  email: '',
  password: '',
};

const registerInitialState = {
  fullName: '',
  email: '',
  password: '',
  phone: '',
  whatsappNumber: '',
};

export const AuthPanel = () => {
  const {
    authOpen,
    authMode,
    authLoading,
    authError,
    closeAuth,
    setAuthMode,
    login,
    register,
  } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState(loginInitialState);
  const [registerForm, setRegisterForm] = useState(registerInitialState);

  if (!authOpen) {
    return null;
  }

  const isLogin = authMode === 'login';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      await login(loginForm);
      return;
    }
    await register(registerForm);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-soil-900/45 px-4 py-8 backdrop-blur-sm">
      <div className="surface-card w-full max-w-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
              {isLogin ? 'Entrar' : 'Crear cuenta'}
            </p>
            <h2 className="mt-2 font-display text-3xl text-soil-900">
              {isLogin
                ? 'Ingresa con tu cuenta'
                : 'Registra una sola cuenta para comprar y vender'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-soil-600">
              No necesitas elegir entre comprador o productor. Esa decision la tomas
              despues, entrando a la zona de venta y completando tu perfil productor.
            </p>
          </div>
          <button type="button" onClick={closeAuth} className="btn-ghost px-4 py-2">
            Cerrar
          </button>
        </div>

        <div className="mt-6 flex rounded-full border border-soil-200 bg-soil-50 p-1">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${
              isLogin ? 'bg-sky-600 text-white' : 'text-soil-700'
            }`}
          >
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${
              !isLogin ? 'bg-leaf-600 text-white' : 'text-soil-700'
            }`}
          >
            Registrarme
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          {!isLogin && (
            <input
              className="field md:col-span-2"
              placeholder="Nombre completo"
              value={registerForm.fullName}
              onChange={(event) =>
                setRegisterForm((prev) => ({ ...prev, fullName: event.target.value }))
              }
              required
            />
          )}

          <input
            className={`field ${isLogin ? 'md:col-span-2' : ''}`}
            type="email"
            placeholder="Correo electronico"
            value={isLogin ? loginForm.email : registerForm.email}
            onChange={(event) =>
              isLogin
                ? setLoginForm((prev) => ({ ...prev, email: event.target.value }))
                : setRegisterForm((prev) => ({ ...prev, email: event.target.value }))
            }
            required
          />

          <input
            className={`field ${isLogin ? 'md:col-span-2' : ''}`}
            type="password"
            placeholder="Contrasena"
            value={isLogin ? loginForm.password : registerForm.password}
            onChange={(event) =>
              isLogin
                ? setLoginForm((prev) => ({ ...prev, password: event.target.value }))
                : setRegisterForm((prev) => ({ ...prev, password: event.target.value }))
            }
            required
            minLength={8}
          />

          {!isLogin && (
            <>
              <input
                className="field"
                placeholder="Telefono"
                value={registerForm.phone}
                onChange={(event) =>
                  setRegisterForm((prev) => ({ ...prev, phone: event.target.value }))
                }
                required
              />
              <input
                className="field"
                placeholder="WhatsApp"
                value={registerForm.whatsappNumber}
                onChange={(event) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    whatsappNumber: event.target.value,
                  }))
                }
                required
              />
            </>
          )}

          {authError && (
            <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {authError}
            </div>
          )}

          <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="btn-primary" disabled={authLoading}>
              {authLoading
                ? 'Procesando...'
                : isLogin
                  ? 'Ingresar'
                  : 'Crear cuenta'}
            </button>
            <button type="button" className="btn-ghost" onClick={closeAuth}>
              Seguir explorando
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
