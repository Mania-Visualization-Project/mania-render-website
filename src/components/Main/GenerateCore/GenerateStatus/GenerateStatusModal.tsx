import React, { useMemo } from 'react';
import { Modal, ModalProps } from 'antd';
import { useTranslation } from '../../../../common/i18n';
import { EGenerateQueryStatus } from '../GenerateTask/types';
import { GenerateStatusPanel } from './GenerateStatusPanel';
import './styles.less';

export interface GenerateStatusModalProps extends ModalProps{
  generateStatus: EGenerateQueryStatus;
  onCancelGenerate: () => void;
  generatePercent: number;
  queueCount: number;
  onDownload: () => void;
  replayName: string;
  mapName: string;
  bgmName: string;
  isReplayMatch: boolean;
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
  bgmName,
  isAudioMatch,
  isReplayMatch,
  ...modalProps
}: GenerateStatusModalProps) => {
  const { t } = useTranslation();

  const title = useMemo(() => {
    if (generateStatus === EGenerateQueryStatus.Error) {
      return t('status-generate_status_error');
    } else if (generateStatus === EGenerateQueryStatus.Finish) {
      return t('modal-finished_title');
    } else {
      return t('modal-generating_title');
    }
  }, [generateStatus, t]);

  return (
    <Modal
      visible={visible}
      centered
      wrapClassName="generate-status-modal"
      title={title}
      onCancel={onCancelGenerate}
      maskClosable={false}
      footer={null}
      destroyOnClose
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
        bgmName={bgmName}
        isReplayMatch={isReplayMatch}
        isAudioMatch={isAudioMatch}
      />
    </Modal>
  );
};
