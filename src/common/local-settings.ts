import { IGlobalSettings, ISettings } from '../data/settings';
import { ELocalstorageKeys } from './localstorage-keys';
import { getLocalLanguage } from './local-language';

export const setLocalSettings = (settings: ISettings) => {
  localStorage.setItem(ELocalstorageKeys.SettingsConfig, JSON.stringify(settings));
};

export const getLocalSettings = (): ISettings | null => {
  const item = localStorage.getItem(ELocalstorageKeys.SettingsConfig);

  if (!item) {
    return null;
  }

  return JSON.parse(item);
};

export const getLocalGlobalSettings = (): IGlobalSettings | null => {
  const localSettings = getLocalSettings();
  const localLanguage = getLocalLanguage();

  if (!localSettings || !localLanguage) {
    return null;
  }

  return {
    ...localSettings,
    language: localLanguage,
  };
};
