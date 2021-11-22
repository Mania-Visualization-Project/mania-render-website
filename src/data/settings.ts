export enum EMalodyPlatform {
  PE = 'PE',
  PC = 'PC',
}

/**
 * 设置项参数
 */
export interface ISettings {
  /**
   * note 下落速度
   */
  speed: number;
  /**
   * 帧数
   */
  fps: number;
  /**
   * malody 平台
   */
  malody_platform: EMalodyPlatform;
  /**
   * 视频宽度
   */
  width: number;
  /**
   * 视频长度
   */
  height: number;
}
