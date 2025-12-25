import type { Item } from '@/shared/api';
import { create } from 'zustand';

export enum MenuType {
  HOME = 'home',
  TUTORIAL = 'tutorial',
  ITEM_LIST = 'item-list',
  ITEM_DETAILS = 'item-details',
  SETTING = 'setting',
}
export enum MenuMode {
  WEB = 'web',
  XR = 'xr',
}

export interface MenuStore {
  mode: MenuMode;
  setMode: (mode: MenuMode) => void;
  currentMenu: MenuType | null;
  previousMenu: MenuType[];
  setCurrentMenu: (menu: MenuType | null) => void;
  goBack: () => void;

  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
}

export const useMenuStore = create<MenuStore>((set, get) => ({
  mode: MenuMode.WEB,
  setMode: (mode) => set({ mode }),
  currentMenu: MenuType.HOME,
  previousMenu: [],
  setCurrentMenu: (menu) => {
    const previousMenu = get().currentMenu;
    if (previousMenu) {
      set({
        previousMenu: [...get().previousMenu, previousMenu],
        currentMenu: menu,
      });
    } else {
      set({ currentMenu: menu });
    }
  },
  goBack: () => {
    if (get().previousMenu.length > 0) {
      set({ currentMenu: get().previousMenu[get().previousMenu.length - 1] });
      set({ previousMenu: get().previousMenu.slice(0, -1) });
    } else {
      set({ currentMenu: MenuType.HOME });
    }
  },

  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));
