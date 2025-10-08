import SysGlow from '@/components/Sys/Glow';
import SysItem from '@/components/Sys/Item';
import type { User } from '@api';
import { Avatar, Card, Flex, Typography } from 'antd';

type ProfileProps = {
  user: User;
};
const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <Flex vertical gap={16}>
      <Card>
        <Flex gap={8} align="center" className="h-12">
          <Avatar
            src="https://dl.ops.kgvn.garenanow.com/hok/VN/IconPic/11616.png"
            size={'large'}
            shape="square"
          />
          <Flex vertical gap={0}>
            <Typography.Text strong>{user.email}</Typography.Text>
            <Typography.Text type="secondary">{user.createdAt}</Typography.Text>
          </Flex>
        </Flex>
      </Card>
      <Card>
        <Flex gap={8} className="overflow-x-auto">
          {user.inventories.map((inventory) => (
            <SysGlow key={inventory.id} thickness={3}>
              <SysItem
                image={inventory.itemType.symbol}
                amount={inventory.quantity}
                name={inventory.itemType.name}
                description={inventory.itemType.description}
              />
            </SysGlow>
          ))}
        </Flex>
      </Card>
    </Flex>
  );
};

export default Profile;
