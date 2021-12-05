import { TI18nKeys } from './types';

const resource: Record<TI18nKeys, string> = {
  'app-download': '下载',
  'app-error_refresh': '刷新页面',
  'app-error_page_error': '页面出错！',
  'app-feedback': '反馈',
  'app-settings': '设置',
  'app-title': '骂娘渲染器',
  'app-mode_enhance': '增强模式',
  'app-mode_simple': '简洁模式',
  'btn-generate': '一键生成！',
  'current-language': '简体中文',
  'main-drag_upload_text': '拖动或点击此处上传',
  'main-upload_bgm': '拖动或点击此处上传 bgm 文件',
  'main-upload_bgm_hint': '支持所有的 osu 或 malody 支持的音频文件',
  'main-upload_map': '拖动或点击此处上传谱面、谱包文件',
  'main-upload_map_hint': '支持 .osz, .osu, .mcz, .mc, .zip文件',
  'main-upload_replay_placeholder': '拖动或点击此处上传回放文件',
  'main-upload_replay_placeholder_hint': '支持 .osr, .mr 文件',
  'modal-error_file_size_over_max': '文件大小不能超过 100M !',
  'modal-error_title': '错误！',
  'modal-finished_title': '生成成功！',
  'modal-generate_close_confirm_cancel_text': '取消',
  'modal-generate_close_confirm_content': '关闭窗口将会停止生成回放视频，您确定要关闭吗？',
  'modal-generate_close_confirm_ok_text': '确定',
  'modal-generate_close_confirm_title': '您确定要关闭吗？',
  'modal-generating_title': '正在生成...',
  'modal-ok_text': '确认',
  'settings-fps': 'FPS',
  'settings-platform': '平台',
  'settings-speed': '下落速度（像素/帧）',
  'settings-video_height': '视频高度',
  'settings-video_width': '视频宽度',
  'status-current_audio_name_label': '音频文件',
  'status-current_file_name_label': '回放文件',
  'status-current_in_queue': '当前排队数量',
  'status-current_map_name_label': '谱面文件',
  'status-current_settings': '当前设置',
  'status-current_status': '当前状态',
  'status-current_warning_audio_not_match': '音频文件和谱面文件可能不匹配',
  'status-current_warning_label': '警告',
  'status-current_warning_replay_not_match': '回放文件和谱面文件可能不匹配',
  'status-download_button': '这就下载!',
  'status-generate_generating_introduction': '**正在生成，请不要关闭或刷新窗口和页面**',
  'status-generate_progress_label': '当前进度',
  'status-generate_status_error': '出错啦！',
  'status-generate_status_finish': '已完成',
  'status-generate_status_processing': '处理中',
  'status-generate_status_queue': '排队中',
  'status-generate_status_unknown': '等待中',
  'status-generate_success': '生成成功！您可以点击下载了',
};

export const zh = {
  translation: resource,
};
