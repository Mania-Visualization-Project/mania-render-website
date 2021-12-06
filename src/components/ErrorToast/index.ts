import { message, Modal } from 'antd';
import { i18n } from '../../common/i18n';
import { FeedbackModalApi } from '../FeedBack/FeedbackModal';

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
      Modal.error({
        title: i18n.t('modal-error_title'),
        content: transformErr(err),
        closable: true,
        keyboard: true,
        okCancel: true,
        centered: true,
        cancelText: i18n.t('modal-close_text'),
        okText: i18n.t('modal-feedback_btn_text'),
        onOk: () => {
          FeedbackModalApi.show();
          return Promise.reject();
        },
      });
    },
  };
})();
