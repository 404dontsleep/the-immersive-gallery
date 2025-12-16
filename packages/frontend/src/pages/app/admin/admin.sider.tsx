import { Menu } from 'antd';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
import BaseMenuItem from '@/components/Base/BaseMenuItem';
import { Settings, ShieldCheckIcon, UserIcon } from 'lucide-react';
import LanguageSider from './language/language.sider';
export default function AdminSider() {
  return (
    <AutoSider>
      <SysPermission requiredPermissions={EnumPermission.UserController}>
        <BaseMenuItem
          link="/app/admin/user"
          title="Users"
          icon={<UserIcon />}
        />
      </SysPermission>
      <SysPermission requiredPermissions={EnumPermission.PermissionController}>
        <BaseMenuItem
          link="/app/admin/permission"
          title="Permission"
          icon={<ShieldCheckIcon />}
        />
      </SysPermission>
      <SysPermission requiredPermissions={EnumPermission.SysConfigController}>
        <BaseMenuItem
          link="/app/admin/config"
          title="Config"
          icon={<Settings />}
        />
      </SysPermission>
      <LanguageSider />
    </AutoSider>
  );
}

function AutoSider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const childrenList = Array.isArray(children) ? children : [children];
  const childrenLength = childrenList.filter(
    (child) => child !== null && child !== undefined,
  );
  if (childrenLength.length === 0) {
    return null;
  }
  if (childrenLength.length === 1) {
    return (
      <Menu.ItemGroup title="Administrator" key={'sad'}>
        {childrenLength[0]}
      </Menu.ItemGroup>
    );
  }
  return (
    <Menu.ItemGroup title="Administrator" key={'sad'}>
      {children}
    </Menu.ItemGroup>
  );
}
