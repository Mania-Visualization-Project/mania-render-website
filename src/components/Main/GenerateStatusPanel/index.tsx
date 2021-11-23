import React from 'react';
import { Button, Progress, Space, Typography } from 'antd';
import { EGenerateQueryStatus } from '../GenerateTask/types';
import { GenerateStatusPanelWrapper } from './styles';

export interface GenerateStatusPanelProps {
  percent: number;
  status: EGenerateQueryStatus;
  queueCount: number;
  finished: boolean;
  onDownload: () => void;
}

/**
 * generate video status
 * @param percent progress percent
 * @param status
 * @param queueCount
 * @param finished
 * @param onDownload
 * @constructor
 */
export const GenerateStatusPanel = ({
  percent,
  status,
  queueCount,
  finished,
  onDownload,
}: GenerateStatusPanelProps) => {
  // TODO: i18n
  return (
    <GenerateStatusPanelWrapper>
      <Typography.Text>
        Current Status {status}
      </Typography.Text>
      {queueCount > 0 && (
        <Typography.Text>
          Current in Queue: {queueCount}
        </Typography.Text>
      )}
      <Progress
        type="circle"
        percent={percent}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />
      {finished && (
        <Space direction="vertical">
          <Typography.Text>
            Generate Success, click button to download
          </Typography.Text>
          <Button onClick={onDownload}>
            Download!
          </Button>
        </Space>
      )}
    </GenerateStatusPanelWrapper>
  );
};
