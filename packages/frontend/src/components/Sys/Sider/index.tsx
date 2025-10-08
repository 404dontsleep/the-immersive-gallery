import { Menu } from 'antd';
import SysLogo from '@/components/Sys/Logo';
import UserSiderUser from '@/pages/app/user/user.sider';
import AdminSider from '@/pages/app/admin/admin.sider';

export default function SysSider() {
  return (
    <Menu className="h-full">
      <div className="h-16">
        <SysLogo />
      </div>
      <Menu.Divider
        style={{
          margin: 0,
        }}
      />
      <AdminSider />
      <UserSiderUser />
    </Menu>
  );
}
