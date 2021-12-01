import type { IResponse } from './types';
import type { IGenerateParams, IGenerateResponseData, IQueryResponseData } from './generate.types';
import { transformResponse } from './transform-response';
import { http } from './core';

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


