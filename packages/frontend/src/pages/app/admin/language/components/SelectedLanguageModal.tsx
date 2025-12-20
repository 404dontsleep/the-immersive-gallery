import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import type { LanguageDto } from '@api';
import useLanguageStore from './useLanguageStore';
import { Alert, Form, Input, InputNumber, Select } from 'antd';
import { SysInput } from '@/components/BaseContext/Wrapper/Input';
import {
  useLanguageCodeControllerFindAll,
  useLanguageCountryControllerFindAll,
} from '@api';

type SelectedLanguageModalProps = {
  onOk?: (value: LanguageDto, itemMode: ItemMode) => void;
};

const SelectedLanguageModal: React.FC<SelectedLanguageModalProps> = (props) => {
  const beforeOk = (value: LanguageDto, itemMode: ItemMode) => {
    props.onOk?.(value, itemMode);
  };

  const { data: languageCodes } = useLanguageCodeControllerFindAll();
  const { data: languageCountries } = useLanguageCountryControllerFindAll();

  return (
    <BaseContext
      store={useLanguageStore}
      title={{
        TITLE_CREATE: 'Create Language',
        TITLE_EDIT: 'Edit Language',
        TITLE_VIEW: 'View Language',
        TITLE_DELETE: 'Delete Language',
      }}
      onOk={beforeOk}
      deleteMessage={
        <>
          <Form.Item<LanguageDto> name="code" label="Code" hidden>
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
          <Form.Item<LanguageDto> name="code" label="Code" hidden>
            <Input placeholder="Enter code" />
          </Form.Item>
          <Alert
            message="Are you sure you want to restore this item?"
            type="success"
          />
        </>
      }
    >
      <Form.Item<LanguageDto> name="id" label="Language" hidden>
        <InputNumber placeholder="Enter id" />
      </Form.Item>
      <Form.Item<LanguageDto>
        name="code"
        label="Language Code"
        rules={[{ required: true, message: 'Please select language code' }]}
      >
        <Select
          placeholder="Select language code"
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={languageCodes?.map((lc) => ({
            value: lc.code,
            label: `${lc.code} - ${lc.description}`,
          }))}
        />
      </Form.Item>
      <Form.Item<LanguageDto>
        name="country"
        label="Language Country"
        rules={[{ required: true, message: 'Please select language country' }]}
      >
        <Select
          placeholder="Select language country"
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={languageCountries?.map((lc) => ({
            value: lc.country,
            label: `${lc.country} - ${lc.description}`,
          }))}
        />
      </Form.Item>
      <Form.Item<LanguageDto>
        name="value"
        label="Translation Value"
        rules={[{ required: true, message: 'Please enter translation value' }]}
      >
        <SysInput placeholder="Enter translation value" />
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedLanguageModal;
