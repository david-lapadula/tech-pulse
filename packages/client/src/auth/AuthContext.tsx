import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<{ [key: string]: string }>({
    admin: "password" // Default user for testing
  });

  const login = (username: string, password: string): boolean => {
    if (users[username] === password) {
      setUser({ name: username });
      return true;
    }
    return false;
  };

  const signup = (username: string, password: string): boolean => {
    if (users[username]) {
      return false; // Username already exists
    }
    setUsers(prev => ({ ...prev, [username]: password }));
    setUser({ name: username });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
