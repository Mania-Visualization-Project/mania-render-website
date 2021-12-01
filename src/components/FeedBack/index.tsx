import { useCallback, useState } from 'react';
import { Image, Modal } from 'antd';
import { GithubFilled } from '@ant-design/icons';
import { FEEDBACK_URL, QQ_GROUP_URL } from '../../common/constants';
import { i18n, useTranslation } from '../../common/i18n';
import { ELanguage } from '../../data/enums';
import qq_group_url from '../../assets/qqgroup.png';
import { FeedBackPanelContainer, FeedBackWrapper } from './styles';

export const FeedBack = () => {
  const { t } = useTranslation();
  const { language } = i18n;

  const [showModal, setShowModal] = useState(false);

  const handleShow = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleHide = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <FeedBackWrapper>
      <div onClick={handleShow}>{t('app-feedback')}</div>
      <Modal
        visible={showModal}
        title={t('app-feedback')}
        onCancel={handleHide}
        destroyOnClose
        centered
        maskClosable
        footer={null}
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
    </FeedBackWrapper>
  );
};
