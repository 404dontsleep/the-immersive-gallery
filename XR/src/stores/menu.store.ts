import type { Item } from '@/types';
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
  setCurrentMenu: (menu: MenuType | null) => void;

  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  mode: MenuMode.WEB,
  setMode: (mode) => set({ mode }),
  currentMenu: MenuType.HOME,
  setCurrentMenu: (menu) => set({ currentMenu: menu }),

  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));
