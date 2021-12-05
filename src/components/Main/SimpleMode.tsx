import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Space, UploadProps } from 'antd';
import { CustomerServiceFilled, FileZipOutlined, PlaySquareOutlined } from '@ant-design/icons';
import { useTranslation } from '../../common/i18n';
import { useGlobalConfig } from '../../common/hooks/useGlobalConfig';
import { __SHABI_SAFARI__ } from '../../utils/env';
import { getFileExtension } from '../../utils/get-file-extension';
import { transformResponse } from '../../service/core';
import { uploadFiles } from '../../service/upload-files';
import { EFileType } from '../../data/enums';
import { ErrorView } from '../ErrorToast';
import { DraggerUpload } from '../DraggerUpload';
import { GenerateCore } from './GenerateCore';
import { MainWrapperWithSettings } from './MainWrapperWithSettings';

type CustomRequestOptions = Parameters<Exclude<UploadProps['customRequest'], undefined>>[0];
type BeforeUploadHandler = Exclude<UploadProps['beforeUpload'], undefined>;

const SUPPORT_REPLAY = ['.osr', '.mr'];
const SUPPORT_MAP = ['.osz', '.osu', '.mcz', '.mc', '.zip'];
const NEED_BGM_FILES_REGEX = /(mc|osu)$/;
const supportMapsAccept = SUPPORT_MAP.join(',');
const supportReplayAccept = SUPPORT_REPLAY.join(',');

/**
 * File max size 100M
 */
const MAX_FILESIZE = 1024 * 1024 * 100;

export const SimpleMode = () => {
  const { t } = useTranslation();

  const { setConfig, config } = useGlobalConfig();

  const [disableGenerate, setDisableGenerate] = useState(true);
  const [isNeedUploadBgm, setIsNeedUploadBgm] = useState(false);

  const [replayName, setReplayName] = useState<string>('');
  const [mapName, setMapName] = useState<string>('');
  const [bgmName, setBgmName] = useState<string>('');

  const [mapId, setMapId] = useState<string>('');
  const [bgmId, setBgmId] = useState<string>('');
  const [replayId, setReplayId] = useState<string>('');

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
      const percent = Math.round(loaded / total * 100);
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

  const beforeUploadMap = useCallback<BeforeUploadHandler>((file) => {
    const filename = file.name;
    const fileExt = getFileExtension(filename);

    setMapName(filename || '');

    if (NEED_BGM_FILES_REGEX.test(fileExt)) {
      setIsNeedUploadBgm(true);
    } else {
      setIsNeedUploadBgm(false);
      setBgmName('');
    }
  }, []);

  const beforeUploadReplay = useCallback<BeforeUploadHandler>((file) => {
    const filename = file.name;
    const fileExt = getFileExtension(filename);

    setReplayName(filename);

    if (/osr$/.test(fileExt)) {
      setConfig({
        ...config,
        disableSettingPlatform: true,
      });
    } else {
      setConfig({
        ...config,
        disableSettingPlatform: false,
      });
    }
  }, [config, setConfig]);

  const beforeUploadBgm = useCallback<BeforeUploadHandler>((file) => {
    const filename = file.name;
    setBgmName(filename);
  }, []);

  useEffect(() => {
    if (!mapId || !replayId || (isNeedUploadBgm && !bgmId)) {
      setDisableGenerate(true);
    } else {
      setDisableGenerate(false);
    }
  }, [bgmId, isNeedUploadBgm, mapId, replayId]);

  return (
    <Space
      className="main-wrapper"
      size={24}
      direction="vertical"
    >
      <MainWrapperWithSettings>
        <DraggerUpload
          placeholderText={t('main-upload_replay_placeholder')}
          hintText={t('main-upload_replay_placeholder_hint')}
          icon={<PlaySquareOutlined />}
          accept={supportReplayAccept}
          maxCount={1}
          beforeUpload={beforeUploadReplay}
          customRequest={(options) => handleUpload(EFileType.Replay, options)}
        />
        <DraggerUpload
          placeholderText={t('main-upload_map')}
          hintText={t('main-upload_map_hint')}
          icon={<FileZipOutlined />}
          accept={supportMapsAccept}
          maxCount={1}
          beforeUpload={beforeUploadMap}
          customRequest={(options) => handleUpload(EFileType.Map, options)}
        />
        {isNeedUploadBgm && (
          <DraggerUpload
            placeholderText={t('main-upload_bgm')}
            hintText={t('main-upload_bgm_hint')}
            icon={<CustomerServiceFilled />}
            accept={`audio/*${__SHABI_SAFARI__ ? ', .ogg' : '' }`}
            maxCount={1}
            beforeUpload={beforeUploadBgm}
            customRequest={(options) => handleUpload(EFileType.Bgm, options)}
          />
        )}
      </MainWrapperWithSettings>
      <GenerateCore
        disable={disableGenerate}
        mapId={mapId}
        bgmId={bgmId}
        replayId={replayId}
        mapName={mapName}
        bgmName={bgmName}
        replayName={replayName}
      />
    </Space>
  );
};
