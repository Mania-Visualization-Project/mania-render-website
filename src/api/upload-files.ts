import { EFileType } from '../data/enums';
import { UploadTask } from '../utils/upload';

export interface IUploadFilesParams {
  type: EFileType;
  file: File | Blob;
}

export const uploadFiles = ({
  type,
  file,
}: IUploadFilesParams) => {
  const form = new FormData();
  form.append('type', type);
  form.append('file', file);

  return UploadTask.create({
    url: '/mania/api/upload',
    method: 'POST',
    data: form,
  });
};
