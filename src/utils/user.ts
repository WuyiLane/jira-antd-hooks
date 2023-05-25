import { useHttp } from './http';
import { useAsync } from './use-async';
import { useEffect } from 'react';
import { cleanObject } from './index';
import { User } from '../types/user';
// Partial<User>
export const useUsers = (param?: { name: string; personId: string }) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
