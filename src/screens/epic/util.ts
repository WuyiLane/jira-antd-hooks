// 根据id看板跳转
import { useProjectIdInUrl } from '../kanban/util';

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useEpicsQueryKey = () => ['epics', useEpicSearchParams()];
