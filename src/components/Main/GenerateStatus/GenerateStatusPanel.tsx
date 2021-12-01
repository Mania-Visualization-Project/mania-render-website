import React, { useMemo } from 'react';
import { round } from 'lodash';
import { Button, Descriptions, Progress, Space, Typography } from 'antd';
import { useTranslation } from '../../../common/i18n';
import { convertGenerateStatus2i18n } from '../../../common/converters/convert-generate-status2i18n';
import { getDestructArrayInCondition } from '../../../utils/get-destruct-thing-in-condition';
import { EGenerateQueryStatus } from '../GenerateTask/types';
import { GenerateStatusPanelWrapper } from './styles';

export interface GenerateStatusPanelProps {
  percent: number;
  status: EGenerateQueryStatus;
  queueCount: number;
  audioName: string;
  mapName: string;
  replayName: string;
  platform: string;
  isReplayMatch: boolean;
  isAudioMatch: boolean;
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
 * @param audioName
 * @param mapName
 * @param replayName
 * @param isAudioMatch
 * @param isReplayMatch
 * @constructor
 */
export const GenerateStatusPanel = ({
  percent,
  status,
  queueCount,
  finished,
  onDownload,
  audioName,
  mapName,
  replayName,
  isAudioMatch,
  isReplayMatch,
}: GenerateStatusPanelProps) => {
  const { t } = useTranslation();

  const descList = useMemo(() => {
    return [
      {
        label: t('status-current_file_name_label'),
        content: replayName,
        type: isReplayMatch ? undefined : 'danger',
      },
      {
        label: t('status-current_map_name_label'),
        content: mapName,
      },
      ...getDestructArrayInCondition(!!audioName, {
        label: t('status-current_audio_name_label'),
        content: audioName,
        type: isAudioMatch ? undefined : 'danger',
      }),
      ...getDestructArrayInCondition(!isAudioMatch, {
        label: t('status-current_warning_label'),
        content: t('status-current_warning_audio_not_match'),
        type: 'danger',
      }),
      ...getDestructArrayInCondition(!isReplayMatch, {
        label: t('status-current_warning_label'),
        content: t('status-current_warning_replay_not_match'),
        type: 'danger',
      }),
    ];
  }, [audioName, isAudioMatch, isReplayMatch, mapName, replayName, t]);

  return (
    <GenerateStatusPanelWrapper>
      {!finished && status !== EGenerateQueryStatus.Error && (
        <Typography.Text type="danger" strong>
          {t('status-generate_generating_introduction')}
        </Typography.Text>
      )}
      <Typography.Paragraph>
        <ul>
          {descList.map((item) => {
            return (
              <li key={item.label}>
                <Typography.Text strong type={item?.type as any}>
                  {item.label}&nbsp;
                </Typography.Text>
                <Typography.Text type={item?.type as any}>
                  {item.content}
                </Typography.Text>
              </li>
            );
          })}
        </ul>
      </Typography.Paragraph>
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
          {t(convertGenerateStatus2i18n(status))}
        </Descriptions.Item>
        {queueCount > 0 && (
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
              {t('status-generate_progress_label')}
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
