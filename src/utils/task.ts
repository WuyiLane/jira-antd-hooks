import { useHttp } from './http';
import { useQuery } from 'react-query';
import { Project, ProjectTasks } from '../types/project';
import { Task } from 'types/task';
// 请求封装
// ---- 获取列表------
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }));
};
