import React, { ReactNode } from 'react';
import { Button, Result } from 'antd';

export interface IErrorBoundaryProps {
  children: ReactNode;
}

export interface IErrorBoundaryState {
  hasCatchError: boolean;
}

export class ErrorBoundary extends React.PureComponent<IErrorBoundaryProps, IErrorBoundaryState> {
  state = {
    hasCatchError: false,
  };

  constructor(props: IErrorBoundaryProps) {
    super(props);
  }

  componentDidCatch() {
    this.setState({
      hasCatchError: true,
    });
  }

  render() {
    if (!this.state.hasCatchError) {
      return this.props.children;
    }

    return (
      <Result
        status="500"
        title="500"
        subTitle="页面出错啦！"
        extra={
          <Button type="primary" onClick={() => {
            location.reload();
          }}>
            刷新页面
          </Button>
        }
      />
    );
  }
}
