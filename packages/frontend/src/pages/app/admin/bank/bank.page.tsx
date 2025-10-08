import {
  bankControllerCreate,
  bankControllerDelete,
  bankControllerUpdate,
  useBankControllerFindAll,
  type Bank,
  type BankDto,
} from '@api';
import useBankStore from '@/pages/app/admin/bank/components/useBankStore';
import { useMemo } from 'react';
import {
  Button,
  Card,
  Layout,
  Space,
  Table,
  Typography,
  Tag,
  type TableColumnsType,
} from 'antd';
import { ItemMode } from '@/components/BaseContext/createBaseContext';
import SelectedBankModal from '@/pages/app/admin/bank/components/SelectedBankModal';
import { ArchiveRestore, PenIcon, TrashIcon } from 'lucide-react';

export default function BankPage() {
  const { setSelectedData } = useBankStore();
  const {
    data: banks,
    isLoading,
    mutate: mutateBanks,
  } = useBankControllerFindAll({
    withDeleted: true,
  });

  const columns = useMemo<TableColumnsType<Bank>>(() => {
    return [
      {
        title: 'Bank',
        render: (_, record) => (
          <Typography.Text strong>{record.name}</Typography.Text>
        ),
      },
      {
        title: 'Status',
        render: (_, record) => (
          <Space>
            <Tag color={record.isActive ? 'green' : 'red'}>
              {record.isActive ? 'Active' : 'Inactive'}
            </Tag>
            {record.deletedAt && <Tag color="orange">Deleted</Tag>}
          </Space>
        ),
        width: 120,
      },
      {
        title: 'Last Cron',
        render: (_, record) => (
          <Typography.Text type="secondary">
            {record.lastCron
              ? new Date(record.lastCron).toLocaleString()
              : 'Never'}
          </Typography.Text>
        ),
        width: 150,
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

  const onOk = (value: BankDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.CREATE) {
      return bankControllerCreate(value).then(() => {
        mutateBanks();
      });
    }
    if (itemMode === ItemMode.EDIT) {
      if (!value.id) return;
      if (!value.cronUrl) delete value.cronUrl;
      return bankControllerUpdate(value.id, value).then(() => {
        mutateBanks();
      });
    }
    if (itemMode === ItemMode.DELETE) {
      if (!value.id) return;
      return bankControllerDelete(value.id).then(() => {
        mutateBanks();
      });
    }
    if (itemMode === ItemMode.RESTORE) {
      if (!value.id) return;
      return bankControllerCreate({ ...value, id: value.id }).then(() => {
        mutateBanks();
      });
    }
  };

  return (
    <Layout className="h-full">
      <Card
        title="Bank Management"
        extra={
          <Button
            type="primary"
            onClick={() => setSelectedData(null, ItemMode.CREATE)}
          >
            Add Bank
          </Button>
        }
        className="flex flex-col h-full"
        classNames={{
          body: 'h-full overflow-y-auto my-2',
        }}
      >
        <Table
          dataSource={banks}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          size="small"
        />
        <SelectedBankModal onOk={onOk} />
      </Card>
    </Layout>
  );
}
