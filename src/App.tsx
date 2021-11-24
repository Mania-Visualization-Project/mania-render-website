import { Layout, Space } from 'antd';
import { useTranslation } from './common/i18n';
import { LanguageSwitch } from './components/LanguageSwitch';
import { SettingsButton } from './components/Settings';
import { Main } from './components/Main';

import './App.less';

const { Header, Content } = Layout;

export const App = () => {
  const { t } = useTranslation();

  return (
    <div className="app-container">
      <Layout className="mr-app">
        <Header className="app-header">
          <div className="header-main">
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
          </div>
        </Header>
        <Content className="app-content">
          <Main />
        </Content>
      </Layout>
    </div>
  );
};
