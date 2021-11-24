import { TI18nKeys } from './types';

const resource: Record<TI18nKeys, string> = {
  'app-title': 'Mania Render WebSite',
  'app-settings': 'Settings',
  'current-language': 'English',
  'settings-speed': 'Speed',
  'settings-fps': 'FPS',
  'settings-platform': 'Malody Platform',
  'settings-video_width': 'Video Width',
  'settings-video_height': 'Video Height',
  'main-upload_replay_placeholder_hint': 'Support .osr and .mr files',
  'main-upload_map_hint': 'Support .osz, .osu, .mcz, .mc and .zip files',
  'main-upload_bgm_hint': 'Support all file types which osu and malody supported',
  'main-drag_upload_text': 'Click or drag file to this area to upload',
  'main-upload_replay_placeholder': 'Click or drag file to this area to upload your replays',
  'main-upload_map': 'Click or drag file to this area to upload your maps',
  'main-upload_bgm': 'Click or drag file to this area to upload your bgm',
  'upload-modal_title': 'Generating...',
  'modal-error_title': 'Error!',
  'modal-error_file_size_over_max': 'File size can not over 25MB',
  'modal-ok_text': 'OK!',
  'btn-generate': 'Generate Now!',
  'status-current_status': 'Current status:',
  'status-current_in_queue': 'Current in Queue:',
  'status-generate_success': 'Generate Success, click button to download.',
  'status-download_button': 'Download!',
};

export const en = {
  translation: resource,
};
