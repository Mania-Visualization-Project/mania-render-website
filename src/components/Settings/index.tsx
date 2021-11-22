import React, { useCallback, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Drawer, Tooltip, Typography } from 'antd';
import { useTranslation } from '../../common/i18n';
import { SettingsForm } from './SettingsForm';
import { SettingsButtonContainer, SettingsPanelContainer } from './styles';

export const SettingsButton = React.memo(() => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);

  const handleShow = useCallback(() => {
    setVisible(true);
  }, []);

  const handleHide = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <SettingsButtonContainer>
      <div className="trigger-button" onClick={handleShow}>
        <Tooltip title={t('app-settings')}>
          <SettingOutlined />
        </Tooltip>
      </div>
      <Drawer
        title={t('app-settings')}
        placement="right"
        visible={visible}
        onClose={handleHide}
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
