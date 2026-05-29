import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RoleContext } from '../context/RoleContext';
import logo from '../logo.svg';

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

export const LoginPage = () => {
  const {
    authLoading,
    authError,
    login,
    register,
  } = useContext(AuthContext);
  const { setCurrentPage } = useContext(RoleContext);

  const [mode, setMode] = useState('login');
  const [loginForm, setLoginForm] = useState(loginInitialState);
  const [registerForm, setRegisterForm] = useState(registerInitialState);
  const [successMsg, setSuccessMsg] = useState('');

  const isLogin = mode === 'login';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMsg('');
    try {
      if (isLogin) {
        await login(loginForm);
        setCurrentPage('home');
      } else {
        await register(registerForm);
        setSuccessMsg('Cuenta creada correctamente. Ya puedes iniciar sesion.');
        setMode('login');
        setLoginForm({ email: registerForm.email, password: '' });
      }
    } catch {
      // error handled by AuthContext
    }
  };

  const handleGuest = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="surface-card w-full max-w-lg">
        <div className="text-center">
          <img src={logo} alt="CafeDirecto Sacramento" className="mx-auto h-14 w-14 rounded-2xl shadow-soft" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700 mt-4">
            {isLogin ? 'Iniciar sesion' : 'Crear cuenta'}
          </p>
          <h2 className="mt-2 font-display text-3xl text-soil-900">
            {isLogin
              ? 'Bienvenido de vuelta'
              : 'Registra una sola cuenta para comprar y vender'}
          </h2>
        </div>

        <div className="mt-6 flex rounded-full border border-soil-200 bg-soil-50 p-1">
          <button
            type="button"
            onClick={() => { setMode('login'); setSuccessMsg(''); }}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${
              isLogin ? 'bg-sky-600 text-white' : 'text-soil-700'
            }`}
          >
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setSuccessMsg(''); }}
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
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, fullName: e.target.value }))
              }
              required
            />
          )}

          <input
            className={`field ${isLogin ? 'md:col-span-2' : ''}`}
            type="email"
            placeholder="Correo electronico"
            value={isLogin ? loginForm.email : registerForm.email}
            onChange={(e) =>
              isLogin
                ? setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                : setRegisterForm((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />

          <input
            className={`field ${isLogin ? 'md:col-span-2' : ''}`}
            type="password"
            placeholder="Contrasena"
            value={isLogin ? loginForm.password : registerForm.password}
            onChange={(e) =>
              isLogin
                ? setLoginForm((prev) => ({ ...prev, password: e.target.value }))
                : setRegisterForm((prev) => ({ ...prev, password: e.target.value }))
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
                onChange={(e) =>
                  setRegisterForm((prev) => ({ ...prev, phone: e.target.value }))
                }
                required
              />
              <input
                className="field"
                placeholder="WhatsApp"
                value={registerForm.whatsappNumber}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    whatsappNumber: e.target.value,
                  }))
                }
                required
              />
            </>
          )}

          {successMsg && (
            <div className="md:col-span-2 rounded-2xl border border-leaf-200 bg-leaf-50 px-4 py-3 text-sm text-leaf-800 font-semibold">
              {successMsg}
            </div>
          )}

          {authError && (
            <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {authError}
            </div>
          )}

          <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="btn-primary flex-1" disabled={authLoading}>
              {authLoading
                ? 'Procesando...'
                : isLogin
                  ? 'Ingresar'
                  : 'Crear cuenta'}
            </button>
            <button type="button" className="btn-ghost flex-1" onClick={handleGuest}>
              Continuar como invitado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
