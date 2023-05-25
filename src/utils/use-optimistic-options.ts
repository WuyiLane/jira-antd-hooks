import { QueryKey, useQueryClient } from 'react-query';
import { Project } from '../types/project';

/**
 * 乐观更新
 * @param queryKey
 * @param callback
 */
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old: any[] | undefined) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onMutate: async function (target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      // 缓存 获取刷新的数据
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    onError(error: any, newItemm: any, context: any) {
      queryClient.setQueryData(queryKey, (context as { previousItems: Project[] }).previousItems);
    },
  };
};
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => old?.filter(item => item.id !== target.id) || []);
/**
 * 使用乐观更新解决  hooks 中使用条件的问题
 * @param queryKey
 */
// ------ 错误的代码 -----------
// export const useEditConfig = (queryKey: QueryKey) =>
//   useConfig(queryKey, (target, old) => old?.map(item => item.id !== target.id) || []);

// ---------- 正确的代码 ---------

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.map(item => (item.id === target.id ? { ...item, ...target } : item)) || []
  );

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
