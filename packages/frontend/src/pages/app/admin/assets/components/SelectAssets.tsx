import { useBaseContext } from '@/components/BaseContext/useBaseContext';
import { useAssetsItemControllerFindAll } from '@api';
import { Image, Select, Typography, type SelectProps, Row, Col } from 'antd';
import { useMemo } from 'react';

type SelectAssetsProps = {} & SelectProps;
export default function SelectAssets({ ...props }: SelectAssetsProps) {
  const { readOnly } = useBaseContext();

  const { data: assets } = useAssetsItemControllerFindAll();

  const options = useMemo<SelectProps['options']>(() => {
    return assets?.map((asset) => ({
      label: asset.name,
      value: asset.id,
      data: asset,
    }));
  }, [assets]);

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
            <Typography.Text>{option.data?.data.name}</Typography.Text>
          </Col>
        </Row>
      )}
      options={options}
      {...props}
    />
  );
}
