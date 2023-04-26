// 在一个函数里,改变传入的对象本身是不好的
import { useEffect, useState } from "react";

export const isFalsy = (value: number) => (value === 0 ? false : !value);
export const cleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// 只加载一次的空数组

export const useMount = (callback: any) => {
  useEffect(() => {
    callback();
  }, []);
};

// 重复请求无用的数据
// (value: { name: string; personId: string }, delay: number)  不确定几个值
export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    // 每次在value 变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
