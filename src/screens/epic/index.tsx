import React, { useState } from 'react';
import { Row, ScreenContainer } from '../../component/lib';
import { useProjectInUrl } from '../kanban/util';
import { useDelEpic, useEpics } from '../../utils/epic-epic';
import { useEpicSearchParams, useEpicsQueryKey } from './util';
import { Button, List, Modal } from 'antd';
import dayjs from 'dayjs';
import { useTasks } from '../../utils/task';
import { Link } from 'react-router-dom';
import { CreateEpic } from './create-epic';
import { Epic } from '../../types/epic-epic';

/***
 * 任务组开发------ 接近尾声2023.5.29
 * @constructor
 */
export const EpicSCreen = () => {
  const { data: currentProject } = useProjectInUrl();
  // 渲染任务组列表 => 从 utils =>  epic-epic 里面引入
  // 从 screens => 获取id 渲染数据 传递参数
  const { data: Reqepics } = useEpics(useEpicSearchParams()); // 数据源
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDelEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组:${epic.name}`,
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={'link'}>
          创建任务组
        </Button>
      </Row>

      {/*  竖着渲染*/}
      <List
        dataSource={Reqepics}
        itemLayout={'vertical'}
        style={{ overflow: 'scroll' }}
        renderItem={epic => (
          <List.Item>
            {/* 对自身进行配置*/}
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={'link'} onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间:{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                  <div>结束时间:{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                </div>
              }
            />
            {/*  渲染 task*/}
            <div>
              {tasks
                ?.filter(task => task.epicId === epic.id)
                .map(
                  // 跳转链接 看板编辑
                  task => (
                    <Link
                      to={`/projects/${currentProject?.id}/kanban?editingTaskId
                                   = ${task.id}`}
                      key={task.id}
                    >
                      {task.name}
                    </Link>
                  )
                )}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic onClose={() => setEpicCreateOpen(false)} visible={epicCreateOpen} />
    </ScreenContainer>
  );
};
