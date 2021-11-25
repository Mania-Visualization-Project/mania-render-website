import { DEFAULT_GLOBAL_SETTINGS } from '../common/constants';
import type { IGlobalSettings } from '../data/settings';
import { http } from './core';
import { transformResponse } from './transform-response';

export const getConfig = async (): Promise<IGlobalSettings> => {
  const res = await http.get('/mania/api/config');
  const data = transformResponse<IGlobalSettings>(res?.data);
  return {
    ...DEFAULT_GLOBAL_SETTINGS,
    ...(data || null),
  };
};
