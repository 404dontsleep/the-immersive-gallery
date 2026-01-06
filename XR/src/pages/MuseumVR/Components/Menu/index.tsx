import { useMenuStore, MenuType, MenuMode } from '@/stores/menu.store';
import { Container, Text } from '@react-three/uikit';
import { colors } from '@react-three/uikit-default';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@react-three/uikit-default';
import ItemList from './ItemList';
import Setting from './Setting';
import Home from './Home';
import { ChevronLeftIcon } from '@react-three/uikit-lucide';
import ItemDetails from './ItemDetails';
import { useLayout, Orientation } from '@/hooks/useTranslation/useLayout';

export default function Menu() {
  const { currentMenu, setCurrentMenu, mode } = useMenuStore();
  const orientation = useLayout();
  const handleChangeMenu = (menu: MenuType) => {
    setCurrentMenu(menu);
  };

  if (!currentMenu && mode === MenuMode.WEB) return null;

  return (
    <Container
      width={'100%'}
      height={'100%'}
      positionType={'relative'}
      padding={20}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Tabs
        value={currentMenu ?? ''}
        width={'100%'}
        height={orientation === Orientation.LANDSCAPE ? '80%' : '100%'}
        // maxWidth={1000}
        backgroundColor={colors.background}
        backgroundOpacity={0.8}
        borderRadius={10}
      >
        <TabsList
          width={'100%'}
          borderRadius={10}
          gap={10}
          height={80}
          borderBottomWidth={1}
        >
          <TabsTrigger
            value={MenuType.HOME}
            onClick={() => handleChangeMenu(MenuType.HOME)}
            width={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'100%'}
            backgroundColor={'white'}
          >
            <ChevronLeftIcon height={20} width={20} />
            <Text fontSize={20} fontWeight={600} color={colors.primary}>
              Home
            </Text>
          </TabsTrigger>
          <TabsTrigger
            value={MenuType.TUTORIAL}
            onClick={() => setCurrentMenu(null)}
            width={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'100%'}
            backgroundColor={'white'}
          >
            <Text fontSize={20} fontWeight={600} color={colors.primary}>
              Close Menu
            </Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={MenuType.HOME} padding={20}>
          <Home />
        </TabsContent>
        {/* <TabsContent value={MenuType.TUTORIAL} padding={20}>
          <Tutorial />
        </TabsContent> */}
        <TabsContent value={MenuType.ITEM_LIST} padding={20}>
          <ItemList />
        </TabsContent>
        <TabsContent value={MenuType.ITEM_DETAILS} padding={20}>
          <ItemDetails />
        </TabsContent>
        <TabsContent value={MenuType.SETTING} padding={20}>
          <Setting />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
