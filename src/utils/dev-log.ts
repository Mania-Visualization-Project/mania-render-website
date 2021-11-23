import { __DEV__ } from './env';

export const devLog = (...args: any[]) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};
