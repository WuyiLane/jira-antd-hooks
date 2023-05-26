import { useHttp } from './http';
import { useQuery } from 'react-query';
import { Project, ProjectTasks } from '../types/project';
import { Task } from 'types/task';
import { QueryKey, useMutation } from 'react-query';
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';
import { Kanban } from '../types/kanban';
// 请求封装
// ---- 获取列表------
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }));
};
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  /***
   *  使用useQuery, useMutation  刷新列表
   */
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};

// 删除列表项数

export const useDelTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};

// 删除任务

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};
