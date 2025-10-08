import { Table, type TableColumnsType } from 'antd';

type BaseTrackTableProps<T> = {
  data: T[];
  columns: TableColumnsType<T>;
};

export function BaseTrackTable<T>(props: BaseTrackTableProps<T>) {
  const { data, columns } = props;
  return <Table size="small" dataSource={data} columns={columns} />;
}
