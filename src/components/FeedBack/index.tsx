import { useCallback, useState } from 'react';
import { useTranslation } from '../../common/i18n';
import { FeedbackModal } from './FeedbackModal';
import { FeedBackWrapper } from './styles';

export const FeedBack = () => {
  const { t } = useTranslation();

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
      <FeedbackModal
        visible={showModal}
        onCancel={handleHide}
      />
    </FeedBackWrapper>
  );
};
