import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'antd';
import { useTranslation } from '../../../common/i18n';
import { getLocalSettings } from '../../../common/local-settings';
import { DEFAULT_SETTINGS } from '../../../common/constants';
import { ErrorView } from '../../ErrorToast';
import { useGenerateTask } from './GenerateTask/useGenerateTask';
import {
  EGenerateQueryStatus,
  ExtraHandler,
  FinishHandler,
  ProcessingHandler,
  QueueHandler,
} from './GenerateTask/types';
import { GenerateStatusModal } from './GenerateStatus';

export interface GenerateCoreProps {
  disable?: boolean;
  mapId: string;
  bgmId: string;
  replayId: string;
  mapName: string;
  bgmName: string;
  replayName: string;
}

export const GenerateCore = ({
  disable,
  mapId,
  bgmId,
  replayId,
  mapName,
  bgmName,
  replayName,
}: GenerateCoreProps) => {
  const { t } = useTranslation();

  /**
   * generate panel info state
   */
  const [generatePercent, setGeneratePercent] = useState<number>(0);
  const [generateStatus, setGenerateStatus] = useState(EGenerateQueryStatus.Unknown);
  const [queueCount, setQueueCount] = useState<number>(0);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const [isAudioMatch, setIsAudioMatch] = useState(true);
  const [isReplayMatch, setIsReplayMatch] = useState(true);

  const handleInitStatusData = useCallback(() => {
    setGeneratePercent(0);
    setQueueCount(0);
    setGenerateStatus(EGenerateQueryStatus.Unknown);
  }, []);

  const onProcessing = useCallback<ProcessingHandler>((progress) => {
    setQueueCount(0);
    setGenerateStatus(EGenerateQueryStatus.Processing);
    setGeneratePercent(progress);
  }, []);

  const onQueue = useCallback<QueueHandler>((count) => {
    setQueueCount(count);
    setGenerateStatus(EGenerateQueryStatus.Queue);
  }, []);

  const onFinish = useCallback<FinishHandler>(() => {
    setGenerateStatus(EGenerateQueryStatus.Finish);
    setGeneratePercent(100);
  }, []);

  const handleExtra = useCallback<ExtraHandler>((extra) => {
    if (extra) {
      setIsAudioMatch(!extra.is_music_mismatch);
      setIsReplayMatch(!extra.is_replay_mismatch);
    }
  }, []);

  const { generateVideo, downloadVideo, cancelTask } = useGenerateTask({
    onProcessing,
    onQueue,
    onFinish,
    handleExtra,
  });

  const handleGenerate = useCallback(async () => {
    setShowGenerateModal(true);
    setGenerateStatus(EGenerateQueryStatus.Unknown);
    handleInitStatusData();
    const localSettings = getLocalSettings();

    try {
      await generateVideo({
        map_id: mapId,
        bgm_id: bgmId,
        replay_id: replayId,
        settings: localSettings || DEFAULT_SETTINGS,
      });
    } catch (err: any) {
      ErrorView.modal(err);
      cancelTask();
      setGenerateStatus(EGenerateQueryStatus.Error);
    }
  }, [bgmId, cancelTask, generateVideo, handleInitStatusData, mapId, replayId]);

  const handleCancelGenerate = useCallback(() => {
    if (generateStatus === EGenerateQueryStatus.Finish || generateStatus === EGenerateQueryStatus.Error) {
      setShowGenerateModal(false);
      cancelTask();
      return;
    }

    Modal.confirm({
      title: t('modal-generate_close_confirm_title'),
      content: t('modal-generate_close_confirm_content'),
      okText: t('modal-generate_close_confirm_ok_text'),
      cancelText: t('modal-generate_close_confirm_cancel_text'),
      centered: true,
      onOk() {
        setShowGenerateModal(false);
        cancelTask();
      },
    });
  }, [cancelTask, generateStatus, t]);

  return (
    <>
      <Button
        block type="primary"
        disabled={disable}
        onClick={handleGenerate}
      >
        {t('btn-generate')}
      </Button>
      <GenerateStatusModal
        visible={showGenerateModal}
        generateStatus={generateStatus}
        generatePercent={generatePercent}
        onCancelGenerate={handleCancelGenerate}
        queueCount={queueCount}
        onDownload={downloadVideo}
        replayName={replayName}
        mapName={mapName}
        bgmName={bgmName}
        isReplayMatch={isReplayMatch}
        isAudioMatch={isAudioMatch}
      />
    </>
  );
};
