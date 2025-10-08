import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { type MenuItemProps } from 'antd';
import { CircleDollarSign } from 'lucide-react';
import type React from 'react';

const ItemTypeSider: React.FC<MenuItemProps> = (props) => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.ItemTypeController]}>
      <BaseMenuItem
        link="/app/admin/item-type"
        {...props}
        title="Item Type"
        icon={<CircleDollarSign />}
      />
    </SysPermission>
  );
};

export default ItemTypeSider;
