import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const STORAGE_KEY = 'cafe-directo-session';

export const AuthContext = createContext();

function readStoredSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const bootstrap = async () => {
      const stored = readStoredSession();
      if (!stored?.token) {
        setSessionReady(true);
        return;
      }

      try {
        const me = await api.me(stored.token);
        setToken(stored.token);
        setUser(me);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setSessionReady(true);
      }
    };

    bootstrap();
  }, []);

  const persistSession = (payload) => {
    setToken(payload.token);
    setUser(payload.user);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ token: payload.token, user: payload.user })
    );
  };

  const openAuth = useCallback((mode = 'login') => {
    setAuthMode(mode);
    setAuthError('');
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setAuthOpen(false);
    setAuthError('');
  }, []);

  const login = useCallback(async (credentials) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const response = await api.login(credentials);
      persistSession(response);
      closeAuth();
      return response;
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  }, [closeAuth]);

  const register = useCallback(async (payload) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const response = await api.register(payload);
      persistSession(response);
      closeAuth();
      return response;
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  }, [closeAuth]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      sessionReady,
      authOpen,
      authMode,
      authLoading,
      authError,
      setAuthMode,
      openAuth,
      closeAuth,
      login,
      register,
      logout,
    }),
    [
      token,
      user,
      sessionReady,
      authOpen,
      authMode,
      authLoading,
      authError,
      openAuth,
      closeAuth,
      login,
      register,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
