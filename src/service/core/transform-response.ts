import { i18n } from '../../common/i18n';
import { IResponse } from './types';

export const transformResponse = <T = any>(res: IResponse<T>): T => {
  if (res?.status === 'OK') {
    return res?.data;
  }

  /**
   * transform response status error
   */
  if (res?.status === 'error') {
    const message = i18n.t('error-error', {
      message: res?.error_message || 'Unknown Error!',
    });

    throw {
      message,
    };
  }

  const message = i18n.t(`error-${res?.status}` as any);

  throw {
    message: message || 'Net work error!',
  };
};
