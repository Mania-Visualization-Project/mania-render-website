import { useEffect } from 'react';
import { Layout } from 'antd';
import { changeLanguage, initI18n } from './common/i18n';
import { getLocalLanguage, setLocalLanguage } from './common/local-language';
import { getConfigWithCache } from './api/get-config';
import { Main } from './components/Main';
import { Navigator } from './components/Navigator';
import { ErrorView } from './components/ErrorToast';
import { PageFooter } from './components/PageFooter';
import { Container } from './styles';

const { Header, Content, Footer } = Layout;

initI18n();

export const App = () => {

  useEffect(() => {
    const localLanguage = getLocalLanguage();

    if (!localLanguage) {
      getConfigWithCache().then((settings) => {
        if (!localLanguage) {
          changeLanguage(settings.language).then();
          setLocalLanguage(settings.language);
        } else {
          changeLanguage(localLanguage).then();
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
        <Footer className="app-footer">
          <PageFooter />
        </Footer>
      </Layout>
    </Container>
  );
};
