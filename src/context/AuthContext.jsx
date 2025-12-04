import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [logged, setLogged] = useState(
    localStorage.getItem("userLogged") === "true"
  );

  // Mantener sincronizado
  useEffect(() => {
    localStorage.setItem("userLogged", logged ? "true" : "false");
  }, [logged]);

  const login = () => setLogged(true);
  const logout = () => setLogged(false);

  return (
    <AuthContext.Provider value={{ logged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
