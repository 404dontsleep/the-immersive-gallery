import { languageList, useTranslation } from '@/hooks/useTranslation';
import { Container, Text } from '@react-three/uikit';
import { Button } from '@react-three/uikit-default';
import { xrStore } from '@/stores/xr.store';

export default function Setting() {
  const { setLanguage, translation } = useTranslation();
  return (
    <Container
      width={'100%'}
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
      gap={10}
    >
      <Text
        fontSize={30}
        fontWeight={600}
        textAlign={'center'}
        marginBottom={20}
      >
        {translation.setting.language.title}
      </Text>
      {Object.keys(languageList).map((key) => (
        <Button
          key={key}
          onClick={() => setLanguage(key as keyof typeof languageList)}
          variant="outline"
        >
          <Text fontSize={20} fontWeight={600}>
            {
              translation.setting.language[
                key as keyof typeof translation.setting.language
              ]
            }
          </Text>
        </Button>
      ))}
      <Text
        fontSize={30}
        fontWeight={600}
        textAlign={'center'}
        marginBottom={20}
      >
        {translation.setting.mode.title}
      </Text>
      <Button variant="outline" onClick={() => xrStore.enterVR()}>
        <Text fontSize={20} fontWeight={600}>
          {translation.setting.mode.enter_vr}
        </Text>
      </Button>
      <Button variant="outline" onClick={() => xrStore.enterAR()}>
        <Text fontSize={20} fontWeight={600}>
          {translation.setting.mode.enter_xr}
        </Text>
      </Button>
      <Button variant="outline" onClick={() => xrStore.destroy()}>
        <Text fontSize={20} fontWeight={600}>
          {translation.setting.mode.exit}
        </Text>
      </Button>
    </Container>
  );
}
