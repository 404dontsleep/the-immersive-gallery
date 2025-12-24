import { useCategoryControllerFindAll } from '@api';
import { useMemo } from 'react';
import { useBaseContext } from '@/components/BaseContext/useBaseContext';
import { Typography, type SelectProps, Select } from 'antd';

export type SelectCategorysProps = SelectProps & {
  sysOnChange?: (value: number) => void;
};
export default function SelectCategorys({ ...props }: SelectCategorysProps) {
  const { readOnly } = useBaseContext();

  const { data: categories } = useCategoryControllerFindAll();

  const options = useMemo(() => {
    return categories?.map((category) => ({
      label: category.name,
      value: category.id,
    }));
  }, [categories]);

  if (readOnly) {
    return (
      <Typography.Text>
        {categories?.find((category) => category.id === props.value)?.name}
      </Typography.Text>
    );
  }

  return (
    <Select
      options={options}
      {...props}
      disabled={readOnly}
      onChange={(value) => {
        props.onChange?.(value);
        props.sysOnChange?.(value);
      }}
    />
  );
}
