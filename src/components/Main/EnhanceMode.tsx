import { useTranslation } from '../../common/i18n';

export const EnhanceMode = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('error-error', { message: 'hello world' })}
    </div>
  );
};
