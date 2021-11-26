import { useCallback } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as _useTranslation } from 'react-i18next';
import { ELanguage } from '../data/enums';
import { resources } from '../locals';
import type { TI18nKeys } from '../locals/types';
import { devLog } from '../utils/dev-log';
import { DEFAULT_LANGUAGE } from './constants';
import { getLocalLanguage, setLocalLanguage } from './local-language';

export const initI18n = () => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      lng: getLocalLanguage() || DEFAULT_LANGUAGE,
      interpolation: {
        escapeValue: false,
      },
    })
    .then(() => {
      devLog('[i18next] init success');
    });
};

export const i18n = i18next;

export const t = (key: TI18nKeys): string => {
  return i18next.t<string, TI18nKeys>(key);
};

type TranslationFunctionType = (key: TI18nKeys) => string;

export const useTranslation = () => {
  const { t, ...restMembers } = _useTranslation();

  const translation: TranslationFunctionType = useCallback((...args) => {
    return t<TI18nKeys>(...args);
  }, [t]);

  return {
    t: translation,
    ...restMembers,
  };
};

export const changeLanguage = async (language: ELanguage) => {
  await i18n.changeLanguage(language);
  setLocalLanguage(language);
};
