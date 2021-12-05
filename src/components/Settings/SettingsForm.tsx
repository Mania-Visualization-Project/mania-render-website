import { useCallback, useEffect, useRef } from 'react';
import { omit } from 'lodash';
import { Form, InputNumber, Radio } from 'antd';
import { DEFAULT_SETTINGS } from '../../common/constants';
import { useTranslation } from '../../common/i18n';
import { getLocalSettings, setLocalSettings } from '../../common/local-settings';
import type { ISettings } from '../../data/settings';
import { EMalodyPlatform } from '../../data/settings';
import { getConfigWithCache } from '../../service/get-config';
import { useGlobalConfig } from '../../common/hooks/useGlobalConfig';
import { ErrorView } from '../ErrorToast';

export const SettingsForm = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm<ISettings>();
  const isChangeRef = useRef(false);
  const { config } = useGlobalConfig();

  useEffect(() => {
    const localSettings = getLocalSettings();
    if (!localSettings) {
      getConfigWithCache().then((res) => {
        /**
         * 当用户手动更改过设置，就不要加载远端拉下来的设置了
         */
        if (!isChangeRef.current) {
          const settings = omit(res, 'language');
          setLocalSettings(settings);
          form.setFieldsValue(settings);
        }
      }).catch((err: any) => {
        ErrorView.toast(err);
      });
    }
  }, [form]);

  const handleChange = useCallback(() => {
    isChangeRef.current = true;
    const settings = form.getFieldsValue();
    setLocalSettings(settings);
  }, [form]);

  return (
    <Form<ISettings>
      form={form}
      initialValues={getLocalSettings() || DEFAULT_SETTINGS}
      layout="vertical"
      style={{ width: '100%' }}
      wrapperCol={{ span: 24 }}
      onFieldsChange={handleChange}
    >
      <Form.Item
        label={t('settings-speed')}
        name="speed"
        wrapperCol={{ span: 24 }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label={t('settings-fps')}
        name="fps"
        wrapperCol={{ span: 24 }}
      >
        <InputNumber />
      </Form.Item>
      {!config.disableSettingPlatform && (
        <Form.Item
          label={t('settings-platform')}
          name="malody_platform"
          wrapperCol={{ span: 24 }}
        >
          <Radio.Group>
            <Radio value={EMalodyPlatform.PE}>{EMalodyPlatform.PE}</Radio>
            <Radio value={EMalodyPlatform.PC}>{EMalodyPlatform.PC}</Radio>
          </Radio.Group>
        </Form.Item>
      )}
      <Form.Item
        label={t('settings-video_width')}
        name="width"
        wrapperCol={{ span: 24 }}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label={t('settings-video_height')}
        name="height"
        wrapperCol={{ span: 24 }}
      >
        <InputNumber />
      </Form.Item>
    </Form>
  );
};
