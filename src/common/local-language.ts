import { ELanguage } from '../data/enums';
import { ELocalstorageKeys } from './localstorage-keys';

export const getLocalLanguage = (): ELanguage | null => {
  const ln = localStorage.getItem(ELocalstorageKeys.LanguageConfig);

  if (!ln) {
    return null;
  }

  return String(ln) as ELanguage;
};

export const setLocalLanguage = (language: ELanguage): void => {
  localStorage.setItem(ELocalstorageKeys.LanguageConfig, language);
};
