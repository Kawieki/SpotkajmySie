import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const getUserFromToken = (token) => {
  const decoded = jwtDecode(token);

  if (decoded.exp * 1000 < Date.now()) {
    throw new Error("Token expired");
  }

  let id =
    decoded.sub ||
    decoded.nameid ||
    decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];

  if (id instanceof ArrayBuffer) {
    id = btoa(String.fromCharCode(...new Uint8Array(id)));
  }

  return {
    id,
    email:
      decoded.email ||
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ],
    role:
      decoded.role ||
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearAuth = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const userData = getUserFromToken(token);
      setUser(userData);
    } catch (err) {
      console.warn("Invalid token:", err.message);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const userData = getUserFromToken(token);
    setUser(userData);
  };

  const logout = () => {
    clearAuth();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
