import { useState } from 'react';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialSate: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};
const defaultConfig = {
  throwOnError: false,
};
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {
    ...defaultConfig,
    initialConfig,
  };
  // 将函数运行 useState直接传入函数的含义是: 惰性初始化
  // 返回是个函数
  const [retry, setRetry] = useState(() => () => {});
  const [state, setState] = useState({
    ...defaultInitialSate,
    ...initialState,
  });
  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      stat: 'error',
      data: null,
    });
  // run 用来 触发 异步请求
  const run = (
    promise: Promise<D>,
    runConfig?: {
      retry: () => Promise<D>;
    }
  ) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据');
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    // state 更新
    setState({ ...state, stat: 'loading' });
    return promise
      .then(data => {
        setData(data);
        return data;
      })
      .catch(error => {
        setError(error);
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    // 当 retry 发生变化的时候重新执行run
    retry,

    ...state,
  };
};
