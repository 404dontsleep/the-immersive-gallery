import { Alert, Form, Input } from 'antd';
import type React from 'react';
import useAssetsStore from './useAssetsStore';
import type { AssetsItemDto } from '@api';
import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import { SysInput } from '@/components/BaseContext/Wrapper/Input';

type SelectedAssetModalProps = {
  onOk?: (value: AssetsItemDto, itemMode: ItemMode) => void;
};

const SelectedAssetModal: React.FC<SelectedAssetModalProps> = (props) => {
  const beforeOk = (value: AssetsItemDto, itemMode: ItemMode) => {
    props.onOk?.(value, itemMode);
  };

  return (
    <BaseContext
      store={useAssetsStore}
      title={{
        TITLE_CREATE: 'Create Asset',
        TITLE_EDIT: 'Edit Asset',
        TITLE_VIEW: 'View Asset',
        TITLE_DELETE: 'Delete Asset',
      }}
      onOk={beforeOk}
      deleteMessage={
        <>
          <Form.Item<AssetsItemDto> name="id" label="Id" hidden>
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
          <Form.Item<AssetsItemDto> name="id" label="Id" hidden>
            <Input placeholder="Enter id" />
          </Form.Item>
          <Alert
            message="Are you sure you want to restore this item?"
            type="success"
          />
        </>
      }
    >
      <Form.Item<AssetsItemDto> name="id" label="Id" hidden>
        <Input placeholder="Enter id" />
      </Form.Item>
      <Form.Item<AssetsItemDto>
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter a name' }]}
      >
        <SysInput placeholder="Enter asset name" />
      </Form.Item>
      <Form.Item<AssetsItemDto>
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter description' }]}
      >
        <SysInput placeholder="Enter description" />
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedAssetModal;
