import React, { useCallback, useEffect, useState } from 'react';
import type { UploadProps } from 'antd';
import { Button, Modal, Space } from 'antd';
import { CustomerServiceFilled, FileZipOutlined, PlaySquareOutlined } from '@ant-design/icons';
import { useTranslation } from '../../common/i18n';
import { DEFAULT_SETTINGS } from '../../common/constants';
import { getLocalSettings } from '../../common/local-settings';
import { getFileExtension } from '../../utils/get-file-extension';
import { EFileType } from '../../data/enums';
import { uploadFiles } from '../../api/upload-files';
import { transformResponse } from '../../api/transform-response';
import { ErrorView } from '../ErrorToast';
import { DraggerUpload } from '../DraggerUpload';
import { GenerateStatusPanel } from './GenerateStatusPanel';
import { useGenerateTask } from './GenerateTask/useGenerateTask';
import type { FinishHandler, ProcessingHandler, QueueHandler } from './GenerateTask/types';
import { EGenerateQueryStatus } from './GenerateTask/types';
import { MainContainer } from './styles';
import { MainWrapper } from './MainWrapper';

type CustomRequestOptions = Parameters<Exclude<UploadProps['customRequest'], undefined>>[0];
type BeforeUploadHandler = Exclude<UploadProps['beforeUpload'], undefined>;

const SUPPORT_REPLAY = ['.osr', '.mr'];
const SUPPORT_MAP = ['.osz', '.osu', '.mcz', '.mc', '.zip'];
const NEED_BGM_FILES_REGEX = /(mc|osu)/;
const supportMapsAccept = SUPPORT_MAP.join(',');
const supportReplayAccept = SUPPORT_REPLAY.join(',');

/**
 * File max size 25M
 */
const MAX_FILESIZE = 1024 * 1024 * 25;

/**
 * Main
 * 
 * TODO: move the generate biz to a unique module
 */
export const Main = React.memo(() => {
  const { t } = useTranslation();
  const localSettings = getLocalSettings();

  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [disableUploadBgm, setDisableUploadBgm] = useState(true);
  const [disableGenerate, setDisableGenerate] = useState(true);
  const [isNeedUploadBgm, setIsNeedUploadBgm] = useState(false);

  const [mapId, setMapId] = useState<string>('');
  const [bgmId, setBgmId] = useState<string>('');
  const [replayId, setReplayId] = useState<string>('');

  /**
   * generate panel info state
   */
  const [generatePercent, setGeneratePercent] = useState<number>(0);
  const [generateStatus, setGenerateStatus] = useState(EGenerateQueryStatus.Unknown);
  const [queueCount, setQueueCount] = useState<number>(0);

  const handleInitStatusData = useCallback(() => {
    setGeneratePercent(0);
    setQueueCount(0);
    setGenerateStatus(EGenerateQueryStatus.Unknown);
  }, []);

  const handleSetId = useCallback((type: EFileType, id: string) => {
    if (type === EFileType.Bgm) {
      setBgmId(id);
    } else if (type === EFileType.Map) {
      setMapId(id);
    } else if (type === EFileType.Replay) {
      setReplayId(id);
    }
  }, []);

  const handleUpload = useCallback(async (type: EFileType, {
    file,
    onProgress,
    onSuccess,
    onError,
  }: CustomRequestOptions) => {
    if (typeof file === 'string') {
      return false;
    }

    const fileSize = file.size;

    if (fileSize > MAX_FILESIZE) {
      Modal.error({
        title: t('modal-error_title'),
        content: t('modal-error_file_size_over_max'),
        okText: t('modal-ok_text'),
      });

      return false;
    }

    const uploadTask = uploadFiles({ type, file });

    uploadTask.onprogress = (event) => {
      const { loaded, total } = event;
      const percent = Math.floor(loaded / total);
      onProgress?.({ ...event, percent });
    };

    try {
      const res = await uploadTask.upload();
      const data = transformResponse(res);
      onSuccess?.(data);
      handleSetId(type, data.file_id);
    } catch (err: any) {
      ErrorView.toast(err);
      onError?.(err);
    }

    return false;
  }, [handleSetId, t]);

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

  const { generateVideo, downloadVideo, cancelTask } = useGenerateTask({ onProcessing, onQueue, onFinish });

  const beforeChooseMap = useCallback<BeforeUploadHandler>((file) => {
    const filename = file.name;
    const fileExt = getFileExtension(filename);
    if (NEED_BGM_FILES_REGEX.test(fileExt)) {
      setIsNeedUploadBgm(true);
    } else {
      setIsNeedUploadBgm(false);
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    setShowGenerateModal(true);
    handleInitStatusData();

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
  }, [bgmId, cancelTask, generateVideo, handleInitStatusData, localSettings, mapId, replayId]);

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
      onOk() {
        setShowGenerateModal(false);
        cancelTask();
      },
    });
  }, [cancelTask, generateStatus, t]);

  useEffect(() => {
    if (!mapId || !replayId || (isNeedUploadBgm && !bgmId)) {
      setDisableGenerate(true);
    } else {
      setDisableGenerate(false);
    }
  }, [bgmId, isNeedUploadBgm, mapId, replayId]);

  useEffect(() => {
    setDisableUploadBgm(!isNeedUploadBgm);
  }, [isNeedUploadBgm]);

  return (
    <MainContainer>
      <Space
        className="main-wrapper"
        size={24}
        direction="vertical"
      >
        <MainWrapper>
          <DraggerUpload
            placeholderText={t('main-upload_replay_placeholder')}
            hintText={t('main-upload_replay_placeholder_hint')}
            icon={<PlaySquareOutlined />}
            accept={supportReplayAccept}
            maxCount={1}
            customRequest={(options) => handleUpload(EFileType.Replay, options)}
          />
          <DraggerUpload
            placeholderText={t('main-upload_map')}
            hintText={t('main-upload_map_hint')}
            icon={<FileZipOutlined />}
            accept={supportMapsAccept}
            maxCount={1}
            beforeUpload={beforeChooseMap}
            customRequest={(options) => handleUpload(EFileType.Map, options)}
          />
          {!disableUploadBgm && (
            <DraggerUpload
              placeholderText={t('main-upload_bgm')}
              hintText={t('main-upload_bgm_hint')}
              icon={<CustomerServiceFilled />}
              accept="audio/*"
              maxCount={1}
              customRequest={(options) => handleUpload(EFileType.Bgm, options)}
            />
          )}
        </MainWrapper>
        <Space
          className="btn-wrapper"
          size={24}
          direction="vertical"
        >
          <Button
            block type="primary"
            disabled={disableGenerate}
            onClick={handleGenerate}
          >
            {t('btn-generate')}
          </Button>
        </Space>
        <Modal
          visible={showGenerateModal}
          centered
          bodyStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          maskClosable={false}
          title={generateStatus === EGenerateQueryStatus.Error ? t('status-generate_status_error') : t('upload-modal_title')}
          onCancel={handleCancelGenerate}
          footer={null}
        >
          <GenerateStatusPanel
            percent={generatePercent}
            status={generateStatus}
            queueCount={queueCount}
            finished={generatePercent === 100}
            onDownload={downloadVideo}
          />
        </Modal>
      </Space>
    </MainContainer>
  );
});

Main.displayName = 'Main';
