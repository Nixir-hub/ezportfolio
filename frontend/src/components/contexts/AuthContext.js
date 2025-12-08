import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  const isTokenExpired = (decoded) => {
    if (!decoded?.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  };

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) return;

    const decoded = decodeToken(access);

    if (!decoded || isTokenExpired(decoded)) {
      logout(); // automatycznie wyloguj
      return;
    }

    setUser({
      id: decoded.user_id,
      username: decoded.username,
    });
  }, []);

  const login = ({ access, refresh }) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    const decoded = decodeToken(access);
    if (!decoded) return;

    setUser({
      id: decoded.user_id,
      username: decoded.username,
    });
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
