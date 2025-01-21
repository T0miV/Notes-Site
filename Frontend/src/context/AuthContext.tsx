import React, { createContext, useState, useEffect, ReactNode } from "react";

// Määritellään käyttäjätiedot ja autentikointitoken
interface AuthContextType {
  currentUser: { username: string; role: number } | null;
  authToken: string | null;
  setUser: (username: string, role: number, token: string) => void;
  handleLogout: () => void;
}

// Luo konteksti ja määritä oletusarvot
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<{ username: string; role: number } | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Ladataan käyttäjä ja token localStorage:sta
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
      setAuthToken(storedToken);
    }
  }, []);

  // Talletetaan käyttäjä ja token localStorage:een
  useEffect(() => {
    if (currentUser && authToken) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("authToken");
    }
  }, [currentUser, authToken]);

  const setUser = (username: string, role: number, token: string) => {
    setCurrentUser({ username, role });
    setAuthToken(token);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, authToken, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
