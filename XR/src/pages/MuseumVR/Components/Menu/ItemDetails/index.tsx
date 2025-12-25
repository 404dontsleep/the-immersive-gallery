import { Container, Image, Text } from '@react-three/uikit';
import { useMenuStore } from '@/stores/menu.store';
import { useLanguageStore } from '@/stores/language.store';
import { AssetsItemType } from '@/shared/api';

export default function ItemDetails() {
  const { selectedItem } = useMenuStore();
  const { getLanguage } = useLanguageStore();
  return (
    <Container
      width={'100%'}
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
      gap={10}
      //   overflow={'scroll'}
    >
      <Container
        display="flex"
        gap={10}
        overflow={'scroll'}
        width={'100%'}
        paddingY={2}
      >
        {selectedItem?.assets
          .filter((asset) => asset.type === AssetsItemType.image)
          .map((asset) => (
            <Image
              key={asset.id}
              keepAspectRatio
              src={`${import.meta.env.VITE_API_URL}/api/public/assets-items/${asset.id}/stream`}
              height={400}
              flexShrink={0}
              objectFit={'cover'}
            />
          ))}
      </Container>
      <Text fontSize={24} fontWeight={600}>
        {selectedItem?.name ? getLanguage(selectedItem.name) : ''}
      </Text>
      <Text fontSize={16} fontWeight={400}>
        {selectedItem?.description ? getLanguage(selectedItem.description) : ''}
      </Text>
    </Container>
  );
}
