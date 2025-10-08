import { Flex, Spin } from 'antd';
import SysLogo from '@/components/Sys/Logo';

export default function SuspenseFallback() {
  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }} gap={10}>
      <Spin size="large" />
      <SysLogo />
    </Flex>
  );
}
