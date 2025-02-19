import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Define the structure of a User object
type User = { username: string; role: number } | null;

// Define the context type
interface AuthContextType {
  currentUser: User;
  authToken: string | null;
  loading: boolean;
  setUser: (username: string, role: number, token: string) => void;
  handleLogout: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Load user and token from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
      setAuthToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  // Save user and token to localStorage when they change
  useEffect(() => {
    if (currentUser && authToken) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("authToken");
    }
  }, [currentUser, authToken]);

  // Function to set the current user and authentication token
  const setUser = (username: string, role: number, token: string) => {
    setCurrentUser({ username, role });
    setAuthToken(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  // Function to handle user logout and reset the current user and authentication token
  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ currentUser, authToken, loading, setUser, handleLogout, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};