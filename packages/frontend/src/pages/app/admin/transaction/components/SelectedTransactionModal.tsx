import { Form } from 'antd';
import type React from 'react';
import useTransactionStore from './useTransactionStore';

import type { TransactionDto } from '@api';
import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import SysUserSelect from '@/components/BaseContext/Wrapper/UserSelect';
import TransactionStatusSelect from './TransactionStatusSelect';
import ItemsListSelect from './ItemsListSelect';

type SelectedTransactionModalProps = {
  onOk?: (value: TransactionDto, itemMode: ItemMode) => void;
};

const SelectedTransactionModal: React.FC<SelectedTransactionModalProps> = (
  props,
) => {
  return (
    <BaseContext
      store={useTransactionStore}
      title={{
        TITLE_CREATE: 'Create Transaction',
        TITLE_VIEW: 'View Transaction',
      }}
      onOk={props.onOk}
      styles={{
        modal: {
          width: {
            sm: '80%',
            lg: '70%',
            xl: '50%',
          },
        },
      }}
    >
      <Form.Item<TransactionDto>
        name={['fromUser', 'id']}
        label="From User"
        rules={[{ required: true, message: 'Please select from user' }]}
      >
        <SysUserSelect placeholder="Select from user" />
      </Form.Item>
      <Form.Item<TransactionDto>
        name={['toUser', 'id']}
        label="To User"
        rules={[{ required: true, message: 'Please select to user' }]}
      >
        <SysUserSelect placeholder="Select to user" />
      </Form.Item>
      <Form.Item name="items" label="Items">
        <ItemsListSelect />
      </Form.Item>
      <Form.Item<TransactionDto>
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select status' }]}
      >
        <TransactionStatusSelect placeholder="Select status" />
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedTransactionModal;
