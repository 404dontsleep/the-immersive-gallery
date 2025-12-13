import { create } from 'zustand';

export enum MenuType {
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
  currentMenu: MenuType;
  setCurrentMenu: (menu: MenuType) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  mode: MenuMode.WEB,
  setMode: (mode) => set({ mode }),
  currentMenu: MenuType.TUTORIAL,
  setCurrentMenu: (menu) => set({ currentMenu: menu }),
}));
