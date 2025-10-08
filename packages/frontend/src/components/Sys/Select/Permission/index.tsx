import { EnumPermission } from '@api';
import { Select, type SelectProps } from 'antd';
import React from 'react';

const options = Object.values(EnumPermission).map((permission) => ({
  label: permission,
  value: permission,
}));

type SysSelectPermissionProps = Omit<SelectProps, 'options'>;

const SysSelectPermission: React.FC<SysSelectPermissionProps> = (props) => {
  return <Select options={options} {...props} />;
};
export default SysSelectPermission;
