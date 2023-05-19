/***
 *  封装 reducer  多种状态处理
 *   有可能 是不同的类型判断 <T>(initialPresent:T)
 *   export  const  useUndo = <T>(initialPresent:T) =>{
 *   const [ past,setPast] = useState<T[]>([])
 *  }
 *
 */
import { useCallback, useState } from 'react';

export const useUndo = <T>(initialPresent: T) => {
  // const [past, setPast] = useState<T[]>([])
  // const [present, setPresent] = useState(initialPresent)
  // const [future, setFuture] = useState<T[]>([])
  /***
   *  减少复杂程度,合并状态,相互关联
   *
   */
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });
  const canUndo = state.past.length !== 0; // 有历史记录
  const canRedo = state.future.length !== 0; // 没有历史记录
  /***
   * 在自定义hooks 里  return 的话  使用 useCallback
   */
  const undo = useCallback(() => {
    setState(currentState => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState(currentState => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;
      const next = future[0];
      const newFuture = future.slice(1);
      /***
       *  通过合并生成一个新的state => reducer
       */
      return {
        past: [present, ...future],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState(currentState => {
      const { past, present, future } = currentState;
      if (newPresent === present) {
        return currentState;
      }
      return {
        past: [present, ...future],
        present: newPresent,
        future: [],
      };
    });
  }, []);
  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);
  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
