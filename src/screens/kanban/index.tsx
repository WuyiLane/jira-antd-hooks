import React from 'react';
import { useDocumentTitle } from '../../utils';
import { useKanbans } from '../../utils/kanban';
import { useKanbanSearchParams, useProjectInUrl, useTasksSeachParams } from './util';
import styled from '@emotion/styled';
import { KanbanColumn } from './kanban-column';
import { SearchPanel } from './search-panel';
import { TaskModal } from './task-modal';
import { useTasks } from '../../utils/task';
import { Spin } from 'antd';
import { ScreenContainer } from '../../component/lib';
import { CreateKanban } from './create-kanban';

export const KanbanSCreen = () => {
  useDocumentTitle('看板列表');
  //data:currentProject // 自定义的值
  const { data: currentProject } = useProjectInUrl();
  // @ts-ignore
  const { data: kanbans = [], isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams());
  const { isLoading: taskIsLoading } = useTasks(useTasksSeachParams());
  const isLoading = taskIsLoading || kanbanIsLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name} 看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={'large'} />
      ) : (
        <CloumnContainer>
          {kanbans?.map(kanban => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <TaskModal />
          <CreateKanban />
        </CloumnContainer>
      )}
    </ScreenContainer>
  );
};

export const CloumnContainer = styled.div`
  display: flex;
  overflow: scroll;
  flex: 1; // 抢占父亲剩下的空间
`;
