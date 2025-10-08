import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { type MenuItemProps } from 'antd';
import type React from 'react';

const PermissionSider: React.FC<MenuItemProps> = (props) => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.PermissionController]}>
      <BaseMenuItem
        link="/app/admin/permission"
        {...props}
        title="Permission"
      />
    </SysPermission>
  );
};

export default PermissionSider;
