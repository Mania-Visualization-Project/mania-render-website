import { useCallback, useMemo } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { i18n, useTranslation } from '../../common/i18n';
import { CHINESE_DOWNLOAD_URL, ENGLISH_DOWNLOAD_URL, FEEDBACK_URL } from '../../common/constants';
import { openTab } from '../../utils/open-tab';
import { ELanguage } from '../../data/enums';
import { LanguageSwitch } from '../LanguageSwitch';
import { SettingsButton } from '../Settings';
import { NavigatorContainer } from './styles';

export const Navigator = () => {
  const { t } = useTranslation();
  const handleDownload = useCallback(() => {
    const language = i18n.language as ELanguage;
    if (language === ELanguage.Chinese) {
      openTab(CHINESE_DOWNLOAD_URL);
    } else {
      openTab(ENGLISH_DOWNLOAD_URL);
    }
  }, []);

  const menu = useMemo(() => {
    return (
      <Menu
        style={{
          minWidth: 172,
        }}
        className="nav-menu"
        mode="horizontal"
        selectedKeys={[]}
        openKeys={[]}
      >
        <Menu.Item
          key="title"
          className="nav-menu-item hide-in-mobile"
        >
          {t('app-title')}
        </Menu.Item>
        <Menu.Item
          key="download"
          className="nav-menu-item"
          onClick={handleDownload}
        >
          {t('app-download')}
        </Menu.Item>
        <Menu.Item
          key="feedback"
          className="nav-menu-item"
          onClick={() => openTab(FEEDBACK_URL)}
        >
          {t('app-feedback')}
        </Menu.Item>
      </Menu>
    );
  }, [handleDownload, t]);

  return (
    <NavigatorContainer>
      <div className="title-content">
        <div className="pc-title">
          {menu}
        </div>
        <div className="mobile-title">
          <Space size={2}>
            <Dropdown
              overlay={menu}
              overlayClassName="dropdown-menu"
              trigger={['click']}
            >
              <div className="hamburger-button">
                <MenuOutlined />
              </div>
            </Dropdown>
            <div>{t('app-title')}</div>
          </Space>
        </div>
      </div>
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
