import React from 'react';
import { Raw } from '../types';
import { Select } from 'antd';
// 获取select 里面所有类型
type SelectProps = React.ComponentProps<typeof Select>;
// 继承  select 所有类型  删除重复的类型omit
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * value 可以传入 多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当 isNaN(Number(value))为true的时候, 代表选择 默认类型
 * 当选择默认类型的时候，onChange 会回调 undefined
 *
 *
 * */
export const IdSelect = (props: IdSelectProps) => {
  // restProps  => Select
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={value => onChange(toNumber(value))}
      {...restProps}
    >
      {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
      {options?.map(option => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
