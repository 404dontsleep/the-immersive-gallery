import {
  Button,
  Card,
  Space,
  Table,
  Typography,
  type TableColumnsType,
  Flex,
} from 'antd';
import useItemStore from './components/useItemStore';
import {
  itemControllerCreate,
  itemControllerDelete,
  itemControllerUpdate,
  useItemControllerFindAll,
  type Item,
  type ItemDto,
} from '@api';
import { useMemo } from 'react';
import { ItemMode } from '@/components/BaseContext/createBaseContext';
import SelectedItemModal from './components/SelectedItemModal';
import { PenIcon, PlusIcon, TrashIcon, ArchiveRestore } from 'lucide-react';
import { useLanguageStore } from '@/stores/language.store';

export default function ItemPage() {
  const { setSelectedData } = useItemStore();
  const {
    data: items,
    isLoading,
    mutate: mutateItems,
  } = useItemControllerFindAll({
    withDeleted: true,
  });
  const { getLanguage } = useLanguageStore();

  const columns = useMemo<TableColumnsType<Item>>(() => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => (
          <Flex vertical gap={4}>
            <Typography.Text>{text}</Typography.Text>
            <Typography.Text type="secondary">
              {getLanguage(text)}
            </Typography.Text>
          </Flex>
        ),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text: string) => (
          <Flex vertical gap={4}>
            <Typography.Text>{text}</Typography.Text>
            <Typography.Text type="secondary">
              {getLanguage(text)}
            </Typography.Text>
          </Flex>
        ),
      },
      {
        title: 'Assets Count',
        key: 'assetsCount',
        render: (_: unknown, record: Item) => (
          <Typography.Text>
            {record.assets?.length || 0} asset(s)
          </Typography.Text>
        ),
      },
      {
        title: 'Actions',
        render: (_: unknown, record: Item) => (
          <Space.Compact>
            <Button
              size="small"
              onClick={() => setSelectedData(record, ItemMode.EDIT)}
            >
              <PenIcon size={14} />
            </Button>
            <Button
              size="small"
              danger
              onClick={() => setSelectedData(record, ItemMode.DELETE)}
              disabled={record.deletedAt !== null}
            >
              <TrashIcon size={14} />
            </Button>
            <Button
              size="small"
              type="dashed"
              onClick={() => setSelectedData(record, ItemMode.RESTORE)}
              disabled={record.deletedAt === null}
            >
              <ArchiveRestore size={14} />
            </Button>
          </Space.Compact>
        ),
        width: 180,
      },
    ];
  }, [setSelectedData]);

  const onOk = (value: ItemDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.CREATE) {
      return itemControllerCreate(value).then(() => {
        mutateItems();
      });
    }
    if (itemMode === ItemMode.EDIT) {
      if (!value.id) return;
      return itemControllerUpdate(value.id, value).then(() => {
        mutateItems();
      });
    }
    if (itemMode === ItemMode.DELETE) {
      if (!value.id) return;
      return itemControllerDelete(value.id).then(() => {
        mutateItems();
      });
    }
    if (itemMode === ItemMode.RESTORE) {
      if (!value.id) return;
      return itemControllerCreate({ ...value, id: value.id }).then(() => {
        mutateItems();
      });
    }
  };

  return (
    <Card
      title="Item Management"
      extra={
        <Button
          type="primary"
          onClick={() => setSelectedData(null, ItemMode.CREATE)}
        >
          <PlusIcon size={16} /> Add Item
        </Button>
      }
      className="flex flex-col h-full"
      classNames={{
        body: 'h-full overflow-y-auto my-2',
      }}
    >
      <Table
        dataSource={items}
        columns={columns}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 20 }}
        size="middle"
        scroll={{ x: 'max-content' }}
      />
      <SelectedItemModal onOk={onOk} />
    </Card>
  );
}
