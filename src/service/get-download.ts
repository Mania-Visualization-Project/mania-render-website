import { http, transformResponse } from './core';

export interface DownloadResponse {
  packageName: string;
  packageUrl: string;
  version: string;
}


export const getDownload = async (): Promise<DownloadResponse> => {
  const res = await http.get('/mania/api/latest');
  const data = transformResponse(res?.data);
  return {
    packageName: data?.package_name || '',
    packageUrl: data?.package_url || '',
    version: data?.version || '',
  };
};
