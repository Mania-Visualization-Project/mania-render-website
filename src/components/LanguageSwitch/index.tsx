import React, { useCallback, useMemo } from 'react';
import { Dropdown, Menu } from 'antd';
import { changeLanguage, useTranslation } from '../../common/i18n';
import { ELanguage } from '../../data/enums';
import './styles.less';

export const LanguageSwitch = React.memo(() => {
  const { t } = useTranslation();
  const handleChangeLanguage = useCallback(async (language: ELanguage) => {
    await changeLanguage(language);
  }, []);

  const menu = useMemo(() => {
    return (
      <Menu className="language-switch">
        <Menu.Item key="chinese" onClick={() => handleChangeLanguage(ELanguage.Chinese)}>
          简体中文
        </Menu.Item>
        <Menu.Item key="english" onClick={() => handleChangeLanguage(ELanguage.English)}>
          English
        </Menu.Item>
      </Menu>
    );
  }, [handleChangeLanguage]);

  return (
    <Dropdown
      overlay={menu}
      trigger={['click', 'hover']}
      overlayClassName="language-switch-overlay"
    >
      <div>
        <a className="language-switch-children">{t('current-language')}</a>
      </div>
    </Dropdown>
  );
});

LanguageSwitch.displayName = 'LanguageSwitch';
