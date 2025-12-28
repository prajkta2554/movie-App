
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    return JSON.parse(localStorage.getItem("admin")) || null;
  });

  const login = (data) => {
    localStorage.setItem("admin", JSON.stringify(data));
    setAdmin(data);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    window.location.href = "/login"; 
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
