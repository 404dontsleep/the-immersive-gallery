import { useItemTypeControllerFindAll } from '@api';
import { Select, Typography, type SelectProps } from 'antd';
import { useCallback, useMemo } from 'react';
import { useBaseContext } from '../useBaseContext';

type SysItemSelectProps = SelectProps & {
  sysOnChange?: (value: number) => void;
};

const SysItemSelect = ({ ...props }: SysItemSelectProps) => {
  const { data: itemTypes } = useItemTypeControllerFindAll();
  const options = useMemo<SelectProps['options']>(() => {
    return itemTypes?.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, [itemTypes]);
  const getItemName = useCallback(
    (value: number) => {
      return itemTypes?.find((item) => item.id === value)?.name;
    },
    [itemTypes],
  );
  const { readOnly } = useBaseContext();
  if (readOnly) {
    return <Typography.Text>{getItemName(props.value)}</Typography.Text>;
  }
  return (
    <Select
      {...props}
      style={{
        ...props.style,
        width: '100%',
      }}
      options={options}
      onChange={(value) => {
        props.onChange?.(value);
        props.sysOnChange?.(value);
      }}
    />
  );
};

export default SysItemSelect;
