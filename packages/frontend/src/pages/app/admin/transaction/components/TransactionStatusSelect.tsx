import { Select, Typography, type SelectProps } from 'antd';
import type { BaseContextWrapperProps } from '@/components/BaseContext/Wrapper/type';
import { TransactionStatus } from '@api';
import { useBaseContext } from '@/components/BaseContext/useBaseContext';

type TransactionStatusSelectProps = SelectProps &
  BaseContextWrapperProps<TransactionStatus>;

const options = Object.values(TransactionStatus).map((status) => ({
  label: status.charAt(0).toUpperCase() + status.slice(1),
  value: status,
}));

const TransactionStatusSelect = ({
  ...props
}: TransactionStatusSelectProps) => {
  const { readOnly } = useBaseContext();
  if (readOnly) {
    return (
      <Typography.Text>
        {props.value?.charAt(0).toUpperCase() + props.value?.slice(1)}
      </Typography.Text>
    );
  }
  return <Select {...props} options={options} />;
};

export default TransactionStatusSelect;
