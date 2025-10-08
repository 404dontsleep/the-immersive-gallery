import { useUserControllerGetMyProfile } from '@api';
import Profile from './components/Profile';
import { Flex, Layout } from 'antd';

export default function UserPage() {
  const { data } = useUserControllerGetMyProfile();
  return (
    <Layout className="h-full">
      <Flex vertical className="h-full" gap={16}>
        {data && <Profile user={data} />}
      </Flex>
    </Layout>
  );
}
