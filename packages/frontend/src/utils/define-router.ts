import type { ItemType, MenuItemType } from 'antd/es/menu/interface';
import type { RouteObject } from 'react-router-dom';

type SimpleRouter = {
  routes?: RouteObject[];
  items?: ItemType<MenuItemType>[];
};
export default function defineRouter(router: SimpleRouter) {
  return {
    routes: router.routes || [],
    items: router.items || [],
  };
}
