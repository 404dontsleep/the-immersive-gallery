import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { type MenuItemProps } from 'antd';
import { UserIcon } from 'lucide-react';
import type React from 'react';

const UserSider: React.FC<MenuItemProps> = (props) => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.UserController]}>
      <BaseMenuItem
        link="/app/admin/user"
        {...props}
        title="Users"
        icon={<UserIcon />}
      />
    </SysPermission>
  );
};

export default UserSider;
