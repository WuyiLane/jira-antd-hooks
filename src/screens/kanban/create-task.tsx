import React, { useEffect, useState } from 'react';
import { useAddTask } from '../../utils/task';
import { useProjectIdInUrl, useTasksQueryKey } from './util';
import { Card, Input } from 'antd';
// 新建事务
// 解构赋值命名的常量变量。{kanbanId}:{kanbanId:number}
export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('');
  // 声明了一个addTask使用解构赋值命名的常量变量。的值addTask是函数在传递 的参数时mutateAsync返回的对象的属性
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    // 输入状态
    setInputMode(false);
    setName(''); // 清空
  };
  const toggle = () => setInputMode(!inputMode);
  /***
   * 输入状态和非输入状态变化的时候
   */
  useEffect(() => {
    if (!inputMode) {
      setName('');
    }
  }, [inputMode]); // 根据状态判断
  if (!inputMode) {
    //不是inputMode
    return <div onClick={toggle}>+创建事务</div>;
  }
  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={'需要做些什么'}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={env => setName(env.target.value)}
      />
    </Card>
  );
};
