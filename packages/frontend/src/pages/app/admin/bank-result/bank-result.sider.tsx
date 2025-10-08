import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import useBankResultBadge from './bank-result.badge';
import { type MenuItemProps } from 'antd';
import { Banknote } from 'lucide-react';
import type React from 'react';

const BankResultSider: React.FC<MenuItemProps> = (props) => {
  const { count } = useBankResultBadge();
  return (
    <SysPermission requiredPermissions={[EnumPermission.BankResultController]}>
      <BaseMenuItem
        link="/app/admin/bank-result"
        {...props}
        title="Bank Result"
        icon={<Banknote />}
        badgeCount={count}
      />
    </SysPermission>
  );
};

export default BankResultSider;
