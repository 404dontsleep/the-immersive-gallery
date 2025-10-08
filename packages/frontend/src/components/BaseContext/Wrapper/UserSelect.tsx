import { Select, Typography, type SelectProps } from 'antd';
import type { BaseContextWrapperProps } from './type';
import { useBaseContext } from '../useBaseContext';
import { useUserControllerFindAll } from '@api';
import { useCallback, useMemo } from 'react';

type SysUserSelectProps = SelectProps & BaseContextWrapperProps<number>;

const SysUserSelect = ({ ...props }: SysUserSelectProps) => {
  console.log(props);

  const { readOnly } = useBaseContext();
  const { data: users } = useUserControllerFindAll();
  const options = useMemo<SelectProps['options']>(() => {
    return users?.map((user) => ({
      label: user.email,
      value: user.id,
    }));
  }, [users]);

  const getUserName = useCallback(
    (value: number) => {
      return users?.find((user) => user.id === value)?.email;
    },
    [users],
  );

  if (readOnly) {
    return <Typography.Text>{getUserName(props.value)}</Typography.Text>;
  }

  return (
    <Select
      {...props}
      options={options}
      onChange={(value) => {
        props.onChange?.(value);
        props.sysOnChange?.(value);
      }}
    />
  );
};

export default SysUserSelect;
