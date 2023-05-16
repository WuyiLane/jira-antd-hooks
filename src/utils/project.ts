import { useCallback, useEffect } from 'react';
import { cleanObject } from './index';
import { useAsync } from './use-async';
import { ProjectType } from 'screens/project-list/list';
import { useHttp } from './http';
// 请求封装
// ---- 获取列表------
export const useProject = (param?: Partial<ProjectType>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<ProjectType[]>();
  // usecallback 函数
  const fetchProjects = useCallback(
    () =>
      client('projects', {
        data: cleanObject(param || {}),
      }),
    [param, client]
  );
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param, run, fetchProjects]);
  return result;
};

// ---- 选中列表编辑------
// id, param

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<ProjectType>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

// ------------ 添加列表-----------
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<ProjectType>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'POST',
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
