import { Flex } from 'antd';
import SysBreadcrumb from '@/components/Sys/Breadcrumb';
import AvatarDropdown from '@/components/Sys/NavBar/AvatarDropdown';

export default function SysNavBar() {
  return (
    <Flex
      align="center"
      justify="space-between"
      className="h-full"
      style={{
        marginInline: 16,
        marginLeft: 64,
      }}
    >
      <SysBreadcrumb />
      <Flex gap={20} align="center" justify="center">
        {/* <NotificationDropdown /> */}
        <AvatarDropdown />
      </Flex>
    </Flex>
  );
}
