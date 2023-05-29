import styled from '@emotion/styled';
import { Button, Divider, List, Popover, Typography } from 'antd';
import React from 'react';
import { useProject } from 'utils/project';
import { ButtonNoPadding } from './lib';
import { useDispatch } from 'react-redux';
import { projectListActions } from '../screens/project-list/project-list.slice';
import { useProjectModal } from '../screens/project-list/util';
import { useUsers } from '../utils/user';

//  组合组件
export const UserPopover = () => {
  // hooks
  const dispatch = useDispatch();
  const { data: users, refetch } = useUsers();
  // 弹窗按钮封装全局
  const { open } = useProjectModal();
  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>用户列表</Typography.Text>
      <List>
        {users?.map(user => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );
  return (
    <Popover onVisibleChange={() => refetch()} placement={'bottom'} content={content}>
      <span>用户</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
