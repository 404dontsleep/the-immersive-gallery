import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { type MenuItemProps } from 'antd';
import { Receipt } from 'lucide-react';
import type React from 'react';

const TransactionSider: React.FC<MenuItemProps> = (props) => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.TransactionController]}>
      <BaseMenuItem
        link="/app/admin/transaction"
        {...props}
        title="Transaction"
        icon={<Receipt />}
      />
    </SysPermission>
  );
};

export default TransactionSider;
