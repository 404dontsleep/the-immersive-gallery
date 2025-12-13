import { MenuType, useMenuStore } from '@/stores/menu.store';
import { Container } from '@react-three/uikit';
import MenuCard from './MenuCard';
import {
  BookIcon,
  ListIcon,
  SettingsIcon,
  HouseIcon,
} from '@react-three/uikit-lucide';

export default function Home() {
  const { setCurrentMenu } = useMenuStore();

  return (
    <Container
      width={'100%'}
      height={'100%'}
      display={'flex'}
      flexWrap={'wrap'}
      gap={10}
      overflow={'scroll'}
      scrollbarWidth={5}
    >
      <MenuCard
        menuType={MenuType.HOME}
        title="Home"
        onClick={setCurrentMenu}
        icon={<HouseIcon height={64} width={64} />}
      />
      <MenuCard
        menuType={MenuType.TUTORIAL}
        title="Tutorial"
        onClick={setCurrentMenu}
        icon={<BookIcon height={64} width={64} />}
      />
      <MenuCard
        menuType={MenuType.ITEM_LIST}
        title="Item List"
        onClick={setCurrentMenu}
        icon={<ListIcon height={64} width={64} />}
      />
      <MenuCard
        menuType={MenuType.SETTING}
        title="Setting"
        onClick={setCurrentMenu}
        icon={<SettingsIcon height={64} width={64} />}
      />
    </Container>
  );
}
