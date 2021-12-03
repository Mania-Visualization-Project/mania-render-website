import { useCallback, useState } from 'react';
import type { ExtraHandler, FinishHandler, IGenerateTaskParams, ProcessingHandler, QueueHandler } from './types';
import { GenerateTask } from './index';

export interface IUseGenerateTaskParams {
  onProcessing?: ProcessingHandler;
  onFinish?: FinishHandler;
  onQueue?: QueueHandler;
  handleExtra?: ExtraHandler;
}

/**
 * 暂时这么写，后面要把整个生成视频的业务抽离出来
 * @param onFinish
 * @param onProcessing
 * @param onQueue
 * @param handleExtra
 */
export const useGenerateTask = ({
  onFinish,
  onProcessing,
  onQueue,
  handleExtra,
}: IUseGenerateTaskParams) => {
  const [task, setTask] = useState<GenerateTask | null>(null);

  const generateVideo = useCallback(async (params: IGenerateTaskParams) => {
    const generateTask = GenerateTask.create(params);
    onQueue && (generateTask.onQueue = onQueue);
    onFinish && (generateTask.onFinish = onFinish);
    onProcessing && (generateTask.onProcessing = onProcessing);
    handleExtra && (generateTask.handleExtra = handleExtra);
    setTask(generateTask);
    await generateTask.start();
  }, [handleExtra, onFinish, onProcessing, onQueue]);

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
