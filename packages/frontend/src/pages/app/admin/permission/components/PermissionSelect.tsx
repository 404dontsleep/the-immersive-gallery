import {
  usePermissionControllerFindAll,
  type PermissionDtoChildren,
} from '@api';
import { Button, Flex, Select } from 'antd';
import { PlusIcon, TrashIcon } from 'lucide-react';
import React, { useMemo } from 'react';

type ArrayPermissionSelectProps = {
  value?: (PermissionDtoChildren | undefined)[];
  onChange?: (value: (PermissionDtoChildren | undefined)[]) => void;
};

function formatValue(value: (PermissionDtoChildren | undefined)[]) {
  return value.map((permission) =>
    permission ? { id: permission.id } : undefined,
  );
}

const PermissionSelect: React.FC<ArrayPermissionSelectProps> = ({
  value,
  onChange,
}) => {
  const { data: allPermissions } = usePermissionControllerFindAll();

  const options = useMemo(() => {
    return (
      allPermissions?.map((item) => ({
        label: item.name,
        value: item.id,
      })) ?? []
    );
  }, [allPermissions]);

  const handleAddPermission = () => {
    onChange?.(formatValue(value?.concat([undefined]) ?? []));
  };

  const handleChangePermission = (_value: number, _index: number) => {
    onChange?.(
      formatValue(
        value?.map((permission, i) =>
          i === _index ? { id: _value } : permission,
        ) ?? [],
      ),
    );
  };

  const handleRemovePermission = (index: number) => {
    onChange?.(formatValue(value?.filter((_, i) => i !== index) ?? []));
  };

  return (
    <Flex gap={6} vertical>
      {value?.map((permission, index) => (
        <Flex key={index} gap={6}>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Permission"
            options={options}
            value={permission?.id}
            onChange={(value) => handleChangePermission(value, index)}
          />
          <Button
            type="dashed"
            danger
            onClick={() => handleRemovePermission(index)}
          >
            <TrashIcon />
          </Button>
        </Flex>
      ))}
      <Button type="dashed" onClick={handleAddPermission}>
        <PlusIcon /> Add Permission
      </Button>
    </Flex>
  );
};

export default PermissionSelect;
