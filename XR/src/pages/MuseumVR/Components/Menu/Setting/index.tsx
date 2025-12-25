import { Container, Text } from '@react-three/uikit';
import { Button } from '@react-three/uikit-default';
import { xrStore } from '@/stores/xr.store';
import { useLanguageStore } from '@/stores/language.store';

export default function Setting() {
  const { language, languageList, setLanguage, getLanguage } =
    useLanguageStore();
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
        {getLanguage('LANGUAGE_SELECT')}
      </Text>
      {Object.keys(languageList).map((key) => (
        <Button
          key={key}
          onClick={() => setLanguage(key)}
          variant="outline"
          backgroundColor={language === key ? '#1890ff' : 'white'}
          hover={{
            backgroundColor: language === key ? '#1890ff' : 'white',
          }}
        >
          <Text fontSize={20} fontWeight={600}>
            {getLanguage(`SETTING_LANGUAGE_${key.toUpperCase()}`)}
          </Text>
        </Button>
      ))}
      <Text
        fontSize={30}
        fontWeight={600}
        textAlign={'center'}
        marginBottom={20}
      >
        {getLanguage('SETTING_MODE_TITLE')}
      </Text>
      <Button variant="outline" onClick={() => xrStore.enterVR()}>
        <Text fontSize={20} fontWeight={600}>
          {getLanguage('SETTING_MODE_ENTER_VR')}
        </Text>
      </Button>
      <Button variant="outline" onClick={() => xrStore.enterAR()}>
        <Text fontSize={20} fontWeight={600}>
          {getLanguage('SETTING_MODE_ENTER_XR')}
        </Text>
      </Button>
      <Button variant="outline" onClick={() => xrStore.destroy()}>
        <Text fontSize={20} fontWeight={600}>
          {getLanguage('SETTING_MODE_EXIT')}
        </Text>
      </Button>
    </Container>
  );
}
