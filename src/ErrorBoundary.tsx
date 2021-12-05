import React, { ReactNode } from 'react';
import { Button, Result } from 'antd';
import { i18n } from './common/i18n';

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
        subTitle={i18n.t('app-error_page_error')}
        extra={
          <Button type="primary" onClick={() => {
            location.reload();
          }}>
            {i18n.t('app-error_refresh')}
          </Button>
        }
      />
    );
  }
}
