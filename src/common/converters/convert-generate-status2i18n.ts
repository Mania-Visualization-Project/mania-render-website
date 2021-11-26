import { EGenerateQueryStatus } from '../../components/Main/GenerateTask/types';
import { TI18nKeys } from '../../locals/types';

export const convertGenerateStatus2i18n = (status: EGenerateQueryStatus): TI18nKeys => {
  const map: Record<EGenerateQueryStatus, TI18nKeys> = {
    [EGenerateQueryStatus.Finish]: 'status-generate_status_finish',
    [EGenerateQueryStatus.Unknown]: 'status-generate_status_unknown',
    [EGenerateQueryStatus.Queue]: 'status-generate_status_queue',
    [EGenerateQueryStatus.Processing]: 'status-generate_status_processing',
  };

  return map[status];
};
