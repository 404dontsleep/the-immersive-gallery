import BaseContextProvider from '@/components/BaseContext/BaseContextProvider';
import Wrapper from '@/components/BaseContext/Wrapper';
import SysItemSelect from '@/components/BaseContext/Wrapper/ItemSelect';
import { useTrackRows, type TrackRow } from '@/hooks/useTrackRows';
import {
  BaseTrackingAction,
  useUserControllerFindOneWithInventories,
  type Inventory,
  type UserInventoriesTrackingDto,
} from '@api';
import {
  Button,
  Form,
  Modal,
  Space,
  Table,
  Tag,
  type TableColumnsType,
} from 'antd';
import { ArchiveRestore, TrashIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type UserInventoryModalProps = {
  userId?: number;
  onOk?: (value: UserInventoriesTrackingDto[]) => void;
  onCancel?: () => void;
};

const UserInventoryModalV2: React.FC<UserInventoryModalProps> = ({
  userId,
  onCancel,
  onOk,
}) => {
  const { data: user, mutate: mutateUser } =
    useUserControllerFindOneWithInventories(userId ?? 0);

  const inventories = useMemo(() => {
    return user?.inventories ?? [];
  }, [user]);

  const { rows, reset, updateRow, deleteRow, restoreRow, addRow, getChanges } =
    useTrackRows<Inventory>([]);

  useEffect(() => {
    reset(inventories);
  }, [inventories, reset]);

  const columns = useMemo<TableColumnsType<TrackRow<Inventory>>>(() => {
    return [
      {
        title: 'Type',
        render: (_, record) => {
          return (
            <center>
              <Tag
                color={
                  record.action === BaseTrackingAction.create
                    ? 'green'
                    : record.action === BaseTrackingAction.update
                      ? 'blue'
                      : record.action === BaseTrackingAction.delete
                        ? 'red'
                        : 'default'
                }
              >
                {record.action === BaseTrackingAction.create
                  ? 'Create'
                  : record.action === BaseTrackingAction.update
                    ? 'Update'
                    : record.action === BaseTrackingAction.delete
                      ? 'Delete'
                      : 'NONE'}
              </Tag>
            </center>
          );
        },
        width: 50,
      },
      {
        title: 'Item',
        dataIndex: ['itemType', 'id'],
        key: 'itemType.id',
        render: (_, record, index) => {
          return (
            <Form.Item noStyle name={[index, 'data', 'itemType', 'id']}>
              <SysItemSelect
                sysOnChange={(value) =>
                  updateRow(record.data.id, { itemType: { id: value } })
                }
                disabled={record.action !== BaseTrackingAction.create}
              />
            </Form.Item>
          );
        },
        width: 150,
      },
      {
        title: 'Quantity',
        dataIndex: ['data', 'quantity'],
        key: 'quantity',
        render: (_, record, index) => {
          return (
            <Form.Item noStyle name={[index, 'data', 'quantity']}>
              <Wrapper.InputNumber
                sysOnChange={(value) =>
                  updateRow(record.data.id, { quantity: value })
                }
              />
            </Form.Item>
          );
        },
        width: 150,
      },
      {
        title: 'Expiration Date',
        dataIndex: ['data', 'expirationDate'],
        key: 'expirationDate',
        render: (_, record, index) => {
          return (
            <Form.Item noStyle name={[index, 'data', 'expirationDate']}>
              <Wrapper.DatePicker
                sysOnChange={(value) =>
                  updateRow(record.data.id, {
                    expirationDate: value.toISOString(),
                  })
                }
              />
            </Form.Item>
          );
        },
        width: 150,
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, record) => {
          return (
            <Space.Compact>
              <Button onClick={() => deleteRow(record.data.id)}>
                <TrashIcon />
              </Button>
              <Button onClick={() => restoreRow(record.data.id)}>
                <ArchiveRestore />
              </Button>
            </Space.Compact>
          );
        },
      },
    ];
  }, [deleteRow, restoreRow, updateRow]);

  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      inventories: rows,
    });
  }, [rows, form]);

  const handleOk = () => {
    Promise.resolve(
      onOk?.(getChanges() as unknown as UserInventoriesTrackingDto[]),
    ).then(() => {
      setEditMode(false);
      mutateUser();
      // onCancel?.();
    });
  };

  return (
    <Modal
      destroyOnHidden
      title="User Inventory"
      open={!!userId}
      onCancel={onCancel}
      onOk={handleOk}
      width={'fit-content'}
    >
      <BaseContextProvider readOnly={!editMode}>
        <Form form={form}>
          <Form.List name="inventories">
            {() => {
              return (
                <Table
                  title={() => (
                    <Space.Compact>
                      <Button
                        onClick={() =>
                          addRow({
                            id: 0,
                          } as Inventory)
                        }
                      >
                        Add
                      </Button>
                      <Button onClick={() => setEditMode(true)}>Edit</Button>
                      <Button onClick={() => setEditMode(false)}>View</Button>
                    </Space.Compact>
                  )}
                  size="small"
                  bordered
                  dataSource={rows}
                  columns={columns}
                  pagination={false}
                />
              );
            }}
          </Form.List>
        </Form>
      </BaseContextProvider>
    </Modal>
  );
};

export default UserInventoryModalV2;
