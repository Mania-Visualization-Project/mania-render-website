import type { IResponse } from './core';
import { transformResponse , http } from './core';

import type { IGenerateParams, IGenerateResponseData, IQueryResponseData } from './generate.types';

export type { IGenerateParams, IGenerateResponseData, IQueryResponseData };

export const queueTask =async (taskId: string): Promise<IQueryResponseData> => {
  const res = await http.get<IResponse<IQueryResponseData>>(
    `/mania/api/query?task_id=${taskId}`,
  );

  return transformResponse<IQueryResponseData>(res?.data);
};

export const generateVideo = async (params: IGenerateParams) => {
  const res = await http.post<IResponse<IGenerateResponseData>>(
    '/mania/api/generate',
    params,
  );

  return transformResponse<IGenerateResponseData>(res.data);
};


