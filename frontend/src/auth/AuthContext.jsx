import React, { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);

const LS_TOKEN = "libmanager_token";
const LS_USER = "libmanager_user";

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem(LS_TOKEN) || "");
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  // Save token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem(LS_TOKEN, token);
    } else {
      localStorage.removeItem(LS_TOKEN);
    }
  }, [token]);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(LS_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LS_USER);
    }
  }, [user]);

  const isAuthenticated = !!token;

  // Frontend-only login untuk testing (tanpa backend)
  async function login(payload) {
    setLoading(true);
    
    // Simulasi delay seperti API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const { email, role, name } = payload;
      
      // Generate mock token
      const mockToken = `mock_token_${Date.now()}`;
      
      const userData = {
        id: Date.now().toString(),
        email: email || `${role}@library.com`,
        name: name || (role === 'user' ? 'Member Perpustakaan' : 'Staf Perpustakaan'),
        role, // 'user' atau 'librarian'
        loginTime: new Date().toISOString()
      };

      setTokenState(mockToken);
      setUser(userData);

      return { ok: true };
    } catch (e) {
      return { ok: false, message: 'Login gagal' };
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setTokenState("");
    setUser(null);
  }

  const hasRole = (requiredRole) => {
    return user && user.role === requiredRole;
  };

  const value = {
    token,
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasRole
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
