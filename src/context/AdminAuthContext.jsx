import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AdminAuthContext = createContext();
const STORAGE_KEY = 'admin_session_active';

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem(STORAGE_KEY) === 'true');

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      return;
    }

    sessionStorage.removeItem(STORAGE_KEY);
  }, [isAuthenticated]);

  const login = (username, password) => {
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      setIsAuthenticated(false);
      return { ok: false, reason: 'missing-config' };
    }

    const isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
    setIsAuthenticated(isValid);
    return { ok: isValid, reason: isValid ? null : 'invalid-credentials' };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export const useAdminAuth = () => useContext(AdminAuthContext);
