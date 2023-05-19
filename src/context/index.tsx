// 根节点的全局信息封装
// children 子组件
import React from 'react';
import { AuthProvider } from './auth-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../store';
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider children={children}></AuthProvider>;
      </QueryClientProvider>
    </Provider>
  );
};
