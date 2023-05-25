import React, { useCallback, useState } from 'react';
import * as auth from 'auth-provider';
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from '../utils/use-async';
import { User, users } from '../types/user';
import { FullPageErrorFallback, FullPageLoading } from '../component/lib';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/auth.slice';
import * as authStore from 'store/auth.slice';
import { useQueryClient } from 'react-query';
export interface AuthForm {
  username: string;
  password: string;
}

// 防止刷新

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
};
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  // 防止 新注册用户, 看到的不是原始数据,清空老用户的数据
  const queryClient = useQueryClient();
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });
  useMount(() => {
    // 初始化setUser
    run(bootstrapUser());
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用');
  }
  return context;
};
