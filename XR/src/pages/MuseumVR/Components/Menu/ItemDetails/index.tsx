import { Container, Image, Text } from '@react-three/uikit';
import { useMenuStore } from '@/stores/menu.store';

export default function ItemDetails() {
  const { selectedItem } = useMenuStore();
  return (
    <Container
      width={'100%'}
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
      gap={10}
      //   overflow={'scroll'}
    >
      <Container overflow={'scroll'} display={'flex'} gap={10}>
        {selectedItem?.imageUrls.map((imageUrl) => (
          <Image
            key={imageUrl}
            keepAspectRatio
            minWidth={'80%'}
            height={300}
            src={imageUrl}
          />
        ))}
      </Container>
      <Text fontSize={24} fontWeight={600}>
        {selectedItem?.name}
      </Text>
      <Text fontSize={16} fontWeight={400}>
        {selectedItem?.description}
      </Text>
    </Container>
  );
}
