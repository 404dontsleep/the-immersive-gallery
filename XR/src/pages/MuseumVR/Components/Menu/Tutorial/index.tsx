import { useTranslation } from '@/hooks/useTranslation';
import { Container, Text } from '@react-three/uikit';

export default function Tutorial() {
  const {
    translation: { tutorial },
  } = useTranslation();
  return (
    <Container width={'100%'} height={'100%'}>
      <Text fontSize={20} fontWeight={600}>
        {tutorial.title}
      </Text>
    </Container>
  );
}
