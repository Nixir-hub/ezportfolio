// src/components/AuthContext.jsx

import { createContext, useState, useEffect } from "react";
import {apiFetch} from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔥 Dekoder JWT bez biblioteki
  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  // 🔥 Ładowanie użytkownika z localStorage po starcie
  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser({
          id: decoded.user_id,
          username: decoded.username,
        });
      }
    }
  }, []);

  // 🔥 Logowanie – zapis tokenów + usera
 const login = async (data) => {
  // zapis JWT
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);

  setUser({
    username: data.username
  });
};

const logout = async () => {
  const refresh = localStorage.getItem("refresh");
  if (refresh) {
    await apiFetch("/logout/", {
      method: "POST",
      body: JSON.stringify({ refresh }),
    });
  }

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
