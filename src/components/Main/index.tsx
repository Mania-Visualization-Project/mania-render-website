import React from 'react';
import { Tabs } from 'antd';
import { useTranslation } from '../../common/i18n';
import { SimpleMode } from './SimpleMode';
import { EnhanceMode } from './EnhanceMode';
import { MainContainer } from './styles';

const { TabPane } = Tabs;

/**
 * Main
 * 
 * TODO: move the generate biz to a unique module
 */
export const Main = React.memo(() => {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Tabs defaultActiveKey="1">
        <TabPane tab={t('app-mode_simple')} key="1">
          <SimpleMode />
        </TabPane>
        <TabPane tab={t('app-mode_enhance')} key="2">
          <EnhanceMode />
        </TabPane>
      </Tabs>
    </MainContainer>
  );
});

Main.displayName = 'Main';
