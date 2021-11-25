import { message, Modal } from 'antd';

export interface IErrorMessage {
  message: string;
  detail?: string;
}

export const ErrorView = (() => {
  const transformErr = (err: IErrorMessage) => {
    const { message, detail } = err;
    return !detail ? message : `${message}: ${detail}`;
  };

  return {
    toast(err: IErrorMessage, callback?: (() => void)) {
      message.error(transformErr(err)).then(callback);
    },
    modal(err: IErrorMessage) {
      // TODO: i18n
      Modal.error({
        title: 'Error',
        content: transformErr(err),
        okText: 'Close',
      });
    },
  };
})();
