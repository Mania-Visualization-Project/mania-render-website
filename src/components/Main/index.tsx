import React, { useCallback, useState } from 'react';
import { Button, Col, Modal, Progress, Row, Space } from 'antd';
import { useTranslation } from '../../common/i18n';
import { DraggerUpload } from '../DraggerUpload';
import { SettingsPanel } from '../Settings';
import { MainContainer } from './styles';

const SUPPORT_REPLAY = ['.osr', '.mr'];
const SUPPORT_MAP = ['.osz', '.osu', '.mcz', '.mc', '.zip'];
const supportMapsAccept = SUPPORT_MAP.join(',');
const supportReplayAccept = SUPPORT_REPLAY.join(',');

export const Main = React.memo(() => {
  const { t } = useTranslation();

  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUpload = useCallback(() => {
    setUploadPercent(15);
    setShowUploadModal(true);
    // TODO: upload
  }, []);

  return (
    <MainContainer>
      <Space
        className="main-wrapper"
        size={24}
        direction="vertical"
      >
        <Row>
          <Col sm={24} md={16}>
            <Space
              className="upload-wrapper"
              size={24}
              direction="vertical"
            >
              <DraggerUpload
                placeholderText={t('main-upload_replay_placeholder')}
                hintText={t('main-upload_replay_placeholder_hint')}
                accept={supportReplayAccept}
              />
              <DraggerUpload
                placeholderText={t('main-upload_map')}
                hintText={t('main-upload_map_hint')}
                accept={supportMapsAccept}
              />
              <DraggerUpload
                placeholderText={t('main-upload_bgm')}
                hintText={t('main-upload_bgm_hint')}
                accept="audio/*"
              />
            </Space>
          </Col>
          <Col sm={0} md={8}>
            <SettingsPanel />
          </Col>
        </Row>
        <Space
          className="btn-wrapper"
          size={24}
          direction="vertical"
        >
          <Button
            block type="primary"
            onClick={handleUpload}
          >
            {t('btn-generate')}
          </Button>
        </Space>
        <Modal
          visible={showUploadModal}
          centered
          bodyStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          maskClosable={false}
          title={t('upload-modal_title')}
          onCancel={() => {
            setShowUploadModal(false);
          }}
          footer={null}
        >
          <Progress
            type="circle"
            percent={uploadPercent}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </Modal>
      </Space>
    </MainContainer>
  );
});

Main.displayName = 'Main';
