import { useHttp } from './http';
import { useQuery } from 'react-query';
import { ProjectTasks } from '../types/project';
import { Kanban } from 'types/kanban';
// 请求封装
// ---- 获取接口hooks列表 看板的状态------
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: param }));
};
