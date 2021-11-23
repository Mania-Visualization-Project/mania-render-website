import { IResponse } from './types';

export const transformResponse = <T = any>(res: IResponse<T>): T => {
  if (res?.status === 'OK') {
    return res?.data;
  }

  throw {
    message: res?.error_message || 'Net work error!',
  };
};
