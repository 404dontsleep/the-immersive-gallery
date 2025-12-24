import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { type MenuItemProps } from 'antd';
import { Image } from 'lucide-react';
import type React from 'react';

const AssetsSider: React.FC<MenuItemProps> = (props) => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.AssetsItemController]}>
      <BaseMenuItem
        link="/app/admin/assets"
        {...props}
        title="Assets"
        icon={<Image />}
      />
    </SysPermission>
  );
};

export default AssetsSider;

