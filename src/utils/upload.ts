import { IResponse } from '../api/types';

export type Method = 'PUT' | 'POST' | 'PATCH';

export interface IUploadResponseData {
  file_id: string;
}

/**
 * 上传任务
 */
export class UploadTask {
  public addUploadEventListener;
  public removeUploadEventListener;

  private readonly _xhr: XMLHttpRequest;
  private _method: Method;
  private _url: string;
  private _data: any;
  private _timeout: number;
  private _headers: Record<string, string>;
  private _onprogress: ((event: ProgressEvent<EventTarget>) => void) | null;

  private constructor() {
    this._xhr = new XMLHttpRequest();
    this._method = 'POST';
    this._url = '';
    this._headers = {};
    this._onprogress = null;
    this.addUploadEventListener = this._xhr.upload.addEventListener.bind(this._xhr.upload);
    this.removeUploadEventListener = this._xhr.upload.removeEventListener.bind(this._xhr.upload);
    // 20 min 的上传时间
    this._timeout = 20 * 60 * 1000;
  }

  public static create(options: {
    url: string,
    data: any;
    method?: Method,
    config?: {
      timeout?: number;
      headers?: Record<string, string>;
    },
  }) {
    const task = new UploadTask();
    task.url = options.url;
    options?.data !== undefined && (task.data = options.data);
    options?.method !== undefined && (task.method = options.method);
    options?.config?.headers !== undefined && (task.headers = options.config.headers);
    options?.config?.timeout !== undefined && (task.timeout = options.config.timeout);
    return task;
  }

  public set method(value: Method) {
    this._method = value;
  }

  public set headers(headers: Record<string, string>) {
    this._headers = headers;
  }

  public set url(url: string) {
    this._url = url;
  }

  public set data(data: any) {
    this._data = data;
  }

  public set timeout(timeout: number) {
    this._timeout = timeout;
  }

  public set onprogress(onprogress: XMLHttpRequestUpload['onprogress']) {
    this._onprogress = onprogress;
  }

  public upload(): Promise<IResponse<IUploadResponseData>> {
    return new Promise(((resolve, reject) => {
      const xhr = this._xhr;
      const headers = this._headers;

      xhr.open(this._method, this._url);

      Object.keys(headers).forEach((key) => {
        if (key in headers) {
          this._xhr.setRequestHeader(key, headers[key]);
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
          const res: IResponse<IUploadResponseData> = JSON.parse(xhr.responseText) as any;
          resolve(res);
        }
      };

      if (typeof this._onprogress === 'function') {
        xhr.upload.onprogress = (...args) => {
          this._onprogress && this._onprogress(...args);
        };
      }

      xhr.timeout = this._timeout;

      xhr.ontimeout = () => {
        reject({
          message: 'upload timeout',
        });
      };

      xhr.send(this._data);
    }));
  }

  public abort(): void {
    if (this._xhr.readyState < 4) {
      this._xhr.abort();
    }
  }
}
