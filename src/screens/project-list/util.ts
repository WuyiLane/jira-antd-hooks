import { useUrlQueryParam } from '../../utils/url';
import { useMemo } from 'react';

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [
    // 重复刷新的问题解决
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam,
  ] as const;
};
