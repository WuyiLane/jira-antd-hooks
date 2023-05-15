/** @jsxRuntime classic */
// pragma and pragmaFrag cannot be set when runtime is automatic. 解决
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Space, Switch } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { UserSelect } from '../../component/user-select';
// import  { users } from '../../types/user'
const { Option } = Select;
type UserType = {
  id: number;
  name: string;
  token: string;
};

export interface User {
  id: number;
  name: string;
  token: string;
}

type ProjectType = {
  id: string;
  name: string;
  personId: number | undefined;
  ths: string;
  strings: string;
  caters: string;
  created: string;
  keg: string;
};

type SearchPanelProps = {
  users: User[];
  list: ProjectType[];
  // param: {
  //     name: string;
  //     personId: string;
  // };
  param: Partial<Pick<ProjectType, 'name' | 'personId'>>;
  setParam: (param: SearchPanelProps['param']) => void;
};

export function SearchPanel({ users, list, param, setParam }: SearchPanelProps): JSX.Element {
  const [loading, setLoading] = useState<React.ReactNode>();
  const [fetchOptions, setFetchOptions] = useState<(value: string) => void>();
  const [size, setSize] = useState<SizeType>('middle');
  const [checked, setChecked] = useState<React.ReactNode>(true);
  const [showDifference, setShowDifference] = useState<boolean>(false);
  const [filteredList, setFilteredList] = useState<Array<any>>([]);
  // const handleChange = (event: string) => {
  //
  // };

  // 只显示差异
  const handleToggle = (checked: boolean) => {
    setShowDifference(checked);
  };

  // 过滤掉相同的元素
  const Handledifference = (data: ProjectType[]): Array<any> => {
    const map = new Map();
    return data.filter(item => {
      const key = Object.values(item).join('-');
      if (!map.has(key)) {
        map.set(key, true);
        return true;
      } else {
        return false;
      }
    });
  };
  useEffect(() => {
    if (showDifference) {
      const filterlistList = Handledifference(list) as any;
      console.log(filterlistList);
      setFilteredList(filterlistList);
    } else {
      console.log(list);
      setFilteredList([...list]);
    }
  }, [showDifference]);

  // 调用过滤函数
  // const filteredList = showDifference ? Handledifference(list) : list;
  return (
    <Form css={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item style={{ width: '7%', marginLeft: '0px' }}>
        <Input
          placeholder={'项目名'}
          type='text'
          defaultValue={param.name}
          onChange={event =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item style={{ width: '7%', marginLeft: '0px' }}>
        <UserSelect
          defaultOptionName={'负责人'}
          value={param.personId}
          onChange={value => {
            setParam({ ...param, personId: value });
          }}
        />

        {/*<Select*/}
        {/*    value={param.personId}*/}
        {/*    placeholder='请输入搜索内容'*/}
        {/*    defaultActiveFirstOption={false}*/}
        {/*    showArrow={true}*/}
        {/*    filterOption={true}*/}
        {/*    onSearch={fetchOptions}*/}
        {/*    onChange={(value) =>{*/}
        {/*        setParam({...param, personId: value});*/}
        {/*    }}*/}
        {/*    notFoundContent={loading ? '加载中...' : '未找到匹配项'}*/}
        {/*>*/}
        {/*    <Select.Option value={""}>负责人</Select.Option>*/}
        {/*    {users.map(event => (*/}
        {/*        <Select.Option key={event.id}> {event.name}</Select.Option>*/}
        {/*    ))}*/}
        {/*</Select>*/}
      </Form.Item>

      <Space style={{ width: '10%', marginLeft: '20px' }}>
        只看差异
        <Switch
          defaultChecked
          style={{ width: '1%', marginLeft: '20px' }}
          checked={showDifference}
          onChange={handleToggle}
        />
      </Space>
    </Form>
  );
}
