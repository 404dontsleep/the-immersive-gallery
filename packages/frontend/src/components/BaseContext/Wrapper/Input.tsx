import { Input, Typography, type InputProps } from 'antd';
import { useBaseContext } from '../useBaseContext';

type SysInputProps = InputProps & {
  sysOnChange?: (value: string) => void;
};

export const SysInput = ({ ...props }: SysInputProps) => {
  const { readOnly } = useBaseContext();
  if (readOnly) {
    return <Typography.Text>{props.value}</Typography.Text>;
  }
  return (
    <Input
      {...props}
      onChange={(e) => {
        props.onChange?.(e);
        props.sysOnChange?.(e.target.value);
      }}
    />
  );
};
