import { EMalodyPlatform, ISettings } from '../data/settings';
import { ELocalstorageKeys } from './localstorage-keys';

export const DEFAULT_SETTINGS: ISettings = {
  speed: 15,
  fps: 60,
  malody_platform: EMalodyPlatform.PE,
  width: 960,
  height: 540,
};

export const setLocalSettings = (settings: ISettings) => {
  localStorage.setItem(ELocalstorageKeys.SettingsConfig, JSON.stringify(settings));
};

export const getLocalSettings = (): ISettings => {
  const item = localStorage.getItem(ELocalstorageKeys.SettingsConfig);
  const obj: ISettings = JSON.parse(item || '{}');
  return {
    speed: obj?.speed ?? DEFAULT_SETTINGS.speed,
    fps: obj?.fps ?? DEFAULT_SETTINGS.fps,
    height: obj?.height ?? DEFAULT_SETTINGS.height,
    malody_platform: obj?.malody_platform ?? DEFAULT_SETTINGS.malody_platform,
    width: obj?.width ?? DEFAULT_SETTINGS.width,
  };
};
