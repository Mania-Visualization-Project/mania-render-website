import React, { useCallback, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Drawer, Typography } from 'antd';
import { useTranslation } from '../../common/i18n';
import { SettingsForm } from './SettingsForm';
import { SettingsButtonContainer, SettingsPanelContainer } from './styles';

export const SettingsButton = React.memo(() => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);

  const handleShow = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const handleHide = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <SettingsButtonContainer>
      <div className="trigger-button" onClick={handleShow}>
        <SettingOutlined />
      </div>
      <Drawer
        title={t('app-settings')}
        placement="right"
        visible={visible}
        onClose={handleHide}
        mask={false}
        maskClosable={false}
        width={360}
        style={{
          marginTop: 64,
        }}
      >
        <SettingsForm />
      </Drawer>
    </SettingsButtonContainer>
  );
});

SettingsButton.displayName = 'SettingsButton';

export const SettingsPanel = React.memo(() => {
  const { t } = useTranslation();
  return (
    <SettingsPanelContainer
      title={(
        <Typography.Text>
          {t('app-settings')}
        </Typography.Text>
      )}
    >
      <SettingsForm />
    </SettingsPanelContainer>
  );
});

SettingsPanel.displayName = 'SettingsPanel';
