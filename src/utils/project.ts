import { useHttp } from './http';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Project } from '../types/project';
import { useProjectsSearchParams } from '../screens/project-list/util';
import { projects } from 'jira-dev-tool/dist/server/initial-data';
// 请求封装
// ---- 获取列表------
export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }));
};

// ---- 选中列表编辑------
// id, param

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const [searchParams] = useProjectsSearchParams();
  const queryKey = ['projects', searchParams];
  /***
   *  使用useQuery, useMutation  刷新列表
   */
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      onMutate: async function (target) {
        const previousItems = queryClient.getQueryData(queryKey);
        // 缓存 获取刷新的数据
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return old?.map(project =>
            project.id === target.id ? { ...project, ...target } : project || []
          ) as Project[];
        });
        return { previousItems };
      },
      onError(error, newItemm, context) {
        queryClient.setQueryData(queryKey, (context as { previousItems: Project[] }).previousItems);
      },
    }
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
export const useAddProject = () => {
  const queryClient = useQueryClient();
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  );
};
// 获取详情 当前id必须有值
export const useProjects = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
    enabled: Boolean(id),
  });
};
