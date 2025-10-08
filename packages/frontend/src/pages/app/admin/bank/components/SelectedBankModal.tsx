import { Alert, Card, Form, Input } from 'antd';
import type React from 'react';
import useBankStore from './useBankStore';

import type { BankDto } from '@api';
import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import SysMarkdown from '@/components/Sys/Markdown';
import ItemsListSelect from '../../transaction/components/ItemsListSelect';
import { useCallback } from 'react';
import Wrapper from '@/components/BaseContext/Wrapper';

type SelectedBankModalProps = {
  onOk?: (value: BankDto, itemMode: ItemMode) => void;
};

const SelectedBankModal: React.FC<SelectedBankModalProps> = (props) => {
  const preOnOk = useCallback(
    (value: BankDto, itemMode: ItemMode) => {
      const oldItems =
        value.items?.map((item) => ({
          itemType: {
            id: item.itemType?.id,
          },
          expirationDate: item.expirationDate,
          quantity: item.quantity,
          id: item.id,
        })) ?? [];
      return props.onOk?.({ ...value, items: oldItems }, itemMode);
    },
    [props],
  );

  return (
    <BaseContext
      store={useBankStore}
      title={{
        TITLE_CREATE: 'Create Bank',
        TITLE_EDIT: 'Edit Bank',
        TITLE_VIEW: 'View Bank',
        TITLE_DELETE: 'Delete Bank',
      }}
      onOk={preOnOk}
      deleteMessage={
        <>
          <Form.Item name="id" label="Id" hidden>
            <Input placeholder="Enter id" />
          </Form.Item>
          <Alert
            message="Are you sure you want to delete this bank?"
            type="error"
          />
        </>
      }
      restoreMessage={
        <>
          <Form.Item name="id" label="Id" hidden>
            <Input placeholder="Enter id" />
          </Form.Item>
          <Alert
            message="Are you sure you want to restore this bank?"
            type="success"
          />
        </>
      }
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
      <Form.Item name="id" label="Id" hidden>
        <Input placeholder="Enter id" />
      </Form.Item>
      <Form.Item<BankDto>
        name="name"
        label="Bank Name"
        rules={[{ required: true, message: 'Please enter bank name' }]}
      >
        <Wrapper.Input placeholder="Enter bank name" />
      </Form.Item>
      <Form.Item<BankDto> name="description" label="Description">
        <Input.TextArea placeholder="Enter bank description" rows={3} />
      </Form.Item>
      <Form.Item<BankDto> name="cronUrl" label="Cron URL">
        <Wrapper.Input placeholder="Enter cron URL for bank synchronization" />
      </Form.Item>
      <Form.Item name="items" label="Items">
        <ItemsListSelect />
      </Form.Item>
      <Form.Item<BankDto> name="isActive" label="Active Status">
        <Wrapper.InputBoolean />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldsValue }) => {
          const { description } = getFieldsValue();
          return (
            <Card>
              <SysMarkdown text={description ?? ''} />
            </Card>
          );
        }}
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedBankModal;
