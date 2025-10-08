import { Button, Flex, Form, Modal, Space, type ModalProps } from 'antd';
import type React from 'react';
import {
  ItemMode,
  type BaseContextStore,
} from '@/components/BaseContext/createBaseContext';
import { useCallback, useEffect, useMemo } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';
import { EyeIcon, PenIcon } from 'lucide-react';
import { useAxiosInterceptor } from '@/hooks/useAxiosInterceptor';
import BaseContextProvider from './BaseContextProvider';

type BaseContextProps<T, D> = {
  store: UseBoundStore<StoreApi<BaseContextStore<T, unknown>>>;
  children: React.ReactNode | React.ReactNode[];
  onOk?: (value: D, itemMode: ItemMode) => void;
  deleteMessage?: React.ReactNode;
  restoreMessage?: React.ReactNode;
  styles?: {
    modal?: ModalProps;
  };
} & {
  title?: {
    [K in `TITLE_${ItemMode}`]?: React.ReactNode;
  };
};

const BaseContext = <T, D>({
  store,
  children,
  ...props
}: BaseContextProps<T, D>) => {
  const { selectedData, setSelectedData, itemMode, setItemMode } = store();

  const isOpen = useMemo(() => {
    return itemMode === ItemMode.CREATE || selectedData !== null;
  }, [itemMode, selectedData]);
  const customRequiredMark = (
    labelNode: React.ReactNode,
    info: { required: boolean },
  ) => {
    return (
      <>
        {labelNode}
        {info.required && <span className="text-red-500">* </span>}
      </>
    );
  };

  const [form] = Form.useForm();
  useEffect(() => {
    if (selectedData) {
      form.setFieldsValue(selectedData);
    }
  }, [selectedData, form]);
  useAxiosInterceptor(form);

  const handleOk = () => {
    form.setFields([
      ...form.getFieldsError().map(({ name }) => ({
        name,
        errors: [],
      })),
    ]);
    const value = form.getFieldsValue();
    Promise.resolve(props.onOk?.(value, itemMode)).then(() => {
      form.resetFields();
      setSelectedData(null, ItemMode.VIEW);
    });
  };

  const handleCancel = () => {
    setSelectedData(null, ItemMode.VIEW);
    form.resetFields();
  };

  const messages = useMemo(() => {
    if (itemMode === ItemMode.DELETE) return props.deleteMessage;
    if (itemMode === ItemMode.RESTORE) return props.restoreMessage;
    return children;
  }, [itemMode, props.deleteMessage, props.restoreMessage, children]);

  const customFooter = useCallback(
    (originNode: React.ReactNode) => {
      return (
        <Flex justify="space-between" gap={10}>
          <Space>
            {itemMode === ItemMode.EDIT && props.title?.[`TITLE_VIEW`] && (
              <Button
                onClick={() => setItemMode(ItemMode.VIEW)}
                variant="dashed"
              >
                <EyeIcon />
              </Button>
            )}
            {itemMode === ItemMode.VIEW && props.title?.[`TITLE_EDIT`] && (
              <Button
                onClick={() => setItemMode(ItemMode.EDIT)}
                variant="dashed"
              >
                <PenIcon />
              </Button>
            )}
          </Space>
          <Flex gap={10}>{originNode}</Flex>
        </Flex>
      );
    },
    [itemMode, props.title, setItemMode],
  );

  return (
    <BaseContextProvider readOnly={itemMode === ItemMode.VIEW}>
      <Modal
        title={props.title?.[`TITLE_${itemMode}`] ?? `Base Context ${itemMode}`}
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={customFooter}
        {...props.styles?.modal}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
          requiredMark={customRequiredMark}
          disabled={itemMode === ItemMode.VIEW}
        >
          {messages}
        </Form>
      </Modal>
    </BaseContextProvider>
  );
};

export default BaseContext;
