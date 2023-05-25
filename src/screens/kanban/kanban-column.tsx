// 竖的看板样式
import React from 'react';
import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';
import { useTasksSeachParams } from './util';
import { useTaskTypes } from '../../utils/task-type';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Card } from 'antd';
// 根据id 渲染图片组件

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find(taskTypes => taskTypes.id === id)?.name; //查找对应的id
  if (!name) {
    return null;
  }
  return <Img src={name === 'task' ? taskIcon : bugIcon} />;
};

// kanban 解构
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSeachParams());
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map(task => (
          <Card key={task.id}>
            <div>{task.name}</div>

            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TasksContainer>
    </Container>
  );
};
const Img = styled.img`
  width: auto;
  height: 20px;
`;
const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  // 超过容器的时候, 上下滚动
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
