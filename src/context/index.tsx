// 根节点的全局信息封装
// children 子组件
import React from 'react';
import { AuthProvider } from './auth-context';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
