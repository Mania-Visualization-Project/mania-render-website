import ReactDOM from 'react-dom';
import { Image, Modal, ModalProps } from 'antd';
import { GithubFilled } from '@ant-design/icons';
import { FEEDBACK_URL, QQ_GROUP_URL } from '../../common/constants';
import { i18n, useTranslation } from '../../common/i18n';
import { ELanguage } from '../../data/enums';
import qq_group_url from '../../assets/qqgroup.png';
import { FeedBackPanelContainer } from './styles';

export type FeedbackModalProps = ModalProps;

export const FeedbackModal = ({
  visible,
  onCancel,
  ...restProps
}: FeedbackModalProps) => {
  const { t } = useTranslation();
  const { language } = i18n;

  return (
    <Modal
      visible={visible}
      title={t('app-feedback')}
      onCancel={onCancel}
      destroyOnClose
      centered
      maskClosable
      footer={null}
      {...restProps}
    >
      <FeedBackPanelContainer>
        {language === ELanguage.Chinese && (
          <a
            href={QQ_GROUP_URL}
            target="_blank"
            rel="noreferrer"
            className="f-item"
          >
            <Image
              preview={false}
              width={200}
              height={200}
              src={qq_group_url}
            />
          </a>
        )}
        <a
          href={FEEDBACK_URL}
          target="_blank"
          rel="noreferrer"
          className="f-item"
        >
          <span className="text-name">
            Github Issues
          </span>
          <GithubFilled className="github" />
        </a>
      </FeedBackPanelContainer>
    </Modal>
  );
};

export const FeedbackModalApi = (() => {
  return {
    show() {
      const div = document.createElement('div');
      const onClose = () => {
        ReactDOM.unmountComponentAtNode(div);
      };

      ReactDOM.render(
        <FeedbackModal
          visible={true}
          onCancel={onClose}
        />,
        div,
      );
    },
  };
})();
