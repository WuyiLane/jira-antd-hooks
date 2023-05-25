/***
 *  返回页面url中, 指定键的参数值,弹窗打开或者关闭
 *
 */
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { cleanObject } from './index';

// 返回name=“骑手” id ="18"
// string
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || '' };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};
const a = ['jack', 12, { gender: 'male' }] as const;

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as unknown as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
