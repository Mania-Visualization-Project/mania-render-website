import { Space } from 'antd';
import { LanguageSwitch } from '../LanguageSwitch';
import { SettingsButton } from '../Settings';
import { useTranslation } from '../../common/i18n';
import { NavigatorContainer } from './styles';

export const Navigator = () => {
  const { t } = useTranslation();

  return (
    <NavigatorContainer>
      <div className="title-content">{t('app-title')}</div>
      <div className="right-options">
        <Space size={24}>
          <div className="change-language">
            <LanguageSwitch />
          </div>
          <div className="setting-button">
            <SettingsButton />
          </div>
        </Space>
      </div>
    </NavigatorContainer>
  );
};
