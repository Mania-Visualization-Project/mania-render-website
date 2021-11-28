import React from 'react';
import { Col, Row, Space } from 'antd';
import { SettingsPanel } from '../Settings';

export const MainWrapperWithSettings: React.FC = ({ children }) => {
  return (
    <Row>
      <Col
        span={24}
        md={16}
        lg={16}
        xl={16}
        xxl={16}
      >
        <Space
          className="upload-wrapper"
          size={24}
          direction="vertical"
        >
          {children}
        </Space>
      </Col>
      <Col
        span={0}
        md={8}
        lg={8}
        xl={8}
        xxl={8}
      >
        <SettingsPanel />
      </Col>
    </Row>
  );
};
