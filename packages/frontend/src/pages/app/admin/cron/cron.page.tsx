import {
  sysCronControllerUpdateCron,
  useSysCronControllerFindAll,
  type SysCron,
  type SysCronDto,
} from '@api';
import { useCallback, useMemo } from 'react';
import {
  Button,
  Card,
  Layout,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
} from 'antd';
import useCronStore from './components/useCronStore';
import { ItemMode } from '@/components/BaseContext/createBaseContext';
import SelectedCronModal from './components/SelectedCronModal';
import { PenIcon } from 'lucide-react';
import useLoop from '@/hooks/useLoop';

export default function CronPage() {
  const { setSelectedData } = useCronStore();
  const {
    data: crons,
    isLoading,
    mutate: mutateCrons,
  } = useSysCronControllerFindAll({
    withDeleted: true,
  });

  const handleToggleEnabled = useCallback(
    ({ name, enabled }: SysCronDto) => {
      sysCronControllerUpdateCron({
        name,
        enabled: !enabled,
      } as SysCronDto).then(() => {
        mutateCrons();
      });
    },
    [mutateCrons],
  );

  useLoop(() => {
    mutateCrons();
  }, 10000);

  const columns = useMemo<TableColumnsType<SysCron>>(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 32,
      },
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Last Run At',
        dataIndex: 'lastRunAt',
        render: (_, record) => (
          <Typography.Text>
            {record.lastRunAt
              ? new Date(record.lastRunAt).toLocaleString()
              : 'Never'}
          </Typography.Text>
        ),
      },
      {
        title: 'Cron Expression',
        dataIndex: 'cronExpression',
      },
      {
        title: 'Enabled',
        dataIndex: 'enabled',
        render: (_, record) => (
          <Tag
            color={record.enabled ? 'green' : 'red'}
            onClick={() => handleToggleEnabled(record)}
          >
            {record.enabled ? 'Enabled' : 'Disabled'}
          </Tag>
        ),
      },
      {
        title: 'Actions',
        render: (_, record) => (
          <Button onClick={() => setSelectedData(record, ItemMode.EDIT)}>
            <PenIcon />
          </Button>
        ),
      },
    ];
  }, [handleToggleEnabled, setSelectedData]);

  const onOk = (value: SysCronDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.EDIT) {
      return sysCronControllerUpdateCron(value).then(() => {
        mutateCrons();
      });
    }
  };

  return (
    <Layout className="h-full">
      <Card
        title="Cron Jobs"
        className="flex flex-col h-full"
        classNames={{
          body: 'h-full overflow-y-auto my-2',
        }}
      >
        <Table
          dataSource={crons}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          size="small"
        />
        <SelectedCronModal onOk={onOk} />
      </Card>
    </Layout>
  );
}
