import { ISettings } from '../../../data/settings';

export type QueueHandler = (count: number) => void;
export type ProcessingHandler = (progress: number) => void;
export type FinishHandler = () => void;

export enum EGenerateQueryStatus {
  Queue = 'queue',
  Processing = 'processing',
  Finish = 'finish',
  Unknown = 'unknown',
}

export interface IGenerateParams {
  map: string;
  replay: string;
  extra: ISettings;
  bgm?: string;
}

export interface IGenerateResponseData {
  task_id: string;
}

interface IInQueueResponse {
  type: EGenerateQueryStatus.Queue;
  count: number;
}

interface IProcessingResponse {
  type: EGenerateQueryStatus.Processing,
  progress: number;
}

interface IFinishResponse {
  type: EGenerateQueryStatus.Finish;
}

export type IQueryResponseData =
  IInQueueResponse |
  IProcessingResponse |
  IFinishResponse |
  { type: EGenerateQueryStatus.Unknown }
;

export interface IGenerateTaskParams {
  map_id: string;
  bgm_id: string;
  replay_id: string;
  settings: ISettings;
}
