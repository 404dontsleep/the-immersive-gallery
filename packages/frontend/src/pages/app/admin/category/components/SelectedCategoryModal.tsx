import { Alert, Form, Input } from 'antd';
import type React from 'react';
import useCategoryStore from './useCategoryStore';
import type { CategoryDto } from '@api';
import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import { SysInput } from '@/components/BaseContext/Wrapper/Input';
import SelectAssets from '../../assets/components/SelectAssets';

type SelectedCategoryModalProps = {
  onOk?: (value: CategoryDto, itemMode: ItemMode) => void;
};

const SelectedCategoryModal: React.FC<SelectedCategoryModalProps> = (props) => {
  const beforeOk = (value: CategoryDto, itemMode: ItemMode) => {
    props.onOk?.(value, itemMode);
  };

  return (
    <BaseContext
      store={useCategoryStore}
      title={{
        TITLE_CREATE: 'Create Category',
        TITLE_EDIT: 'Edit Category',
        TITLE_VIEW: 'View Category',
        TITLE_DELETE: 'Delete Category',
      }}
      onOk={beforeOk}
      deleteMessage={
        <>
          <Form.Item<CategoryDto> name="id" label="Id" hidden>
            <Input placeholder="Enter id" />
          </Form.Item>
          <Alert
            message="Are you sure you want to delete this item?"
            type="error"
          />
        </>
      }
      restoreMessage={
        <>
          <Form.Item<CategoryDto> name="id" label="Id" hidden>
            <Input placeholder="Enter id" />
          </Form.Item>
          <Alert
            message="Are you sure you want to restore this item?"
            type="success"
          />
        </>
      }
    >
      <Form.Item<CategoryDto> name="id" label="Id" hidden>
        <Input placeholder="Enter id" />
      </Form.Item>
      <Form.Item<CategoryDto>
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter a name' }]}
      >
        <SysInput placeholder="Enter category name" />
      </Form.Item>
      <Form.Item<CategoryDto>
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter description' }]}
      >
        <SysInput placeholder="Enter description" />
      </Form.Item>
      <Form.Item<CategoryDto>
        name={['iconAssets', 'id']}
        label="Icon Assets"
        rules={[{ required: true, message: 'Please select assets' }]}
      >
        <SelectAssets />
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedCategoryModal;
