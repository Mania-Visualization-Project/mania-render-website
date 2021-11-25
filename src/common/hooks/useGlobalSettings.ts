import { useEffect, useMemo, useState } from 'react';
import { omit } from 'lodash';
import { DEFAULT_GLOBAL_SETTINGS } from '../constants';
import { IGlobalSettings } from '../../data/settings';
import { getConfig } from '../../api/get-config';
import { getLocalGlobalSettings, setLocalSettings } from '../local-settings';
import { setLocalLanguage } from '../local-language';

export const useGlobalSettings = () => {
  const [value, setValue] = useState<IGlobalSettings>(DEFAULT_GLOBAL_SETTINGS);
  const localGlobalSettings = useMemo(() => getLocalGlobalSettings(), []);

  useEffect(() => {
    let isUmount = false;

    if (localGlobalSettings && !isUmount) {
      setValue(localGlobalSettings);

      return () => {
        isUmount = true;
      };
    }

    (async () => {
      const config = await getConfig();
      if (!isUmount) {
        setValue(config);
        setLocalLanguage(config.language);
        setLocalSettings(omit(config, 'language'));
      }
    })();

    return () => {
      isUmount = true;
    };
  }, [localGlobalSettings]);

  return value;
};
