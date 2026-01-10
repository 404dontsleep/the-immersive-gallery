import { Container, Image, Text } from '@react-three/uikit';
import { AssetsItemType, type Item } from '@/shared/api';
import { MenuType, useMenuStore } from '@/stores/menu.store';
import { useMemo } from 'react';
import { useLanguageStore } from '@/stores/language.store';

export default function ItemCard({ item }: { item: Item }) {
  const { setSelectedItem, setCurrentMenu } = useMenuStore();
  const { getLanguage } = useLanguageStore();

  const handleClick = () => {
    setSelectedItem(item);
    setCurrentMenu(MenuType.ITEM_DETAILS);
  };

  const imageUrl = useMemo(() => {
    const assets = item.assets.find(
      (asset) => asset.type === AssetsItemType.image,
    );
    return assets
      ? `${import.meta.env.VITE_API_URL}/api/public/assets-items/${assets.id}/stream`
      : '';
  }, [item.assets]);

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
        src={imageUrl}
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
            {getLanguage(item.name)}
          </Text>
          <Text fontSize={16} fontWeight={400}>
            {getLanguage(item.description).slice(0, 300)}...
          </Text>
        </Container>
      </Container>
    </Container>
  );
}
