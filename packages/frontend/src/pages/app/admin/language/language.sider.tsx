import BaseMenuItem from '@/components/Base/BaseMenuItem';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import { type MenuItemProps } from 'antd';
import { Languages } from 'lucide-react';
import type React from 'react';

const LanguageSider: React.FC<MenuItemProps> = (props) => {
  return (
    <SysPermission requiredPermissions={[EnumPermission.LanguageController]}>
      <BaseMenuItem
        link="/app/admin/language"
        {...props}
        title="Languages"
        icon={<Languages />}
      />
    </SysPermission>
  );
};

export default LanguageSider;

