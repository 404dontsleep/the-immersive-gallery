import { Button, Table, type TableColumnsType } from 'antd';
import BaseContextProvider from '../BaseContextProvider';
import { TrashIcon } from 'lucide-react';
import { useCallback } from 'react';

export type BaseListFormProps<T> = {
  columns?: TableColumnsType<T>;
  onChange?: (value: T[]) => void;
  value?: T[];
  addValue?: T;
};

const BaseListForm = <T,>(props: BaseListFormProps<T>) => {
  const { columns = [], value } = props;
  const add = useCallback(() => {
    props.onChange?.([...(value ?? []), props.addValue ?? (undefined as T)]);
  }, [value, props]);

  const remove = useCallback(
    (index: number) => {
      props.onChange?.([...(value ?? []).filter((_, i) => i !== index)]);
    },
    [value, props],
  );

  const removeColumns: TableColumnsType<T> = [
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, __, index) => {
        return (
          <Button danger type="dashed" onClick={() => remove?.(index)}>
            <TrashIcon />
          </Button>
        );
      },
    },
  ];

  return (
    <BaseContextProvider>
      <Table
        size="small"
        dataSource={value ?? []}
        columns={[...columns, ...removeColumns]}
        pagination={false}
        bordered
        footer={() => (
          <Button
            className="w-full"
            type="dashed"
            onClick={() => add?.()}
            style={{ marginRight: 8 }}
          >
            Add
          </Button>
        )}
      />
    </BaseContextProvider>
  );
};

export default BaseListForm;
