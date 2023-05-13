// 备用方案 渲染异常

import React, { Fragment } from 'react';

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// React.PropWithChildren 类型结合
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  // 当子组件抛出异常, 这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return <Fragment>{children}</Fragment>;
  }
}
