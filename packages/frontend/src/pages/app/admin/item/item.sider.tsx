import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { type MenuItemProps } from 'antd';
import { Package } from 'lucide-react';
import type React from 'react';

const ItemSider: React.FC<MenuItemProps> = (props) => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.ItemController]}>
      <BaseMenuItem
        link="/app/admin/item"
        {...props}
        title="Item"
        icon={<Package />}
      />
    </SysPermission>
  );
};

export default ItemSider;

