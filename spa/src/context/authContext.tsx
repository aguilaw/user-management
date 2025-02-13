import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  const getUser = async () => {
    try {
      console.log("token", token);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("gotUser", data);
      setUser(data);
    } catch (error) {
      logout();
    }
  };

  const login = (token: string, userData: User) => {
    console.log("token", token);

    localStorage.setItem("token", token);
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
