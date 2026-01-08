import React, { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  name: string;
  profileImage: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

// Mock user data
const mockUser: User = {
  name: "Guest User",
  profileImage: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Return mock user if authenticated, else null
  const user = isAuthenticated ? mockUser : null;

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
