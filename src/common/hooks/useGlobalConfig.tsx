import React, { useCallback, useContext } from 'react';
import { devLog } from '../../utils/dev-log';

export const defaultConfig = {
  disableSettingPlatform: false,
};

export const GlobalConfig = React.createContext({
  config: defaultConfig,
  setConfig: (...args: any[]): any => {
    // 没啥用，防 ts check 报错
    devLog(args);
  },
});

export const useGlobalConfig = () => {
  const { config, setConfig } = useContext(GlobalConfig);

  return {
    config,
    setConfig: useCallback((newConfig: typeof config) => {
      setConfig(newConfig);
    }, [setConfig]),
  };
};
