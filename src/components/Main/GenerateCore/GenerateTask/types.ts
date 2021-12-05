import { IQueryResponseData } from '../../../../service/generate.types';
import { ISettings } from '../../../../data/settings';
import { IErrorMessage } from '../../../ErrorToast';

export type QueueHandler = (count: number) => void;
export type ProcessingHandler = (progress: number) => void;
export type FinishHandler = (filename: string) => void;
export type ErrorHandler = (err: IErrorMessage) => void;
export type ExtraHandler = (extra?: IQueryResponseData['__extra__']) => void;

export enum EGenerateQueryStatus {
  Queue = 'queue',
  Processing = 'processing',
  Finish = 'finish',
  Unknown = 'unknown',
  Error = 'error',
}

export interface IGenerateTaskParams {
  map_id: string;
  bgm_id: string;
  replay_id: string;
  settings: ISettings;
}
