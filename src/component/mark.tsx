/**
 *  name  为名字
 *  keyword 为关键字搜索的
 */
import React from 'react';

// 红色高亮
export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str: string, index: number) => (
        <span key={index}>
          {str}
          {/* 是否为最后一个*/}
          {index === arr.length - 1 ? null : <span style={{ color: '#FF0000' }}>{keyword}</span>}
        </span>
      ))}
    </>
  );
};
