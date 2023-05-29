import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { useAddConfig, useDeleteConfig } from './use-optimistic-options';
import { Epic } from '../types/epic-epic';
// 请求封装
// ---- 获取接口hooks列表 看板的状态------
export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();
  return useQuery<Epic[]>(['epics', param], () => client('epics', { data: param }));
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};

// 删除列表项数

export const useDelEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};
