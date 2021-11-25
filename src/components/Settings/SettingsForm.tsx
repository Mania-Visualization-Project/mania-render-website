import { useCallback } from 'react';
import { Form, InputNumber, Radio } from 'antd';
import { useTranslation } from '../../common/i18n';
import { getLocalSettings, setLocalSettings } from '../../common/local-settings';
import type { ISettings } from '../../data/settings';
import { EMalodyPlatform } from '../../data/settings';
import { DEFAULT_SETTINGS } from '../../common/constants';

export const SettingsForm = () => {
  const localSettings = getLocalSettings();
  const { t } = useTranslation();

  const [form] = Form.useForm<ISettings>();

  const handleChange = useCallback(() => {
    const settings = form.getFieldsValue();
    setLocalSettings(settings);
  }, [form]);

  return (
    <Form<ISettings>
      form={form}
      initialValues={localSettings || DEFAULT_SETTINGS}
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
