import { ReactNode } from 'react';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export interface IDraggerUploadProps extends UploadProps {
  placeholderText?: ReactNode;
  hintText?: ReactNode;
}

export const DraggerUpload = ({
  customRequest: onUpload,
  accept,
  action,
  placeholderText,
  hintText,
  ...restProps
}: IDraggerUploadProps) => {
  return (
    <Upload.Dragger
      name="files"
      action={action}
      accept={accept || '*'}
      customRequest={onUpload}
      {...restProps}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        {placeholderText}
      </p>
      <p className="ant-upload-hint">
        {hintText}
      </p>
    </Upload.Dragger>
  );
};
