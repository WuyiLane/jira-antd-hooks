import { useSetUrlSearchParam, useUrlQueryParam } from '../../utils/url';
import { useMemo } from 'react';
import { useProjects } from '../../utils/project';

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [
    // 重复刷新的问题解决
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam,
  ] as const;
};
export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ['projects', params];
};
/***
 * 取代 redux 或者 content 的作用
 */
export const useProjectModal = () => {
  /***
   * 创建
   */
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']);

  /***
   * 编辑
   */
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId']);
  const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useProjects(Number(editingProjectId));
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setUrlParams({ projectCreate: undefined, editingProjectId: undefined });
  };
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id });
  return {
    // 点击编辑的时候，loading 加载...
    ProjectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  } as const;
  /***
   * 如果返回 Partial 可以随便命名, 超过 三个以上  不能 Partial
   * return {  projectCreate:projectCreate === 'true', // 名字被限制
   *       open:open,
   *       close:close }
   *  const useTest = () =>{
   *      const [ created,openxx,closeXx] = useProjectModal
   *  }
   *
   *
   *
   */
};
