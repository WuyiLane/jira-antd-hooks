import React from 'react';
import { useDocumentTitle } from '../../utils';
import { useKanbans } from '../../utils/kanban';
import { useKanbanSearchParams, useProjectIdInUrl, useProjectInUrl } from './util';
import styled from '@emotion/styled';
import { KanbanColumn } from './kanban-column';
import { SearchPanel } from './search-panel';

export const KanbanSCreen = () => {
  useDocumentTitle('看板列表');
  //data:currentProject // 自定义的值
  const { data: currentProject } = useProjectInUrl();
  // @ts-ignore
  const { data: kanbans = [] } = useKanbans(useKanbanSearchParams());

  return (
    <>
      <h1>{currentProject?.name} 看板</h1>
      <SearchPanel />
      <KanbanCloumnContainer>
        {kanbans?.map(kanban => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </KanbanCloumnContainer>
    </>
  );
};

const KanbanCloumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
