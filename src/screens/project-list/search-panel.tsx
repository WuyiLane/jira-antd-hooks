import React, {useEffect, useState} from "react";
import {Select, Input, Switch, Space} from 'antd';
import { SizeType } from "antd/es/config-provider/SizeContext";
import List from "./list";
export const MyContext = React.createContext(null);

const { Option } = Select;
type UserType = {
    id: number;
    name: string;
}
type ProjectType = {
    id: string;
    name:string;
    personId: number;
    ths: string;
    strings: string;
    caters: string;
    createTime: string;
    keg: string;
};

type SearchPanelProps = {
    users: UserType[];
    list: ProjectType[];
    param: {
        name: string;
        personId: string;
    };
    setParam: (param: { name: string, personId: string }) => void;
}

export function SearchPanel({ users, list, param, setParam }: SearchPanelProps): JSX.Element {
    const [loading, setLoading] = useState<React.ReactNode>();
    const [fetchOptions, setFetchOptions] = useState<(value: string) => void>();
    const [size, setSize] = useState<SizeType>('middle');
    const [checked, setChecked] = useState<React.ReactNode>(true);
    const [showDifference, setShowDifference] = useState<boolean>(false);
    const [filteredList, setFilteredList] = useState<Array<any>>([]);
    const handleChange = (event: string) => {
        setParam({ ...param, personId: event });
    };

    // 只显示差异
    const handleToggle = (checked: boolean) => {
        setShowDifference(checked);
    };

    // 过滤掉相同的元素
    const Handledifference = (data: ProjectType[]):Array<any>  => {
        console.log("走了吗?")
        const map = new Map();
        return data.filter(item => {
            const key = Object.values(item).join('-')
            if (!map.has(key)) {
                map.set(key, true);
                return true;
            } else {
                return false;
            }
        });
    };
    useEffect(() => {
        if(showDifference){
            const filterlist = Handledifference(list) as any;
            console.log(filterlist)
            setFilteredList([...filterlist])
        }else{
            console.log(list)
            setFilteredList([...list])
        }

    }, [showDifference]);

    // 调用过滤函数
    // const filteredList = showDifference ? Handledifference(list) : list;
    return (
        <>
            <div style={{ padding: '10px 10px' }}>
                <Input
                    type="text"
                    style={{ width: '15%', marginLeft: '20px' }}
                    value={param.name}
                    onChange={event => setParam({
                        ...param,
                        name: event.target.value
                    })}
                />
                <Select
                    style={{ width: '10%', marginLeft: '20px' }}
                    value={param.personId}
                    placeholder="请输入搜索内容"
                    defaultActiveFirstOption={false}
                    showArrow={true}
                    filterOption={true}
                    onSearch={fetchOptions}
                    onChange={handleChange}
                    notFoundContent={loading ? "加载中..." : "未找到匹配项"}
                >
                    {users.map((event) => (<Option key={event.id}> {event.name}</Option>))}
                </Select>
                <Space style={{ width: '10%', marginLeft: '20px' }}>
                    只看差异
                    <Switch
                        defaultChecked
                        style={{ width: '1%', marginLeft: '20px' }}
                        checked={showDifference}
                        onChange={handleToggle}
                    />
                </Space>
            </div>
        </>

    );
}
