import React, { useCallback } from 'react';
import { useDocumentTitle } from '../../utils';
import { useKanbans, useReorderKanban } from '../../utils/kanban';
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSeachParams,
} from './util';
import styled from '@emotion/styled';
import { KanbanColumn } from './kanban-column';
import { SearchPanel } from './search-panel';
import { TaskModal } from './task-modal';
import { useReorderTask, useTasks } from '../../utils/task';
import { Spin } from 'antd';
import { ScreenContainer } from '../../component/lib';
import { CreateKanban } from './create-kanban';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Drag, Drop, DropChild } from '../../component/drag-and-drop';

export const KanbanSCreen = () => {
  useDocumentTitle('看板列表');
  //data:currentProject // 自定义的值
  const { data: currentProject } = useProjectInUrl();
  // @ts-ignore
  const { data: kanbans = [], isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams());
  const { isLoading: taskIsLoading } = useTasks(useTasksSeachParams());
  const isLoading = taskIsLoading || kanbanIsLoading;
  const onDragEnd = useDragEnd();
  return (
    // 实现拖拽功能
    // (...params) => {
    //             onDragEnd
    //             //持久化
    //         }
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name} 看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <CloumnContainer>
            {/*// 水平排列*/}
            <Drop type={'COLUMN'} direction={'horizontal'} droppableId={'kanban'}>
              <DropChild style={{ display: 'flex' }}>
                {kanbans?.map((kanban, index) => (
                  <Drag draggableId={'kanban' + kanban.id} key={kanban.id} index={index}>
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </CloumnContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  // 获取看板的信息
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  // 获取task的信息
  const { data: allTasks = [] } = useTasks(useTasksSeachParams());
  /**
   * hooks 里面返回的函数要用 useCallback
   */
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        // 没有排序
        return;
      }
      // 看板排序
      if (type === 'COLUMN') {
        console.log(source, 'source');
        console.log(destination, 'destination');
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? 'after' : 'before';
        reorderKanban({ fromId, referenceId: toId, type });
      }
      // task排序
      if (type === 'ROW') {
        console.log(source, 'source');
        console.log(destination, 'destination');
        // 转变成Number
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        console.log(fromKanbanId, 'fromKanbanId');
        console.log(toKanbanId, 'toKanbanId');
        // // 不允许跨看板排序
        if (fromKanbanId === toKanbanId) {
          return;
        }
        // // [source.index]拖拽第几个
        // 拖拽旁边
        const fromTask = allTasks.filter(task => task.kanbanId === fromKanbanId)[source.index];
        const toTask = allTasks.filter(task => task.kanbanId === toKanbanId)[destination.index];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before',
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};

export const CloumnContainer = styled('div')`
  display: flex;
  overflow: scroll;
  flex: 1; // 抢占父亲剩下的空间
`;
