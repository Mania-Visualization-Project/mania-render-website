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

export const QQ_GROUP_URL = 'https://jq.qq.com/?_wv=1027&k=lhgX94bn';
export const FEEDBACK_URL = 'https://github.com/Mania-Visualization-Project/mania-render-website/issues';
export const DOWNLOAD_ZIP_URL = 'https://mania-replay-master-1305818561.cos.ap-shanghai.myqcloud.com/ManiaReplayMaster%20v2.2.2.zip';
export const DOWNLOAD_ZIP_FILENAME = 'ManiaReplayMaster v2.2.2.zip';
