/***
 *  轻量版 redux
 *  封装 reducer  多种状态处理
 *   有可能 是不同的类型判断 <T>(initialPresent:T)
 *   export  const  useUndo = <T>(initialPresent:T) =>{
 *   const [ past,setPast] = useState<T[]>([])
 *  }
 *   useState 适合定义 单个状态
 *   useReducer 适合定义 一群 互相影响的状态
 *
 *
 *
 */
import { useCallback, useReducer } from 'react';

const UNDO = 'UNDO';
const REDO = 'DEDO';
const SET = 'SET';
const RESET = 'RESET';

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent } = action;

  switch (action.type) {
    case UNDO: {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case RESET: {
      if (future.length === 0) return state;
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
    }
    case SET: {
      if (newPresent === present) {
        return state;
      }
      return {
        past: [present, ...future],
        present: newPresent,
        future: [],
      };
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
  return state;
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);
  // const [past, setPast] = useState<T[]>([])
  // const [present, setPresent] = useState(initialPresent)
  // const [future, setFuture] = useState<T[]>([])
  /***
   *  减少复杂程度,合并状态,相互关联
   *
   */
  const canUndo = state.past.length !== 0; // 有历史记录
  const canRedo = state.future.length !== 0; // 没有历史记录
  /***
   * 在自定义hooks 里  return 的话  使用 useCallback
   */
  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, newPresent });
  }, []);
  const reset = useCallback((newPresent: T) => {
    dispatch({ type: RESET, newPresent });
  }, []);
  // 返回参数
  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
