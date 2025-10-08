import {
  transactionControllerCreate,
  useTransactionControllerFindAll,
  type Transaction,
  type TransactionDto,
} from '@api';
import useTransactionStore from './components/useTransactionStore';
import { useMemo } from 'react';
import {
  Button,
  Card,
  Flex,
  Layout,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
} from 'antd';
import { ItemMode } from '@/components/BaseContext/createBaseContext';
import SelectedTransactionModal from './components/SelectedTransactionModal';
import { TransactionStatus } from '@api';

export default function TransactionPage() {
  const { setSelectedData } = useTransactionStore();
  const {
    data: transactions,
    isLoading,
    mutate: mutateTransactions,
  } = useTransactionControllerFindAll({
    withDeleted: true,
  });

  const getStatusColor = (status: TransactionStatus) => {
    return (
      {
        [TransactionStatus.pending]: 'orange',
        [TransactionStatus.success]: 'green',
        [TransactionStatus.failed]: 'red',
      }[status] ?? 'default'
    );
  };

  const columns = useMemo<TableColumnsType<Transaction>>(() => {
    return [
      {
        title: 'Transaction Info',
        render: (_, record) => (
          <Flex gap={8} align="center">
            <Flex vertical gap={4}>
              <Typography.Text type="secondary">
                From: {record.fromUser?.email}
              </Typography.Text>
              <Typography.Text type="secondary">
                To: {record.toUser?.email}
              </Typography.Text>
            </Flex>
          </Flex>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status: TransactionStatus) => (
          <Tag color={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        ),
      },
      {
        title: 'Accepted',
        dataIndex: 'isAccepted',
        render: (isAccepted: boolean) => (
          <Tag color={isAccepted ? 'green' : 'default'}>
            {isAccepted ? 'Yes' : 'No'}
          </Tag>
        ),
      },
    ];
  }, []);

  const onOk = (value: TransactionDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.CREATE) {
      return transactionControllerCreate(value).then(() => {
        mutateTransactions();
      });
    }
  };

  return (
    <Layout className="h-full">
      <Card
        title="Transactions"
        extra={
          <Button
            type="primary"
            onClick={() => setSelectedData(null, ItemMode.CREATE)}
          >
            Add Transaction
          </Button>
        }
        className="flex flex-col h-full"
        classNames={{
          body: 'h-full overflow-y-auto my-2',
        }}
      >
        <Table
          onRow={(record) => ({
            style: {
              cursor: 'pointer',
            },
            onClick: () => setSelectedData(record, ItemMode.VIEW),
          })}
          dataSource={transactions}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          size="small"
        />
        <SelectedTransactionModal onOk={onOk} />
      </Card>
    </Layout>
  );
}
