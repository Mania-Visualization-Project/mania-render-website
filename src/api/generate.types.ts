import { ISettings } from '../data/settings';
import { EGenerateQueryStatus } from '../components/Main/GenerateTask/types';

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
  type: EGenerateQueryStatus.Processing;
  progress: number;
}

interface IFinishResponse {
  type: EGenerateQueryStatus.Finish;
  filename: string;
}

type IQueryResponseBaseData =
  IInQueueResponse |
  IProcessingResponse |
  IFinishResponse |
  { type: EGenerateQueryStatus.Unknown }
;

interface IQueryResponseExtraData {
  __extra__?: {
    is_music_mismatch?: boolean;
    is_replay_mismatch?: boolean;
  };
}

export type IQueryResponseData = IQueryResponseBaseData & IQueryResponseExtraData;


