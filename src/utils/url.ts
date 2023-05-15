/***
 *  返回页面url中, 指定键的参数值
 *
 */
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { cleanObject } from './index';

// 返回name=“骑手” id ="18"
// string
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || '' };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [setSearchParam]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as unknown as URLSearchParams;
      return setSearchParam(o);
    },
  ] as const;
};
const a = ['jack', 12, { gender: 'male' }] as const;
