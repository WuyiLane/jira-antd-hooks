import { useEffect } from 'react';
import { cleanObject } from './index';
import { useAsync } from './use-async';
import { ProjectType } from 'screens/project-list/list';
import { useHttp } from './http';

export const useProject = (param?: { name: string; personId: string }) => {
  const client = useHttp();
  const { run, ...result } = useAsync<ProjectType[]>();

  useEffect(() => {
    run(
      client('projects', {
        data: cleanObject(param || {}),
      })
    );
  }, [param]);
  return result;
};
