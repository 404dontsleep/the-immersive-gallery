import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { type MenuItemProps } from 'antd';
import { Settings } from 'lucide-react';
import type React from 'react';

const ConfigSider: React.FC<MenuItemProps> = (props) => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.SysConfigController]}>
      <BaseMenuItem
        link="/app/admin/config"
        {...props}
        title="Config"
        icon={<Settings />}
      />
    </SysPermission>
  );
};

export default ConfigSider;
