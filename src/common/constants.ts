import { EMalodyPlatform, IGlobalSettings, ISettings } from '../data/settings';
import { ELanguage } from '../data/enums';

export const DEFAULT_LANGUAGE = 'zh';

export const DEFAULT_SETTINGS: ISettings = {
  speed: 15,
  fps: 60,
  malody_platform: EMalodyPlatform.PE,
  width: 540,
  height: 960,
};

export const DEFAULT_GLOBAL_SETTINGS: IGlobalSettings = {
  ...DEFAULT_SETTINGS,
  language: ELanguage.Chinese,
};
