import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { Project } from '../types/project';
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';
// 请求封装
// ---- 获取列表------
export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }));
};

// ---- 选中列表编辑------
// id, param

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  /***
   *  使用useQuery, useMutation  刷新列表
   */
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    useEditConfig(queryKey)
  );
  //       data: params,
  //       method: 'PATCH',
  //     })
  // const mutate = (params: Partial<ProjectType>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: 'PATCH',
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};
// ------------ 添加列表-----------
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};
// 获取详情 当前id必须有值
export const useProjects = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
    enabled: Boolean(id),
  });
};

// 删除列表项数

export const useDelProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};
