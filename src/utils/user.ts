import { useHttp } from './http';
import { User } from '../types/user';
import { useQuery } from 'react-query';
// Partial<User>
// export const useUsers = (param?: { name: string; personId: string }) => {
//   const client = useHttp();
//   const { run, ...result } = useAsync<User[]>();
//   useEffect(() => {
//     run(client('users', { data: cleanObject(param || {}) }));
//   }, [param]);
//   return result;
// };

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(['users', param], () => client('users', { data: param }));
};
