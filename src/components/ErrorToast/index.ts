import { message, Modal } from 'antd';
import { FEEDBACK_URL } from '../../common/constants';
import { i18n } from '../../common/i18n';
import { openTab } from '../../utils/open-tab';

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
        cancelText: i18n.t('modal-close_text'),
        okText: i18n.t('modal-feedback_btn_text'),
        onOk: () => {
          openTab(FEEDBACK_URL);
        },
      });
    },
  };
})();
