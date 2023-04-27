import React, { useState } from 'react';
import * as providerAuth from '../auth-provider';
import { User } from '../screens/project-list/search-panel';
type AuthForm = {
  username: string;
  password: string;
};
type AuthContextType = {
  user: User | null;
  // 指定泛型类型
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => providerAuth.login(form).then(setUser);
  const register = (form: AuthForm) => providerAuth.register(form).then(setUser);
  const logout = () => providerAuth.logout().then(() => setUser(null));
  return <AuthContext.Provider value={{ user, login, register, logout }} />;
};

// 自定义hooks
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('必须要在 AuthProvider 中使用');
  }
  return context;
};
