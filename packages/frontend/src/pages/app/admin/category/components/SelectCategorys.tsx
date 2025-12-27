import { useCategoryControllerFindAll } from '@api';
import { useMemo } from 'react';
import { useBaseContext } from '@/components/BaseContext/useBaseContext';
import { Typography, type SelectProps, Select, Flex } from 'antd';
import { useLanguageStore } from '@/stores/language.store';

export type SelectCategorysProps = SelectProps & {
  sysOnChange?: (value: number) => void;
};
export default function SelectCategorys({ ...props }: SelectCategorysProps) {
  const { readOnly } = useBaseContext();
  const { getLanguage } = useLanguageStore();

  const { data: categories } = useCategoryControllerFindAll();

  const options = useMemo(() => {
    return categories?.map((category) => ({
      label: getLanguage(category.name),
      description: getLanguage(category.description),
      value: category.id,
    }));
  }, [categories, getLanguage]);

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
      optionRender={(option) => (
        <Flex vertical gap={4}>
          <Typography.Text>
            {getLanguage((option.label as string) ?? '')}
          </Typography.Text>
          <Typography.Text type="secondary">
            {getLanguage(option.data?.description ?? '')}
          </Typography.Text>
        </Flex>
      )}
    />
  );
}
