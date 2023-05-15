import React from 'react';
import { Rate } from 'antd';

// 获取组件里的所有 类型 => 具备透传能力
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

// 封装组件

export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={num => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};
