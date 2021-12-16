import { DownloadResponse } from '../service/get-download';
import { ELocalstorageKeys } from './localstorage-keys';

export const setLocalDownload = (download: DownloadResponse) => {
  localStorage.setItem(ELocalstorageKeys.Download, JSON.stringify(download));
};

export const getLocalDownload = (): DownloadResponse => {
  const downloadJson = localStorage.getItem(ELocalstorageKeys.Download);
  if (downloadJson) {
    return JSON.parse(downloadJson);
  }

  return {
    packageName: '',
    packageUrl: '',
    version: '',
  };
};
