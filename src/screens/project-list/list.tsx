import React from 'react';
import { Table } from 'antd';

type UserType = {
  id: number;
  name: string;
};

type ProjectType = {
  id: string;
  name: string;
  personId: number;
  ths: string;
  strings: string;
  caters: string;
  createTime: string;
  keg: string;
};

type ListProps = {
  users: UserType[];
  list: ProjectType[];
};

function List({ list, users }: ListProps): JSX.Element {
  console.log('list', list);
  const dataSource =
    // 过滤数据 将 name 过滤出来
    list
      .filter(project => project.personId !== undefined)
      .map(project => {
        console.log(project, 'project');
        const user = users.find(user => user.id === project.personId);
        return {
          key: project.id,
          name: project.name,
          ths: project.ths,
          strings: project.strings,
          caters: project.caters,
          createTime: project.createTime,
          keg: project.keg,
          age: user?.name,
        };
      });

  const columns = [
    {
      title: '品牌',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '长度',
      dataIndex: 'ths',
      key: 'ths',
    },
    {
      title: '硬度',
      dataIndex: 'strings',
      key: 'strings',
    },
    {
      title: '调性',
      dataIndex: 'caters',
      key: 'caters',
    },
    {
      title: '上市时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '重量(克)',
      dataIndex: 'keg',
      key: 'keg',
    },
  ];
  return <Table dataSource={dataSource} columns={columns} />;
}

export default List;
