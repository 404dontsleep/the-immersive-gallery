import useDebounce from '@/hooks/useDebounce';
import useLoop from '@/hooks/useLoop';
import {
  bankResultControllerToggleProcessed,
  BankResultType,
  useBankResultControllerCount,
  useBankResultControllerFindAll,
  type BankResult,
  type BankResultControllerFindAllParams,
  type BankResultDtoFindOptionsWhereDto,
} from '@api';
import {
  Button,
  Card,
  Flex,
  Input,
  Layout,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
  type TableProps,
} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CheckCircle, SearchIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useBankResultBadge from './bank-result.badge';

dayjs.extend(relativeTime);

type UnwrapType<T> = T extends (infer U)[] ? U : T;
export default function BankResultPage() {
  const [filter, setFilter] = useState<
    BankResultControllerFindAllParams & {
      where: UnwrapType<BankResultDtoFindOptionsWhereDto>;
    }
  >({
    skip: 0,
    take: 10,
    where: {},
  });
  const { data: counts, mutate: mutateCounts } = useBankResultControllerCount();
  const {
    data: bankResults,
    isLoading,
    mutate: mutateBankResults,
  } = useBankResultControllerFindAll(filter);
  const { mutateCount } = useBankResultBadge();
  const mutateBankResultsAndCounts = useCallback(
    () => Promise.all([mutateBankResults(), mutateCounts(), mutateCount()]),
    [mutateBankResults, mutateCounts, mutateCount],
  );

  useEffect(() => {
    mutateBankResultsAndCounts();
  }, [mutateBankResultsAndCounts, filter]);

  useLoop(() => {
    mutateBankResultsAndCounts();
  }, 30000);

  const handleToggleProcessed = useCallback(
    (id: number) => {
      bankResultControllerToggleProcessed(id).then(mutateBankResultsAndCounts);
    },
    [mutateBankResultsAndCounts],
  );

  const columns = useMemo<TableColumnsType<BankResult>>(() => {
    return [
      {
        title: 'Action',
        dataIndex: 'action',
        width: 100,
        render: (_, record) => (
          <Button
            onDoubleClick={() => handleToggleProcessed(record.id)}
            variant="dashed"
            color={!record.isProcessed ? 'green' : 'red'}
          >
            <CheckCircle />
          </Button>
        ),
      },
      {
        title: 'Bank',
        dataIndex: ['bank', 'name'],
        width: 100,
      },
      {
        title: 'Transaction Date',
        dataIndex: 'transactionDate',
        render: (_, record) => (
          <Flex vertical>
            <Typography.Text>
              {dayjs(record.transactionDate).format('DD-MM-YYYY HH:mm')}
            </Typography.Text>
            <Typography.Text type="secondary">
              {dayjs(record.transactionDate).fromNow()}
            </Typography.Text>
          </Flex>
        ),
        width: 150,
      },
      {
        title: 'Is Processed',
        dataIndex: 'isProcessed',
        render: (_, record) => (
          <Tag color={record.isProcessed ? 'green' : 'red'}>
            {record.isProcessed ? 'Processed' : 'Not Processed'}
          </Tag>
        ),
        width: 150,
        filteredValue: filter.where.isProcessed?.in,
        filters: [
          {
            text: 'Processed',
            value: true,
          },
          {
            text: 'Not Processed',
            value: false,
          },
        ],
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        render: (_, record) => (
          <Typography.Text
            type={record.type === BankResultType.IN ? 'secondary' : 'danger'}
          >
            {record.amount?.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Typography.Text>
        ),
        width: 120,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        render: (_, record) => (
          <Typography.Text ellipsis={{ tooltip: true }}>
            {record.description}
          </Typography.Text>
        ),
      },
    ];
  }, [filter.where.isProcessed?.in, handleToggleProcessed]);

  const [search, setSearch] = useState<string>('');
  const { debouncedValue: debouncedSearch } = useDebounce(search, 300);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      where: {
        ...prev.where,
        description: debouncedSearch.trim()
          ? { contains: debouncedSearch.trim() }
          : undefined,
      },
    }));
  }, [debouncedSearch, setFilter]);

  const tableTitle = useCallback(() => {
    return (
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        addonAfter={<SearchIcon />}
      />
    );
  }, [search]);

  const handleTableChange: TableProps<BankResult>['onChange'] = (
    _,
    filters,
  ) => {
    setFilter({
      ...filter,
      where: {
        ...filter.where,
        isProcessed: { in: (filters?.isProcessed ?? []) as boolean[] },
      },
    });
  };

  return (
    <Layout className="h-full">
      <Card
        title="Bank Result"
        className="flex flex-col h-full"
        classNames={{
          body: 'h-full overflow-y-auto my-2',
        }}
      >
        <Table
          onChange={handleTableChange}
          title={tableTitle}
          dataSource={bankResults}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          size="large"
          scroll={{ y: '100%' }}
          pagination={{
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            total: counts,
            pageSize: filter.take ?? 10,
            current: (filter.skip ?? 0) / (filter.take ?? 10) + 1,
            onChange: (page, pageSize) => {
              setFilter({
                ...filter,
                skip: (page - 1) * pageSize,
                take: pageSize,
              });
            },
          }}
        />
      </Card>
    </Layout>
  );
}
