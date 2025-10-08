import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import type { UserDto } from '@api';
import useUserStore from './useUserStore';
import { Alert, Form, Input, InputNumber } from 'antd';
import { SysInput } from '@/components/BaseContext/Wrapper/Input';

type SelectedUserModalProps = {
  onOk?: (value: UserDto, itemMode: ItemMode) => void;
};

const SelectedUserModal: React.FC<SelectedUserModalProps> = (props) => {
  const beforeOk = (value: UserDto, itemMode: ItemMode) => {
    props.onOk?.(value, itemMode);
  };

  return (
    <BaseContext
      store={useUserStore}
      title={{
        TITLE_CREATE: 'Create User',
        TITLE_EDIT: 'Edit User',
        TITLE_VIEW: 'View User',
        TITLE_DELETE: 'Delete User',
      }}
      onOk={beforeOk}
      deleteMessage={
        <>
          <Form.Item<UserDto> name="id" label="Id" hidden>
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
          <Form.Item<UserDto> name="email" label="Email" hidden>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Alert
            message="Are you sure you want to restore this item?"
            type="success"
          />
        </>
      }
    >
      <Form.Item<UserDto> name="id" label="Id" hidden>
        <InputNumber placeholder="Enter id" />
      </Form.Item>
      <Form.Item<UserDto> name="email" label="Email">
        <SysInput placeholder="Enter email" />
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedUserModal;
