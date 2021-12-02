import React from 'react';
import { round } from 'lodash';
import { Progress } from 'antd';
import { useTranslation } from '../../../common/i18n';
import { convertGenerateStatus2i18n } from '../../../common/converters/convert-generate-status2i18n';
import { EGenerateQueryStatus } from '../GenerateTask/types';
import { GenerateProgressPanelWrapper } from './styles';

export interface GenerateProgressPanelProps {
  percent: number;
  status: EGenerateQueryStatus;
  queueCount: number;
}

export const GenerateProgressPanel = ({
  percent,
  status,
  queueCount,
}: GenerateProgressPanelProps) => {
  const { t } = useTranslation();

  return (
    <GenerateProgressPanelWrapper>
      {status === EGenerateQueryStatus.Error && (
        <div className="status-text">
          {t('status-generate_status_error')}
        </div>
      )}
      {status === EGenerateQueryStatus.Unknown && (
        <div className="status-text">
          {t('status-generate_status_unknown')}
        </div>
      )}
      {status === EGenerateQueryStatus.Queue && (
        <div className="status-text">
          {t(convertGenerateStatus2i18n(status))}
        </div>
      )}
      {status === EGenerateQueryStatus.Queue && (
        <div className="queue">
          {t('status-current_in_queue')} : {queueCount}
        </div>
      )}
      {(status === EGenerateQueryStatus.Processing || status === EGenerateQueryStatus.Finish) && (
        <div className="progress">
          <Progress
            type="circle"
            percent={round(percent, 2)}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>
      )}
    </GenerateProgressPanelWrapper>
  );
};
