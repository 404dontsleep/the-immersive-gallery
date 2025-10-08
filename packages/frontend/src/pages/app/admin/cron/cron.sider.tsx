import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { type MenuItemProps } from 'antd';
import { Clock } from 'lucide-react';
import type React from 'react';

const CronSider: React.FC<MenuItemProps> = (props) => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.SysCronController]}>
      <BaseMenuItem
        link="/app/admin/cron"
        {...props}
        title="Cron"
        icon={<Clock />}
      />
    </SysPermission>
  );
};

export default CronSider;
