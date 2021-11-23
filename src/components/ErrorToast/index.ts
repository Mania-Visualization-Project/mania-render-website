import { message } from 'antd';

export interface IErrorMessage {
  message: string;
  detail?: string;
}

export const ErrorToast = (() => {
  const transformErr = (err: IErrorMessage) => {
    const { message, detail } = err;
    return !detail ? message : `${message}: ${detail}`;
  };

  return {
    show(err: IErrorMessage) {
      message.error(transformErr(err));
    },
  };
})();
