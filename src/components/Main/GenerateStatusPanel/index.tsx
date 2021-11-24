import React from 'react';
import { round } from 'lodash';
import { Button, Descriptions, Progress, Space, Typography } from 'antd';
import { useTranslation } from '../../../common/i18n';
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
  const { t } = useTranslation();
  // TODO: i18n
  return (
    <GenerateStatusPanelWrapper>
      <Descriptions
        bordered
        column={1}
      >
        <Descriptions.Item
          label={(
            <Typography.Text>
              {t('status-current_status')}
            </Typography.Text>
          )}
        >
          {status}
        </Descriptions.Item>
        {queueCount > 0 || (
          <Descriptions.Item
            label={(
              <Typography.Text>
                {t('status-current_in_queue')}
              </Typography.Text>
            )}
          >
            {queueCount}
          </Descriptions.Item>
        )}
        <Descriptions.Item
          label={(
            <Typography.Text>
              Generate Progress
            </Typography.Text>
          )}
        >
          <Progress
            type="circle"
            percent={round(percent, 2)}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </Descriptions.Item>
      </Descriptions>
      {finished && (
        <Space
          className="download-option"
          direction="vertical"
        >
          <Typography.Text>
            {t('status-generate_success')}
          </Typography.Text>
          <Button
            onClick={onDownload}
            block
            type="primary"
          >
            {t('status-download_button')}
          </Button>
        </Space>
      )}
    </GenerateStatusPanelWrapper>
  );
};
