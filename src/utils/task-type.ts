// 获取task-type的列表 --信息

import { useHttp } from './http';
import { useQuery } from 'react-query';
import { TaskType } from '../types/task-type';
// 请求封装
// ---- 获取列表------
export const useTaskTypes = () => {
  const client = useHttp();
  return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'));
};
