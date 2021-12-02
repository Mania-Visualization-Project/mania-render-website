import React, { useMemo } from 'react';
import { Button, Descriptions, Space, Typography } from 'antd';
import { useTranslation } from '../../../common/i18n';
import { getLocalSettings } from '../../../common/local-settings';
import { getFileExtension } from '../../../utils/get-file-extension';
import { getThingByCondition } from '../../../utils/get-thing-by-condition';
import { getDestructArrayInCondition } from '../../../utils/get-destruct-thing-in-condition';
import { EGame } from '../../../data/enums';
import { EGenerateQueryStatus } from '../GenerateTask/types';
import { GenerateProgressPanel } from './GenerateProgressPanel';
import { GenerateStatusPanelWrapper } from './styles';

export interface GenerateStatusPanelProps {
  percent: number;
  status: EGenerateQueryStatus;
  queueCount: number;
  audioName: string;
  mapName: string;
  replayName: string;
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
  const settings = getLocalSettings();

  const isProcessingOrFinish =
    status === EGenerateQueryStatus.Processing ||
    status === EGenerateQueryStatus.Finish
  ;

  const game = useMemo(() => {
    const fileExtension = getFileExtension(replayName);

    if (/osr/.test(fileExtension)) {
      return EGame.Osu;
    } else if (/mr/.test(fileExtension)) {
      return EGame.Malody;
    } else {
      return EGame.Unknown;
    }
  }, [replayName]);

  const currentSettingsString = useMemo(() => {
    if (!settings) {
      return '';
    }

    const { speed, fps, malody_platform, height, width } = settings;

    const baseStr = [
      [t('settings-speed'), speed],
      [t('settings-fps'), fps],
      [t('settings-video_width'), width],
      [t('settings-video_height'), height],
    ].map((item) => item.join(' -- ')).join('\n');

    if (game === EGame.Osu) {
      return `${t('settings-platform')} -- osu!mania\n${baseStr}`;
    } else if (game === EGame.Malody){
      return `${t('settings-platform')} -- Malody ${malody_platform}\n${baseStr}`;
    } else {
      return '';
    }
  }, [game, settings, t]);

  const infoList = useMemo(() => {
    return [
      {
        label: t('status-current_file_name_label'),
        ...getThingByCondition(
          isReplayMatch ? false : isProcessingOrFinish,
          {
            type: 'danger',
            content: `${replayName} (${t('status-current_warning_replay_not_match')})`,
          },
          {
            type: undefined,
            content: `${replayName}`,
          },
        ),
      },
      {
        label: t('status-current_map_name_label'),
        content: mapName,
      },
      ...getDestructArrayInCondition(!!audioName, {
        label: t('status-current_audio_name_label'),
        ...getThingByCondition(
          isAudioMatch ? false : isProcessingOrFinish,
          {
            type: 'danger',
            content: `${audioName} (${t('status-current_warning_audio_not_match')})`,
          },
          {
            type: undefined,
            content: `${audioName}`,
          },
        ),
      }),
    ];
  }, [audioName, isAudioMatch, isProcessingOrFinish, isReplayMatch, mapName, replayName, t]);

  const descriptionList = useMemo(() => {
    return [
      {
        key: 'settings',
        label: t('status-current_settings'),
        content: currentSettingsString,
      },
      {
        key: 'progress',
        label: t('status-generate_progress_label'),
        content: (
          <GenerateProgressPanel
            percent={percent}
            status={status}
            queueCount={queueCount}
          />
        ),
      },
    ];
  }, [currentSettingsString, percent, queueCount, status, t]);

  return (
    <GenerateStatusPanelWrapper>
      {!finished && status !== EGenerateQueryStatus.Error && (
        <Typography.Paragraph>
          <Typography.Text type="danger" strong>
            {t('status-generate_generating_introduction')}
          </Typography.Text>
        </Typography.Paragraph>
      )}
      <Typography.Paragraph>
        <ul>
          {infoList.map((item) => {
            return (
              <li key={item.content}>
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
        labelStyle={{
          width: 128,
        }}
      >
        {descriptionList.map(({ content, label, key }) => {
          return (
            <Descriptions.Item
              className="word-pre-wrap"
              key={key}
              label={(
                <Typography.Text>
                  {label}
                </Typography.Text>
              )}
            >
              {content}
            </Descriptions.Item>
          );
        })}
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
