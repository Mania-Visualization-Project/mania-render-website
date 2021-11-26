import { EMalodyPlatform, IGlobalSettings, ISettings } from '../data/settings';
import { ELanguage } from '../data/enums';

export const DEFAULT_LANGUAGE = ELanguage.English;

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

export const CHINESE_DOWNLOAD_URL = 'https://github.com/Mania-Visualization-Project/Mania-Replay-Master/blob/master/README.md';
export const ENGLISH_DOWNLOAD_URL = 'https://github.com/Mania-Visualization-Project/Mania-Replay-Master/blob/master/README_EN.md';
export const FEEDBACK_URL = 'https://github.com/Mania-Visualization-Project/mania-render-website/issues';
