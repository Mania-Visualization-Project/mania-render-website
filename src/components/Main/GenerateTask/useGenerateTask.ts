import { useCallback, useState } from 'react';
import { FinishHandler, IGenerateTaskParams, ProcessingHandler, QueueHandler } from './types';
import { GenerateTask } from './index';

export interface IUseGenerateTaskParams {
  onProcessing: ProcessingHandler;
  onFinish: FinishHandler;
  onQueue: QueueHandler;
}

/**
 * 暂时这么写，后面要把整个生成视频的业务抽离出来
 * @param onFinish
 * @param onProcessing
 * @param onQueue
 */
export const useGenerateTask = ({
  onFinish,
  onProcessing,
  onQueue,
}: IUseGenerateTaskParams) => {
  const [task, setTask] = useState<GenerateTask | null>(null);

  const generateVideo = useCallback(async (params: IGenerateTaskParams) => {
    const generateTask = GenerateTask.create(params);
    generateTask.onQueue = onQueue;
    generateTask.onFinish = onFinish;
    generateTask.onProcessing = onProcessing;
    setTask(generateTask);
    await generateTask.start();
  }, [onFinish, onProcessing, onQueue]);

  const downloadVideo = useCallback(() => {
    task?.download();
  }, [task]);

  const cancelTask = useCallback(() => {
    task?.cancelQuery();
  }, [task]);

  return {
    generateVideo,
    downloadVideo,
    cancelTask,
  };
};
