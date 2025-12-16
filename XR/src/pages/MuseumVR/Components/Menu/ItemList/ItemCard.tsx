import { Container, Image, Text } from '@react-three/uikit';
import type { Item } from '@/types';
import { MenuType, useMenuStore } from '@/stores/menu.store';

export default function ItemCard({ item }: { item: Item }) {
  const { setSelectedItem, setCurrentMenu } = useMenuStore();

  const handleClick = () => {
    setSelectedItem(item);
    setCurrentMenu(MenuType.ITEM_DETAILS);
  };

  return (
    <Container
      flexGrow={1}
      height={200}
      backgroundColor={'#ffffff'}
      borderRadius={10}
      overflow={'hidden'}
      display={'flex'}
      alignItems={'flex-start'}
      gap={10}
      hover={{
        borderColor: 'black',
        borderWidth: 2,
      }}
      onClick={handleClick}
    >
      <Image
        minWidth={200}
        minHeight={200}
        width={200}
        height={200}
        src={item.thumbnailUrl}
        borderLeftRadius={10}
      />
      <Container
        display={'flex'}
        flexDirection={'column'}
        gap={10}
        height={'100%'}
        width={'100%'}
        justifyContent={'space-between'}
      >
        <Container
          display={'flex'}
          flexDirection={'column'}
          gap={10}
          padding={10}
        >
          <Text fontSize={24} fontWeight={600}>
            {item.name}
          </Text>
          <Text fontSize={16} fontWeight={400}>
            {item.description}
          </Text>
        </Container>
      </Container>
    </Container>
  );
}
