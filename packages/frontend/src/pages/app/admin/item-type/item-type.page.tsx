import {
  itemTypeControllerCreate,
  itemTypeControllerDelete,
  itemTypeControllerUpdate,
  useItemTypeControllerFindAll,
  type ItemType,
  type ItemTypeDto,
} from '@api';
import useItemTypeStore from './components/useItemTypeStore';
import { useMemo } from 'react';
import {
  Avatar,
  Button,
  Card,
  Flex,
  Layout,
  Space,
  Table,
  Typography,
  type TableColumnsType,
} from 'antd';
import { ItemMode } from '@/components/BaseContext/createBaseContext';
import SelectedItemTypeModal from './components/SelectedItemTypeModal';
import { ArchiveRestore, PenIcon, TrashIcon } from 'lucide-react';

export default function ItemTypePage() {
  const { setSelectedData } = useItemTypeStore();
  const {
    data: itemTypes,
    isLoading,
    mutate: mutateItemTypes,
  } = useItemTypeControllerFindAll({
    withDeleted: true,
  });
  const columns = useMemo<TableColumnsType<ItemType>>(() => {
    return [
      {
        title: 'Item',
        render: (_, record) => (
          <Flex gap={4} align="center">
            <Avatar size={48} src={record.symbol} />
            <Flex vertical gap={4}>
              <Typography.Text>{record.name}</Typography.Text>
              <Typography.Text type="secondary">
                {record.description}
              </Typography.Text>
            </Flex>
          </Flex>
        ),
      },
      {
        title: 'Actions',
        render: (_, record) => (
          <Space.Compact>
            <Button onClick={() => setSelectedData(record, ItemMode.EDIT)}>
              <PenIcon />
            </Button>
            <Button
              danger
              onClick={() => setSelectedData(record, ItemMode.DELETE)}
              disabled={record.deletedAt !== null}
            >
              <TrashIcon />
            </Button>
            <Button
              type="dashed"
              onClick={() => setSelectedData(record, ItemMode.RESTORE)}
              disabled={record.deletedAt === null}
            >
              <ArchiveRestore />
            </Button>
          </Space.Compact>
        ),
        width: 180,
      },
    ];
  }, [setSelectedData]);
  const onOk = (value: ItemTypeDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.CREATE) {
      itemTypeControllerCreate(value).then(() => {
        mutateItemTypes();
      });
    }
    if (itemMode === ItemMode.EDIT) {
      if (!value.id) return;
      itemTypeControllerUpdate(value.id, value).then(() => {
        mutateItemTypes();
      });
    }
    if (itemMode === ItemMode.DELETE) {
      if (!value.id) return;
      itemTypeControllerDelete(value.id).then(() => {
        mutateItemTypes();
      });
    }
    if (itemMode === ItemMode.RESTORE) {
      if (!value.id) return;
      itemTypeControllerCreate({ id: value.id }).then(() => {
        mutateItemTypes();
      });
    }
  };
  return (
    <Layout className="h-full">
      <Card
        title="Item Type"
        extra={
          <Button
            type="primary"
            onClick={() => setSelectedData(null, ItemMode.CREATE)}
          >
            Add
          </Button>
        }
        className="flex flex-col h-full"
        classNames={{
          body: 'h-full overflow-y-auto my-2',
        }}
      >
        <Table
          dataSource={itemTypes}
          columns={columns}
          loading={isLoading}
          rowKey="id"
        />
        <SelectedItemTypeModal onOk={onOk} />
      </Card>
    </Layout>
  );
}
