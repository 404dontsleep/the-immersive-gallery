import { Alert, Form, Input } from 'antd';
import type React from 'react';
import usePermissionStore from './usePermissionStore';

import type { PermissionDto } from '@api';
import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';

type SelectedPermissionModalProps = {
  onOk?: (value: PermissionDto, itemMode: ItemMode) => void;
};

const SelectedPermissionModal: React.FC<SelectedPermissionModalProps> = (
  props,
) => {
  return (
    <BaseContext
      store={usePermissionStore}
      title={{
        TITLE_CREATE: 'Create Permission',
        TITLE_EDIT: 'Edit Permission',
        TITLE_VIEW: 'View Permission',
        TITLE_DELETE: 'Delete Permission',
      }}
      onOk={props.onOk}
      deleteMessage={
        <>
          <Form.Item<PermissionDto> name="id" label="Id" hidden>
            <Input placeholder="Enter id" />
          </Form.Item>
          <Alert
            message="Are you sure you want to delete this item?"
            type="error"
          />
        </>
      }
    >
      <Form.Item<PermissionDto> name="id" label="Id" hidden>
        <Input placeholder="Enter id" />
      </Form.Item>
      <Form.Item<PermissionDto>
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter name' }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item<PermissionDto> name="description" label="Description">
        <Input placeholder="Enter description" />
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedPermissionModal;
