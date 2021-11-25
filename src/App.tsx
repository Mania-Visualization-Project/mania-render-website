import { useEffect } from 'react';
import { Layout } from 'antd';
import { omit } from 'lodash';
import { Main } from './components/Main';
import { Navigator } from './components/Navigator';
import { changeLanguage, initI18n } from './common/i18n';
import { getLocalSettings, setLocalSettings } from './common/local-settings';
import { getLocalLanguage, setLocalLanguage } from './common/local-language';
import { getConfig } from './api/get-config';
import { ErrorView } from './components/ErrorToast';
import { Container } from './styles';


const { Header, Content } = Layout;

initI18n();

export const App = () => {

  useEffect(() => {
    const localSettings = getLocalSettings();
    const localLanguage = getLocalLanguage();

    if (!localLanguage || !localSettings) {
      getConfig().then((settings) => {
        if (!localLanguage) {
          changeLanguage(settings.language).then();
          setLocalLanguage(settings.language);
        } else {
          changeLanguage(localLanguage).then();
        }

        if (!localSettings) {
          setLocalSettings(omit(settings, 'language'));
        }
      }).catch((err: any) => {
        ErrorView.toast(err);
      });
    }
  }, []);

  return (
    <Container>
      <Layout className="mr-app">
        <Header className="app-header">
          <Navigator />
        </Header>
        <Content className="app-content">
          <Main />
        </Content>
      </Layout>
    </Container>
  );
};
