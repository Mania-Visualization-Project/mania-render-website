export const __DEV__ = location.hostname === 'localhost';

/**
 * 你知道我为什么要这么写吗？
 * 因为 sha bi safari 浏览器居然 tmd accept = audio/* 的时候不显示 ogg？？？？
 */
export const __SHABI_SAFARI__ = /Safari/.test(window.navigator.userAgent);
