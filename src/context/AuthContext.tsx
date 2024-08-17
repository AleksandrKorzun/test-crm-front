import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";

import { UserType } from "../services/apiUsers";

interface AuthContextType {
  user?: UserType | null;
  setUser: (userData: UserType | null) => void;
  isLogin: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (!user?.isLogin) {
      setIsLogin(false);
      return;
    }
    setIsLogin(true);
  }, [user?.isLogin]);

  return (
    <AuthContext.Provider value={{ user, isLogin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
