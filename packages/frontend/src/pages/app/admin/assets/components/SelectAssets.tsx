import { useAssetsItemControllerFindAll } from '@api';
import { Image, Select, Typography, type SelectProps, Row, Col } from 'antd';
import { useMemo } from 'react';
import { useBaseContext } from '@/components/BaseContext/useBaseContext';
import { useLanguageStore } from '@/stores/language.store';

export type SelectAssetsProps = SelectProps & {
  sysOnChange?: (value: number) => void;
};

export default function SelectAssets({ ...props }: SelectAssetsProps) {
  const { readOnly } = useBaseContext();
  const { data: assets } = useAssetsItemControllerFindAll();
  const { getLanguage } = useLanguageStore();

  const options = useMemo<SelectProps['options']>(() => {
    return assets?.map((asset) => ({
      label: asset.name,
      value: asset.id,
      data: asset,
    }));
  }, [assets]);

  if (readOnly) {
    return (
      <Typography.Text>
        {assets?.find((asset) => asset.id === props.value)?.name}
      </Typography.Text>
    );
  }

  return (
    <Select
      optionRender={(option) => (
        <Row>
          <Col span={4}>
            {option.data?.data.type === 'image' && (
              <Image
                src={`/api/public/assets-items/${option.data?.data.id}/stream`}
                height={32}
                alt={option.data?.name}
              />
            )}
          </Col>
          <Col span={20}>
            <Typography.Text>
              {getLanguage(option.data?.data.name)}
            </Typography.Text>
          </Col>
        </Row>
      )}
      labelRender={(label) => (
        <Typography.Text>
          {getLanguage((label.label as string) ?? '')}
        </Typography.Text>
      )}
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
