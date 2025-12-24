import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { type MenuItemProps } from 'antd';
import { FolderTree } from 'lucide-react';
import type React from 'react';

const CategorySider: React.FC<MenuItemProps> = (props) => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.CategoryController]}>
      <BaseMenuItem
        link="/app/admin/category"
        {...props}
        title="Category"
        icon={<FolderTree />}
      />
    </SysPermission>
  );
};

export default CategorySider;

