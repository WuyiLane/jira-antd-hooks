import React, { useState } from "react";
import { useArray, useMount } from "./utils";
import { Button } from "antd";

export const TsReactTest = () => {
  const person: { name: string; age: number }[] = [
    { name: "Louis", age: 27 },
    { name: "laba", age: 50 },
  ];
  const { value, clear, removeIndex, add } = useArray(person);
  useMount(() => {
    // console.log(value.notExist)
    // add({name:"valid"})
    // removeIndex('2233')
  });
  const onChangeAdd = () => {
    add({ name: "valid", age: 22 });
  };
  const onChangeRemove = () => {
    removeIndex(0);
  };
  const onChangeClear = () => {
    clear();
  };
  return (
    <div>
      {/*     期待:点击以后增加louis*/}
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Button onClick={() => onChangeAdd()}>点击以后增加</Button>
      {/*     期待点击以后删除第一项*/}
      <Button onClick={() => onChangeRemove()}>点击以后删除第一项</Button>
      {/*     期待点击以后清空列表*/}
      <Button onClick={() => onChangeClear()}>点击以后清空列表</Button>
      {value.map((person: { age: number; name: string }, index: number) => (
        <div style={{ marginBottom: "30px" }}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
