import { useMenuStore, MenuType } from '@/stores/menu.store';
import { Container, Text } from '@react-three/uikit';
import { colors } from '@react-three/uikit-default';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@react-three/uikit-default';
import ItemList from './ItemList';
import Tutorial from './Tutorial';
import Setting from './Setting';

export default function Menu() {
  const { currentMenu, setCurrentMenu } = useMenuStore();

  const handleChangeMenu = (menu: MenuType) => {
    setCurrentMenu(menu);
  };

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
        value={currentMenu}
        width={'100%'}
        height={'80%'}
        backgroundColor={colors.background}
        backgroundOpacity={0.8}
        borderRadius={10}
      >
        <TabsList
          width={'100%'}
          backgroundOpacity={0.5}
          borderRadius={10}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={10}
        >
          <TabsTrigger
            value={MenuType.TUTORIAL}
            onClick={() => handleChangeMenu(MenuType.TUTORIAL)}
          >
            <Text fontSize={20} fontWeight={600} color={colors.primary}>
              Tutorial
            </Text>
          </TabsTrigger>
          <TabsTrigger
            value={MenuType.ITEM_LIST}
            onClick={() => handleChangeMenu(MenuType.ITEM_LIST)}
          >
            <Text fontSize={20} fontWeight={600} color={colors.primary}>
              Item List
            </Text>
          </TabsTrigger>
          <TabsTrigger
            value={MenuType.ITEM_DETAILS}
            onClick={() => handleChangeMenu(MenuType.ITEM_DETAILS)}
          >
            <Text fontSize={20} fontWeight={600} color={colors.primary}>
              Item Details
            </Text>
          </TabsTrigger>
          <TabsTrigger
            value={MenuType.SETTING}
            onClick={() => handleChangeMenu(MenuType.SETTING)}
          >
            <Text fontSize={20} fontWeight={600} color={colors.primary}>
              Setting
            </Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={MenuType.TUTORIAL} padding={20}>
          <Tutorial />
        </TabsContent>
        <TabsContent value={MenuType.ITEM_LIST} padding={20}>
          <ItemList />
        </TabsContent>
        <TabsContent value={MenuType.ITEM_DETAILS} padding={20}></TabsContent>
        <TabsContent value={MenuType.SETTING} padding={20}>
          <Setting />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
