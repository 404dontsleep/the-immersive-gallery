import {
  Button,
  Card,
  Space,
  Table,
  Typography,
  type TableColumnsType,
  Flex,
} from 'antd';
import useCategoryStore from './components/useCategoryStore';
import {
  categoryControllerCreate,
  categoryControllerDelete,
  categoryControllerUpdate,
  useCategoryControllerFindAll,
  type Category,
  type CategoryDto,
} from '@api';
import { useMemo } from 'react';
import { ItemMode } from '@/components/BaseContext/createBaseContext';
import SelectedCategoryModal from './components/SelectedCategoryModal';
import { PenIcon, PlusIcon, TrashIcon, ArchiveRestore } from 'lucide-react';
import AssetImage from '@/components/AssetImage';
import { useLanguageStore } from '@/stores/language.store';

export default function CategoryPage() {
  const { setSelectedData } = useCategoryStore();
  const {
    data: categories,
    isLoading,
    mutate: mutateCategories,
  } = useCategoryControllerFindAll({
    withDeleted: true,
  });
  const { getLanguage } = useLanguageStore();

  const columns = useMemo<TableColumnsType<Category>>(() => {
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
        title: 'Icon Assets',
        dataIndex: 'iconAssets',
        key: 'iconAssets',
        render: (_: unknown, record: Category) =>
          record.iconAssets && (
            <AssetImage assetsId={record.iconAssets.id} height={32} />
          ),
      },
      {
        title: 'Actions',
        render: (_: unknown, record: Category) => (
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

  const onOk = (value: CategoryDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.CREATE) {
      return categoryControllerCreate(value).then(() => {
        mutateCategories();
      });
    }
    if (itemMode === ItemMode.EDIT) {
      if (!value.id) return;
      return categoryControllerUpdate(value.id, value).then(() => {
        mutateCategories();
      });
    }
    if (itemMode === ItemMode.DELETE) {
      if (!value.id) return;
      return categoryControllerDelete(value.id).then(() => {
        mutateCategories();
      });
    }
    if (itemMode === ItemMode.RESTORE) {
      if (!value.id) return;
      return categoryControllerCreate({ ...value, id: value.id }).then(() => {
        mutateCategories();
      });
    }
  };

  return (
    <Card
      title="Category Management"
      extra={
        <Button
          type="primary"
          onClick={() => setSelectedData(null, ItemMode.CREATE)}
        >
          <PlusIcon size={16} /> Add Category
        </Button>
      }
      className="flex flex-col h-full"
      classNames={{
        body: 'h-full overflow-y-auto my-2',
      }}
    >
      <Table
        dataSource={categories}
        columns={columns}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 20 }}
        size="middle"
        scroll={{ x: 'max-content' }}
      />
      <SelectedCategoryModal onOk={onOk} />
    </Card>
  );
}
