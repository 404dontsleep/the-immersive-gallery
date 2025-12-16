import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import type { LanguageCodeDto } from '@api';
import useLanguageCodeStore from './useLanguageCodeStore';
import { Form } from 'antd';
import { SysInput } from '@/components/BaseContext/Wrapper/Input';

type SelectedLanguageCodeModalProps = {
  onOk?: (value: LanguageCodeDto, itemMode: ItemMode) => void;
};

const SelectedLanguageCodeModal: React.FC<SelectedLanguageCodeModalProps> = (
  props,
) => {
  const beforeOk = (value: LanguageCodeDto, itemMode: ItemMode) => {
    props.onOk?.(value, itemMode);
  };

  return (
    <BaseContext
      store={useLanguageCodeStore}
      title={{
        TITLE_CREATE: 'Create Language Code',
        TITLE_EDIT: 'Edit Language Code',
        TITLE_VIEW: 'View Language Code',
      }}
      onOk={beforeOk}
    >
      <Form.Item<LanguageCodeDto>
        name="code"
        label="Code"
        rules={[{ required: true, message: 'Please enter language code' }]}
      >
        <SysInput placeholder="Enter language code (e.g., drum_title)" />
      </Form.Item>
      <Form.Item<LanguageCodeDto>
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter description' }]}
      >
        <SysInput placeholder="Enter description (e.g., English, Vietnamese)" />
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedLanguageCodeModal;
