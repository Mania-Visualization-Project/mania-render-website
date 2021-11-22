import { TI18nKeys } from './types';

const resource: Record<TI18nKeys, string> = {
  'app-title': 'Mania Render 网',
  'current-language': '简体中文',
  'app-settings': '设置',
  'settings-fps': 'FPS',
  'settings-platform': '平台',
  'settings-speed': '下落速度（像素/帧）',
  'settings-video_height': '视频宽度',
  'settings-video_width': '视频高度',
  'main-upload_replay_placeholder': '拖动或点击此处上传回放文件',
  'main-upload_map': '拖动或点击此处上传谱面、谱包文件',
  'main-upload_bgm': '拖动或点击此处上传 bgm 文件',
  'main-upload_replay_placeholder_hint': '支持 .osr, .mr 文件',
  'main-upload_map_hint': '支持.osz, .osr, .mcz, .mc, .zip文件',
  'main-upload_bgm_hint': '支持所有的 osu 或 malody 支持的音频文件',
  'main-drag_upload_text': '拖动或点击此处上传',
  'upload-modal_title': '正在上传...',
  'btn-generate': '一键生成！',
};

export const zh = {
  translation: resource,
};
