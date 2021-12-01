import React from 'react';
import { Modal, ModalProps } from 'antd';
import { useTranslation } from '../../../common/i18n';
import { EGenerateQueryStatus } from '../GenerateTask/types';
import { GenerateStatusPanel } from './GenerateStatusPanel';

export interface GenerateStatusModalProps extends ModalProps{
  generateStatus: EGenerateQueryStatus;
  onCancelGenerate: () => void;
  generatePercent: number;
  queueCount: number;
  onDownload: () => void;
  replayName: string;
  mapName: string;
  audioName: string;
  platform: string;
  isMapMatch: boolean;
  isAudioMatch: boolean;
}

export const GenerateStatusModal = ({
  visible,
  generateStatus,
  onCancelGenerate,
  generatePercent,
  queueCount,
  onDownload,
  replayName,
  mapName,
  audioName,
  platform,
  isAudioMatch,
  isMapMatch,
  ...modalProps
}: GenerateStatusModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      centered
      bodyStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      title={
        generateStatus === EGenerateQueryStatus.Error
          ? t('status-generate_status_error')
          : t('upload-modal_title')
      }
      onCancel={onCancelGenerate}
      maskClosable={false}
      footer={null}
      {...modalProps}
    >
      <GenerateStatusPanel
        percent={generatePercent}
        status={generateStatus}
        queueCount={queueCount}
        finished={generatePercent === 100}
        onDownload={onDownload}
        replayName={replayName}
        mapName={mapName}
        audioName={audioName}
        platform={platform}
        isReplayMatch={isMapMatch}
        isAudioMatch={isAudioMatch}
      />
    </Modal>
  );
};
