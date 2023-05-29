// 竖的看板样式
import React from 'react';
import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';
import { useKanbansQueryKey, useTasksModal, useTasksSeachParams } from './util';
import { useTaskTypes } from '../../utils/task-type';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import { CreateTask } from 'screens/kanban/create-task';
import { Task } from '../../types/task';
import { Mark } from '../../component/mark';
import { useDelKanban } from '../../utils/kanban';
import { Row } from 'component/lib';
import { Drag, Drop, DropChild } from '../../component/drag-and-drop';
// 根据id 渲染图片组件

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find(taskTypes => taskTypes.id === id)?.name; //查找对应的id
  if (!name) {
    return null;
  }
  return <Img alt={'task-icon'} src={name === 'task' ? taskIcon : bugIcon} />;
};

// 抽离Card组件

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSeachParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      key={task.id}
    >
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

// kanban 解构
export const KanbanColumn =
  // 转发
  React.forwardRef<HTMLDivElement, { kanban: Kanban }>(({ kanban, ...props }, ref) => {
    const { data: allTasks } = useTasks(useTasksSeachParams());
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);

    return (
      <Container {...props} ref={ref}>
        <Row between={true}>
          <h3>{kanban.name}</h3>
          <More kanban={kanban} key={kanban.id} />
        </Row>
        <TasksContainer>
          <Drop type={'ROW'} direction={'vertical'} droppableId={String(kanban.id)}>
            <DropChild>
              {tasks?.map((task, taskIndex) => (
                <Drag draggableId={'task' + task.id} index={taskIndex} key={task.id}>
                  <div>
                    <TaskCard task={task} key={task.id} />
                  </div>
                </Drag>
              ))}
            </DropChild>
          </Drop>
          <CreateTask kanbanId={kanban.id} />
        </TasksContainer>
      </Container>
    );
  });
const More = ({ kanban }: { kanban: Kanban }) => {
  // 操作删除引入接口
  const { mutateAsync } = useDelKanban(useKanbansQueryKey());
  // 删除功能
  const startEdit = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗?',
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };
  // 鼠标悬浮
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={'link'} onClick={startEdit}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={'link'}>...</Button>
    </Dropdown>
  );
};
const Img = styled.img`
  width: auto;
  height: 20px;
`;
export const Container = styled.div`
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
