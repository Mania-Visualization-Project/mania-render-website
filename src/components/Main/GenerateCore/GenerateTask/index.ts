import { DEFAULT_SETTINGS } from '../../../../common/constants';
import { ISettings } from '../../../../data/settings';
import { downloadFile } from '../../../../utils/download-file';
import { devLog } from '../../../../utils/dev-log';
import type { IGenerateParams, IQueryResponseData } from '../../../../api/generate';
import { generateVideo, queueTask } from '../../../../api/generate';
import type {
  FinishHandler,
  ProcessingHandler,
  QueueHandler,
  IGenerateTaskParams,
  ExtraHandler,
} from './types';
import { EGenerateQueryStatus } from './types';

export class GenerateTask {
  static readonly QUERY_INTERVAL = 1000;

  private _map: string;

  private _bgm: string;

  private _replay: string;

  private _settings: ISettings;

  private _task_id: string;

  private _onQueue: QueueHandler | null;

  private _onProcessing: ProcessingHandler | null;

  private _onFinish: FinishHandler | null;

  private _query_timer: number;

  private _download_filename: string;

  private _handleExtra: ExtraHandler | null;

  public set onQueue(onQueue: QueueHandler) {
    this._onQueue = onQueue;
  }

  public set onProcessing(onProcessing: ProcessingHandler) {
    this._onProcessing = onProcessing;
  }

  public set onFinish(onFinish: FinishHandler) {
    this._onFinish = onFinish;
  }

  public set handleExtra(handleExtra: ExtraHandler) {
    this._handleExtra = handleExtra;
  }

  private constructor() {
    this._map = '';
    this._bgm = '';
    this._replay = '';
    this._settings = DEFAULT_SETTINGS;
    this._task_id = '';
    this._onQueue = null;
    this._onProcessing = null;
    this._onFinish = null;
    this._handleExtra = null;
    this._query_timer = -1;
    this._download_filename = 'download';
  }

  public static create({
    map_id,
    bgm_id,
    replay_id,
    settings,
  }: IGenerateTaskParams): GenerateTask {
    const task = new GenerateTask();
    task._map = map_id;
    task._bgm = bgm_id;
    task._replay = replay_id;
    task._settings = settings;
    return task;
  }

  public async start(): Promise<void> {
    await this.startGenerate();
    await this.startQuery();
  }

  private async startGenerate() {
    const params: IGenerateParams = {
      map: this._map,
      ...(this._bgm ? { bgm: this._bgm } : {}),
      replay: this._replay,
      extra: this._settings,
    };

    const data = await generateVideo(params);

    this._task_id = data.task_id;
    devLog('[start generate]', data.task_id);
  }

  public cancelQuery() {
    devLog('[cancel query]');
    if (this._query_timer > 0) {
      clearInterval(this._query_timer);
    }
  }

  private startQuery() {
    devLog('[start query]');

    const handleQueue = this._onQueue;
    const handleProcessing = this._onProcessing;
    const handleFinish = this._onFinish;
    const handleExtra = this._handleExtra;

    return new Promise<void>(((resolve, reject) => {
      this._query_timer = setInterval(async () => {
        try {
          const result = await this.query();
          const { type } = result;

          handleExtra?.(result?.__extra__);

          if (type === EGenerateQueryStatus.Queue) {
            handleQueue?.(result?.count ?? -1);
            devLog('[query]', result);
          } else if (type === EGenerateQueryStatus.Processing) {
            handleProcessing?.(result?.progress ?? -1);
            devLog('[processing]', result);
          } else if (type === EGenerateQueryStatus.Finish) {
            const downloadFilename = result?.filename ?? 'download';
            /**
             * why here need this line ?
             * because the backend will directly return finish instead return
             * percent 100 then finish...
             *
             * ┭┮﹏┭┮
             */
            handleProcessing?.(100);

            handleFinish?.(downloadFilename);
            this._download_filename = downloadFilename;
            devLog('[finish]', result);
            this.cancelQuery();
            resolve();
          } else {
            this.cancelQuery();
          }
        } catch (err: any) {
          this.cancelQuery();
          reject(err);
        }
      }, GenerateTask.QUERY_INTERVAL);
    }));
  }

  private async query(): Promise<IQueryResponseData> {
    const data = await queueTask(this._task_id);

    if (!data) {
      devLog('[query res error]', data);
      return {
        type: EGenerateQueryStatus.Unknown,
      };
    }

    return data;
  }

  public async download() {
    const url = `/mania/api/download?task_id=${this._task_id}`;
    downloadFile(url, this._download_filename);
  }
}
