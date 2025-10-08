import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { Menu, type MenuItemProps } from 'antd';
import type React from 'react';

const UserSider: React.FC<MenuItemProps> = () => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.AuthController]}>
      <Menu.ItemGroup title="User" key="user">
        <BaseMenuItem link="/app/user" title="User" key="user" />
      </Menu.ItemGroup>
    </SysPermission>
  );
};

export default UserSider;
