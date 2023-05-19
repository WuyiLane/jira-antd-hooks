import React from 'react';
import { Dropdown, Menu, Table } from 'antd';
import { TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pin } from '../../component/pin';
import { useEditProject, useProject } from '../../utils/project';
import { ButtonNoPadding } from '../../component/lib';
import { useDispatch } from 'react-redux';
import { useProjectModal } from './util';
// react-router 和 react-router-dom 的关系  类似于 react 和react-dom的关系
// import {Link} from "react-router-dom";

type UserType = {
  id: number;
  name: string;
};

export type ProjectType = {
  id: number;
  name: string;
  pin: boolean;
  personId: number | undefined;
  ths: string;
  strings: string;
  caters: string;
  created: string;
  organization: string;
  keg: string;
};

interface ListProps extends TableProps<ProjectType> {
  users: UserType[];
  refresh?: () => void;
}

function List({ users, ...props }: ListProps): JSX.Element {
  console.log('list', props);
  const dispatch = useDispatch();
  // const user = users.find(user => user.id === project.personId);
  const { dataSource } = props;
  const { mutate } = useEditProject();
  // 柯里化风格代码
  // 先消化 id  再消化 pin
  const { startEdit } = useProjectModal();
  const PinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const editProject = (id: number) => () => startEdit(id);
  // const dataSource =
  //   // 过滤数据 将 name 过滤出来
  //   dataSource
  //     .filter(project => project.personId !== undefined)
  //     .map(project => {
  //       console.log(project, 'project');
  //       const user = users.find(user => user.id === project.personId);
  //       return {
  //         key: project.id,
  //         name: project.name,
  //         ths: project.ths,
  //         strings: project.strings,
  //         caters: project.caters,
  //         created: project.created,
  //         organization:project.organization,
  //         keg: project.keg,
  //         age: user?.name,
  //       };
  //     });

  // const dataSource =
  //   // 过滤数据 将 name 过滤出来
  //   list
  //     .filter(project => project.personId !== undefined)
  //     .map(project => {
  //       console.log(project, 'project');
  //       const user = users.find(user => user.id === project.personId);
  //       return {
  //         key: project.id,
  //         name: project.name,
  //         ths: project.ths,
  //         strings: project.strings,
  //         caters: project.caters,
  //         created: project.created,
  //         organization:project.organization,
  //         keg: project.keg,
  //         age: user?.name,
  //       };
  //     });

  const columns = [
    // {
    //   title: '长度',
    //   dataIndex: 'ths',
    //   key: 'ths',
    // },
    // {
    //   title: '硬度',
    //   dataIndex: 'strings',
    //   key: 'strings',
    // },
    // {
    //   title: '调性',
    //   dataIndex: 'caters',
    //   key: 'caters',
    // },
    // {
    //   title: '上市时间',
    //   dataIndex: 'createTime',
    //   key: 'createTime',
    // },
  ];
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChange={PinProject(project.id)} />;
          },
        },
        {
          title: '创建时间',
          dataIndex: 'created',
          key: 'created',
          // 处理日期
          render(value, project) {
            return (
              <span>
                {/*{project.created}*/}
                {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '暂无数据'}
              </span>
            );
          },
        },

        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
          key: 'keg',
          //   render(project) {
          //   return <span>
          // {users.find((user) => user.id === project.personId)?.name || "无数据"}
          //   </span>
          // }
        },
        {
          title: '负责人',
          render(value, project) {
            return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>;
          },
          //   render(project) {
          //   return <span>
          // {users.find((user) => user.id === project.personId)?.name || "无数据"}
          //   </span>
          // }
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={'edit'} onClick={editProject(project.id)}>
                      编辑
                    </Menu.Item>
                    <Menu.Item key={'delete'}>删除</Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
}

export default List;
