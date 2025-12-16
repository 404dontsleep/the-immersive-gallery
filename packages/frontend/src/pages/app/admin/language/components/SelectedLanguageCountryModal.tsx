import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import type { LanguageCountryDto } from '@api';
import useLanguageCountryStore from './useLanguageCountryStore';
import { Alert, Form, Input, InputNumber } from 'antd';
import { SysInput } from '@/components/BaseContext/Wrapper/Input';

type SelectedLanguageCountryModalProps = {
  onOk?: (value: LanguageCountryDto, itemMode: ItemMode) => void;
};

const SelectedLanguageCountryModal: React.FC<
  SelectedLanguageCountryModalProps
> = (props) => {
  const beforeOk = (value: LanguageCountryDto, itemMode: ItemMode) => {
    props.onOk?.(value, itemMode);
  };

  return (
    <BaseContext
      store={useLanguageCountryStore}
      title={{
        TITLE_CREATE: 'Create Language Country',
        TITLE_EDIT: 'Edit Language Country',
        TITLE_VIEW: 'View Language Country',
        TITLE_DELETE: 'Delete Language Country',
      }}
      onOk={beforeOk}
      deleteMessage={
        <>
          <Form.Item<LanguageCountryDto> name="country" label="Country" hidden>
            <InputNumber placeholder="Enter id" />
          </Form.Item>
          <Alert
            message="Are you sure you want to delete this item?"
            type="error"
          />
        </>
      }
      restoreMessage={
        <>
          <Form.Item<LanguageCountryDto> name="country" label="Country" hidden>
            <Input placeholder="Enter country" />
          </Form.Item>
          <Alert
            message="Are you sure you want to restore this item?"
            type="success"
          />
        </>
      }
    >
      <Form.Item<LanguageCountryDto>
        name="country"
        label="Country"
        rules={[{ required: true, message: 'Please enter country code' }]}
      >
        <SysInput placeholder="Enter country code (e.g., US, VN, FR)" />
      </Form.Item>
      <Form.Item<LanguageCountryDto>
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter description' }]}
      >
        <SysInput placeholder="Enter description (e.g., United States, Vietnam)" />
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedLanguageCountryModal;
