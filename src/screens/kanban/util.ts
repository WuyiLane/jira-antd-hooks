import { useLocation } from 'react-router';
import { useProjects } from 'utils/project';
import { useUrlQueryParam } from '../../utils/url';
import { useCallback, useMemo } from 'react';
import { useTask, useTasks } from '../../utils/task';

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};
export const useProjectInUrl = () => useProjects(useProjectIdInUrl());

// 根据id看板跳转
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()];
// 优化搜索框
export const useTasksSeachParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId']);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      // 搜索条件
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};

export const useTasksQueryKey = () => ['tasks', useTasksSeachParams()];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId']);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  // 关闭模态框
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' });
  }, [setEditingTaskId]);
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
