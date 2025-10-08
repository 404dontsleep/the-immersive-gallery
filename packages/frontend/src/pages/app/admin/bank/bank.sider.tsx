import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { type MenuItemProps } from 'antd';
import { CreditCardIcon } from 'lucide-react';
import type React from 'react';

const BankSider: React.FC<MenuItemProps> = (props) => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.BankController]}>
      <BaseMenuItem
        link="/app/admin/bank"
        {...props}
        title="Bank Management"
        icon={<CreditCardIcon />}
      />
    </SysPermission>
  );
};

export default BankSider;
