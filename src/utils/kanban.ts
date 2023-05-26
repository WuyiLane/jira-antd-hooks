import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { ProjectTasks } from '../types/project';
import { Kanban } from 'types/kanban';
import { useAddConfig } from './use-optimistic-options';
import { Task } from '../types/task';
// 请求封装
// ---- 获取接口hooks列表 看板的状态------
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: param }));
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};
