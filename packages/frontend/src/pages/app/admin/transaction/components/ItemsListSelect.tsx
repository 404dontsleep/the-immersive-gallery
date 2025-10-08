import BaseListForm, {
  type BaseListFormProps,
} from '@/components/BaseContext/BaseListForm';
import { useBaseContext } from '@/components/BaseContext/useBaseContext';
import Wrapper from '@/components/BaseContext/Wrapper';
import SysItemSelect from '@/components/BaseContext/Wrapper/ItemSelect';
import SysItemId from '@/components/Sys/Item/ItemId';
import type { TransactionItemDto } from '@api';
import { Flex, Form } from 'antd';
import { useMemo } from 'react';

type ItemsListSelectProps = BaseListFormProps<TransactionItemDto>;

const ItemsListSelect = (props: ItemsListSelectProps) => {
  const { readOnly } = useBaseContext();
  const columns = useMemo<typeof props.columns>(() => {
    return [
      {
        title: 'Item',
        dataIndex: 'item',
        render: (_, __, index: number) => (
          <Form.Item
            noStyle
            isListField
            name={['items', index, 'itemType', 'id']}
          >
            <SysItemSelect />
          </Form.Item>
        ),
        width: 150,
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        render: (_, __, index: number) => (
          <Form.Item noStyle isListField name={['items', index, 'quantity']}>
            <Wrapper.InputNumber />
          </Form.Item>
        ),
        width: 150,
      },
      {
        title: 'Expiration Date',
        dataIndex: 'expirationDate',
        render: (_, __, index: number) => (
          <Form.Item
            noStyle
            isListField
            name={['items', index, 'expirationDate']}
          >
            <Wrapper.DatePicker />
          </Form.Item>
        ),
        width: 150,
      },
    ];
  }, []);

  if (readOnly) {
    return (
      <Flex gap={10} wrap>
        {props.value?.map((item, index) => (
          <SysItemId
            key={index}
            id={item.itemType?.id}
            amount={item.quantity}
          />
        ))}
      </Flex>
    );
  }

  return (
    <BaseListForm
      {...props}
      columns={columns}
      addValue={
        {
          itemType: {},
          quantity: 1,
        } as TransactionItemDto
      }
    />
  );
};

export default ItemsListSelect;
