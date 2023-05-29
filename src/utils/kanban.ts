import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { Kanban } from 'types/kanban';
import {
  useAddConfig,
  useDeleteConfig,
  useReorderTaskInsertConfig,
} from './use-optimistic-options';
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

// 删除列表项数

export const useDelKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  /***
   * 要重新排序的item
   */
  fromId: number;
  /***
   * 目标item
   */
  referenceId: number;
  /***
   * 放在目标item的前还是后
   */
  type: 'before' | 'after';
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: SortProps) => {
      return client('kanbans/reorder', {
        data: params,
        method: 'POST',
      });
    },
    // 乐观更新
    useReorderTaskInsertConfig(queryKey)
  );
};
