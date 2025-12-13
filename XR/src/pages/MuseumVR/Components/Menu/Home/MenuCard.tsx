import { MenuType } from '@/stores/menu.store';
import { Container, Text } from '@react-three/uikit';
export interface MenuCardProps {
  menuType: MenuType;
  title: string;
  description?: string;
  color?: string;
  icon?: React.ReactNode;
  onClick: (menuType: MenuType) => void;
}

export default function MenuCard({
  menuType,
  title,
  color = 'white',
  icon,
  description,
  onClick,
}: MenuCardProps) {
  return (
    <Container
      backgroundColor={color}
      borderRadius={10}
      padding={10}
      onClick={() => onClick(menuType)}
      minWidth={200}
      height={200}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      flexGrow={1}
      gap={10}
      cursor="pointer"
      hover={{
        borderColor: 'black',
        borderWidth: 5,
      }}
    >
      {icon}
      <Text fontSize={20} fontWeight={600}>
        {title}
      </Text>
      {description && (
        <Text fontSize={16} fontWeight={400}>
          {description}
        </Text>
      )}
    </Container>
  );
}
